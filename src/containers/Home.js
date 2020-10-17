import React from 'react'
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Chat from "./Chat";
import ReactHlsPlayer from 'react-hls-player'
import {
  Grid,
  GridColumn,
  GridRow,
  Segment
} from 'semantic-ui-react'
import axios from "axios";
import {HOST_URL} from "../settings";


class HomepageLayout extends React.Component {
  state = {
    loading: true
  }

  componentDidMount() {
    if (this.props.token) {
      axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
      axios.defaults.xsrfCookieName = "csrftoken";
      axios.get(`${HOST_URL}/api/broadcasts/`, {withCredentials:true, headers: {
          "Content-Type": "application/json"
        }, params: {limit: 1} })
        .then(res => {
          this.setState({
            loading: false,
            chatID: res.data.result[0].id,
            title: res.data.result[0].title,
            active: res.data.result[0].is_active,
          })
        }).catch(err => console.log("error " + err));
    }
  }

  render() {
    if (this.props.token === undefined || this.props.token === null) {
      return <Redirect to="/login"/>;
    }

    return (
      <div>
        <br/><br/>
        <Grid divided celled={true}>
          <GridRow>
            <GridColumn width={12}>
              <Segment compact={false}>
                <ReactHlsPlayer poster={"https://sun9-35.userapi.com/c849532/v849532312/15082b/efNn97HREgo.jpg"}
                                url='//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'
                                autoplay={false}
                                controls={true}
                                width={1370}
                                height={740}
                />
                <h1>{this.state.loading ? 'loading...' : this.state.title}</h1>
              </Segment>
            </GridColumn>
            <GridColumn width={4}>
              <Segment>
                {this.state.loading ? 'loading...' : <Chat chatID={this.state.chatID} active={this.state.active}/>}
              </Segment>
            </GridColumn>
          </GridRow>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(HomepageLayout);