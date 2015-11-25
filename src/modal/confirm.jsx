import React from 'react';
import Dialog from 'rc-dialog';
import Button from '../button/index.jsx';

let ConfirmDialog = React.createClass({
  handleOk(){
    if(this.props.handleOk){
      this.props.handleOk();
      this.props.onClose();
    }
  },
  handleCancel(){
    if(this.props.handleCancel){
      this.props.handleCancel();
    }
    this.props.onClose();
  },
  render: function () {
    return (
        <div>
          <Button classType="primary" onClick={this.handleOk}>{this.props.okBtnText ? this.props.okBtnText : "确定"}</Button>
          <Button classType="default" onClick={this.handleCancel}>{this.props.cancelBtnText ? this.props.cancelBtnText : "取消"}</Button>
        </div>
    );
  }
});

export default ConfirmDialog;
