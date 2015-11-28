'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Tree from '../src/tree/src';

import {Form, Input, Button, Row, Col, Validation} from '../index.js';
const FormItem = Form.Item;
const FormEMAP = Form.MappingEMAP;
var pageMeta = require("../datas/pageMeta.json");

var formEMAP = new FormEMAP(pageMeta);


$.getJSON('./data/data.json',(data) => {
    let treeDatas = data.datas.code.rows;
    ReactDOM.render(<Tree
        data={treeDatas}
        multiple={false}
        showIcon={true}
        defaultExpandAll={false}
        onSelect={handleSelect}
        //defaultSelectedKeys={["000012"]}
    />, document.getElementById('treedemo'));
});

const TreeForm = React.createClass({
    mixins: [Form.ValueMixin],

    handleSubmit(e) {
        e.preventDefault();
        const validation = this.refs.validation;
        validation.validate((valid) => {
            if (!valid) {
                console.log('error in form');
                return;
            } else {
                console.log('submit');
            }
            console.log(this.state.formData);
        });
    },

    render() {
        return (
            <Form className="bh-fm-compact edit" horizontal>
                <Validation ref="validation" onValidate={this.handleValidate}>
                    {formEMAP.getItems(this.props.dataSource, "2")}
                </Validation>
                <Row>
                    <Col span="4" offset="8">
                        <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
});
ReactDOM.render(<TreeForm dataSource="ddrzcx"/>, document.getElementById('jstree1'));

function handleSelect (info) {
    var pos = info.node.props.pos;
    var level = pos.split("-").length -1;


    if (level == 1) {
        $(".form-title").html(info.node.props.title);
        $("#jstree1").show();
        $("#jstree2").hide();


    }else if (level == 2){
        $(".form-title").html(info.node.props.title);
        $("#jstree2").show();
        $("#jstree1").hide();
    }
}