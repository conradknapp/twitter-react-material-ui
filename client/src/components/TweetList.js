import React from "react";
import Tweet from "./Tweet";

const TweetList = ({ tweets, handlePauseStream, handleResumeStream }) => (
  <ul>
    {tweets.map((tweet, i) => (
      <Tweet
        key={i}
        handleResumeStream={handleResumeStream}
        handlePauseStream={handlePauseStream}
        {...tweet}
      />
    ))}
  </ul>
);

export default TweetList;
