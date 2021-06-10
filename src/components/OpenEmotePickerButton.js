import React from 'react';

export class OpenEmotePickerButton extends React.Component {
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
    this.props.onOpenEmotePickerButtonClick();
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
      borderColor: "transparent",
      color: "#6e6779",
      cursor: "pointer",
      height: 30,
      outline: "none",
      position: "absolute",
      right: 0,
      top: 0,
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
        <img alt={'error'} src="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABgElEQVR4nJXUzUrDQBDA8f/sJvWk/dKrFxEVL3rwicRXEERaD0UQBO/qk+grePFsKYoe/UirFz+6Ox42aaNtbJ0QWMLsLzO7m8hdfLFtMEeKzivKf0LC9ejxe3IbXzzH2Fof9y8kC4ulj0sii/xEFPATKjMCEoYOh0Wqkc+3o+E2C6VB4kgo+KevrDcAPEr0I6fvmN1ZpHK4jJjxknqlu9/m7fweie3g+QDSL8/MVoXq8QqmHI1Fsqger/B5/crHVQ+JTeg2NKqYekz9dH0iAmDKEfWzdUw9BqcppIGrnaxS2pybiGRR2pijdrIWStGsIsA9fEyNDOe8D6sMKy8kjRt6rc7USK/VIWncAOEohIoExAhJsz0V1mt1SJrtsLPp5g5X1ggCJM02AOXG0t+IlXAw+Q1NgRUho9AvTIFKinVbHboFyHgoh3UP0on5ccGJl/v4Un3R7yP/AecWduS9CMapJhY7PkNS4A8kwuLQF+PF7yr6KEWZQiEiCB59Etj9BtckjzQuAeozAAAAAElFTkSuQmCC" />
      </button>
    )
  }
}