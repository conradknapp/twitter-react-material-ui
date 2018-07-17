const express = require("express");
const router = express.Router();
const passport = require("passport");
const axios = require("axios");

async function getBearerToken() {
  const key = process.env.TWITTER_CONSUMER_KEY;
  const secret = process.env.TWITTER_CONSUMER_SECRET;
  const credentials = new Buffer(`${key}:${secret}`).toString("base64");
  axios({
    method: "post",
    url: "https://api.twitter.com/oauth2/token",
    data: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  }).then(res => addBearerToken(res.data));
}

function addBearerToken(body) {
  process.env.TWITTER_BEARER_TOKEN = body.access_token;
}

router.get("/verify", (req, res) => {
  // if user is logged in, we should have access to req.user
  if (req.user) {
    console.log("Auth!", req.user);
  } else {
    console.log("not auth");
  }
});

router.get("/", passport.authenticate("twitter"));

// prettier-ignore
router.get("/callback", passport.authenticate("twitter", { failureRedirect: "http://localhost:3000/signin" }), (req, res) => {
    getBearerToken();
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/");
  }
);

module.exports = router;
