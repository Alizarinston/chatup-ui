import React from 'react';
import {v4 as uuid} from 'uuid';
import MessageImage from "../components/Image";


export class ChatLine extends React.Component {
  state = {
    messageAndSmiles: [],
    splittedMessage: [],
  }

  componentDidMount() {
    // const splittedM = this.props.messageObject.text.split(/(?!\{.*)\s(?![^(]*?\})/g).filter(x => x.length > 0);
    const splittedM = this.props.messageObject.text.split(' ').filter(x => x.length > 0);

    this.setState({
      splittedMessage: splittedM,
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.test();
  }

  render() {
    const chatLineStyle = {
      paddingLeft: 20,
      paddingTop: 5,
      paddingRight: 20,
      paddingBottom: 5,
    }

    const textStyle = {
      fontFamily: "Arial",
      fontSize: 12,
      boxSizing: "border-box",
      wordBreak: "break-all",
      wordWrap: "break-word",
      whiteSpace: "pre-wrap",

    }

    const message = this.state.splittedMessage.map(x => {
      if (x.match(/{{image\|\d+}}/g)) {
        x = <MessageImage data={this.props.smiles[parseInt(x.match(/\d+/g)) - 1]['image']}/>
      }
      return <span style={textStyle} key={uuid()}>{x} </span>
    });

    return (
      <div style={chatLineStyle}>
        <span style={textStyle}><b>{this.props.messageObject.user}: </b></span>{message}
      </div>
    );

  }
}