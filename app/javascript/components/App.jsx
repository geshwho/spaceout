import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import PrivateOffice from './PrivateOffice'
import Area from './Area'
import '../stylesheets/main.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      deskWidth: 60,
      deskDepth: 34,
      wallThickness: 4.25,
      storageDepth: 12,
      storageWidth: 72,
      storage: 0,
      height: 126,
      width: 128
    }

    this.setHeight = this.setHeight.bind(this);
    this.setWidth = this.setWidth.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  setHeight(height) {
    this.setState({ height: height })
  }

  setWidth(width) {
    this.setState({ width: width })
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: Number(value)
    }, () => {
      this.setState({
        height: (this.state.storageWidth > 84 + this.state.deskDepth ? this.state.storageWidth : 84 + this.state.deskDepth) + 2*this.state.wallThickness,
        width: 60 + this.state.deskWidth + this.state.storage*this.state.storageDepth + 2*this.state.wallThickness,
      })
    });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row" style={{minHeight: '275px'}}>
          <div className="col-4">
            <PrivateOffice
              setHeight={this.setHeight}
              setWidth={this.setWidth}
              deskWidth={this.state.deskWidth}
              deskDepth={this.state.deskDepth}
              wallThickness={this.state.wallThickness}
              storageDepth={this.state.storageDepth}
              storageWidth={this.state.storageWidth}
              storage={this.state.storage}
            />
          </div>
          <div className="col-8">
            <form>
              <div className="form-group row mb-0">
                <label htmlFor="deskWidth" className="col-sm-2 col-form-label">Desk Width: </label>
                <div className="col-sm-4">
                  <input name="deskWidth" className="form-control" type="number" value={this.state.deskWidth} onChange={this.handleChange}/><br/>
                </div>
              </div>
              <div className="form-group row mb-0">
                <label htmlFor="deskDepth" className="col-sm-2 col-form-label">Desk Depth: </label>
                <div className="col-sm-4">
                  <input name="deskDepth" className="form-control" type="number" value={this.state.deskDepth} onChange={this.handleChange}/><br/>
                </div>
              </div>
              <div className="form-group row mb-0">
                <label htmlFor="wallThickness" className="col-sm-2 col-form-label">Wall Thickness: </label>
                <div className="col-sm-4">
                  <input name="wallThickness" className="form-control" type="number" value={this.state.wallThickness} onChange={this.handleChange}/><br/>
                </div>
              </div>
              <div className="form-group row mb-0">
                <label htmlFor="storageDepth" className="col-sm-2 col-form-label">Storage Depth: </label>
                <div className="col-sm-4">
                  <input name="storageDepth" className="form-control" type="number" value={this.state.storageDepth} onChange={this.handleChange}/><br/>
                </div>
              </div>
              <div className="form-group row mb-0">
                <label htmlFor="storageWidth" className="col-sm-2 col-form-label">Storage Width: </label>
                <div className="col-sm-4">
                  <input name="storageWidth" className="form-control" type="number" value={this.state.storageWidth} onChange={this.handleChange}/><br/>
                </div>
              </div>
              <div className="form-group row mb-0">
                <label htmlFor="storage" className="col-sm-2 col-form-label">Storage: </label>
                <div className="col-sm-4">
                  <input name="storage" className="form-check-label" type="checkbox" value={this.state.storage} onChange={this.handleChange}/>
                </div>
              </div>
            </form>
          </div>
        </div>
        <br/>
          <Area
            deskWidth={this.state.deskWidth}
            deskDepth={this.state.deskDepth}
            wallThickness={this.state.wallThickness}
            storageDepth={this.state.storageDepth}
            storageWidth={this.state.storageWidth}
            storage={this.state.storage}
            height={this.state.height}
            width={this.state.width}
          />
      </div>
    )
  }
}

export default App;
