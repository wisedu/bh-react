import React from 'react';
import ReactDOM from 'react-dom';
import {Form, Input, Row, Col} from '../index.js';
const FormItem = Form.Item;
//const RadioGroup = Radio.Group;

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
    // message.success("收到表单值~~~ ：" + JSON.stringify(this.state.formData, function(k, v) {
    //   if (typeof v === 'undefined') {
    //     return '';
    //   }
    //   return v;
    // }));
  },

  render() {
    const formData = this.state.formData;
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          label="用户名："
          labelCol={{span: 6}}
          wrapperCol={{span: 6}}
          required={true} >
          <p className="ant-form-text" id="userName" name="userName">大眼萌 minion</p>
        </FormItem>
        <FormItem
          id="password"
          label="密码："
          labelCol={{span: 6}}
          wrapperCol={{span: 14}}
          required={true} >
          <Input type="password" id="password" name="password" placeholder="请输入密码" value={formData.password} onChange={this.setValue.bind(this, 'password')} />
        </FormItem>
        <FormItem
          id="remark"
          label="备注："
          labelCol={{span: 6}}
          wrapperCol={{span: 14}}
          required={true}
          help="随便写点什么" >
          <Input type="textarea" placeholder="随便写" id="remark" name="remark" value={formData.remark} onChange={this.setValue.bind(this, 'remark')} />
        </FormItem>
      </Form>
    );
  }
});

ReactDOM.render(<Demo />, document.getElementById('app'));
