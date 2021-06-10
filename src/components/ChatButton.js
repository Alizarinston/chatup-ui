import React from 'react';

export class ChatButton extends React.Component {
  state = {
    active: false,
    hover: false,
  }

  handleHover = () => {
    this.setState({ hover: !this.state.hover })
  }

  handleChatButtonClick = () => {
    this.props.onChatClick()
  }

  handleChatButtonFocus = () => {
    this.setState({ active: true })
  }

  handleChatButtonBlur = () => {
    this.setState({ active: false })
  }

  render() {
    let styleHover = {}, styleActive = {};

    if (this.state.hover) {
      styleHover = {
        background: "rgb(125,91,190)",
        borderColor: "#7d5bbe",
        color: "#fff"
      }
    }

    if (this.state.active) {
      styleActive = {
        background: "#6441a4",
        borderColor: "#7d5bbe",
        boxShadow: "0px 0px 6px 0px #7d5bbe",
      }
    }

    const sendButton = {
      background: "#6441a4",
      bottom: 0,
      border: "1px solid transparent",
      borderRadius: 2,
      color: "#FFF",
      cursor: "pointer",
      height: 30,
      outline: "none",
      position: "absolute",
      right: 0,
      width: 40,
    };

    const sendButtonText = {
      textAlign: "center",
      fontFamily: "arial",
      fontSize: 12,
    };
    return (
      <button
        style={{ ...sendButton, ...styleHover, ...styleActive }}
        onClick={this.handleChatButtonClick}
        onFocus={this.handleChatButtonFocus}
        onBlur={this.handleChatButtonBlur}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
      >
        <span style={sendButtonText}>
          Chat
        </span>
      </button>
    )
  }
}