import React from 'react';

class Icon extends React.Component {

  render() {
    let {className , ...other} = this.props;
    let curClassName = "fa fa-"+className;
    return <i className={curClassName} {...other}></i>;
  }

}

export default Icon;
