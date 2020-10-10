import React from 'react'
import {
  Grid,
  GridColumn,
  GridRow,
  Segment
} from 'semantic-ui-react'

// player
import ReactHlsPlayer from 'react-hls-player'
import Chat from "./Chat";


const HomepageLayout = () => (
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
)

export default HomepageLayout