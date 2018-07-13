import React from "react";
import { Tweet } from "react-twitter-widgets";

//prettier-ignore
const Widget = ({ id_str }) => (
  <Tweet tweetId={id_str} options={{ width: '400'}} />
);

export default Widget;
