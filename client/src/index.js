import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Streaming from "./components/Streaming";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Root = () => (
  <Router>
    <React.Fragment>
      <Navbar />
      <div>
        <Route exact path="/" component={App} />
        <Route path="/signin" component={Signin} />
        <Route path="/streaming" component={Streaming} />
      </div>
    </React.Fragment>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById("root"));
