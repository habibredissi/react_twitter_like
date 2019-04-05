import React, { Component } from "react";
import { publishMessage } from "./MessageFunctions";

class Publish extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      nbCaracters: 144
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
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

    publishMessage(message).then(res => {
      console.log("message created!");
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 well">
            <form noValidate onSubmit={this.onSubmit}>
              <h2>
                <small>Your tweet :</small>
              </h2>
              <textarea
                maxLength="144"
                onChange={this.onChange}
                className="col-md-12"
                id="message"
                name="message"
                placeholder="What's on your mind ?"
                rows="5"
              />
              <p className="form-text float-xs-right">
                {this.state.nbCaracters} characters remaining.
              </p>
              <button type="button" className="btn btn-primary" type="submit">
                Send your message
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Publish;
