import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Chair from './Chair'
import Dimension from './Dimension'

class PrivateOffice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deskWidth: props.deskWidth || 60,
      deskDepth: props.deskDepth || 34,
      wallThickness: props.wallThickness || 4.25,
      doorClearance: 4,
      doorSize: 36,
      storageDepth: props.storageDepth || 12,
      storageWidth: props.storageWidth || 72,
      storage: props.storage || 0,
      width: props.width || 120,
      height: props.height || 118,
      rightWall: props.rightWall==undefined ? true : props.rightWall,
      leftWall: props.leftWall==undefined ? true : props.leftWall,
      topWall: props.topWall==undefined ? true : props.topWall,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      deskWidth: nextProps.deskWidth || 60,
      deskDepth: nextProps.deskDepth || 34,
      wallThickness: nextProps.wallThickness || 4.25,
      storageDepth: nextProps.storageDepth || 12,
      storageWidth: nextProps.storageWidth || 72,
      storage: nextProps.storage || 0,
      width: nextProps.width || 120,
      height: nextProps.height || 118,
      rightWall: nextProps.rightWall==undefined ? true : nextProps.rightWall,
      leftWall: nextProps.leftWall==undefined ? true : nextProps.leftWall,
      topWall: nextProps.topWall==undefined ? true : nextProps.topWall,
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
      <svg height={Height+2*off.wallThickness} width={Width + off.wallThickness} style={{overflow: 'visible'}} viewBox={this.props.setWidth ? `0 0 ${(Width+2*off.wallThickness)/2} ${(Height+2*off.wallThickness)/2}` : ''}>
        <path d={`M 0 0
          ${off.leftWall ? 'L' : 'M'} 0 ${Height+2*off.wallThickness}
          ${off.leftWall ? 'L' : 'M'} ${off.wallThickness} ${Height+2*off.wallThickness}
          L ${off.wallThickness+off.doorClearance} ${Height+2*off.wallThickness}
          L ${off.wallThickness+off.doorClearance} ${Height+off.wallThickness}
          L ${off.wallThickness} ${Height+off.wallThickness}
          L ${off.wallThickness} ${off.wallThickness}
          L ${Width+off.wallThickness} ${off.wallThickness}
          L ${Width+off.wallThickness} ${Height+off.wallThickness}
          L ${off.doorSize+off.wallThickness+off.doorClearance} ${Height+off.wallThickness}
          L ${off.doorSize+off.wallThickness+off.doorClearance} ${Height+2*off.wallThickness}
          L ${Width+2*off.wallThickness} ${Height+2*off.wallThickness}
          ${off.rightWall ? 'L' : 'M'} ${Width+2*off.wallThickness} ${off.wallThickness}
          ${off.rightWall&&off.topWall ? 'L' : 'M'} ${Width+2*off.wallThickness} ${0}
          ${off.topWall ? 'L' : 'M'} ${0} ${0}`}
          style={{fill: 'none', stroke: 'black', strokeWidth: 1.25}}/>
        <rect x={off.wallThickness+off.doorClearance} y={off.wallThickness+Height-off.doorSize} width={1.5} height={off.doorSize} style={{fill: 'none', stroke: 'black', strokeWidth: .5}}/>
        <g style={{fill: 'none', stroke: 'black', strokeWidth: .25}}>
          <path d={`M ${off.wallThickness+off.doorClearance} ${off.wallThickness+Height-off.doorSize} A ${off.doorSize} ${off.doorSize}, 0, 0, 1, ${off.doorSize+off.wallThickness+off.doorClearance} ${Height+off.wallThickness}`}/>
          <rect x={(Width-off.deskWidth-off.storage*off.storageDepth)/2+off.wallThickness} y={48+off.wallThickness} width={off.deskWidth} height={off.deskDepth}/>
          <Chair x={off.wallThickness+(Width-off.storage*off.storageDepth)/2} y={46+off.wallThickness}/>
        </g>
        { off.storage &&
          <rect x={Width+off.wallThickness-off.storageDepth} y={off.wallThickness} width={off.storageDepth} height={off.storageWidth} style={{fill: 'none', stroke: 'black', strokeWidth: .25}}/>
        }
        { this.props.setWidth &&
          <MainDimensions
            wallThickness={off.wallThickness}
            width={Width}
            height={Height}
            inArea={!this.props.setWidth}
          /> }
        { this.props.setWidth &&
          <Clearances
            width={Width}
            height={Height}
            doorSize={off.doorSize}
            wallThickness={off.wallThickness}
            deskDepth={off.deskDepth}
            deskWidth={off.deskWidth}
            storage={off.storage}
            storageDepth={off.storageDepth}
          /> }
      </svg>
    )
  }
}

