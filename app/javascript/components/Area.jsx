import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import PrivateOffice from './PrivateOffice'

class Area extends React.Component {
  constructor() {
    super();

    this.state = {
      areaWidth: 600,
      areaDepth: 125,
      type: { name: PrivateOffice, minWidth: 120, minHeight: 118 }
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(
      {
        [name]: Number(value)
      }
    )
  }

  render() {
    let across = Math.floor(this.state.areaWidth/this.state.type.minWidth);
    let width = this.state.areaWidth/across
    let down = Math.floor(this.state.areaDepth/this.state.type.minHeight);
    let height = this.state.areaDepth/down
    var modules = []
    for(var i = 0; i < across; i++) {
      modules.push(
        <this.state.type.name
          key={i}
          height={height}
          width={width}
          deskWidth={this.props.deskWidth}
          deskDepth={this.props.deskDepth}
          wallThickness={this.props.wallThickness}
          storageDepth={this.props.storageDepth}
          storageWidth={this.props.storageWidth}
          storage={this.props.storage}
        />
      )
    }
    return (
      <React.Fragment>
        <div>
          {modules}
        </div>
        <label htmlFor="areaWidth">Area Width: </label>
        <input name="areaWidth" type="number" value={this.state.areaWidth} onChange={this.handleChange}/><br/>
        {/* <label htmlFor="areaDepth">Area Depth: </label>
        <input name="areaDepth" type="number" value={this.state.areaDepth} onChange={this.handleChange}/><br/> */}
      </React.Fragment>
    )
  }
}

export default Area;
