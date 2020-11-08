import React from "react";
import { connect } from "react-redux";
import Hoc from "../hoc/hoc";
import { Input, List, Image, Icon, Label, Dropdown } from 'semantic-ui-react'
import WebSocketInstance from "../websocket";
import { fetchMessages } from "../store/actions/message";

/**
 * @return {string}
 */
function NumScroll(num) {
  if (num > 16) {
    return 'scroll'
  } else {return 'null'}
}

class Chat extends React.Component {
  state = { message: "" };

  initialiseChat() {
    this.props.fetchMessages(this.props.chatID)
    if (this.props.active) {
      WebSocketInstance.connect(this.props.chatID);
    }
  }

  constructor(props) {
    super(props);
    this.initialiseChat();
  }

  messageChangeHandler = event => {
    this.setState({ message: event.target.value });
  };

  sendMessageHandler = e => {
    e.preventDefault();
    const messageObject = {
      content: this.state.message
    };
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({ message: "" });
  };

  renderMessages = messages => {
    return messages.map((message) => (
      <List.Item key={message.id}>
        <Image avatar src='https://static-cdn.jtvnw.net/jtv_user_pictures/panel-148316617-image-3036e147-20a6-490c-ae31-9cfa6cdd73ad' />
        <List.Content>
          <List.Header as='a'>{message.author.username}</List.Header>
          <List.Description>
            {message.text}
            <br />
          </List.Description>
        </List.Content>
      </List.Item>


    ));
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    if (WebSocketInstance.socketRef) {
      WebSocketInstance.disconnect();
    }
  }

  render() {
    return (
      <Hoc>
        <div className="messages">

          <div className="chatHeader">
            <Label basic={true}>
              <Icon name='users' /> {this.props.watchers}
            </Label>

                <Dropdown text='marstvi' pointing className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item>Home Goods</Dropdown.Item>
                    <Dropdown.Item>Bedroom</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Header>Order</Dropdown.Header>
                    <Dropdown.Item>Status</Dropdown.Item>
                    <Dropdown.Item>Cancellations</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
          </div>

          <List relaxed style={{height: '80%', overflowY: NumScroll(17)}}>

            <List.Item>
              <Image avatar src='data:image/png;base64,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' />
              <List.Content>
                <List.Header as='a'>Test</List.Header>
                <List.Description>
                  Как вам{' '}
                  <a href={"https://react.semantic-ui.com/"}>
                    <b>Semantic UI React</b>
                  </a>?
                  Вроде ничего.
                </List.Description>
              </List.Content>
            </List.Item>

            <List.Item>
              <Image avatar src='https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/3' />
              <List.Content>
                <List.Header as='a'>marstvi</List.Header>
                <List.Description>
                  Мне больше нравится {' '}
                  <a href={"https://material-ui.com/ru//"}>
                    <b>Material-UI</b></a> или тот же{' '}
                  <a href={"https://github.com/react-bootstrap/react-bootstrap"}>
                    <b>Bootstrap</b></a>.
                </List.Description>
              </List.Content>
            </List.Item>

            <List.Item>
              <Image avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTyxlcQ5PY2EARmYr40DfRwP7xwV-qhy3yMuA&usqp=CAU' />
              <List.Content>
                <List.Header as='a'>Max_of_Shadows</List.Header>
                <List.Description>
                  Неплохо бы поучить{' '}
                  <a href={"https://reactjs.org/"}>
                    <b>React</b></a>{', '}
                  популярный фреймворк.
                </List.Description>
              </List.Content>
            </List.Item>

            <List.Item>
              <Image avatar src='https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/3' />
              <Image avatar src='https://static-cdn.jtvnw.net/badges/v1/f9cc2879-ab6f-4c6a-94b9-5a414822b0dd/3' />
              <List.Content>
                <List.Header as='a'>Vezaks</List.Header>
                <List.Description>
                  Элитное сообщество.
                </List.Description>
              </List.Content>
            </List.Item>

          {this.props.messages && this.renderMessages(this.props.messages)}

          <div
            ref={el => {
              this.messagesEnd = el;
            }}
          />

          </List>
        </div>

        <div className="message-input">
          {this.props.active ?
            <form autoComplete="off" onSubmit={this.sendMessageHandler}>
              <div className="wrap">
                <Input
                  onChange={this.messageChangeHandler}
                  value={this.state.message}
                  required
                  id="chat-message-input"
                  type="text"
                  placeholder="Write your message..."
                  fluid={true}
                />
              </div>
            </form> : 'This stream is offline'
          }
        </div>

      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.message.messages,
    watchers: state.message.watchers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: (chatID) => dispatch(fetchMessages(chatID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);