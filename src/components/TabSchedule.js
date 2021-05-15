import React from "react"
import jsonp from "jsonp"

class TabSchedule extends React.Component {
  state = {
    schedule: []
  };

  getSchedule () {
    jsonp( "https://api.vk.com/method/board.getComments?group_id=91605072&topic_id=36501125&count=1&access_token=8b4fce808b4fce808b4fce80a88b3ad84d88b4f8b4fce80d4f5206fdd07ce7fcb3ebc50&v=5.126", null, (error, data) => {
      if (error) {
        this.setState({
          error,
        });
      } else {
        this.setState({
          schedule: data.response.items,
        });
      }
    });
  }

  componentDidMount() {
    this.getSchedule()
  }

  render() {
    const { schedule } = this.state

    return (
      <div className="timetable" style={{width: '71%', marginRight: '20px'}}>

        {
          schedule.length !== 0 &&
          <div className="timetable-content">
            {
              schedule[0].text.split('\n').map((str, i) =>
                (i === 0) ? <h4 key={i}>{str}</h4> : <p key={i} style={{margin: '0', textIndent: '3ch'}}>{str}</p>
              )
            }
          </div>
        }

      </div>
    );
  }
}

export default TabSchedule