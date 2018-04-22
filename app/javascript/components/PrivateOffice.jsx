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
    let viewbox = this.props.setWidth ? {['viewBox']: `0 0 ${(Width+2*off.wallThickness)/2} ${(Height+2*off.wallThickness)/2}`} : {}
    return(
      <svg x={this.props.x} height={Height+2*off.wallThickness} width={Width + off.wallThickness} style={{overflow: 'visible'}} {...viewbox}>
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
            deskWidth={off.deskWidth}
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
    <Dimension x1={props.wallThickness} y1={0} x2={props.wallThickness+props.width} y2={0} offset={true} text="Minimum Width"/>
    <Dimension x1={0} y1={props.wallThickness} x2={0} y2={props.wallThickness+props.height} offset={true} text="Minimum Depth"/>
  </g>
)

const Clearances = props => (
  <g>
    <Dimension x1={props.wallThickness} x2={(props.width-props.deskWidth-props.storage*props.storageDepth)/2+props.wallThickness} y1={48+props.deskDepth/2+props.wallThickness} y2={48+props.deskDepth/2+props.wallThickness} text="Clearance"/>
    <Dimension x1={(props.width+props.deskWidth-props.storage*props.storageDepth)/2+props.wallThickness} x2={props.width+props.wallThickness-props.storage*props.storageDepth} y1={48+props.deskDepth/2+props.wallThickness} y2={48+props.deskDepth/2+props.wallThickness} text="Clearance"/>
    <Dimension x1={40+props.wallThickness} x2={40+props.wallThickness} y1={props.wallThickness} y2={props.wallThickness+48} text="Clearance"/>
    <Dimension x1={props.doorSize+props.wallThickness+30} x2={props.doorSize+props.wallThickness+30} y1={48+props.deskDepth+props.wallThickness} y2={props.height+props.wallThickness} text="Clearance"/>
  </g>
)

export class PrivateOfficeDesignParams extends React.Component {
  render() {
    return(
      <React.Fragment>
        <h5 className="mb-5">Design Parameters</h5>
        <form>
          <div className="form-group row" style={{marginBottom: '-12px'}}>
            <label htmlFor="deskWidth" className="col-sm-5 col-form-label">Desk Width: </label>
            <div className="col-sm-5">
              <input name="deskWidth" className="form-control" type="number" value={this.props.deskWidth} onChange={this.props.handleChange}/><br/>
            </div>
          </div>
          <div className="form-group row" style={{marginBottom: '-12px'}}>
            <label htmlFor="deskDepth" className="col-sm-5 col-form-label">Desk Depth: </label>
            <div className="col-sm-5">
              <input name="deskDepth" className="form-control" type="number" value={this.props.deskDepth} onChange={this.props.handleChange}/><br/>
            </div>
          </div>
          <div className="form-group row" style={{marginBottom: '-12px'}}>
            <label htmlFor="wallThickness" className="col-sm-5 col-form-label">Wall Thickness: </label>
            <div className="col-sm-5">
              <input name="wallThickness" className="form-control" type="number" value={this.props.wallThickness} onChange={this.props.handleChange}/><br/>
            </div>
          </div>
          <div className="form-group row" style={{marginBottom: '-12px'}}>
            <label htmlFor="storageDepth" className="col-sm-5 col-form-label">Storage Depth: </label>
            <div className="col-sm-5">
              <input name="storageDepth" className="form-control" type="number" value={this.props.storageDepth} onChange={this.props.handleChange}/><br/>
            </div>
          </div>
          <div className="form-group row" style={{marginBottom: '-12px'}}>
            <label htmlFor="storageWidth" className="col-sm-5 col-form-label">Storage Width: </label>
            <div className="col-sm-5">
              <input name="storageWidth" className="form-control" type="number" value={this.props.storageWidth} onChange={this.props.handleChange}/><br/>
            </div>
          </div>
          <div className="form-group row" style={{marginBottom: '-12px'}}>
            <label htmlFor="storage" className="col-sm-5 col-form-label">Storage: </label>
            <div className="col-sm-5">
              <input name="storage" className="form-check-label" type="checkbox" value={this.props.storage} onChange={this.props.handleChange}/>
            </div>
          </div>
        </form>
      </React.Fragment>
    )
  }
}

export default PrivateOffice;
