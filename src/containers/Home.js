import React from 'react'
import {connect} from "react-redux";
import Chat from "./Chat";
import ReactHlsPlayer from 'react-hls-player'
import {
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
      
        <div className="headerback">
          <header className="headerWrraper">
            <nav className="menuVez">
              <div className="spacebet">
                <ul>
                  <li><a href="https://vezaks.com/">Главная</a></li>
                  <li><a href="https://vezaks.com/serialyi">Сериалы</a></li>
                  <li><a href="https://vezaks.com/filmyi">Фильмы</a></li>
                  <li className="last"><a rel="nofollow" href="https://vezaks.com/igryi">Игры</a></li>
                </ul>

                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                <a href="https://www.twitch.tv/vezaks" target="_blank">
                  <div className="streamon" data-description="$title">
                    <div className={"blink"}/>
                    Стрим онлайн
                  </div>
                </a>
              </div>
            </nav>
          </header>
        </div>
      
        <Menu>
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

        <div className="chatBox">
          <div className="playerBlock">
            <ReactHlsPlayer poster={"https://sun9-35.userapi.com/c849532/v849532312/15082b/efNn97HREgo.jpg"}
                            url='//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'
                            autoplay={false}
                            controls={true}
            />
            <h1>{this.state.title}</h1>
          </div>
          <div className="chatBlock">
            {(this.state.loading || !authenticated) ? 'Log-in to see chat' : <Chat chatID={this.state.chatID} active={this.state.active}/>}
          </div>
        </div>

        <div className="contentAbout">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href=""><div className="buttonDonate">Донат</div></a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href=""><div className="buttonDonate">Паблик </div></a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href=""><div className="buttonDonate">Расписание</div></a>
        </div>

        <div className="footer">
			    <span className="footerIconLeft">
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://vk.com/vezaks_club" className="vkfot" target="_blank"><i className={"fa fa-vk"}/></a>
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://www.youtube.com/channel/UC11Ubf7ynsXZN73PZR22KIg" className={"youfot"} target="_blank"><i className={"fa fa-youtube-play"}/></a>
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://www.twitch.tv/vezaks" target="_blank" className={"twifot"}><i className={"fa fa-twitch"}/></a>
       		</span>
          <hr className={"li-footer"}/>
          <span className={"footerIconRight"}>
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://vk.com/topic-91605072_37040046" className="bagfot" target="_blank"><i className={"fa fa-exclamation-triangle"}/>Баг-репорт</a>
        	</span>
        </div>

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