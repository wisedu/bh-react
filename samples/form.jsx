import React from 'react';
import ReactDOM from 'react-dom';
import {Form, Input, Button, Checkbox, Radio, Row, Col, message} from '../index.js';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
var pageMeta = require("../datas/pageMeta.json");

var items = pageMeta.models[3].controls.map((item, index)=>{
  if(!item.hidden){
    return (<FormItem key={item.name} id={item.name} label={item.caption} required={item.require} col={item.col} cols="3">
      <Input type={item.xtype} name={item.name} placeholder={item.placeholder} readOnly={item.readonly}/>
    </FormItem>);
  }
});

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
      <Form horizontal onSubmit={this.handleSubmit} cols="2">
        {items}
        <Row>
          <Col span="4" offset="8">
            <Button type="primary" htmlType="submit">确定</Button>
          </Col>
        </Row>
      </Form>
    );
  }
});

ReactDOM.render(<Demo />, document.getElementById('app'));
