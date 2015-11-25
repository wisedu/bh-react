'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from '../src/modal/index.jsx';
import Button from '../src/button/index.jsx';

const AlertDialog = React.createClass({
    getInitialState() {
        return {
            visible: false,
            title: "这是一条提醒信息",
            type: "alert",
            okBtnText: "",
            handleOk: this.handleOk
        };
    },
    handleOk(){
        console.log("1111")
    },
    showModal() {
        this.setState({
            visible: true
        });
    },
    render() {
        return <div>
                    <Button classType="primary" onClick={this.showModal}>alert对话框</Button>
                    <Dialog {...this.state}  />
                </div>;
    }
});
ReactDOM.render(<AlertDialog /> , document.getElementById('example_alert'));


const ConfirmDialog = React.createClass({
    getInitialState() {
        return {
            visible: false,
            title: "这是一条confirm信息",
            type: "confirm",
            okBtnText: "",
            cancelBtnText: "",
            handleOk: this.handleOk,
            handleCancel: this.handleCancel
        };
    },
    handleOk(){
        console.log("确认")
    },
    handleCancel(){
        console.log("取消")
    },
    showModal() {
        this.setState({
            visible: true
        });
    },
    render() {
        return <div>
                    <Button classType="primary" onClick={this.showModal}>confirm对话框</Button>
                    <Dialog {...this.state}  />
                </div>;
    }
});

ReactDOM.render(<ConfirmDialog /> , document.getElementById('example_confirm'));
