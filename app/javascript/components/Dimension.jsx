import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Dimension extends React.Component {
  render() {
    const props = this.props;
    const m = (props.y2-props.y1)/(props.x2-props.x1);
    const mprime = (props.x1-props.x2)/(props.y2-props.y1);
    return (
      <g>
        <line x1={props.x1} y1={props.y1} x2={-Math.sqrt((props.offset*props.offset)/(1+mprime*mprime))+props.x1} y2={-Math.sqrt((props.offset*props.offset)/(1+mprime*mprime))*mprime+props.y1} style={{fill: 'none', stroke: 'black', strokeWidth: .25}}/>
        <line x1={props.x2} y1={props.y2} x2={-Math.sqrt((props.offset*props.offset)/(1+mprime*mprime))+props.x2} y2={-Math.sqrt((props.offset*props.offset)/(1+mprime*mprime))*mprime+props.y2} style={{fill: 'none', stroke: 'black', strokeWidth: .25}}/>
        <line x1={-Math.sqrt((props.offset*props.offset)/(1+mprime*mprime))+props.x1} y1={-Math.sqrt((props.offset*props.offset)/(1+mprime*mprime))*mprime+props.y1} x2={-Math.sqrt((props.offset*props.offset)/(1+mprime*mprime))+props.x2} y2={-Math.sqrt((props.offset*props.offset)/(1+mprime*mprime))*mprime+props.y2} style={{fill: 'none', stroke: 'black', strokeWidth: .25}}/>
        <line x1={props.x1-2} y1={-props.offset+2} x2={props.x1+2} y2={-props.offset-2} style={{fill: 'none', stroke: 'black', strokeWidth: 1}}/>
        <line x1={props.x2-2} y1={-props.offset+2} x2={props.x2+2} y2={-props.offset-2} style={{fill: 'none', stroke: 'black', strokeWidth: 1}}/>
        <text x={(props.x2+props.x1)/2} y={-props.offset-4} textAnchor="middle" alignmentBaseline="middle" style={{fontSize: '6'}}>{(props.x2-props.x1).toFixed(2)}"</text>
        <text x={(props.x2+props.x1)/2} y={-props.offset+4} textAnchor="middle" alignmentBaseline="middle" style={{fontSize: '6'}}>{!props.inArea && 'Minimum'} Width</text>
      </g>
    )
  }
}

export default Dimension;
