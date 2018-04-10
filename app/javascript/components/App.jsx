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
      wallThickness: 4,
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
      <div>
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