const MainDimensions = props => (
  <g>
    {/* <line x1={props.wallThickness} y1={2} x2={props.wallThickness} y2={-15-props.wallThickness} style={{fill: 'none', stroke: 'black', strokeWidth: .25}}/>
    <line x1={props.wallThickness+props.width} y1={2} x2={props.wallThickness+props.width} y2={-15-props.wallThickness} style={{fill: 'none', stroke: 'black', strokeWidth: .25}}/>
    <line x1={0} y1={-15} x2={2*props.wallThickness+props.width} y2={-15} style={{fill: 'none', stroke: 'black', strokeWidth: .25}}/>
    <line x1={props.wallThickness/2} y1={-15+props.wallThickness/2} x2={props.wallThickness+props.wallThickness/2} y2={-15-props.wallThickness/2} style={{fill: 'none', stroke: 'black', strokeWidth: 1}}/>
    <line x1={props.wallThickness+props.width-(props.wallThickness/2)} y1={-15+props.wallThickness/2} x2={props.wallThickness+props.width+(props.wallThickness/2)} y2={-15-props.wallThickness/2} style={{fill: 'none', stroke: 'black', strokeWidth: 1}}/>
    <text x={props.width/2-2} y={-17} style={{fontSize: '6'}}>{props.width.toFixed(2)}"</text>
    <text x={props.width/2-18} y={-8} style={{fontSize: '6'}}>{!props.inArea && 'Minimum'} Width</text> */}
    <Dimension x1={props.wallThickness} y1={48+props.wallThickness} x2={props.wallThickness+props.width} y2={0} offset={15}/>

    <line x1={2} y1={props.wallThickness} x2={-15-props.wallThickness} y2={props.wallThickness} style={{fill: 'none', stroke: 'black', strokeWidth: .25}}/>
    <line x1={2} y1={props.wallThickness+props.height} x2={-15-props.wallThickness} y2={props.wallThickness+props.height} style={{fill: 'none', stroke: 'black', strokeWidth: .25}}/>
    <line x1={-15} y1={0} x2={-15} y2={2*props.wallThickness+props.height} style={{fill: 'none', stroke: 'black', strokeWidth: .25}}/>
    <line x1={-15+props.wallThickness/2} y1={props.wallThickness/2} x2={-15-props.wallThickness/2} y2={props.wallThickness+props.wallThickness/2} style={{fill: 'none', stroke: 'black', strokeWidth: 1}}/>
    <line x1={-15+props.wallThickness/2} y1={props.wallThickness+props.height-(props.wallThickness/2)} x2={-15-props.wallThickness/2} y2={props.wallThickness+props.height+(props.wallThickness/2)} style={{fill: 'none', stroke: 'black', strokeWidth: 1}}/>
    <text x={-17} y={props.height/2+12} transform={`rotate(-90 -17,${props.height/2+12})`} style={{fontSize: '6'}}>{props.height.toFixed(2)}"</text>
    <text x={-8} y={props.height/2+26} transform={`rotate(-90 -8,${props.height/2+26})`} style={{fontSize: '6'}}>{!props.inArea && 'Minimum'} Depth</text>
  </g>
)

