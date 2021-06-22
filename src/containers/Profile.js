import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {Button, Segment, Menu, Grid, Image} from "semantic-ui-react";
import UserImage from "../components/Image";
import {UploadImage} from "../components/UploadImage";

const roles = {
  3: "Администратор",
  2: "Модератор",
  4: "Стример",
  1: "Пользователь",
  5: "VIP"
}

class Profile extends React.Component {
  state = { activeItem: 'Профиль' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { token, userID, username, roleID, watchTime, usernameColor, images } = this.props
    const { activeItem } = this.state

    if (token === null) {
      return <Redirect to="/" />;
    }
    return (
      <div className="playerBox">
        <Segment style={{height: '927px'}}>
          <Menu pointing secondary>
            <Menu.Item
              name='Профиль'
              active={activeItem === 'Профиль'}
              onClick={this.handleItemClick}
            />

            <Menu.Item
              name='Статистика'
              active={activeItem === 'Статистика'}
              onClick={this.handleItemClick}
            />

            <Menu.Item
              name='Управление'
              active={activeItem === 'Управление'}
              onClick={this.handleItemClick}
            />

            <Menu.Menu position='right'>
              <Menu.Item>
                <Button basic active icon={'angle right'} onClick={() => {this.props.profileTab()}}/>
              </Menu.Item>
            </Menu.Menu>
          </Menu>

          <div className="contact-profile">
            <br/>
            <Grid celled>
              <Grid.Column width={4}>
                <Image src="https://static-cdn.jtvnw.net/jtv_user_pictures/panel-148316617-image-3036e147-20a6-490c-ae31-9cfa6cdd73ad" />
              </Grid.Column>

              <Grid.Column width={9}>
                <br/><br/><br/><br/>
                <p>ID пользователя: {userID}</p>
                <p>
                  Имя пользователя: <span style={{color: '#' + usernameColor}}>{username}</span>
                  {/*<ColorPicker color={'#' + usernameColor}/>*/}
                </p>
                <p>Статус: {roles[roleID]}</p>
                <p>Время просмотра: {watchTime} минут</p>
                <p> <UserImage data={images[0]['image']}/> </p>
                <UploadImage/>
              </Grid.Column>
            </Grid>
          </div>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    images: state.image.images,
    username: state.auth.username,
    watchTime: state.auth.watchTime,
    usernameColor: state.auth.usernameColor,
    userID: state.auth.userID,
    roleID: state.auth.roleID,
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(Profile);