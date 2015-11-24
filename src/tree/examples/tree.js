'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Tree from '../src';

$.getJSON('./data.json',(data) => {
    let treeDatas = data.datas.code.rows;
    ReactDOM.render(<Tree
        data={treeDatas}
        multiple={true}
        showIcon={true}
        defaultExpandAll={true}
        defaultSelectedKeys={["000012", "000406", "000001"]}
    />, document.getElementById('main'));
});


