import React from 'react';
import {Icon} from "semantic-ui-react";

export class OpenUserNameConfigButton extends React.Component {
  state = {
    hover: false,
    active: false,
  }

  handleHover = () => {
    this.setState({ hover: !this.state.hover })
  }

  handleButtonFocus = () => {

    this.setState({ active: true })
  }

  handleButtonBlur = () => {
    this.setState({ active: false })
  }

  handleButtonClick = () => {
    this.props.onOpenUserNameConfigButtonClick();
  }

  render() {
    let styleHover = {}, styleActive = {};

    if (this.state.hover) {
      styleHover = {
        background: "rgba(100,65,164,.05)",
        color: "#2c2541",
      }
    }

    if (this.state.active) {
      styleActive = {
        background: "transparent",
        borderColor: "rgba(100,65,164,.6)",
        boxShadow: "0 0 6px 0 #7d5bbe",
        color: "#2c2541",
      }
    }

    const openEmotePickerButtonStyle = {
      background: "transparent",
      border: "1px solid",
      borderRadius: 2,
      borderColor: "grey",
      color: "#6e6779",
      cursor: "pointer",
      height: 30,
      outline: "none",
      position: "relative",
      right: -10,
      top: 10,
      width: 30,
    }

    return (
      <button
        style={{ ...openEmotePickerButtonStyle, ...styleHover, ...styleActive }}
        onClick={this.handleButtonClick}
        onFocus={this.handleButtonFocus}
        onBlur={this.handleButtonBlur}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
      >
        <Icon name={"star outline"} fitted/>
      </button>
    )
  }
}