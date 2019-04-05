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
import { Redirect } from "react-router-dom";

class Message extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      messages: [],
      userId: "",
      nbCaracters: 144,
      idUpdate: "",
      updateMessage: ""
    };

    if (localStorage.usertoken) {
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);

      getMessages(decoded._id).then(res => {
        this.setState({ messages: res.data.message, userId: decoded._id });
      });
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleDelete(message) {
    console.log(message._id);
    var array = [...this.state.messages]; // make a separate copy of the array
    var index = array.indexOf(message);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ messages: array });
    }
    deleteMessage(message._id);
  }

  onChange(e) {
    // console.log(e.target.name, e.target.value);
    if (e.target.name === "message") {
      this.setState({ nbCaracters: 144 - e.target.value.length });
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const message = {
      message: this.state.message
    };
    console.log(getHashTags(message));
    publishMessage(message).then(res => {
      getMessages(this.state.userId).then(res => {
        this.setState({ messages: res.data.message });
      });
    });
  }

  showUpdateDiv(m) {
    this.setState({ idUpdate: m._id });
  }

  handleUpdate = messageId => {
    let updateMessage = {
      message: this.state.updateMessage,
      messageId: messageId
    };
    updateMessageApi(updateMessage).then(res => {
      getMessages(this.state.userId).then(res => {
        this.setState({ messages: res.data.message });
      });
    });
    this.setState({ idUpdate: "" });
  };

  render() {
    if (!localStorage.usertoken) {
      return <Redirect to="/login" />;
    }
    let messages = this.state.messages;
    messages.sort(function(a, b) {
      return new Date(b.created) - new Date(a.created);
    });

    if (messages === undefined) {
      return <div>Chargement en cours...</div>;
    } else {
      return (
        <div>
          <div className="row">
            <div className="col-md-12 well divPublish">
              <form noValidate onSubmit={this.onSubmit}>
                <h2>
                  <small>Your tweet :</small>
                </h2>
                <textarea
                  maxLength="144"
                  onChange={this.onChange}
                  className="col-md-12"
                  name="message"
                  placeholder="What's on your mind ?"
                  rows="5"
                />
                <p className="form-text float-xs-right font-weight-bold">
                  {this.state.nbCaracters} characters remaining
                </p>
                <button
                  type="button"
                  className="btn btn-success font-weight-bold"
                  type="submit"
                >
                  Send your message
                </button>
              </form>
            </div>
          </div>

          {messages.map(m => {
            return (
              <div className="">
                <div
                  className="card messageDiv my-4"
                  style={{
                    display: m._id === this.state.idUpdate ? "none" : "block"
                  }}
                >
                  <div className="card-header font-weight-bold">
                    @{m.first_name}
                  </div>
                  <div className="card-body">
                    {/* <h5 className="card-title">#Hashtag</h5> */}
                    <p
                      className="card-text"
                      dangerouslySetInnerHTML={{
                        __html: wrapHashtags(m.message)
                      }}
                    />
                    <button
                      href="#"
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(m)}
                      style={{
                        display: m.userId === this.state.userId ? "" : "none"
                      }}
                    >
                      Delete
                    </button>
                    <button
                      href="#"
                      className="btn btn-secondary m-2"
                      onClick={() => this.showUpdateDiv(m)}
                      style={{
                        display: m.userId !== this.state.userId ? "none" : ""
                      }}
                    >
                      Update
                    </button>
                  </div>
                  <div className="card-footer text-muted">
                    {displayDate(m.created)}
                  </div>
                </div>

                <div
                  className="updateDiv"
                  style={{
                    display: m._id === this.state.idUpdate ? "block" : "none"
                  }}
                >
                  <textarea
                    maxLength="144"
                    onChange={this.onChange}
                    className="col-md-12"
                    name="updateMessage"
                    rows="5"
                    placeholder={m.message}
                  />
                  <br />
                  <button
                    onClick={() => this.handleUpdate(m._id)}
                    className="btn btn-success my-2"
                  >
                    Confirm
                  </button>
                </div>
              </div>
              // <li key={m._id}>
              //   <div
              //     className="messageDiv"
              //     style={{
              //       display: m._id === this.state.idUpdate ? "none" : "block"
              //     }}
              //   >
              //     {m.message}
              //     <button
              //       className="btn btn-danger m-2"
              //       onClick={() => this.handleDelete(m)}
              //     >
              //       Delete
              //     </button>
              //     <button
              // className="btn btn-secondary m-2"
              // onClick={() => this.showUpdateDiv(m)}
              // style={{
              //   display: m.userId !== this.state.userId ? "none" : ""
              // }}
              //     >
              //       Update
              //     </button>
              //   </div>

              // <div
              //   className="updateDiv"
              //   style={{
              //     display: m._id === this.state.idUpdate ? "block" : "none"
              //   }}
              // >
              //   <textarea
              //     maxLength="144"
              //     onChange={this.onChange}
              //     className="col-md-12"
              //     name="updateMessage"
              //     rows="5"
              //     placeholder={m.message}
              //   />
              //   <br />
              //   <button
              //     onClick={() => this.handleUpdate(m._id)}
              //     className="btn btn-success my-2"
              //   >
              //     Confirm
              //   </button>
              // </div>
              // </li>
            );
          })}
        </div>
      );
    }
  }
}

export default Message;
