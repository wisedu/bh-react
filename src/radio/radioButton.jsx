import React from 'react';
import AntRadio from './radio';

const RadioButton = React.createClass({
  getDefaultProps() {
    return {
      className: 'bh-radio-button'
    };
  },
  render() {
    return (
      <AntRadio {...this.props} />
    );
  }
});

module.exports = RadioButton;
