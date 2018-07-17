import React from "react";
import axios from "axios";
import io from "socket.io-client";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import LinearProgress from "@material-ui/core/LinearProgress";
import TweetList from "./TweetList";

const socket = io("http://localhost:4000");

class Streaming extends React.PureComponent {
  state = {
    tweets: [],
    hashtag: "",
    errors: {},
    loading: false
  };

  componentDidMount() {
    socket.on("tweet", data => {
      this.setState({ loading: true });
      let newList = [data].concat(this.state.tweets);
      this.setState({ tweets: newList, loading: false });
    });
    console.log(this.state.tweets);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handlePause = async event => {
    event.preventDefault();
    await axios.post("/pause");
  };

  handleSubmit = async event => {
    event.persist();
    event.preventDefault();
    try {
      this.setState({ loading: true });
      await axios.post("/streaming", this.state);
      // this.clearState();
      this.setState({
        // tweets,
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
    const { hashtag, tweets, loading } = this.state;

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
        {tweets.length > 0 ? (
          <Button variant="outlined" color="primary" onClick={this.handlePause}>
            Pause
          </Button>
        ) : (
          ""
        )}
        {loading ? <LinearProgress /> : <TweetList tweets={tweets} />}
      </div>
    );
  }
}

export default Streaming;
