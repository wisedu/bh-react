import React from 'react';
import classSet from 'classnames';

const cx = classSet;

class Form extends React.Component {
  contextTypes: {
    cols: React.PropTypes.string
  }
  render() {
    const prefixCls = this.props.prefixCls;
    const formClassName = {
      [`${prefixCls}-horizontal`]: this.props.horizontal,
      [`${prefixCls}-inline`]: this.props.inline,
      ["validates"]:true
    };
    const classes = cx(formClassName);

    return (
      <form {...this.props} className={classes}>
        {this.props.children}
        <div className="clearfix bh-clearfix"></div>
      </form>
    );
  }
}

Form.propTypes = {
  prefixCls: React.PropTypes.string,
  horizontal: React.PropTypes.bool,
  inline: React.PropTypes.bool,
  children: React.PropTypes.any,
  onSubmit: React.PropTypes.func,
  cols: React.PropTypes.string
};

Form.defaultProps = {
  prefixCls: 'bh-form',
};

module.exports = Form;
