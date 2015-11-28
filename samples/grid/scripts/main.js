import React from 'react';
import ReactDOM from 'react-dom';
import {Pagination, Table}  from '../../../index';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  render: function(text) {
    return <a href="#">{text}</a>;
  }
}, {
  title: '年龄',
  dataIndex: 'age',
  sorter: function(a, b) {
    return a.age - b.age;
  }
}, {
  title: '住址',
  dataIndex: 'address'
}];

const data = [];
for (let i = 0; i < 460; i++) {
  data.push({
    key: i,
    name: '李大嘴' + i,
    age: 32,
    address: '西湖区湖底公园' + i + '号'
  });
}

const pagination = {
  total: data.length,
  current: 2,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '50', '100']
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