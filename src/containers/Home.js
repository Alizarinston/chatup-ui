import React from 'react'
import {connect} from "react-redux";
import Chat from "./Chat";
import ReactHlsPlayer from 'react-hls-player'
import {
  Modal,
  Menu,
  Icon
} from 'semantic-ui-react'
import axios from "axios";
import {HOST_URL} from "../settings";
import { logout } from "../store/actions/auth";

import Login from "./Login";
import Signup from "./Signup";

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

                <a href="https://www.twitch.tv/vezaks" target="_blank" rel="nofollow">
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
        <Menu>
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

        <div className="playerBox">
            <ReactHlsPlayer poster={"https://sun9-35.userapi.com/c849532/v849532312/15082b/efNn97HREgo.jpg"}
                            url='//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'
                            autoplay={false}
                            controls={true}
                            height={'85%'}
                            className="videoPlayer"
            />
            <div className="contentStream">
            <h1>{this.state.title}</h1>

              <div className="flex-block">
                <div className="timetable" style={{width: '71%', marginRight: '20px'}}>
                  <h4>📋 Обновленное расписание от 7.11.2020</h4>
                  <div className="timetable-content">
                    7.11 - Суббота: Inuyashiki (экстра) 🏁 - Ведьмак 3<br />
                    8.11 - Воскресенье: БАСКЕТБОЛ КУРОКО - Monogatari (пересмотр) - MANDALORIAN<br />
                    9.11 - Понедельник: Hunter X Hunter (пересмотр) - Мой Аджосси (экстра)<br />
                    10.11 - Вторник: Golden Kamuy (пересмотр) - Oyasumi Punpun (манга)<br />
                    11.11 - Среда: Первый шаг - Твин Пикс<br />
                    12.11 - Четверг: Нарко (экстра) - Мой Аджосси (экстра)<br />
                    13.11 - Пятница: Озарк (экстра) - Карточный Домик (экстра)<br />
                    14.11 - Суббота: Корона - Патрик Мелроуз (экстра)<br />
                    15.11 - Воскресенье: Индиана Джонс и Храм судьбы (фильм, 1984) - Индиана Джонс и последний крестовый поход (фильм, 1989)<br />
                    16.11 - Понедельник: Страсть (фильм, 1969) - Kara no Kyoukai (фильмы 2-3)<br />
                    17.11 - Вторник: Про Федота-стрельца, удалого молодца (фильм, 1988) - Советские анимационные короткометражки (экстра) - Человек с Земли (фильм, 2007)<br/>
                    <p>Очередь по сериалам: Haikyuu - Getter Robo - Острые Козырьки - Пингвиний Барабан</p>
                    </div>
                </div>

                <div className="timetable" style={{width: '29%'}}>
                  <h4>🏆 Топ донатеров</h4>
                  <div className="timetable-content">
                    daniloo - 11600<br />
                    кефирнн - 8000<br />
                    хролло - 8000<br />
                    Jino_90 - 6000<br />
                    stradallisa - 3650<br />
                    richard - 3650<br />
                    Max_of_Shadows - 3500<br />
                    alexado - 3100<br />
                    kvincius - 3000<br />
                    влад, сын сварога - 1800<br />
                  </div>
                </div>
              </div>

              <div className="soc-button">
              <a href="" target="_blank" rel="nofollow" className="stream-button" style={{color:'#252525'}}><Icon name='money' size='large' style={{marginRight:'10px'}}/>Задонатить</a>
              <a href="" target="_blank" rel="nofollow" className="stream-button" style={{color:'#4A76A8'}}><Icon name='vk' size='large'/> Группа Вк</a>
              <a href="" target="_blank" rel="nofollow" className="stream-button" style={{color:'#FF0000'}}><Icon name='youtube' size='large'/> Ютуб</a>
              </div>
            </div>

        </div>

            {(this.state.loading || !authenticated) ? 'Log-in to see chat' : <Chat chatID={this.state.chatID} active={this.state.active}/>}

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