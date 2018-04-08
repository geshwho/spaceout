import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class PrivateOffice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deskWidth: 60,
      deskDepth: 34,
      wallThickness: 4,
      doorClearance: 4,
      doorSize: 36,
      storageDepth: 12,
      storageWidth: 72,
      storage: 0,
      width: props.width ? props.width : 60 + 60,
      height: props.height ? props.height : 84 + 34,
    }

    this.props.setHeight && this.props.setHeight(this.state.height + 2*this.state.wallThickness);
    this.props.setWidth && this.props.setWidth(this.state.width + 2*this.state.wallThickness);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: Number(value)
    }, () => {
      this.setState({
        width: this.props.width ? this.props.width : 60 + this.state.deskWidth + this.state.storage*this.state.storageDepth,
        height: this.props.height ? this.props.height : (this.state.storageWidth > 84 + this.state.deskDepth ? this.state.storageWidth : 84 + this.state.deskDepth)
      }, () => {
        this.props.setHeight && this.props.setHeight(this.state.height + 2*this.state.wallThickness);
        this.props.setWidth && this.props.setWidth(this.state.width + 2*this.state.wallThickness);
      })
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.width || nextProps.height) { this.setState({ width: nextProps.width, height: nextProps.height }) }
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
        {this.props.showMetrics &&
          <div>
            <form>
              <label htmlFor="deskWidth">Desk Width: </label>
              <input name="deskWidth" type="number" value={this.state.deskWidth} onChange={this.handleChange}/><br/>
              <label htmlFor="deskDepth">Desk Depth: </label>
              <input name="deskDepth" type="number" value={this.state.deskDepth} onChange={this.handleChange}/><br/>
              <label htmlFor="wallThickness">Wall Thickness: </label>
              <input name="wallThickness" type="number" value={this.state.wallThickness} onChange={this.handleChange}/><br/>
              <label htmlFor="storageDepth">Storage Depth: </label>
              <input name="storageDepth" type="number" value={this.state.storageDepth} onChange={this.handleChange}/><br/>
              <label htmlFor="storageWidth">Storage Width: </label>
              <input name="storageWidth" type="number" value={this.state.storageWidth} onChange={this.handleChange}/><br/>
              <label htmlFor="storage">Storage: </label>
              <input name="storage" type="checkbox" value={this.state.storage} onChange={this.handleChange}/>
            </form>
          </div> }
      </React.Fragment>
    )
  }
}

export default PrivateOffice;
