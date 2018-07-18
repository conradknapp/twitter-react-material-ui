const { client } = require("../../twitterConfig");
const { streamingClient } = require("../../twitterConfig");
const validateSearchInput = require("../../validation");
const RateLimiter = require("limiter").RateLimiter;
const limiter = new RateLimiter(1, 2000);
const axios = require("axios");

module.exports = (app, io) => {
  let streamFunc;
  let socketConnection;
  let savedHashtag;

  io.on("connection", socket => {
    console.log("Client connected!");

    axios.defaults.headers.common["Authorization"] = `Bearer ${
      process.env.TWITTER_BEARER_TOKEN
    }`;
    ``;
    console.log(axios.defaults.headers.common["Authorization"]);

    socket.on("disconnect", () => {
      console.log("Client disconnected.");
      socket.removeAllListeners("tweets");
    });
    socketConnection = socket;
  });

  const streamTweets = hashtag => {
    console.log(hashtag);
    const stream = streamingClient.stream("statuses/filter", {
      track: hashtag
    });
    stream.on("data", event => {
      sendTweet(event);
    });
    stream.on("error", err => {
      console.error(err);
    });
    streamFunc = stream;
    savedHashtag = hashtag;
  };

  const sendTweet = tweet => {
    limiter.removeTokens(1, () => {
      socketConnection.emit("tweet", tweet);
    });
  };

  // @route POST /search
  // @desc Search Twitter by hashtags and count
  // @access Public
  app.post("/search", (req, res) => {
    const { errors, isValid } = validateSearchInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Reconstruct Query

    const query = req.body.hashtags
      .split(" ")
      .map(hashtag => `${hashtag}`)
      .join("&");
    const result_type = req.body.resultType;
    const count = req.body.count;

    axios
      // prettier-ignore
      .get(
        `https://api.twitter.com/1.1/search/tweets.json?q=brexit&result_type=${result_type}&count=${count}`
      )
      .then(response => {
        const resData = response.data.statuses.map(item => {
          let favorite_count;
          let created_at;
          let retweet_count;
          let name;
          let screen_name;
          let text;
          let profile_image_url;
          if (item["retweeted_status"]) {
            text = item.retweeted_status.text;
            favorite_count = item.retweeted_status.favorite_count;
            created_at = item.retweeted_status.created_at;
            retweet_count = item.retweeted_status.retweet_count;
            name = item.retweeted_status.user.name;
            screen_name = item.retweeted_status.user.screen_name;
            profile_image_url = item.retweeted_status.user.profile_image_url;
          } else {
            favorite_count = item.favorite_count;
            created_at = item.created_at;
            retweet_count = item.retweet_count;
            name = item.user.name;
            screen_name = item.user.screen_name;
            profile_image_url = item.user.profile_image_url;
            text = item.text;
          }
          return {
            _id: item.id,
            id_str: item.id_str,
            retweet_count,
            favorite_count,
            created_at,
            name,
            screen_name,
            text,
            profile_image_url
          };
        });
        // console.log(JSON.stringify(resData));
        res.json(resData);
      })
      .catch(err => {
        return res.status(404).json(err);
      });
  });

  // @route POST /streaming
  // @desc Get streaming data about a hashtag
  // @access Public
  app.post("/streaming", (req, res) => {
    streamTweets(req.body.hashtag);
  });

  app.post("/resume", (req, res) => {
    streamTweets(savedHashtag);
    res.json({ resume: true });
  });

  app.post("/pause", (req, res) => {
    streamFunc.destroy();
    res.json({ destroyed: true });
  });
};
