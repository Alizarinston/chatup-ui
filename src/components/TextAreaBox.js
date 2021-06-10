import React from 'react';
import ContentEditable from 'react-contenteditable'

export class TextAreaBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      html: "",
      focus: false
    };
  }

  keyPress(event) {
    if(event.charCode === 13) {  // Enter
      event.preventDefault();
      this.props.onChatClick();
    }
  }

  handleTextAreaFocus = () => {
    this.setState({ focus: true })
  }

  handleTextAreaBlur = () => {
    this.setState({ focus: false })
  }


  render() {
    let focusStyle = {};

    if (this.state.focus) {
      focusStyle = {
        boxShadow: "0 0 6px -2px #7d5bbe",
        borderColor: "#7d5bbe",
      }
    }

    const textAreaBoxStyle = {
      position: "absolute",
      width: "100%",
      boxSizing: "border-box",
      outline: "none",
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5,
      paddingBottom: 5,
      resize: "none",
      borderRadius: 2,
      // borderColor: "rgb(218,216,222)",
    };

    return (
      // <textarea
      //   contentEditable={true}
      //   style={{ ...textAreaBoxStyle, ...focusStyle, ...this.props.style }}
      //   placeholder={this.props.placeholder}
      //   onChange={this.props.onChange}
      //   value={this.props.value}
      //   onFocus={this.handleTextAreaFocus}
      //   onBlur={this.handleTextAreaBlur}
      // />
      <ContentEditable
        ref="textarea"
        innerRef={this.contentEditable}
        html={this.props.value} // innerHTML of the editable div
        disabled={false}       // use true to disable editing

        style={{ ...textAreaBoxStyle, ...focusStyle, ...this.props.style, whiteSpace: 'pre-wrap' }}
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
        onFocus={this.handleTextAreaFocus}
        onBlur={this.handleTextAreaBlur}
        onKeyPress={this.keyPress.bind(this)}
      />
    )
  }
}