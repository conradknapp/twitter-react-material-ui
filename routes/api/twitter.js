const express = require("express");
const router = express.Router();
const client = require("../../twitter");
const validateSearchInput = require("../../validation");

// @route POST api/twitters/search
// @desc Search Twitter by hashtags and count
// @access Public
router.post("/search", (req, res) => {
  const { errors, isValid } = validateSearchInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // Reconstruct Query
  const query = req.body.hashtags
    .split(" ")
    .map(hashtag => `#${hashtag}`)
    .join(" OR ");

  client
    .get("/search/tweets.json", { q: query, count: req.body.count })
    .then(data => {
      const resData = data.statuses.map(item => {
        let favorite_count;
        let created_at;
        let retweet_count;
        if (item["retweeted_status"]) {
          favorite_count = item.retweeted_status.favorite_count;
          created_at = item.retweeted_status.created_at;
          retweet_count = item.retweeted_status.retweet_count;
        } else {
          favorite_count = item.favorite_count;
          created_at = item.created_at;
          retweet_count = item.retweet_count;
        }
        return {
          _id: item.id,
          id_str: item.id_str,
          retweet_count,
          favorite_count,
          created_at
        };
      });
      res.json(resData);
    })
    .catch(err => {
      return res.status(404).json(err);
    });
});

module.exports = router;
