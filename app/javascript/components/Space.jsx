import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
import Area from './Area'
import {getMouseObjectDiff} from './utilities/mouse_position.js'
import update from 'immutability-helper';

const moduleDrop = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const {relX, relY} = getMouseObjectDiff('canvas');
    item.relX = relX-item.relX;
    item.relY = relY-item.relY;
    item.areaKey = Math.random().toString(36).substr(2, 9);
    component.addArea(item);
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  }
}

class Space extends React.Component {
  constructor(){
    super()
    this.state = {
      areas: []
    }

    this.moveHandler = this.moveHandler.bind(this);
  }

  moveHandler(areaKey, moveType, xDiff, yDiff) {
    const index = this.state.areas.findIndex((x) => x.areaKey == areaKey);
    const areas = this.state.areas
    var newRelX = this.state.areas[index].relX
    var newRelY = this.state.areas[index].relY
    var newWidth = this.state.areas[index].width
    var newHeight = this.state.areas[index].height
    switch(moveType) {
      case 'L':
        newRelX = areas[index].relX + xDiff;
        newWidth = areas[index].width - xDiff;
        break;
      case 'T':
        newRelY = areas[index].relY + yDiff;
        break;
      case 'R':
        newWidth = areas[index].width + xDiff;
        break;
      case 'B':
        newHeight = areas[index].height + yDiff;
        break;
      case 'TL':
        newRelX = areas[index].relX + xDiff;
        newRelY = areas[index].relY + yDiff;
        break;
      case 'TR':
        newRelY = areas[index].relY + yDiff;
        newWidth = areas[index].width + xDiff;
        break;
      case 'BL':
        newHeight = areas[index].height + yDiff;
        newRelX = areas[index].relX + xDiff;
        break;
      case 'BR':
        newHeight = areas[index].height + yDiff;
        newWidth = areas[index].width + xDiff;
        break;
      case 'MOVE':
        newRelX = areas[index].relX + xDiff;
        newRelY = areas[index].relY + yDiff;
        break;
    }
    const newArea = update(this.state.areas[index], {
      relX: {$set: newRelX},
      relY: {$set: newRelY},
      height: {$set: newHeight},
      width: {$set: newWidth}
    })
    this.setState(prevState => ({areas: prevState.areas.filter(x => x.areaKey != areaKey).concat([newArea])}));
  }

  addArea(item) {
    const newAreas = update(this.state.areas, { $push: [{...item}] })
    this.setState({ areas: newAreas })
  }

  render() {
    const { isOver, canDrop, connectDropTarget } = this.props;
    const areas = this.state.areas.map((area, i) =>
      <Area key={i} {...area} moveHandler={this.moveHandler}/>
    )
    return connectDropTarget(
      <div style={{position: 'absolute', top: '450px'}}>
        <svg id="canvas" height={400} width={1000} style={{border: '1px black solid'}}>
          {areas}
        </svg>
      </div>
    )
  }
}

export default DropTarget(ItemTypes.MODULE, moduleDrop, collect)(Space);
