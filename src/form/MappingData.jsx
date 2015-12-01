import React from 'react';
import Form from './Form';
import FormItem from './FormItem';
import Input from './Input';
import Validation from '../validation/index.jsx';
import {Row, Col} from '../layout/index';
import Icon from "../iconfont/index";
const Validator = Validation.Validator;
import classSet from 'classnames';
const cx = classSet;

class MappingData{
  constructor(cols, isRead) {
    this.defaultGroup = undefined;
    this.index = 0;
    this.cols = cols;
    this.isRead = isRead;
  }
  static getForm(items, isRead){
    const itemClassName = {
      ['bh-fm-compact']: true,
      ['read']: isRead,
      ['edit']: !isRead
    };

    return (<Form className={cx(itemClassName)} horizontal>
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
          return (<Row className="groupRow" key={"group_" + this.index}>
            <Col span="12">
              <h4 className="form">{groupName}</h4>
            </Col>
          </Row>);
      }
    }
  }
  getRow(items, key){
    return (<Row className="readRow" key={"row_" + key}>
      {items}
    </Row>);
  }
  getItem(col, name, xtype, caption, require, readonly, placeholder){

    var control;
    var icon;
    if(this.isRead){
      control = (<span className="bh-form-label">123</span>);
    }else{
      control = (<Input type={xtype} name={name} placeholder={placeholder} readOnly={readonly}/>);
      icon = this.getIcon(xtype);
    }

    return (<FormItem key={name} id={name} label={caption} required={require} col={col} cols={this.cols}>
      <Validator rules={[{required: true,whitespace: true,message: ''}]}>
        {control}
      </Validator>
      {icon}
    </FormItem>);

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
