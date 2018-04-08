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
      height: 0,
      width: 0
    }

    this.setHeight = this.setHeight.bind(this);
    this.setWidth = this.setWidth.bind(this);
  }

  setHeight(height) {
    this.setState({ height: height })
  }

  setWidth(width) {
    this.setState({ width: width })
  }

  render() {
    return (
      <div>
        <PrivateOffice showMetrics={true} setHeight={this.setHeight} setWidth={this.setWidth}/>
        <br/>
        <Area/>
      </div>
    )
  }
}

export default App;
