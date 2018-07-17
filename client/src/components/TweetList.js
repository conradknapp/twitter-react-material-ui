import React from "react";
import Tweet from "./Tweet";

const TweetList = ({ tweets }) => (
  <ul>{tweets.map((tweet, i) => <Tweet key={i} {...tweet} />)}</ul>
);

export default TweetList;