const Clearances = props => (
  <g>
    <line x1={0} y1={48+props.deskDepth/2} x2={(props.width-props.deskWidth-props.storage*props.storageDepth)/2+2*props.wallThickness} y2={48+props.deskDepth/2} style={{fill: 'none', stroke: 'black', strokeWidth: .25}}/>
    <line x1={0+props.wallThickness/2} y1={48+props.deskDepth/2+props.wallThickness/2} x2={0+3*props.wallThickness/2} y2={48+props.deskDepth/2-props.wallThickness/2} style={{fill: 'none', stroke: 'black', strokeWidth: 1}}/>
    <line x1={(props.width-props.deskWidth-props.storage*props.storageDepth)/2+props.wallThickness/2} y1={48+props.deskDepth/2+props.wallThickness/2} x2={(props.width-props.deskWidth-props.storage*props.storageDepth)/2+3*props.wallThickness/2} y2={48+props.deskDepth/2-props.wallThickness/2} style={{fill: 'none', stroke: 'black', strokeWidth: 1}}/>
    <text x={(props.width-props.deskWidth-props.storage*props.storageDepth)/4+props.wallThickness/2} y={44+props.deskDepth/2} style={{fontSize: '6'}}>{(props.width-props.deskWidth-props.storage*props.storageDepth)/2}"</text>
    <text x={(props.width-props.deskWidth-props.storage*props.storageDepth)/4+props.wallThickness/2-11} y={55+props.deskDepth/2} style={{fontSize: '6'}}>Clearance</text>

    <line x1={(props.width+props.deskWidth-props.storage*props.storageDepth)/2} y1={48+props.deskDepth/2} x2={props.width+2*props.wallThickness-props.storage*props.storageDepth} y2={48+props.deskDepth/2} style={{fill: 'none', stroke: 'black', strokeWidth: .25}}/>
    <line x1={(props.width+props.deskWidth-props.storage*props.storageDepth+props.wallThickness)/2} y1={48+props.deskDepth/2+props.wallThickness/2} x2={(props.width+props.deskWidth-props.storage*props.storageDepth+3*props.wallThickness)/2} y2={48+props.deskDepth/2-props.wallThickness/2} style={{fill: 'none', stroke: 'black', strokeWidth: 1}}/>
    <line x1={props.width+props.wallThickness/2-props.storage*props.storageDepth} y1={48+props.deskDepth/2+props.wallThickness/2} x2={props.width+3*props.wallThickness/2-props.storage*props.storageDepth} y2={48+props.deskDepth/2-props.wallThickness/2} style={{fill: 'none', stroke: 'black', strokeWidth: 1}}/>
    <text x={40+props.deskWidth+props.wallThickness} y={44+props.deskDepth/2} style={{fontSize: '6'}}>{(props.width-props.deskWidth-props.storage*props.storageDepth)/2}"</text>
    <text x={31+props.deskWidth+props.wallThickness} y={55+props.deskDepth/2} style={{fontSize: '6'}}>Clearance</text>

    <line x1={40+props.wallThickness} y1={0} x2={40+props.wallThickness} y2={48+2*props.wallThickness} style={{fill: 'none', stroke: 'black', strokeWidth: .25}}/>
    <line x1={40+props.wallThickness/2} y1={3*props.wallThickness/2} x2={40+3*props.wallThickness/2} y2={props.wallThickness/2} style={{fill: 'none', stroke: 'black', strokeWidth: 1}}/>
    <line x1={40+props.wallThickness/2} y1={48+5*props.wallThickness/2} x2={40+3*props.wallThickness/2} y2={48+3*props.wallThickness/2} style={{fill: 'none', stroke: 'black', strokeWidth: 1}}/>
    <text x={36+props.wallThickness} y={34} transform={`rotate(-90 ${36+props.wallThickness},34)`} style={{fontSize: '6'}}>48"</text>
    <text x={47+props.wallThickness} y={40} transform={`rotate(-90 ${47+props.wallThickness},40)`} style={{fontSize: '6'}}>Clearance</text>

    <line x1={props.doorSize+props.wallThickness+30} y1={48+props.deskDepth} x2={props.doorSize+props.wallThickness+30} y2={props.height+2*props.wallThickness} style={{fill: 'none', stroke: 'black', strokeWidth: .25}}/>
    <line x1={props.doorSize+props.wallThickness/2+30} y1={48+props.deskDepth+3*props.wallThickness/2} x2={props.doorSize+3*props.wallThickness/2+30} y2={48+props.deskDepth+props.wallThickness/2} style={{fill: 'none', stroke: 'black', strokeWidth: 1}}/>
    <line x1={props.doorSize+props.wallThickness/2+30} y1={props.height+3*props.wallThickness/2} x2={props.doorSize+3*props.wallThickness/2+30} y2={props.height+props.wallThickness/2} style={{fill: 'none', stroke: 'black', strokeWidth: 1}}/>
    <text x={props.doorSize+props.wallThickness+29} y={76+props.deskDepth} transform={`rotate(-90 ${props.doorSize+props.wallThickness+29},${76+props.deskDepth})`} style={{fontSize: '6'}}>48"</text>
    <text x={props.doorSize+props.wallThickness+36} y={84+props.deskDepth} transform={`rotate(-90 ${props.doorSize+props.wallThickness+36},${84+props.deskDepth})`} style={{fontSize: '6'}}>Clearance</text>
  </g>
)

export default PrivateOffice;
