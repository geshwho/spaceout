import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import PrivateOffice, {PrivateOfficeDesignParams} from './PrivateOffice'
import ConferenceRoom, {ConferenceRoomDesignParams} from './ConferenceRoom'
import Space from './Space'
import ModuleDrag from './ModuleDrag'
import CustomDragLayer from './CustomDragLayer'
import '../stylesheets/main.css';
import { DragDropContext } from 'react-dnd';
import MouseBackEnd from 'react-dnd-mouse-backend'
import update from 'immutability-helper';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      modules: {
        'Private Office': {
          name: PrivateOffice,
          modparams: PrivateOfficeDesignParams,
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
        },
        'Conference Room': {
          name: ConferenceRoom,
          modparams: ConferenceRoomDesignParams,
          height: 50,
          width: 50,
          minHeight: 50,
          minWidth: 50,
          wallThickness: 4.25,
        }
      },
      currentModule: 'Private Office',
    }

    this.setHeight = this.setHeight.bind(this);
    this.setWidth = this.setWidth.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setCurrentModule = this.setCurrentModule.bind(this);
  }

  setHeight(height) {
    this.setState({ height: height })
  };

  setWidth(width) {
    this.setState({ width: width })
  };

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
              width: { $set: 60 + modprops.deskWidth + modprops.storage*modprops.storageDepth },
              minWidth: { $set: 60 + modprops.deskWidth + modprops.storage*modprops.storageDepth },
              minHeight: { $set: (modprops.storageWidth > 84 + modprops.deskDepth ? modprops.storageWidth : 84 + modprops.deskDepth) },
            }
          }
        });
        this.setState(newDims)
    });
  }

  setCurrentModule(mod) {
    this.setState({ currentModule: mod })
  }

  render() {
    const modules = Object.keys(this.state.modules).map((mod, i) =>
      <div key={i} className="cursor-pointer" onClick={() => this.setCurrentModule(mod)}><ModuleDrag name={this.state.modules[`${mod}`].name} human_name={mod} {...this.state.modules[`${mod}`]}/></div>
    );
    const DesignParameters = this.state.modules[this.state.currentModule].modparams
    const currentModule = this.state.modules[this.state.currentModule];
    return (
      <div className="container mt-5">
        <div className="row mb-5">
          <div className="col-sm-4">
            {modules}
          </div>
          <div className="col-sm-4 pt-4">
            <currentModule.name
              setHeight={this.setHeight}
              setWidth={this.setWidth}
              {...currentModule}
            />
          </div>
          <div className="col-sm-4">
            { <DesignParameters handleChange={this.handleChange} {...this.state.modules[this.state.currentModule]}/> }
          </div>
          <Space/>
        </div>
        <CustomDragLayer/>
      </div>
    )
  }
}

export default DragDropContext(MouseBackEnd)(App);
