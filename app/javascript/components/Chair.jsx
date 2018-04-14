import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Chair = props => (
  <path d={`
    M ${props.x} ${props.y}
    l 7 0
    l 3 -1
    l 1 -3
    l -2 -12
    l -6 -2
    l -6 0
    l -6 2
    l -2 12
    l 1 3
    l 3 1
    l 7 0
    m 9 -16
    l -1 3
    l -5 -1
    l -6 0
    l -5 1
    l -1 -3`
  }/>
)

export default Chair;
