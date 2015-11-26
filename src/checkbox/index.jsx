import Checkbox from 'rc-checkbox';
import React from 'react';

module.exports = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'bh-checkbox'
    };
  },
  render() {
    return <Checkbox {...this.props} />;
  }
});
