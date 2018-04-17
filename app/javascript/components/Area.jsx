import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import PrivateOffice from './PrivateOffice'
import Background from '../images/Demo_Background.png'

class Area extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      areaWidth: props.width+props.wallThickness,
      areaDepth: props.height+props.wallThickness,
      type: {
        name: props.name,
        minWidth: this.props.minWidth,
        minHeight: this.props.minHeight
      }
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if(name=='areaWidth' && value>866){value=866}

    this.setState(
      {
        [name]: Number(value)
      }
    )
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      type: {
        name: nextProps.name,
        minWidth: nextProps.minWidth,
        minHeight: nextProps.minHeight
      }
    })
  }

  render() {
    let across = Math.floor((this.state.areaWidth)/(this.state.type.minWidth+this.props.wallThickness));
    let width = (this.state.areaWidth-(across)*this.props.wallThickness)/across;
    let height = this.state.type.minHeight;
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
        />
      )
    }
    return (
        <svg x={this.props.relX} y={this.props.relY}>
          {modules}
        </svg>
    )
  }
}

export default Area;
