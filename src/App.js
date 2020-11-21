import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import * as actions from "./store/actions/auth";
import "semantic-ui-css/semantic.min.css";
import * as messageActions from "./store/actions/message";
import WebSocketInstance from "./websocket";

class App extends Component {
  constructor(props) {
    super(props);

    WebSocketInstance.addCallbacks(
      this.props.addMessage.bind(this),
      this.props.updateWatchersCount.bind(this)
    );
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.props.onTryAutoSignup();
    }
  }

  render() {
    return (
      <Router>
        <BaseRouter/>
      </Router>
    );
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    addMessage: message => dispatch(messageActions.addMessage(message)),
    setMessages: messages => dispatch(messageActions.setMessages(messages)),
    updateWatchersCount: message => dispatch(messageActions.updateWatchersCount(message))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);