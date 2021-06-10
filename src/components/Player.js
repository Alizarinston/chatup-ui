import ReactPlayer from "react-player";
import React from "react";

class Player extends React.Component {
  render () {
    const { pip, chatID } = this.props

    return (
      <div className='player-wrapper'>
        <ReactPlayer
          // url='//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'
          url={`http://127.0.0.1:8001/live/${chatID}.m3u8`}
          controls
          height={'85%'}
          className="react-player"
          width={'100%'}
          pip={pip}
          stopOnUnmount={false}
          light={true}
          // config={{ attributes: { poster: 'http://sun9-31.userapi.com/0ZQ055DIy66f5w0wpuBz0KnVeEpOcEBGHhXq-A/aUkl95qR9dU.jpg' } }}
        />
        {/*<iframe frameBorder="0" allowFullScreen width="800" height="450"*/}
        {/*        src="https://goodgame.ru/player?58734"></iframe>*/}
      </div>
    )
  }
}

export default Player