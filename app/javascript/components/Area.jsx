import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import PrivateOffice from './PrivateOffice'
import Background from '../images/Demo_Background.png'

class Area extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      areaWidth: 600,
      areaDepth: 126.5,
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
        name: PrivateOffice,
        minWidth: nextProps.width || 120,
        minHeight: nextProps.height || 118
      }
    })
  }

  render() {
    let across = Math.floor((this.state.areaWidth-this.props.wallThickness)/(this.state.type.minWidth+this.props.wallThickness));
    let width = (this.state.areaWidth-(across+1)*this.props.wallThickness)/across;
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
          leftWall={false}
          rightWall={i==across-1}
          topWall={false}
        />
      )
    }
    return (
      <React.Fragment>
        <div className='col-sm-4'>
          <h5 className="mb-5">Space Summary</h5>
          <div className="form-group row">
            <label htmlFor="areaWidth" className="col-sm-6">Area Width: </label>
            <input name="areaWidth" type="number" value={this.state.areaWidth} onChange={this.handleChange} className="form-control col-sm-6"/><br/>
          </div>
          {/* <label htmlFor="areaDepth">Area Depth: </label>
          <input name="areaDepth" type="number" value={this.state.areaDepth} onChange={this.handleChange}/><br/> */}
          <div className="row">
            <div className="col-sm-6">Reported Width:</div>
            <div className="col-sm-6">{width.toFixed(2)}"</div>
          </div>
          <div className="row">
            <div className="col-sm-6">Reported Depth:</div>
            <div className="col-sm-6">{(height-2*this.props.wallThickness).toFixed(2)}"</div>
          </div>
          <div className="row">
            <div className="col-sm-6">Reported Area:</div>
            <div className="col-sm-6">{(width*height/144).toFixed(2)} sq ft</div>
          </div>
        </div>
        <div className="my-2 mt-5 pt-5 col-sm-12">
          <img src={Background} style={{position: 'absolute', zIndex: '-1', top: '-136px', left: '-65px', height: 'auto', width: '119%'}}/>
          {modules}
        </div>
      </React.Fragment>
    )
  }
}

export default Area;
