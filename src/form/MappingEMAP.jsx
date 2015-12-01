import MappingData from "./MappingData"

class MappingFormEMAP{
  constructor(pageMeta) {
      this.pageMeta = pageMeta;
  }
  buildForm(modelName, datas, cols = 2, isRead = false){
    this.cols = cols;
    return MappingData.getForm(this.getItems(modelName, cols, isRead), isRead);
  }
  getItems(modelName, cols, isRead = false){
    var pageMetaModel = this.pageMeta.models.filter((elm, index)=>{
      if(elm.name == modelName)
        return elm;
    });
    if(pageMetaModel.length != 1)
      return [];

    var formItem = new MappingData(cols, isRead);
    var items = [];
    var _colItems = [];
    var rowCount = 0;
    var prevCol = 1;
    var isNewRow = false;
    pageMetaModel[0].controls.map((item, index)=>{
      if(!item.hidden){
        let column = formItem.getItem(item.col, item.name, item.xtype, item.caption, item.require, item.readonly, item.placeholder);

        var groupRow = formItem.getGroup(item.groupName, item.hidden);
        if(groupRow){
          rowCount = 0;
          if(_colItems.length > 0){
            let row = formItem.getRow(_colItems, item.groupName + index + "_prev");
            items.push(row);
          }
          items.push(groupRow);
          console.log({rowCount:rowCount,group:item.groupName,type:"group prev & add", prev:[], add:[]});
          _colItems = [];
        }

        rowCount = (rowCount + (item.col || 1));
        if(rowCount == this.cols){
          rowCount = 0;
          _colItems.push(column);
          let row = formItem.getRow(_colItems, modelName + item.groupName + index + "newrow");
          items.push(row);
          console.log({name:item.caption,rowCount:rowCount,type:"add",add:_colItems});
          _colItems = [];
        }else if(rowCount > this.cols){
          var lessCount = rowCount - (item.col || 1) - this.cols + 1;
          rowCount = 0;
          let row = formItem.getRow(_colItems, item.groupName + index + "_prev");
          items.push(row);
          items.push(formItem.getRow(column, item.groupName + index + "_add"));
          console.log({name:item.caption,rowCount:rowCount,lessCount:lessCount,type:"prev & add", prev:_colItems, add:column});
          _colItems = [];
        }else{
          _colItems.push(column);
          console.log({name:item.caption,rowCount:rowCount});
        }
        // _colItems.push(column);

      }

    });

    return items;
  }
}
export default MappingFormEMAP;
