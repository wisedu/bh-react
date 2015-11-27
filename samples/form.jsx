import React from 'react';
import ReactDOM from 'react-dom';
import "../src/form/form.scss";
import {Button, Row, Col, Form} from '../index.js';
const FormEMAP = Form.MappingEMAP;
var pageMeta = require("../datas/pageMeta.json");

var formEMAP = new FormEMAP(pageMeta);
// var items = formEMAP.getItems("ddrzcx", 3);

const Demo = React.createClass({
  // mixins: [Form.ValueMixin],

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
      <div>
        {formEMAP.buildForm("ddrzcx", 3)}
        <Row>
          <Col span="4" offset="8">
            <Button type="primary" onClick={this.handleSubmit}>确定</Button>
          </Col>
        </Row>
      </div>
    );
  }
});

ReactDOM.render(<Demo />, document.getElementById('app'));
