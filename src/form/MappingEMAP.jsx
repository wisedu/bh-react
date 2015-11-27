import MappingData from "./MappingData"

class MappingFormEMAP{
  constructor(pageMeta) {
      this.pageMeta = pageMeta;
  }
  buildForm(modelName, cols){
    return MappingData.getForm(this.getItems(modelName, cols));
  }
  getItems(modelName, cols){
    var pageMetaModel = this.pageMeta.models.filter((elm, index)=>{
      if(elm.name == modelName)
        return elm;
    });
    if(pageMetaModel.length != 1)
      return [];

    var formItem = new MappingData(cols);
    var items = [];
    pageMetaModel[0].controls.map((item, index)=>{
      items.push(formItem.getGroup(item.groupName, item.hidden));
      items.push(formItem.getItem(item.name, item.xtype, item.caption, item.require, item.readonly, item.placeholder, item.col, item.hidden));
    });

    return items;
  }
}
export default MappingFormEMAP;
