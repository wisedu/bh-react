'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Tree from '../src/tree/src';

$.getJSON('./data/data.json',(data) => {
    let treeDatas = data.datas.code.rows;
    ReactDOM.render(<Tree
        data={treeDatas}
        multiple={false}
        showIcon={true}
        defaultExpandAll={false}
        onSelect={handleSelect}
        defaultSelectedKeys={["000012"]}
    />, document.getElementById('treedemo'));
});

function handleSelect (info) {
    var pos = info.node.props.pos;
    var level = pos.split("-").length -1;

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