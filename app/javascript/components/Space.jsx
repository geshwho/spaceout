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
  }

  addArea(item) {
    const newAreas = update(this.state.areas, { $push: [{...item}] })
    this.setState({ areas: newAreas })
  }

  render() {
    const { isOver, canDrop, connectDropTarget } = this.props;
    const areas = this.state.areas.map((area, i) =>
      <Area key={i} {...area}/>
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
