import React, { Component } from "react";
import Message from "./Message";
import { getMessages } from "./MessageFunctions";
import jwt_decode from "jwt-decode";

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center welcomeMsg">WELCOME TO YOUR FEED</h1>
          </div>
        </div>
        {/* <Publish reload={this.reload.bind(this)} /> */}
        <Message />
      </div>
    );
  }
}

export default Landing;
