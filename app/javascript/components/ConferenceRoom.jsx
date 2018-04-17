import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Chair from './Chair'

class ConferenceRoom extends React.Component {
  render() {
    return(
      <svg style={{fill: 'none', stroke: 'black', strokeWidth: .25}}><Chair x={25} y={25}/></svg>
    )
  }
}

export class ConferenceRoomDesignParams extends React.Component {
  render() {
    return(
      <React.Fragment>
        <h5 className="mb-5">Design Parameters</h5>
      </React.Fragment>
    )
  }
}

export default ConferenceRoom;
