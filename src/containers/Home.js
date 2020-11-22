import React from "react"
import { connect } from "react-redux";
import ReactHlsPlayer from 'react-hls-player'
import { Icon, Loader } from 'semantic-ui-react'
import axios from "axios";

import Chat from "./Chat";
import { HOST_URL } from "../settings";
import ChatHeader from "./ChatHeader";
import AuthForm from "../components/AuthForm"
import TabDonations from "../components/TabDonations"
import TabDescription from "../components/TabDescription"
import Profile from "./Profile";

class HomepageLayout extends React.Component {
  state = {
    loading: true,
    profile: false
  }

  profileTab = () => {
    this.setState(state => ({
      profile: !state.profile
    }))
  }

  componentDidMount() {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";

    axios.get(`${HOST_URL}/api/broadcasts/`, {
      headers: { "Content-Type": "application/json" },
      params: { limit: 1, is_active: true }
    })
      .then(res => {
        this.setState({
          loading: false,
          chatID: res.data.result[0].id,
          title: res.data.result[0].title,
          active: res.data.result[0].is_active,
        })
      }).catch(() => {
        axios.get(`${HOST_URL}/api/broadcasts/`, {
          headers: { "Content-Type": "application/json" },
          params: { limit: 1 }
        })
          .then(res => {
            this.setState({
              loading: false,
              chatID: res.data.result[0].id,
              title: res.data.result[0].title,
              active: res.data.result[0].is_active
            })
          })
          .catch(err => console.log("error " + err))
      });
  }

  render() {
    const { active, chatID, loading, title, profile } = this.state
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

                <a href="https://www.twitch.tv/vezaks" target="_blank" rel="noopener noreferrer">
                  <div className="streamon" data-description="$title">
                    <div className={"blink"}/>
                    Стрим онлайн
                  </div>
                </a>
              </div>
            </nav>
          </header>
        </div>

        <hr className="line-opacity"/>
        <div className="playerBox">

          {
            (profile) ? <Profile profileTab={this.profileTab}/> :
              <React.Fragment>
                <ReactHlsPlayer poster={"https://sun9-35.userapi.com/c849532/v849532312/15082b/efNn97HREgo.jpg"}
                                url='//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'
                                autoplay={false}
                                controls={true}
                                height={'85%'}
                                className="videoPlayer"
                />

                <div className="contentStream">
                  <h1>{title}</h1>

                  <div className="flex-block">
                    <TabDescription/>
                    <TabDonations/>
                  </div>

                  <div className="soc-button">
                    <a href="/#" target="_blank" rel="nofollow" className="stream-button" style={{color:'#252525'}}><Icon name='money' size='large' style={{marginRight:'10px'}}/>Задонатить</a>
                    <a href="/#" target="_blank" rel="nofollow" className="stream-button" style={{color:'#4A76A8'}}><Icon name='vk' size='large'/> Группа Вк</a>
                    <a href="/#" target="_blank" rel="nofollow" className="stream-button" style={{color:'#FF0000'}}><Icon name='youtube' size='large'/> Ютуб</a>
                  </div>
                </div>

              </React.Fragment>
          }

        </div>

        {
          (!this.props.isAuthenticated) ? <AuthForm/> :
            (loading) ?
              <React.Fragment>
                  <div className="messages">
                    <Loader active size={"big"} style={{height: '200px'}}/>
                  </div>
                  <div className="chatHeader" style={{height: '53px'}}/>
              </React.Fragment>
              :
              <React.Fragment>
                <Chat chatID={chatID} active={active}/>
                <ChatHeader chatID={chatID} profileTab={this.profileTab}/>
              </React.Fragment>
        }

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(HomepageLayout);