import ReactPlayer from "react-player";
import React from "react";

class Player extends React.Component {
  render () {
    const { pip } = this.props

    return (
      <div className='player-wrapper'>
        <ReactPlayer
          url='//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'
          controls
          height={'85%'}
          className="react-player"
          width={'100%'}
          pip={pip}
          stopOnUnmount={false}
          config={{ attributes: { poster: 'https://sun9-35.userapi.com/c849532/v849532312/15082b/efNn97HREgo.jpg' } }}
        />
      </div>
    )
  }
}

export default Player