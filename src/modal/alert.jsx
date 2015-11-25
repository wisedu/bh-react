import React from 'react';
import Dialog from 'rc-dialog';
import Button from '../button/index.jsx';

let AlertDialog = React.createClass({
    handleClose(){
        if(this.props.handleOk){
            this.props.handleOk();
            this.props.onClose();
        }else{
            this.props.onClose();
        }
    },
    render: function () {
        return (<Button classType="primary" onClick={this.handleClose}>{this.props.okBtnText ? this.props.okBtnText : "确定"}</Button>);
    }
});

export default AlertDialog;
