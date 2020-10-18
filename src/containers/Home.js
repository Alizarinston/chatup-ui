import React from 'react'
import {connect} from "react-redux";
import Chat from "./Chat";
import ReactHlsPlayer from 'react-hls-player'
import {
  Grid,
  GridColumn,
  GridRow,
  Segment,
  Modal,
  Container,
  Menu
} from 'semantic-ui-react'
import axios from "axios";
import {HOST_URL} from "../settings";
import { Link } from "react-router-dom";
import { logout } from "../store/actions/auth";

import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";

class HomepageLayout extends React.Component {
  state = {
    loading: true
  }

  componentDidMount() {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.withCredentials = true

    axios.get(`${HOST_URL}/api/broadcasts/`, { headers: {
        "Content-Type": "application/json"
      }, params: {limit: 1, is_active: true} })
      .then(res => {
        this.setState({
          loading: false,
          chatID: res.data.result[0].id,
          title: res.data.result[0].title,
          active: res.data.result[0].is_active,
        })
      }).catch(() => {
        axios.get(`${HOST_URL}/api/broadcasts/`, { headers: {
            "Content-Type": "application/json"
          }, params: {limit: 1} })
          .then(res => {
            this.setState({
              loading: false,
              chatID: res.data.result[0].id,
              title: res.data.result[0].title,
              active: res.data.result[0].is_active,
            })
          }).catch(err => console.log("error " + err))
      });
  }

  render() {
    const { authenticated, username } = this.props;

    return (
      <div>

        <Menu fixed="top" inverted size={"large"}>
          <Container>
            {authenticated ? (
              <React.Fragment>
                <Link to="/">
                  <Menu.Item header>Home</Menu.Item>
                </Link>
                <Modal
                  trigger={<Menu.Item header>Profile</Menu.Item>}
                  content={<Profile/>}
                />
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
                <Menu.Item header onClick={() => this.props.logout()}>
                  Logout
                </Menu.Item>
              </Menu.Menu>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Modal
                trigger={<Menu.Item header>Login</Menu.Item>}
                content={<Login/>}
                dimmer={"blurring"}
                basic={true}
              />
              <Modal
                trigger={<Menu.Item header>Signup</Menu.Item>}
                content={<Signup/>}
                dimmer={"blurring"}
                basic={true}
              />
            </React.Fragment>
          )}

        </Menu>

        <br/><br/>

        <Grid divided celled={true}>
          <GridRow>
            <GridColumn width={12}>
              <Segment compact={false}>
                <ReactHlsPlayer poster={"https://sun9-35.userapi.com/c849532/v849532312/15082b/efNn97HREgo.jpg"}
                                url='//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'
                                autoplay={false}
                                controls={true}
                                width={1370}
                                height={740}
                />
                <h1>{this.state.title}</h1>
              </Segment>
            </GridColumn>
            <GridColumn width={4}>
              <Segment>
                {(this.state.loading || !authenticated) ? 'Log-in to see chat' : <Chat chatID={this.state.chatID} active={this.state.active}/>}
              </Segment>
            </GridColumn>
          </GridRow>
        </Grid>

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
    token: state.auth.token,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomepageLayout);