import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import PrivateOffice from './PrivateOffice'

class Area extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      areaWidth: 600,
      areaDepth: 126,
      type: {
        name: PrivateOffice,
        minWidth: this.props.width || 120,
        minHeight: this.props.height || 118
      }
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      type: {
        name: PrivateOffice,
        minWidth: nextProps.width || 120,
        minHeight: nextProps.height || 120
      }
    })
  }

  render() {
    let across = Math.floor(this.state.areaWidth/this.state.type.minWidth);
    let width = this.state.areaWidth/across;
    let height = this.state.areaDepth;
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
          height={height}
          width={width}
          leftWall={i==0}
          rightWall={i==across-1}
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
