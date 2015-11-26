'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Tree from '../src';

$.getJSON('./data.json',(data) => {
    let treeDatas = data.datas.code.rows;
    ReactDOM.render(<Tree
        data={treeDatas}
        multiple={false}
        showIcon={true}
        defaultExpandAll={true}
        onSelect={handleSelect}
        //defaultSelectedKeys={["000012", "000406", "000001"]}
    />, document.getElementById('treedemo'));
});

function handleSelect (info) {
    console.log(info)
    var pos = info.node.props.pos;
    var level = pos.split("-").length -1;
    console.log(level)

    if (level == 1) {
        $("#jstree1").find("h5").html(info.node.props.title);
        $("#jstree1").show();
        $("#jstree2").hide();
    }else if (level == 2){
        $("#jstree2").find("h5").html(info.node.props.title);
        $("#jstree2").show();
        $("#jstree1").hide();
    }
}