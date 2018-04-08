import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class PrivateOffice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deskWidth: props.deskWidth || 60,
      deskDepth: props.deskDepth || 34,
      wallThickness: props.wallThickness || 4,
      doorClearance: 4,
      doorSize: 36,
      storageDepth: props.storageDepth || 12,
      storageWidth: props.storageWidth || 72,
      storage: props.storage || 0,
      width: props.width || 120,
      height: props.height || 118,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      deskWidth: nextProps.deskWidth || 60,
      deskDepth: nextProps.deskDepth || 34,
      wallThickness: nextProps.wallThickness || 4,
      storageDepth: nextProps.storageDepth || 12,
      storageWidth: nextProps.storageWidth || 72,
      storage: nextProps.storage || 0,
      width: nextProps.width || 120,
      height: nextProps.height || 118,
    }, () => {
      this.setState({
        width: this.props.width ? this.props.width : 60 + this.state.deskWidth + this.state.storage*this.state.storageDepth,
        height: this.props.height ? this.props.height : (this.state.storageWidth > 84 + this.state.deskDepth ? this.state.storageWidth : 84 + this.state.deskDepth)
      })
    })
  }

  render() {
    let off = this.state;
    let Width = this.state.width;
    let Height = this.state.height;
    return(
      <React.Fragment>
        <svg height={Height+2*off.wallThickness} width={Width + 2*off.wallThickness}>
          <line x1={0} y1={0} x2={0} y2={Height+2*off.wallThickness} style={{stroke: 'rgb(128,128,128)', strokeWidth: 1}}/>
          <line x1={off.wallThickness} y1={off.wallThickness} x2={off.wallThickness} y2={Height+off.wallThickness} style={{stroke: 'rgb(128,128,128)', strokeWidth: 1}}/>
          <line x1={0} y1={0} x2={Width+2*off.wallThickness} y2={0} style={{stroke: 'rgb(128,128,128)', strokeWidth: 1}}/>
          <line x1={off.wallThickness} y1={off.wallThickness} x2={Width+off.wallThickness} y2={off.wallThickness} style={{stroke: 'rgb(128,128,128)', strokeWidth: 1}}/>
          <line x1={Width+2*off.wallThickness} y1={0} x2={Width+2*off.wallThickness} y2={Height+2*off.wallThickness} style={{stroke: 'rgb(128,128,128)', strokeWidth: 1}}/>
          <line x1={Width+off.wallThickness} y1={off.wallThickness} x2={Width+off.wallThickness} y2={Height+off.wallThickness} style={{stroke: 'rgb(128,128,128)', strokeWidth: 1}}/>
          <line x1={Width+2*off.wallThickness} y1={Height+2*off.wallThickness} x2={off.doorSize+off.wallThickness+off.doorClearance} y2={Height+2*off.wallThickness} style={{stroke: 'rgb(128,128,128)', strokeWidth: 1}}/>
          <line x1={Width+off.wallThickness} y1={Height+off.wallThickness} x2={off.doorSize+off.wallThickness+off.doorClearance} y2={Height+off.wallThickness} style={{stroke: 'rgb(128,128,128)', strokeWidth: 1}}/>
          <line x1={0} y1={Height+2*off.wallThickness} x2={off.wallThickness+off.doorClearance} y2={Height+2*off.wallThickness} style={{stroke: 'rgb(128,128,128)', strokeWidth: 1}}/>
          <line x1={off.wallThickness} y1={Height+off.wallThickness} x2={off.wallThickness+off.doorClearance} y2={Height+off.wallThickness} style={{stroke: 'rgb(128,128,128)', strokeWidth: 1}}/>
          <line x1={off.wallThickness+off.doorClearance} y1={Height+off.wallThickness} x2={off.wallThickness+off.doorClearance} y2={Height+2*off.wallThickness} style={{stroke: 'rgb(128,128,128)', strokeWidth: 1}}/>
          <line x1={off.doorSize+off.wallThickness+off.doorClearance} y1={Height+off.wallThickness} x2={off.doorSize+off.wallThickness+off.doorClearance} y2={Height+2*off.wallThickness} style={{stroke: 'rgb(128,128,128)', strokeWidth: 1}}/>
          <line x1={off.wallThickness+off.doorClearance} y1={off.wallThickness+Height-off.doorSize} x2={off.wallThickness+off.doorClearance} y2={Height+off.wallThickness} style={{stroke: 'rgb(128,128,128)', strokeWidth: 1}}/>
          <path d={`M ${off.wallThickness+off.doorClearance} ${off.wallThickness+Height-off.doorSize} A ${off.doorSize} ${off.doorSize}, 0, 0, 1, ${off.doorSize+off.wallThickness+off.doorClearance} ${Height+off.wallThickness}`} style={{fill: 'none', stroke: 'rgb(128,128,128)', strokeWidth: 1}}/>
          <rect x={(Width-off.deskWidth)/2+off.wallThickness} y={48+off.wallThickness} width={off.deskWidth} height={off.deskDepth} style={{fill: 'none', stroke: 'rgb(128,128,128)', strokeWidth: 1}}/>
          { off.storage &&
            <rect x={Width+off.wallThickness-off.storageDepth} y={off.wallThickness} width={off.storageDepth} height={off.storageWidth} style={{fill: 'none', stroke: 'rgb(128,128,128)', strokeWidth: 1}}/>
          }
        </svg>
      </React.Fragment>
    )
  }
}

export default PrivateOffice;
