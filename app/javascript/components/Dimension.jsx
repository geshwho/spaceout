import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Dimension extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: props.offset || false,
      offset_val: props.offset ? (props.offset_val || 15) : 0,
      vertical: props.x1 == props.x2,
      default_text: props.x1 == props.x2 ? 'Depth' : 'Width'
    }
  }
  render() {
    const props = this.props;
    const offset_val = this.state.offset_val;
    const vertical = this.state.vertical;
    const one = vertical ? 'y' : 'x'
    const two = vertical ? 'x' : 'y'
    const line1opts = {[`${one}1`]: (vertical ? props.y1 : props.x1), [`${two}1`]: (vertical ? props.x1 : props.y1)+2, [`${one}2`]: (vertical ? props.y1 : props.x1), [`${two}2`]: (vertical ? props.x1 : props.y1)-offset_val-4};
    const line2opts = {[`${one}1`]: (vertical ? props.y2 : props.x2), [`${two}1`]: (vertical ? props.x2 : props.y2)+2, [`${one}2`]: (vertical ? props.y2 : props.x2), [`${two}2`]: (vertical ? props.x2 : props.y2)-offset_val-4};
    const line3opts = {[`${one}1`]: (vertical ? props.y1 : props.x1)-4, [`${two}1`]: (vertical ? props.x1 : props.y1)-offset_val, [`${one}2`]: (vertical ? props.y2 : props.x2)+4, [`${two}2`]: (vertical ? props.x1 : props.y1)-offset_val};
    const line4opts = {[`${one}1`]: (vertical ? props.y1 : props.x1)-2, [`${two}1`]: (vertical ? props.x1 : props.y1)-offset_val+2, [`${one}2`]: (vertical ? props.y1 : props.x1)+2, [`${two}2`]: (vertical ? props.x1 : props.y1)-offset_val-2};
    const line5opts = {[`${one}1`]: (vertical ? props.y2 : props.x2)-2, [`${two}1`]: (vertical ? props.x2 : props.y2)-offset_val+2, [`${one}2`]: (vertical ? props.y2 : props.x2)+2, [`${two}2`]: (vertical ? props.x2 : props.y2)-offset_val-2};
    const text1opts = {[`${one}`]: (vertical ? props.y2+props.y1 : props.x2+props.x1)/2, [`${two}`]: (vertical ? props.x2 : props.y2)-offset_val-4, ["transform"]: `rotate(${vertical ? '-90' : '0'} ${vertical ? props.x2-offset_val-4 : (props.x2+props.x1)/2},${vertical ? (props.y2+props.y1)/2 : props.y2-offset_val-4})`}
    const text2opts = {[`${one}`]: (vertical ? props.y2+props.y1 : props.x2+props.x1)/2, [`${two}`]: (vertical ? props.x2 : props.y2)-offset_val+4, ["transform"]: `rotate(${vertical ? '-90' : '0'} ${vertical ? props.x2-offset_val+4 : (props.x2+props.x1)/2},${vertical ? (props.y2+props.y1)/2 : props.y2-offset_val+4})`}
    const commontext = {["textAnchor"]: "middle", ["alignmentBaseline"]: "middle", ["style"]: {fontSize: "6"}}
    return (
      <g>
        { this.state.offset &&
          <g>
            <line {...line1opts} style={{fill: 'none', stroke: 'black', strokeWidth: .25}}/>
            <line {...line2opts} style={{fill: 'none', stroke: 'black', strokeWidth: .25}}/>
          </g>
        }
        <line {...line3opts} style={{fill: 'none', stroke: 'black', strokeWidth: .25}}/>
        <line {...line4opts} style={{fill: 'none', stroke: 'black', strokeWidth: 1}}/>
        <line {...line5opts} style={{fill: 'none', stroke: 'black', strokeWidth: 1}}/>
        <text {...text1opts} {...commontext}>{vertical ? (props.y2-props.y1).toFixed(2) : (props.x2-props.x1).toFixed(2)}"</text>
        <text {...text2opts} {...commontext}>{props.text || this.state.default_text}</text>
      </g>
    )
  }
}

export default Dimension;
