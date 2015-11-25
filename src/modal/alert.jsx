import React from 'react';
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
        let className = "primary";
        let props = this.props;
        if(props.showType === "success"){
            className = "success";
        }else if(props.showType === "warning"){
            className = "warning";
        }else if(props.showType === "danger"){
            className = "danger";
        }
        return (<Button classType={className} onClick={this.handleClose}>{this.props.okBtnText ? this.props.okBtnText : "确定"}</Button>);
    }
});

export default AlertDialog;
