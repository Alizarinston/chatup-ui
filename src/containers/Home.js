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


class HomepageLayout extends React.Component {
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
                                height={800}
                />
              </Segment>
            </GridColumn>
            <GridColumn width={4}>
              <Segment>
                <Chat/>
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