import React from 'react';

export default class Button extends React.Component {
  render() {
    const props = this.props;
    const {onClick, htmlType, children, ...others} = props;

    return <a {...others} type={htmlType || 'button'} onClick={onClick}>
      {props.children}
    </a>;
  }
}

Button.propTypes = {
  type: React.PropTypes.string,
  htmlType: React.PropTypes.string,
  onClick: React.PropTypes.func,
  loading: React.PropTypes.bool,
  className: React.PropTypes.string
};

Button.defaultProps = {
  onClick() {}
};
