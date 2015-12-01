import React from 'react';
import ReactDOM from 'react-dom';
import "../src/form/form.scss";
import {Button, Row, Col, Form} from '../index.js';
const FormEMAP = Form.MappingEMAP;
var pageMeta = require("../datas/pageMeta.json");

var formEMAP = new FormEMAP(pageMeta);
// var items = formEMAP.getItems("ddrzcx", 3);
var data = {XM:"阮一峰", XH:"WW1022112",XBDM:1};

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
      <div className="bh-container">
        {formEMAP.buildForm("ddrzcx", data, 3)}
        <Row>
          <Col span="4" offset="8">
            <Button type="primary" onClick={this.handleSubmit}>确定</Button>
          </Col>
        </Row>
        {formEMAP.buildForm("ddrzcx", data, 3, true)}
        {formEMAP.buildForm("T_SS_ZS_DDYY_QUERY", data, 2, true)}
      </div>
    );
  }

});

ReactDOM.render(<Demo />, document.getElementById('app'));
