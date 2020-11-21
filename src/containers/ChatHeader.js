import React from "react";
import { connect } from "react-redux";
import { Button, Dropdown, Icon, Image, List, Search } from "semantic-ui-react";
import { logout } from "../store/actions/auth";
import { fetchWatchers } from "../store/actions/message";

const rolesAdapt = {
  'streamer': 'Стример',
  'administrator': 'Администраторы',
  'moderator': 'Модераторы',
  'vip': 'VIP',
  'user': 'Пользователи',
}

class ChatHeader extends React.Component {
  state = {
    usersList: false
  };

  usersList = () => {
    this.setState(state => ({
      usersList: !state.usersList
    }))

    if (!this.state.usersList) {
      this.props.fetchWatchers(this.props.chatID)
    }
  }

  render() {
    const { username, watchersCount, watchers } = this.props;

    return (
      <>
        { (this.state.usersList) ? (
          <div className="messages">
            <List>
              {/* TODO: для Search сделать отдельный функциональный компонент */}
              <br/>
                <Search style={{textAlign: 'center'}}/>
              <br/>

              {Object.keys(watchers).map((role, i) =>
                <List.Item key={i}>
                  <List.Header content={rolesAdapt[role]} />

                  <List>
                    {watchers[role].map((user) => (
                      <List.Item
                        key={user.id}
                        content={user.username}
                        className='userLink'
                        style={{color: '#6441a5'}}
                        as='a'
                      />
                    ))}
                  </List>

                  <br/>
                </List.Item>
              )}
            </List>

          </div> ) : <div/> }

        <div className="chatHeader">
          <Button
            content={watchersCount}
            onClick={this.usersList}
            icon={'users'}
            basic
            compact
          />

          <Dropdown
            trigger={
              <span>
                <Image avatar src='https://static-cdn.jtvnw.net/jtv_user_pictures/panel-148316617-image-3036e147-20a6-490c-ae31-9cfa6cdd73ad' />
                {username}
              </span>
            }
            pointing='top right'
            icon={"dropdown"}
            style={{
              float: 'right', height: '38px', margin: '-5px 10px 0 0',
              padding: '8px 11px 0 11px', background: '#EFEFEF',
              fontWeight: 'normal', fontSize: '14px', borderRadius: '13px'
            }}
          >
            <Dropdown.Menu>
              <Dropdown.Item>
                <Icon name='user'/>
                Аккаунт
              </Dropdown.Item>

              <Dropdown.Item>
                <Icon name='settings'/>
                Настройки
              </Dropdown.Item>

              <Dropdown.Item onClick={() => this.props.logout()}>
                <Icon name='sign out'/>
                Выход
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    watchersCount: state.message.watchersCount,
    watchers: state.message.watchers,
    username: state.auth.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    fetchWatchers: (chatID) => dispatch(fetchWatchers(chatID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);