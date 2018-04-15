import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import PrivateOffice from './PrivateOffice'
import Area from './Area'
import ModuleDrag from './ModuleDrag'
import CustomDragLayer from './CustomDragLayer'
import '../stylesheets/main.css';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      modules: {
        'Private Office': {
          name: PrivateOffice,
          minWidth: 120,
          minHeight: 118,
          deskWidth: 60,
          deskDepth: 34,
          wallThickness: 4.25,
          storageDepth: 12,
          storageWidth: 72,
          storage: 0,
          height: 118,
          width: 120
        }
      },
      currentModule: 'Private Office',
      deskWidth: 60,
      deskDepth: 34,
      wallThickness: 4.25,
      storageDepth: 12,
      storageWidth: 72,
      storage: 0,
      height: 126.5,
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

    const newState = update(this.state, {
      modules: {
        [this.state.currentModule]: {
          [name]: { $set: Number(value) }
        }
      }
    });

    this.setState(
      newState, () => {
        const modprops = this.state.modules[this.state.currentModule]
        const newDims = update(this.state, {
          modules: {
            [this.state.currentModule]: {
              height: { $set: (modprops.storageWidth > 84 + modprops.deskDepth ? modprops.storageWidth : 84 + modprops.deskDepth) },
              width: { $set: 60 + modprops.deskWidth + modprops.storage*modprops.storageDepth }
            }
          }
        });
        this.setState(newDims)
    });
  }

  render() {
    const modules = Object.keys(this.state.modules).map((mod, i) =>
      <div key={i} className="cursor-pointer"><ModuleDrag name={this.state.modules[`${mod}`].name} human_name={mod} {...this.state.modules[`${mod}`]}/></div>
    );
    return (
      <div className="container mt-5">
        <div className="row mb-5">
          <div className="col-sm-4">
            {modules}
          </div>
          <div className="col-sm-4 pt-4">
            <PrivateOffice
              setHeight={this.setHeight}
              setWidth={this.setWidth}
              {...this.state.modules[this.state.currentModule]}
            />
          </div>
          <div className="col-sm-4">
            <h5 className="mb-5">Design Parameters</h5>
            <form>
              <div className="form-group row" style={{marginBottom: '-12px'}}>
                <label htmlFor="deskWidth" className="col-sm-5 col-form-label">Desk Width: </label>
                <div className="col-sm-5">
                  <input name="deskWidth" className="form-control" type="number" value={this.state.modules['Private Office'].deskWidth} onChange={this.handleChange}/><br/>
                </div>
              </div>
              <div className="form-group row" style={{marginBottom: '-12px'}}>
                <label htmlFor="deskDepth" className="col-sm-5 col-form-label">Desk Depth: </label>
                <div className="col-sm-5">
                  <input name="deskDepth" className="form-control" type="number" value={this.state.modules['Private Office'].deskDepth} onChange={this.handleChange}/><br/>
                </div>
              </div>
              <div className="form-group row" style={{marginBottom: '-12px'}}>
                <label htmlFor="wallThickness" className="col-sm-5 col-form-label">Wall Thickness: </label>
                <div className="col-sm-5">
                  <input name="wallThickness" className="form-control" type="number" value={this.state.modules['Private Office'].wallThickness} onChange={this.handleChange}/><br/>
                </div>
              </div>
              <div className="form-group row" style={{marginBottom: '-12px'}}>
                <label htmlFor="storageDepth" className="col-sm-5 col-form-label">Storage Depth: </label>
                <div className="col-sm-5">
                  <input name="storageDepth" className="form-control" type="number" value={this.state.modules['Private Office'].storageDepth} onChange={this.handleChange}/><br/>
                </div>
              </div>
              <div className="form-group row" style={{marginBottom: '-12px'}}>
                <label htmlFor="storageWidth" className="col-sm-5 col-form-label">Storage Width: </label>
                <div className="col-sm-5">
                  <input name="storageWidth" className="form-control" type="number" value={this.state.modules['Private Office'].storageWidth} onChange={this.handleChange}/><br/>
                </div>
              </div>
              <div className="form-group row" style={{marginBottom: '-12px'}}>
                <label htmlFor="storage" className="col-sm-5 col-form-label">Storage: </label>
                <div className="col-sm-5">
                  <input name="storage" className="form-check-label" type="checkbox" value={this.state.modules['Private Office'].storage} onChange={this.handleChange}/>
                </div>
              </div>
            </form>
          </div>
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
        <CustomDragLayer/>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App);
