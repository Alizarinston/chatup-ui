import React from 'react'
import { Tab } from 'semantic-ui-react'

const panes = [
  {
    menuItem: 'Месяц',
    render: () => <Tab.Pane attached={false}>
      <div className="timetable-content">
        кефирнн - 18000<br />
        daniloo - 11300<br />
        хролло - 8000<br />
        richard - 3650<br />
        kvincius - 3200<br />
        Jino_90 - 1600<br />
        Max_of_Shadows - 1500<br />
        stradallisa - 1250<br />
        влад, сын сварога - 800<br />
        alexado - 100<br />
      </div>
    </Tab.Pane>,
  },
  {
    menuItem: 'Все время',
    render: () => <Tab.Pane attached={false}>
      <div className="timetable-content">
        daniloo - 11600<br />
        кефирнн - 8000<br />
        хролло - 8000<br />
        Jino_90 - 6000<br />
        stradallisa - 3650<br />
        richard - 3650<br />
        Max_of_Shadows - 3500<br />
        alexado - 3100<br />
        kvincius - 3000<br />
        влад, сын сварога - 1800<br />
      </div>
    </Tab.Pane>,
  }
]

const TabDonations = () => (
  <div className="timetable" style={{width: '29%'}}>
    <h4>
      <span role="img" aria-label="cup">🏆</span>{' '}
      Топ донатеров
    </h4>

    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
  </div>
)

export default TabDonations