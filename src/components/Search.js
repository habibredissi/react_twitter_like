import React, { Component } from "react";
import {
  getMessages,
  deleteMessage,
  publishMessage,
  updateMessageApi,
  getHashTags,
  wrapHashtags,
  displayDate
} from "./MessageFunctions";
import jwt_decode from "jwt-decode";

class Search extends Component {
  constructor() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    super();
    this.state = {
      message: "",
      messages: [],
      userId: decoded._id,
      nbCaracters: 144,
      idUpdate: "",
      updateMessage: ""
    };
    if (localStorage.usertoken) {
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);
      getMessages(decoded._id).then(res => {
        this.setState({ messages: res.data.message });
      });
    }
  }
  render() {
    let messages = this.state.messages;
    var messageWithTheHashtag = [];
    messages.map(m => {
      var string = m.message,
        substring = "#" + this.props.match.params.hashtag;
      if (string.includes(substring)) {
        messageWithTheHashtag.push(m);
      }
    });
    return (
      <div className="container">
        {messageWithTheHashtag.map(m => {
          return (
            <div className="card my-4">
              <div className="card-header">@{m.first_name}</div>
              <div className="card-body">
                <h5 className="card-title">
                  #{this.props.match.params.hashtag}
                </h5>
                <p className="card-text">{m.message}</p>
              </div>
              <div className="card-footer text-muted">
                {displayDate(m.created)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Search;
