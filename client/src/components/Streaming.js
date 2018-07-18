import React from "react";
import axios from "axios";
import io from "socket.io-client";

import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import LinearProgress from "@material-ui/core/LinearProgress";
import TweetList from "./TweetList";

const socket = io("http://localhost:4000");

class Streaming extends React.Component {
  state = {
    tweets: [],
    hashtag: "",
    errors: {},
    openSnackbar: false,
    loading: false,
    cachingTweets: false,
    cachedTweets: []
  };

  componentDidMount() {
    socket.on("tweet", data => {
      this.setState({ loading: true });
      if (!this.state.cachingTweets) {
        let incomingTweets = [data, ...this.state.tweets];
        this.setState({ tweets: incomingTweets, loading: false });
      } else {
        let cachedTweets = [data, ...this.state.cachedTweets];
        this.setState({
          cachedTweets,
          loading: false
        });
        if (cachedTweets.length >= 5) {
          this.setState({ openSnackbar: true });
        }
      }
    });

    socket.on("disconnect", () => {
      socket.off("tweet");
      socket.removeAllListeners("tweet");
      console.log("Socket Disconnected");
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handlePauseStream = () => {
    console.log("not caching tweets!");
    this.setState({ cachingTweets: false });
  };

  handleResumeStream = () => {
    setTimeout(() => {
      this.setState({ cachingTweets: true });
      console.log("caching tweets!");
    }, 2000);
  };

  handleClose = () => this.setState({ openSnackbar: false });

  seeNewTweets = () => {
    this.setState(
      {
        tweets: [...this.state.cachedTweets, ...this.state.tweets],
        openSnackbar: false
      },
      () => this.setState({ cachedTweets: [] })
    );
    window.scrollTo(0, 0);
  };

  handleSubmit = async event => {
    event.persist();
    event.preventDefault();
    try {
      this.setState({ loading: true });
      const { data: tweets } = await axios.post("/streaming", this.state);
      this.setState({
        tweets,
        errors: {},
        loading: false
      });
    } catch (err) {
      console.error("Error in Promise", err);
      if (err.response) {
        console.dir(err.response.data);
        this.setState({
          errors: { ...err.response.data },
          loading: false
        });
      }
    }
  };

  render() {
    const { hashtag, tweets, loading, cachedTweets, openSnackbar } = this.state;

    return (
      <div className="App">
        <form
          className="form"
          action="/streaming"
          method="POST"
          onSubmit={this.handleSubmit}
        >
          <Typography variant="display3">Live Tweets</Typography>
          <TextField
            label="Input Hashtags"
            placeholder="i.e. javascript"
            name="hashtag"
            onChange={this.handleChange}
            value={hashtag}
          />
          <Button variant="outlined" color="primary" type="submit">
            <Icon>search</Icon>
            Find me
          </Button>
        </form>
        {loading ? (
          <LinearProgress />
        ) : (
          <TweetList
            handlePauseStream={this.handlePauseStream}
            handleResumeStream={this.handleResumeStream}
            tweets={tweets}
          />
        )}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={
            <span>
              Stream paused. <strong>{cachedTweets.length} new tweets</strong>
            </span>
          }
          action={[
            <Button color="secondary" size="medium" onClick={this.seeNewTweets}>
              Click to see new tweets
            </Button>,
            <IconButton key="close" color="inherit" onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

export default Streaming;
