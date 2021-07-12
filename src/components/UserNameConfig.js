import React, { Component } from 'react'
import { Button, Header, Segment, Portal } from 'semantic-ui-react'
import {OpenUserNameConfigButton} from "./OpenUserNameConfigButton";
import {connect} from "react-redux";

class UserNameConfig extends Component {
  state = { open: false }

  handleClose = () => this.setState({ open: false })
  handleOpen = () => this.setState({ open: true })

  render() {
    const { open } = this.state
    const { username, usernameColor } = this.props

    return (
      <>
        <OpenUserNameConfigButton onOpenUserNameConfigButtonClick={this.handleOpen}/>

        <Portal onClose={this.handleClose} open={open}>
          <Segment
            style={{
              left: '76.8%',
              right: 23,
              position: 'absolute',
              bottom: 110,
              backgroundColor: 'grey'
            }}
          >
            <Header textAlign={"center"} style={{color: '#' + usernameColor}}>{username}</Header>
            <p>Portals have tons of great callback functions to hook into.</p>
            <p>To close, simply click the close button or click away</p>

            <Button
              content='Close Portal'
              negative
              onClick={this.handleClose}
            />
          </Segment>
        </Portal>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    usernameColor: state.auth.usernameColor
  };
};

export default connect(mapStateToProps)(UserNameConfig);