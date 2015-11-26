import React from 'react';
import ReactDOM from 'react-dom';
import "../src/form/form.scss";
import {Form, Input, Button, Checkbox, Radio, Row, Col, message} from '../index.js';
const FormItem = Form.Item;
const FormEMAP = Form.MappingEMAP;
const RadioGroup = Radio.Group;
var pageMeta = require("../datas/pageMeta.json");

var formEMAP = new FormEMAP(pageMeta);
var items = formEMAP.getItems("ddrzcx", 2);

const Demo = React.createClass({
  mixins: [Form.ValueMixin],

  getInitialState() {
    return {
      formData: {
        userName: '大眼萌 minion',
        password: undefined,
        gender: 'male',
        remark: undefined,
        agreement: undefined,
      }
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    message.success("收到表单值~~~ ：" + JSON.stringify(this.state.formData, function(k, v) {
      if (typeof v === 'undefined') {
        return '';
      }
      return v;
    }));
  },

  render() {
    const formData = this.state.formData;
    return (
      <Form className="bh-fm-compact edit" horizontal cols="2">
        {items}
        <Row>
          <Col span="4" offset="8">
            <Button type="primary" onClick={this.handleSubmit}>确定</Button>
          </Col>
        </Row>
      </Form>
    );
  }
});

ReactDOM.render(<Demo />, document.getElementById('app'));
