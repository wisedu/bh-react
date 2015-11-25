import React from 'react';
import rcUtil from 'rc-util';

const Col = React.createClass({
  propTypes: {
    span: React.PropTypes.string,
    order: React.PropTypes.string,
    offset: React.PropTypes.string,
    push: React.PropTypes.string,
    pull: React.PropTypes.string,
    className: React.PropTypes.string,
    children: React.PropTypes.node,
  },
  render() {
    const {span, order, offset, push, pull, className, ...others} = this.props;
    const prefixCls = "bh-";
    const classes = rcUtil.classSet({
      [prefixCls + 'col-md-' + span]: span,
      [prefixCls + 'col-order-' + order]: order,
      [prefixCls + 'col-offset-' + offset]: offset,
      [prefixCls + 'col-push-' + push]: push,
      [prefixCls + 'col-pull-' + pull]: pull,
      [className]: className,
    });
    return <div {...others} className={classes}>{ this.props.children }</div>;
  },
});

export default Col;
