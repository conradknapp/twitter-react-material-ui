import React from "react";
import Tweet from "./Tweet";

const TweetList = ({ tweets, handlePauseStream, handleResumeStream }) => (
  <ul>
    {tweets.map((tweet, i) => (
      <Tweet
        key={i}
        handlePauseStream={handlePauseStream}
        handleResumeStream={handleResumeStream}
        {...tweet}
      />
    ))}
  </ul>
);

export default TweetList;
