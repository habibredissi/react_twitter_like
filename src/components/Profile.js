import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { deleteUser, updateUser } from "./UserFunctions";
import swal from "sweetalert2";
import { Redirect } from "react-router-dom";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      first_name: "",
      last_name: "",
      email: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onDelete(e) {
    deleteUser(this.state.userId).then(res => {
      localStorage.removeItem("usertoken");
      this.props.history.push(`/`);
    });
  }

  onUpdate(e) {
    updateUser(this.state).then(res => {
      if (res) {
        console.log("User updated!");
        let test = swal({
          title: "Update!",
          text: "Your profile has been updated !",
          type: "success",
          confirmButtonText: "Ok",
          showCancelButton: true
        });
        console.log(test);
      }
    });
  }

  componentDidMount() {
    if (localStorage.usertoken) {
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);
      this.setState({
        first_name: decoded.first_name,
        last_name: decoded.last_name,
        email: decoded.email,
        userId: decoded._id
      });
    }
  }

  render() {
    if (!localStorage.usertoken) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container profileFirst">
        <div className="jumbotron mt-5 profileSecond">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>First Name</td>
                <td>
                  {/* {this.state.first_name} */}
                  <input
                    name="first_name"
                    type="text"
                    value={this.state.first_name}
                    onChange={this.onChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>
                  {/* {this.state.last_name} */}
                  <input
                    name="last_name"
                    type="text"
                    value={this.state.last_name}
                    onChange={this.onChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  {/* {this.state.email} */}
                  <input
                    name="email"
                    type="text"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button
            className="btn btn-primary"
            onClick={this.onUpdate.bind(this)}
          >
            Update
          </button>
        </div>
        <button className="btn btn-danger" onClick={this.onDelete.bind(this)}>
          Delete user
        </button>
      </div>
    );
  }
}

export default Profile;
