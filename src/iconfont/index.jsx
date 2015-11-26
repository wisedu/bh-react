import React from 'react';

class Icon extends React.Component {

  render() {
    let {className , ...other} = this.props;
    return <i className={className} {...other}></i>;
  }

}

export default Icon;
