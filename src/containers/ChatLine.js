import React from 'react';
import {v4 as uuid} from 'uuid';
import { ChatImage } from "../components/Image";
import { Label, Popup } from "semantic-ui-react";
import UserChatProfile from "../components/UserChatProfile";


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
    const textStyle = {
      fontFamily: "Arial",
      fontSize: 12,
      boxSizing: "border-box",
      wordBreak: "break-all",
      wordWrap: "break-word",
      whiteSpace: "pre-wrap",
    }

    const { messageObject, smiles } = this.props;
    const icon = smiles[messageObject.author.role_icon - 1]

    const message = this.state.splittedMessage.map(x => {
      if (x.match(/{{image\|\d+}}/g)) {
        x = <ChatImage data={smiles[parseInt(x.match(/\d+/g)) - 1]['image']}/>
      }
      return <span style={textStyle} key={uuid()}>{x} </span>
    });

    return (
      <div className='chatLine'>
        <span style={textStyle} className={'userName'}>
          <Popup
            position={"top center"}
            content={icon['description']}
            trigger={<span><ChatImage data={icon['image']}/></span>}
          />&nbsp;

          <UserChatProfile author={messageObject.author}/>
        </span>:&nbsp;

        {message}

        <Popup
          content={"Щелкните, чтобы ответить"}
          trigger={<Label as='a' className='reply' attached={"top right"} icon='reply' floating/>}
        />
      </div>
    );

  }
}