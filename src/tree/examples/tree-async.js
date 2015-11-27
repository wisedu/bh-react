'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Tree from '../src';

$.getJSON('./rootData.json',(data) => {
    let treeDatas = data.datas.code.rows;
    ReactDOM.render(<Tree
        data={treeDatas}
        multiple={true}
        showIcon={true}
        //defaultExpandAll={true}
        onDataLoaded={(node) => {
            console.log(node)
            return new Promise(function(resolve, reject){
                $.getJSON('./rootData.json',function(data){
                    console.log(55555)
                    return data;
                })
            });
        }}
    />, document.getElementById('main'));
});


