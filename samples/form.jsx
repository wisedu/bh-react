import React from 'react';
import ReactDOM from 'react-dom';
import {Form, Input, Button, Checkbox, Radio, Row, Col, message} from '../index.js';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

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
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          label="用户名："
          labelCol={{span: 4}}
          wrapperCol={{span: 8}}
          required={true} >
          <p className="ant-form-text" id="userName" name="userName">大眼萌 minion</p>
        </FormItem>
        <FormItem
          id="password"
          label="密码："
          labelCol={{span: 4}}
          wrapperCol={{span: 8}}
          required={true} >
          <Input type="password" id="password" name="password" placeholder="请输入密码" value={formData.password} onChange={this.setValue.bind(this, 'password')} />
        </FormItem>
        <FormItem
          label="您的性别："
          labelCol={{span: 4}}
          wrapperCol={{span: 8}}
          required={true} >
            <RadioGroup value="male" name="gender" value={formData.gender} onChange={this.setValue.bind(this, 'gender')} >
              <Radio value="male">男的</Radio>
              <Radio value="female">女的</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem
          id="remark"
          label="备注："
          labelCol={{span: 4}}
          wrapperCol={{span: 8}}
          required={true}
          help="随便写点什么" >
          <Input type="textarea" placeholder="随便写" id="remark" name="remark" value={formData.remark} onChange={this.setValue.bind(this, 'remark')} />
        </FormItem>
        <FormItem
          wrapperCol={{span: 4, offset: 8}} >
          <label>
            <Checkbox name="agreement" value={formData.agreement} onChange={this.setValue.bind(this, 'agreement')} /> 同意
          </label>
        </FormItem>
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
