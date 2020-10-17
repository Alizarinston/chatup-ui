import React from 'react'
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Chat from "./Chat";
import ReactHlsPlayer from 'react-hls-player'
import {
  Grid,
  GridColumn,
  GridRow,
  Segment,
  Icon
} from 'semantic-ui-react'



class HomepageLayout extends React.Component {
  render() {

    return (
      <div>
        <Segment>
        <Grid>
          <GridRow>
            <GridColumn width={12}>
              <div className="playerBlock">
                <ReactHlsPlayer poster={"http://vezaks.com/another_5/-3gqzkiPqBs.jpg"}
                                url='//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'
                                autoplay={false}
                                controls={true}
                                height={450}
                />
                <h1>Name stream</h1>
              <Icon name='user' />200 человек
              </div>
            </GridColumn>
            <GridColumn width={4}>
              <div className="chatBlock">
              <Chat/>
              </div>
            </GridColumn>
          </GridRow>
        </Grid>
          </Segment>
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