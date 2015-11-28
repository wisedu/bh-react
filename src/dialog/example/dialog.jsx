'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from '../index.jsx';
import Button from '../../button/index.jsx';
import FormDemo from './dialogForm.jsx';

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

const HasContentTextDialog = React.createClass({
    getInitialState() {
        return {
            visible: false,
            title: "这是一条提醒信息",
            type: "alert",
            okBtnText: "",
            handleOk: this.handleOk,
            content: "史蒂夫·乔布斯是一位极具创造力的企业家，史蒂夫·乔布斯有如过山车般精彩的人生和犀利激越的性格，充满追求完美和誓不罢休的激情，史蒂夫·乔布斯创造出个人电脑、动画电影、音乐、手机、平板电脑以及数字出版等6大产业的颠覆性变革。史蒂夫·乔布斯的个性经常让周围的人愤怒和绝望，但其所创造出的产品也与这种个性息息相关，全然不可分割的，正如苹果的硬件和软件一样。两年多的时间，与史蒂夫·乔布斯40多次的面对面倾谈，以及与史蒂夫·乔布斯一百多个家庭成员、朋友、竞争对手、同事的不受限的采访，造就了这本独家传记。 史蒂夫·乔布斯的故事既具有启发意义，又有警示意义，充满了关于创新、个性、领导力以及价值观的教益。"
        };
    },
    handleOk(){
        console.log("确认")
    },
    showModal() {
        this.setState({
            visible: true
        });
    },
    render() {
        return <div>
            <Button classType="primary" onClick={this.showModal}>带文本的对话框</Button>
            <Dialog {...this.state}  />
        </div>;
    }
});

ReactDOM.render(<HasContentTextDialog /> , document.getElementById('example_content_text'));


const SuccessDialog = React.createClass({
    getInitialState() {
        return {
            visible: false,
            title: "这是一条提示成功的提醒",
            type: "alert",
            showType: "success",
            okBtnText: "",
            content: "史蒂夫·乔布斯是一位极具创造力的企业家，史蒂夫·乔布斯有如过山车般精彩的人生和犀利激越的性格，充满追求完美和誓不罢休的激情，史蒂夫·乔布斯创造出个人电脑、动画电影、音乐、手机、平板电脑以及数字出版等6大产业的颠覆性变革。",
            handleOk: this.handleOk
        };
    },
    handleOk(){
        console.log("确认")
    },
    showModal() {
        this.setState({
            visible: true
        });
    },
    render() {
        return <div>
            <Button classType="primary" onClick={this.showModal}>sussess 对话框</Button>
            <Dialog {...this.state}  />
        </div>;
    }
});

ReactDOM.render(<SuccessDialog /> , document.getElementById('example_alert_success'));



const WarningDialog = React.createClass({
    getInitialState() {
        return {
            visible: false,
            title: "这是一条警告信息",
            type: "alert",
            showType: "warning",
            okBtnText: "",
            content: "史蒂夫·乔布斯是一位极具创造力的企业家，史蒂夫·乔布斯有如过山车般精彩的人生和犀利激越的性格，充满追求完美和誓不罢休的激情，史蒂夫·乔布斯创造出个人电脑、动画电影、音乐、手机、平板电脑以及数字出版等6大产业的颠覆性变革。",
            handleOk: this.handleOk
        };
    },
    handleOk(){
        console.log("确认")
    },
    showModal() {
        this.setState({
            visible: true
        });
    },
    render() {
        return <div>
            <Button classType="primary" onClick={this.showModal}>warning 对话框</Button>
            <Dialog {...this.state}  />
        </div>;
    }
});

ReactDOM.render(<WarningDialog /> , document.getElementById('example_alert_warning'));



const DangerDialog = React.createClass({
    getInitialState() {
        return {
            visible: false,
            title: "这是一条危险信息",
            type: "alert",
            showType: "danger",
            okBtnText: "",
            content: "史蒂夫·乔布斯是一位极具创造力的企业家，史蒂夫·乔布斯有如过山车般精彩的人生和犀利激越的性格，充满追求完美和誓不罢休的激情，史蒂夫·乔布斯创造出个人电脑、动画电影、音乐、手机、平板电脑以及数字出版等6大产业的颠覆性变革。",
            handleOk: this.handleOk
        };
    },
    handleOk(){
        console.log("确认")
    },
    showModal() {
        this.setState({
            visible: true
        });
    },
    render() {
        return <div>
            <Button classType="primary" onClick={this.showModal}>danger 对话框</Button>
            <Dialog {...this.state}  />
        </div>;
    }
});

ReactDOM.render(<DangerDialog /> , document.getElementById('example_alert_danger'));


const FormDialog = React.createClass({
    getInitialState() {
        return {
            visible: false,
            title: "这是一个表单",
            content: <FormDemo />,
            handleOk: this.handleOk,
            handleCancel: this.handleCancel,
            width: 800
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
            <Button classType="primary" onClick={this.showModal}>表单对话框</Button>
            <Dialog {...this.state}  />
        </div>;
    }
});

ReactDOM.render(<FormDialog /> , document.getElementById('example_alert_form'));
