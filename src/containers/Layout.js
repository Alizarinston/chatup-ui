import React from "react";
import {
  Container,
  Menu,
  Segment
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";

const roles = {
  3: "Администратор",
  2: "Модератор",
  4: "Стример",
  1: "Пользователь",
}

class CustomLayout extends React.Component {

  render() {
    const { authenticated, username, roleID } = this.props;

    return (
      <div>
        <Menu fixed="top" inverted size={"large"}>
          <Container>
            {authenticated ? (
              <React.Fragment>
                <Link to="/">
                  <Menu.Item header>Home</Menu.Item>
                </Link>
                <Link to="/profile/">
                  <Menu.Item header>Profile</Menu.Item>
                </Link>
              </React.Fragment>
            ) : (<Link to="/">
              <Menu.Item header>Home</Menu.Item>
            </Link>)}
            {authenticated ? (
              <React.Fragment>

                <Link to="/swagger/">
                  <Menu.Item header>API</Menu.Item>
                </Link>

              </React.Fragment>
            ) : (
              <React.Fragment>

                <Link to="/swagger/">
                  <Menu.Item header>API</Menu.Item>
                </Link>

              </React.Fragment>
            )}
          </Container>

          {authenticated ? (
            <React.Fragment>
              <Menu.Menu position={'right'}>
                <Menu.Item>
                  {username}
                </Menu.Item>
                <Menu.Item>
                  {roles[roleID]}
                </Menu.Item>
                <Menu.Item header onClick={() => this.props.logout()}>
                  Logout
                </Menu.Item>
              </Menu.Menu>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link to="/login">
                <Menu.Item header>Login</Menu.Item>
              </Link>
              <Link to="/signup">
                <Menu.Item header>Signup</Menu.Item>
              </Link>
            </React.Fragment>
          )}

        </Menu>

        {this.props.children}

        <Segment
          inverted
          vertical
          style={{ margin: "0em 0em 0em", padding: "2.8em 0em" }}
        >
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null,
    username: state.auth.username,
    roleID: state.auth.roleID
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);

