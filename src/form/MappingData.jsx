import React from 'react';
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
  getGroup(item){
    if(!item.hidden){
      let groupItem;
      if(this.defaultGroup != item.groupName){
          this.defaultGroup = item.groupName;
          this.index++;
          return (<Row key={this.index}>
            <Col span="12">
              <h4 className="form">{item.groupName}</h4>
            </Col>
          </Row>);
      }
    }
  }
  getItem(item){
    if(!item.hidden){
      return (<FormItem key={item.name} id={item.name} label={item.caption} required={item.require} col={item.col} cols={this.cols}>
        <Validator rules={[{required: true,whitespace: true,message: ''}]}>
          <Input type={item.xtype} name={item.name} placeholder={item.placeholder} readOnly={item.readonly}/>
        </Validator>
        {this.getIcon(item.xtype)}
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
