import React, { Component } from "react";
import { userList, followUser, unfollowUser, blockUser } from "./UserFunctions";
import jwt_decode from "jwt-decode";
import { Link, withRouter } from "react-router-dom";
import SweetAlert from "sweetalert2-react";
import swal from "sweetalert2";

class Users extends Component {
  constructor() {
    super();
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.state = {
      first_name: decoded.first_name,
      users: [],
      userId: decoded._id,
      followers: [],
      following: [],
      blocked: []
    };

    userList().then(res => {
      this.setState({ users: res.data.users });
      this.state.users.map(u => {
        if (u._id === decoded._id) {
          this.setState({ following: u.following, blocked: u.blocked });
        }
      });
    });
  }

  handleFollow(userId, followingUser) {
    followUser(userId, followingUser);
    let following = [...this.state.following];
    following.push(followingUser);
    this.setState({ following: following });
  }

  handleUnfollow(userId, followingUser) {
    unfollowUser(userId, followingUser);
    let array = [...this.state.following]; // make a separate copy of the array
    let index = array.indexOf(followingUser);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ following: array });
    }
  }

  handleBlock(user, block) {
    blockUser(user, block);
    let blocked = [...this.state.blocked, block];
    this.setState({ blocked: blocked });
    swal({
      title: "Warning!",
      text: "Le blocage d'un user est définitif !",
      type: "warning",
      confirmButtonText: "Ok"
    });
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron welcomeDiv">
          <h1 className="display-4">Hello, {this.state.first_name}!</h1>
          <p className="lead">
            Here is the list of all users ! Enjoy following or unfollowing them.
          </p>
          <hr className="my-1" />
          <p>You can edit your profile</p>

          <Link to="/profile" className="btn btn-success btn-lg">
            Edit
          </Link>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {this.state.users.map(u => {
              return (
                <div
                  className="card my-2"
                  key={u._id}
                  style={{
                    display:
                      u._id === this.state.userId ||
                      this.state.blocked.indexOf(u._id) > -1
                        ? "none"
                        : "block"
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">@{u.first_name}</h5>
                    <p className="card-text">Bio descript : Hello World !</p>
                    <a
                      href="#"
                      onClick={() =>
                        this.handleFollow(this.state.userId, u._id)
                      }
                      className="btn btn-primary mx-2"
                      style={{
                        display:
                          this.state.following.indexOf(u._id) > -1 ? "none" : ""
                      }}
                    >
                      Follow
                    </a>
                    <a
                      onClick={() =>
                        this.handleUnfollow(this.state.userId, u._id)
                      }
                      href="#"
                      className="btn btn-secondary mx-2"
                      style={{
                        display:
                          this.state.following.indexOf(u._id) > -1 ? "" : "none"
                      }}
                    >
                      Unfollow
                    </a>
                    <a
                      onClick={() => this.handleBlock(this.state.userId, u._id)}
                      className="btn btn-danger text-white mx-2"
                    >
                      Block
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
