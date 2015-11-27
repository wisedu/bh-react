import React from 'react';
import ReactDOM from 'react-dom';
import "../src/form/form.scss";
import {Form, Input, Button, Checkbox, Radio, Row, Col, Validation} from '../index.js';
const FormItem = Form.Item;
const FormEMAP = Form.MappingEMAP;
const RadioGroup = Radio.Group;
var pageMeta = require("../datas/pageMeta.json");

var formEMAP = new FormEMAP(pageMeta);
var items = formEMAP.getItems("ddrzcx", 3);

const Demo = React.createClass({
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
      <Form className="bh-fm-compact edit" cols="2" horizontal>
        <Validation ref="validation" onValidate={this.handleValidate}>
          {items}
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

ReactDOM.render(<Demo />, document.getElementById('app'));
