import React from 'react';

import {ChatContent} from '../components/ChatContent';
import {InputBlock} from '../components/InputBlock';

import { connect } from "react-redux";
import WebSocketInstance from "../websocket";
import { fetchMessages } from "../store/actions/message";
import { MeteorRainLoading } from 'react-loadingg';
 

class ChatRoom extends React.Component {
  state = {
    smiles: [],
  }

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

  renderMessages = messages => {
    return messages.map((message) => (
      {
        author: message.author,
        text: message.text,
        id: message.id,
      }
    ));
  };

  componentDidMount() {
    this.renderMessages(this.props.messages)
  }

  componentWillUnmount() {
    if (WebSocketInstance.socketRef) {
      WebSocketInstance.disconnect();
    }
  }

  handleSendMessage = (message) => {
    const messageObject = {
      content: message
    };
    WebSocketInstance.newChatMessage(messageObject);
  }

  render() {
    const { messages, images, active } = this.props;

    const chatRoomStyle = {
      // width: 340,
      paddingLeft: "15px",
      background: "#EFEEF1",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      position: "relative",
    };

    return (
      <div style={chatRoomStyle}>
        {messages.length === 0 ? <MeteorRainLoading/> :  // color={'#6441a5'}
          <>
            <ChatContent
              chatLines={this.renderMessages(messages)}
              smiles={images}
            />

            {active ?
              <InputBlock
                onChatClick={this.handleSendMessage}
                smiles={images}
              /> : 'This stream is offline'
            }
          </>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.message.messages,
    images: state.image.images
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: (chatID) => dispatch(fetchMessages(chatID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);