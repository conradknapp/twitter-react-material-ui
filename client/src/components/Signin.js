import React from "react";

class Signin extends React.Component {
  state = {
    isAuthenticated: false,
    user: null,
    token: "",
    error: ""
  };

  render() {
    return (
      <div>
        <a href="http://localhost:4000/auth/twitter">Signin</a>
      </div>
    );
  }
}

export default Signin;
