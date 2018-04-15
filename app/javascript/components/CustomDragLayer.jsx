import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { DragLayer } from 'react-dnd'
import PrivateOffice from './PrivateOffice'

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
  	initialOffset: monitor.getInitialSourceClientOffset(),
  	currentOffset: monitor.getSourceClientOffset(),
  	isDragging: monitor.isDragging(),
  };
}

function getItemStyles(props) {
	const { initialOffset, currentOffset } = props
	if (!initialOffset || !currentOffset) {
		return {
			display: 'none',
		}
	}

	let { x, y } = currentOffset

	// if (props.snapToGrid) {
	// 	x -= initialOffset.x
	// 	y -= initialOffset.y
	// 	;[x, y] = snapToGrid(x, y)
	// 	x += initialOffset.x
	// 	y += initialOffset.y
	// }

	const transform = `translate(${x}px, ${y}px)`
	return {
		transform,
		WebkitTransform: transform,
	}
}

class CustomDragLayer extends React.Component {
  render() {
    const { initialOffset, currentOffset } = this.props
    return (
      <div style={{position: 'fixed', zIndex: 100, left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none'}}>
        <div style={getItemStyles(this.props)}>
          {this.props.item && this.props.item.name && <this.props.item.name {...this.props.item}/>}
        </div>
      </div>
    )
  }
}

export default DragLayer(collect)(CustomDragLayer);
