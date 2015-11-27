import React from 'react';
import FormItem from './FormItem';
import Input from './Input';
import Validation from '../validation/index.jsx';
const Validator = Validation.Validator;

class MappingFormEMAP{
  constructor(pageMeta) {
    this.pageMeta = pageMeta;
  }
  getItems(modelName, cols){
    var pageMetaModel = this.pageMeta.models.filter((elm, index)=>{
      if(elm.name == modelName)
        return elm;
    });
    if(pageMetaModel.length != 1)
      return [];

    var items = pageMetaModel[0].controls.map((item, index)=>{
      if(!item.hidden){
        return (<FormItem key={item.name} id={item.name} label={item.caption} required={item.require} col={item.col} cols={cols}>
          <Validator rules={[{required: true,whitespace: true,message: ''}]}>
            <Input type={item.xtype} name={item.name} placeholder={item.placeholder} readOnly={item.readonly}/>
          </Validator>
        </FormItem>);
      }
    });

    return items;
  }
}
export default MappingFormEMAP;
