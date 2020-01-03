import React from 'react';
import LEDCell from './LEDCell';
import styles from './LEDMatrix.module.css';

/**
 * props.width: number
 * props.height: number
 * props.bitmap: array
 */
class LEDMatrix extends React.Component {
  render () {
    let matrix = [];
    for (let y = 0; y < this.props.height; y++) {
      for (let x = 0; x < this.props.width; x++) {
        let i = x + this.props.width * y;
        matrix.push (<LEDCell key={i} value={this.props.bitmap[i]} />);
      }
    }

    return <div className={styles.grid}>{matrix}</div>;
  }
}

export default LEDMatrix;
