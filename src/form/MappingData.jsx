import React from 'react';
import Form from './Form';
import FormItem from './FormItem';
import Input from './Input';
import Validation from '../validation/index.jsx';
import {Row, Col} from '../layout/index';
import Icon from "../iconfont/index";
const Validator = Validation.Validator;

class MappingData{
  constructor(cols) {
    this.defaultGroup = undefined;
    this.index = 0;
    this.cols = cols;
  }
  static getForm(items){
    return (<Form className="bh-fm-compact edit" horizontal>
      <Validation ref="validation" onValidate={this.handleValidate}>
        {items}
      </Validation>
    </Form>);
  }
  getGroup(groupName, ishidden){
    if(!ishidden){
      let groupItem;
      if(this.defaultGroup != groupName){
          this.defaultGroup = groupName;
          this.index++;
          return (<Row key={this.index}>
            <Col span="12">
              <h4 className="form">{groupName}</h4>
            </Col>
          </Row>);
      }
    }
  }
  getItem(name, xtype, caption, require, readonly, placeholder, col, hidden){
    if(!hidden){
      return (<FormItem key={name} id={name} label={caption} required={require} col={col} cols={this.cols}>
        <Validator rules={[{required: true,whitespace: true,message: ''}]}>
          <Input type={xtype} name={name} placeholder={placeholder} readOnly={readonly}/>
        </Validator>
        {this.getIcon(xtype)}
      </FormItem>);
    }
  }
  getIcon(xtype){
    let ico = "";
    switch (xtype) {
      case "date-local":
      case "date-ym":
        ico = "calendar";
        break;
      case "select":
        ico = "chevron-down"
      default:
    }
    if(ico != "")
      return (<Icon className={ico + " icon"} />);
  }
}
export default MappingData;