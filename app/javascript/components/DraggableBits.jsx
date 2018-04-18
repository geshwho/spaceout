import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'
import {getMousePosition} from './utilities/mouse_position.js'

const ResizeArea = 10;

const areaSource = {
  beginDrag(props) {
    var item = Object.assign({...props}, getMousePosition())
    return item;
  },

  endDrag(props, monitor, component) {
    const item = monitor.getItem();
    const { mouseX, mouseY } = getMousePosition();
    const xDiff = mouseX - item.mouseX;
    const yDiff = mouseY - item.mouseY;
    props.moveHandler(props.areaKey, props.moveType, xDiff, yDiff);
  }
}
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

class DraggableBits extends React.Component {
  render() {
    return (
      <g pointerEvents="visible" style={{fill: 'none'}}>
        <HocDraggableL {...this.props} moveType='L'/>
        <HocDraggableT {...this.props} moveType='T'/>
        <HocDraggableR {...this.props} moveType='R'/>
        <HocDraggableB {...this.props} moveType='B'/>
        <HocDraggableTL {...this.props} moveType='TL'/>
        <HocDraggableTR {...this.props} moveType='TR'/>
        <HocDraggableBL {...this.props} moveType='BL'/>
        <HocDraggableBR {...this.props} moveType='BR'/>
        <HocDraggableMid {...this.props} moveType='MOVE'/>
      </g>
    )
  }
}

class DraggableL extends React.Component {
  render() {
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource(
      <rect x={this.props.x} y={this.props.y+ResizeArea} width={ResizeArea} height={this.props.height-2*ResizeArea} style={{cursor: 'ew-resize'}}/>
    )
  }
}
const HocDraggableL = DragSource(ItemTypes.AREA, areaSource, collect)(DraggableL)
class DraggableT extends React.Component {
  render() {
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource(
      <rect x={this.props.x+ResizeArea} y={this.props.y} width={this.props.width-2*ResizeArea} height={ResizeArea} style={{cursor: 'ns-resize'}}/>
    )
  }
}
const HocDraggableT = DragSource(ItemTypes.AREA, areaSource, collect)(DraggableT)
class DraggableR extends React.Component {
  render() {
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource(
      <rect x={this.props.x+this.props.width-ResizeArea} y={this.props.y+ResizeArea} width={ResizeArea} height={this.props.height-2*ResizeArea} style={{cursor: 'ew-resize'}}/>
    )
  }
}
const HocDraggableR = DragSource(ItemTypes.AREA, areaSource, collect)(DraggableR)
class DraggableB extends React.Component {
  render() {
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource(
      <rect x={this.props.x+ResizeArea} y={this.props.y+this.props.height-ResizeArea} width={this.props.width-2*ResizeArea} height={ResizeArea} style={{cursor: 'ns-resize'}}/>
    )
  }
}
const HocDraggableB = DragSource(ItemTypes.AREA, areaSource, collect)(DraggableB)
class DraggableTL extends React.Component {
  render() {
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource(
      <rect x={this.props.x} y={this.props.y} width={ResizeArea} height={ResizeArea} style={{cursor: 'nwse-resize'}}/>
    )
  }
}
const HocDraggableTL = DragSource(ItemTypes.AREA, areaSource, collect)(DraggableTL)
class DraggableTR extends React.Component {
  render() {
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource(
      <rect x={this.props.x+this.props.width-ResizeArea} y={this.props.y} width={ResizeArea} height={ResizeArea} style={{cursor: 'nesw-resize'}}/>
    )
  }
}
const HocDraggableTR = DragSource(ItemTypes.AREA, areaSource, collect)(DraggableTR)
class DraggableBL extends React.Component {
  render() {
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource(
      <rect x={this.props.x} y={this.props.y+this.props.height-ResizeArea} width={ResizeArea} height={ResizeArea} style={{cursor: 'nesw-resize'}}/>
    )
  }
}
const HocDraggableBL = DragSource(ItemTypes.AREA, areaSource, collect)(DraggableBL)
class DraggableBR extends React.Component {
  render() {
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource(
      <rect x={this.props.x+this.props.width-ResizeArea} y={this.props.y+this.props.height-ResizeArea} width={ResizeArea} height={ResizeArea} style={{cursor: 'nwse-resize'}}/>
    )
  }
}
const HocDraggableBR = DragSource(ItemTypes.AREA, areaSource, collect)(DraggableBR)
class DraggableMid extends React.Component {
  render() {
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource(
      <rect x={this.props.x+ResizeArea} y={this.props.y+ResizeArea} width={this.props.width-2*ResizeArea} height={this.props.height-2*ResizeArea} style={{cursor: 'pointer'}}/>
    )
  }
}
const HocDraggableMid = DragSource(ItemTypes.AREA, areaSource, collect)(DraggableMid)


export default DraggableBits;
