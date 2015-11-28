import React from 'react';
import ReactDOM from 'react-dom';
import {Pagination, Table}  from '../../../index';

var pageMeta = require('../mock/pageMeta.json');
var tableData = require('../mock/table.json');
var dataName = 'sszdtcx';
var colData = pageMeta.models.find(function(value, index, arr){
  return value.name == dataName
});

var columns = [];
for(let control of colData.controls){
  columns.push({
    title: control.caption,
    dataIndex: control.name
  })
}

// let dataSource = new Table.DataSource({
//   url: '../mock/table.json',
//   resolve: function(result){
//     console.log(result);
//     return result.data;
//   }
// });

let data = [];
var index = 0;
for(let row of tableData.datas.sszdtcx.rows){
  var tmpObj = {};
  tmpObj.key = index++;
  for(let col of columns){
    tmpObj[col.dataIndex] = row[col.dataIndex];
  }
  data.push(tmpObj);
}

let pagination = {
  total: data.length,
  pageSize: 100,
  showSizeChanger: true,
  pageSizeOptions: ['100','50','20','10']
};

const rowSelection = {
  onSelect: function(record, selected, selectedRows) {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: function(selected, selectedRows) {
    console.log(selected, selectedRows);
  }
};

ReactDOM.render(<Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={pagination} bordered />
, document.getElementById('tab_lv2_1'));



/* ---------------------------------- 分页空间调用方式 ---------------------------------*/
/*
ReactDOM.render(
    <Pagination showQuickJumper={true} showSizeChanger={true} total={500} onChange={onChange} onShowSizeChange={onShowSizeChange} pageSizeOptions={['10', '20', '50', '100']}/>, 
    document.getElementById('paging-wrapper')
);

function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize);
}
function onChange(){

}
*/

/* --------------------------------------------------------------------------------- */

$("table").on("click","input[type=checkbox]", function(){
    var $item = $(this);
    if($item.hasClass("allCheckboxFlag")){
        if ($item.attr('data-select')=='ture') {
            $("table").find("input[name='oper']").removeAttr("checked");
            $item.attr('data-select','false');
        }else{
            $("table").find("input[name='oper']").attr("checked", 'checked');
            $item.attr('data-select','ture');
        }
    }else if ($item.attr('checked')) {
        $item.removeAttr("checked");
        $('.allCheckboxFlag').attr('data-select','false').removeAttr("checked");
    }       
});