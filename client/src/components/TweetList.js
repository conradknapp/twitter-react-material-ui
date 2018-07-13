import React from "react";
import Tweet from "./Tweet";

const TweetList = ({ tweets }) => (
  <ul>{tweets.map(tweet => <Tweet key={tweet._id} {...tweet} />)}</ul>
);

export default TweetList;
