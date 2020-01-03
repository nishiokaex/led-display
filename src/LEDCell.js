import React from 'react';
import styles from './LEDCell.module.css';

/**
 * props.value: 0 or 1
 */
class LEDCell extends React.Component {
  render () {
    if (this.props.value === 0) {
      return <div className={styles.off} />;
    } else {
      return <div className={styles.on} />;
    }
  }
}

export default LEDCell;
