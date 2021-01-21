const express = require("express");
const Twitter = require("twitter");

require("dotenv").config();

const router = new express.Router();

const client = new Twitter({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  bearer_token: process.env.BEARER_TOKEN,
});

router.post("/getUserTweets", async (req, response) => {
  try {
    const tweetsToFetch = 400;
    const { username } = req.body;
    const params = {
      screen_name: username,
      count: tweetsToFetch,
    };
    client.get("statuses/user_timeline", params, (err, tweets, res) =>
      response.send(tweets)
    );
  } catch (e) {
    console.log(e);
  }
});

router.post("/getAboutTweets", async (req, response) => {
  try {
    const { subject } = req.body;
    const params = {
      q: `#${subject}`,
      count: 50,
      result_type: "recent",
      lang: "en",
    };
    client.get("search/tweets", params, (err, data, res) => {
      response.send(data);
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
