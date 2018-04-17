import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend'
import PrivateOffice from './PrivateOffice'
import ConferenceRoom from './ConferenceRoom'
import ItemTypes from './ItemTypes'
import {getMouseObjectDiff} from './utilities/mouse_position.js'

const moduleSource = {
  beginDrag(props) {
    var item = Object.assign({...props}, getMouseObjectDiff(props.human_name))
    return item;
  },

  endDrag(props, monitor, component) {
    if(!monitor.didDrop()){
      return;
    }

    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    //Do something
  }
}
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

class ModuleDrag extends React.Component {
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
			captureDraggingState: true,
		})
  }

  render() {
    const { isDragging, connectDragSource, human_name } = this.props;
    return connectDragSource(
      <div id={human_name}>
        {human_name}
      </div>
    )
  }
}

export default DragSource(ItemTypes.MODULE, moduleSource, collect)(ModuleDrag)
