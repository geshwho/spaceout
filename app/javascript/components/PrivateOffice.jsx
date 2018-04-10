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
        <svg height={Height+2*off.wallThickness} width={Width + 2*off.wallThickness} style={{overflow: 'visible'}}>
          <path d={`M 0 0
            L 0 ${Height+2*off.wallThickness}
            L ${off.wallThickness+off.doorClearance} ${Height+2*off.wallThickness}
            L ${off.wallThickness+off.doorClearance} ${Height+off.wallThickness}
            L ${off.wallThickness} ${Height+off.wallThickness}
            L ${off.wallThickness} ${off.wallThickness}
            L ${Width+off.wallThickness} ${off.wallThickness}
            L ${Width+off.wallThickness} ${Height+off.wallThickness}
            L ${off.doorSize+off.wallThickness+off.doorClearance} ${Height+off.wallThickness}
            L ${off.doorSize+off.wallThickness+off.doorClearance} ${Height+2*off.wallThickness}
            L ${Width+2*off.wallThickness} ${Height+2*off.wallThickness}
            L ${Width+2*off.wallThickness} ${0}
            Z`}
            style={{fill: 'none', stroke: 'black', strokeWidth: 2}}/>
          {/* <line x1={0} y1={0} x2={0} y2={Height+2*off.wallThickness} style={{stroke: 'black', strokeWidth: 2}}/> */}
          {/* <line x1={off.wallThickness} y1={off.wallThickness} x2={off.wallThickness} y2={Height+off.wallThickness} style={{stroke: 'black', strokeWidth: 2}}/> */}
          {/* <line x1={0} y1={0} x2={Width+2*off.wallThickness} y2={0} style={{stroke: 'black', strokeWidth: 2}}/> */}
          {/* <line x1={off.wallThickness} y1={off.wallThickness} x2={Width+off.wallThickness} y2={off.wallThickness} style={{stroke: 'black', strokeWidth: 2}}/> */}
          {/* <line x1={Width+2*off.wallThickness} y1={0} x2={Width+2*off.wallThickness} y2={Height+2*off.wallThickness} style={{stroke: 'black', strokeWidth: 2}}/> */}
          {/* <line x1={Width+off.wallThickness} y1={off.wallThickness} x2={Width+off.wallThickness} y2={Height+off.wallThickness} style={{stroke: 'black', strokeWidth: 2}}/> */}
          {/* <line x1={Width+2*off.wallThickness} y1={Height+2*off.wallThickness} x2={off.doorSize+off.wallThickness+off.doorClearance} y2={Height+2*off.wallThickness} style={{stroke: 'black', strokeWidth: 2}}/> */}
          {/* <line x1={Width+off.wallThickness} y1={Height+off.wallThickness} x2={off.doorSize+off.wallThickness+off.doorClearance} y2={Height+off.wallThickness} style={{stroke: 'black', strokeWidth: 2}}/> */}
          {/* <line x1={0} y1={Height+2*off.wallThickness} x2={off.wallThickness+off.doorClearance} y2={Height+2*off.wallThickness} style={{stroke: 'black', strokeWidth: 2}}/> */}
          {/* <line x1={off.wallThickness} y1={Height+off.wallThickness} x2={off.wallThickness+off.doorClearance} y2={Height+off.wallThickness} style={{stroke: 'black', strokeWidth: 2}}/> */}
          {/* <line x1={off.wallThickness+off.doorClearance} y1={Height+off.wallThickness} x2={off.wallThickness+off.doorClearance} y2={Height+2*off.wallThickness} style={{stroke: 'black', strokeWidth: 2}}/> */}
          {/* <line x1={off.doorSize+off.wallThickness+off.doorClearance} y1={Height+off.wallThickness} x2={off.doorSize+off.wallThickness+off.doorClearance} y2={Height+2*off.wallThickness} style={{stroke: 'black', strokeWidth: 2}}/> */}
          {/* <line x1={off.wallThickness+off.doorClearance} y1={off.wallThickness+Height-off.doorSize} x2={off.wallThickness+off.doorClearance} y2={Height+off.wallThickness} style={{stroke: 'black', strokeWidth: 2}}/> */}
          <rect x={off.wallThickness+off.doorClearance} y={off.wallThickness+Height-off.doorSize} width={1.5} height={off.doorSize} style={{fill: 'none', stroke: 'black', strokeWidth: 1}}/>
          <path d={`M ${off.wallThickness+off.doorClearance} ${off.wallThickness+Height-off.doorSize} A ${off.doorSize} ${off.doorSize}, 0, 0, 1, ${off.doorSize+off.wallThickness+off.doorClearance} ${Height+off.wallThickness}`} style={{fill: 'none', stroke: 'black', strokeWidth: .5}}/>
          <rect x={(Width-off.deskWidth)/2+off.wallThickness} y={48+off.wallThickness} width={off.deskWidth} height={off.deskDepth} style={{fill: 'none', stroke: 'black', strokeWidth: .5}}/>
          <path d={`M ${off.wallThickness+Width/2} ${46+off.wallThickness} l 7 0 l 3 -1 l 1 -3 l -2 -12 l -6 -2 l -6 0 l -6 2 l -2 12 l 1 3 l 3 1 l 7 0 m 9 -16 l -1 3 l -5 -1 l -6 0 l -5 1 l -1 -3`} style={{fill: 'none', stroke: 'black', strokeWidth: .5}}/>
          { off.storage &&
            <rect x={Width+off.wallThickness-off.storageDepth} y={off.wallThickness} width={off.storageDepth} height={off.storageWidth} style={{fill: 'none', stroke: 'black', strokeWidth: .5}}/>
          }
        </svg>
      </React.Fragment>
    )
  }
}

export default PrivateOffice;
