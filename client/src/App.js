import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import "./App.css";

import TweetList from "./components/TweetList";

const initialState = {
  count: "",
  hashtags: "",
  tweets: [],
  errors: {},
  loading: null
};

class App extends Component {
  state = { ...initialState };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.persist();
    event.preventDefault();
    try {
      this.setState({ loading: true });
      const { data: tweets } = await axios.post("/api/search", this.state);
      // this.clearState();
      this.setState({
        tweets,
        errors: {},
        loading: false
      });
    } catch (err) {
      console.error("Error in Promise", err);
      console.dir(err.response.data);
      this.setState({
        errors: { ...err.response.data },
        loading: false
      });
    }
  };

  formatErrors = errors =>
    Object.values(errors).map((error, i) => (
      <li key={i} style={{ color: "red" }}>
        {error}
      </li>
    ));

  // prettier-ignore
  countTweets = ({ length }) => <p>{length} tweet{length > 1 ? "s" : ""} found</p>;

  clearState = () => this.setState({ ...initialState });

  render() {
    const { count, hashtags, tweets, errors, loading } = this.state;

    return (
      <div className="App">
        <h1>Twitter</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <TextField
            label="Input Hashtags"
            placeholder="i.e. brexit"
            name="hashtags"
            onChange={this.handleChange}
            value={hashtags}
          />
          <TextField
            placeholder="i.e. 2"
            type="number"
            label="Input Count"
            name="count"
            onChange={this.handleChange}
            value={count}
          />
          <Button variant="outlined" color="primary" type="submit">
            <Icon>search</Icon>
            Find me
          </Button>
        </form>
        {hashtags &&
          hashtags
            .split(" ")
            .map((hashtag, i) => (
              <Chip
                key={i}
                deleteIcon={<TagFacesIcon />}
                onDelete={() => console.log("lol")}
                style={{ marginTop: "1em", marginLeft: "0.3em" }}
                label={`#${hashtag}`}
              />
            ))}
        {errors && <ul>{this.formatErrors(errors)}</ul>}
        {!!tweets.length && this.countTweets(tweets)}
        {loading ? <CircularProgress /> : <TweetList tweets={tweets} />}
      </div>
    );
  }
}

export default App;
