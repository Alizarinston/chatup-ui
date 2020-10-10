import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Hoc from "../hoc/hoc";

const roles = {
  3: "Администратор",
  2: "Модератор",
  4: "Стример",
  1: "Пользователь",
}

class Profile extends React.Component {

  render() {
    if (this.props.token === undefined) {
      return <Redirect to="/" />;
    }
    return (
      <div className="contact-profile">
        <br/><br/><br/>
        {this.props.username !== null ? (
          <Hoc>
            <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/f978fcd7-c028-4d02-8b64-bf9f468ecad3-profile_image-300x300.png" alt="" />
            <p>User ID: {this.props.userID}</p>
            <p>Username: {this.props.username}</p>
            <p>Role: {roles[this.props.roleID]}</p>
            <p>Watchtime: {this.props.watchtime}</p>
            <p>Username color: {this.props.username_color}</p>
          </Hoc>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    watchtime: state.auth.watchtime,
    username_color: state.auth.username_color,
    userID: state.auth.userID,
    roleID: state.auth.roleID,
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(Profile);