var Twitter = require("twitter");

exports.client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  // access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  // access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
});

exports.streamingClient = new Twitter({
  consumer_key: process.env.STREAMING_CONSUMER_KEY,
  consumer_secret: process.env.STREAMING_CONSUMER_SECRET,
  access_token_key: process.env.STREAMING_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.STREAMING_ACCESS_TOKEN_SECRET
});
