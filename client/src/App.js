import React, { Component } from "react";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import "./App.css";

import TweetList from "./components/TweetList";

const initialState = {
  hashtags: "",
  count: "",
  resultType: "popular",
  tweets: [],
  loading: null,
  errors: {}
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
      const { data: tweets } = await axios.post("/search", this.state);
      this.clearState();
      this.setState({
        tweets,
        errors: {},
        loading: false
      });
    } catch (err) {
      console.error("Error in Searching", err);
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
  countTweets = ({ length }) => <p><strong>{length}</strong> tweet{length > 1 ? "s" : ""} found</p>;

  clearState = () => this.setState({ ...initialState });

  render() {
    const { count, hashtags, tweets, errors, loading, resultType } = this.state;

    return (
      <div className="App">
        <Typography variant="display3">Search Twitter</Typography>
        <form className="form" action="POST" onSubmit={this.handleSubmit}>
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
          <FormControl>
            <InputLabel htmlFor="resultType">Tweet Type</InputLabel>
            <Select
              value={resultType}
              onChange={this.handleChange}
              name="resultType"
            >
              <MenuItem value={"recent"}>Recent</MenuItem>
              <MenuItem value={"popular"}>Popular</MenuItem>
              <MenuItem value={"mixed"}>Mixed</MenuItem>
            </Select>
            <FormHelperText>Default value: Popular</FormHelperText>
          </FormControl>
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
