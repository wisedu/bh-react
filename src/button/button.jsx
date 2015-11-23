import React from 'react';
import rcUtil from 'rc-util';

const prefix = 'bh-btn-';

export default class Button extends React.Component {
  render() {
    const props = this.props;
    const {classType, onClick, htmlType, className, children, ...others} = props;

    const classArr = {'bh-btn': true, [className]: className};
    if(classType){
      let classList = classType.split(" ");
      for(var value of classList){
        if(value){
          classArr[prefix + value] = value;
        }
      }
    }

    const classes = rcUtil.classSet(classArr);

    return <a {...others} type={htmlType || 'button'} className={classes} onClick={onClick}>
      {props.children}
    </a>;
  }
}

Button.propTypes = {
  classType: React.PropTypes.string,
  htmlType: React.PropTypes.string,
  onClick: React.PropTypes.func,
  loading: React.PropTypes.bool,
  className: React.PropTypes.string
};

Button.defaultProps = {
  onClick() {}
};
