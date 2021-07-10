import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { authSignup } from "../store/actions/auth";
import { FlipIn } from "../components/AnimationFlipIn";

class RegistrationForm extends React.Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, email, password1, password2 } = this.state;
    this.props.signup(username, email, password1, password2);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { username, email, password1, password2 } = this.state;
    const { error, loading, token } = this.props;
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <FlipIn>
        <Grid
          textAlign="center"
          style={{ height: "100px" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Signup to your account
            </Header>
            {error && console.log(error.response.data)}

            {
              error && error.response.data['detail'] &&
              <Message
                error
                header={'sign-up failed'}
                content={error.response.data['detail']}
              />
            }

            <React.Fragment>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    onChange={this.handleChange}
                    value={username}
                    name="username"
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                    error={error && error.response.data['username'] && { content: error.response.data['username'], pointing: 'below' }}
                  />
                  <Form.Input
                    onChange={this.handleChange}
                    value={email}
                    name="email"
                    fluid
                    icon="mail"
                    iconPosition="left"
                    placeholder="E-mail address"
                    error={error && error.response.data['email'] && { content: error.response.data['email'] }}
                  />
                  <Form.Input
                    onChange={this.handleChange}
                    fluid
                    value={password1}
                    name="password1"
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    error={error && error.response.data['password1'] && { content: error.response.data['password1'] }}
                  />
                  <Form.Input
                    onChange={this.handleChange}
                    fluid
                    value={password2}
                    name="password2"
                    icon="lock"
                    iconPosition="left"
                    placeholder="Confirm password"
                    type="password"
                    error={error && error.response.data['password2'] && { content: error.response.data['password2'] }}
                  />

                  <Button
                    color="teal"
                    fluid
                    size="large"
                    loading={loading}
                    disabled={loading}
                  >
                    Signup
                  </Button>
                </Segment>
              </Form>
              <Message>
                Already have an account? <span>&nbsp;&nbsp;</span>
                <Button
                  compact
                  icon
                  color={"google plus"}
                  content={'Login'}
                  onClick={this.props.changeAuth}
                />
              </Message>
            </React.Fragment>
          </Grid.Column>
        </Grid>
      </FlipIn>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (username, email, password1, password2) =>
      dispatch(authSignup(username, email, password1, password2))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm);