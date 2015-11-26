'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Tree from './Tree';
import TreeNode from './TreeNode';
import '../assets/tree.scss';


class BhTree extends React.Component {

    constructor(props) {

        super(props)
        this.props = {
            prefixCls: 'bh-tree',
            transitionName: 'slide-up',
            optionLabelProp: 'children',
            showSearch: true
            //size: 'default'
        };

        this.state = {
            data: this.props.data
        }
    }


    handelDataLoaded(treeNode) {
        console.log(treeNode)
    }

    componentWillMount() {
        this.setState({
            data: this.props.data
        })
    }

    // tree 数据json序列化
    serializeJSON(data) {
        return transData(data, "id", "pId", "children");
        function transData(a, idStr, pidStr, chindrenStr) {
            var r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0, len = a.length;
            for (; i < len; i++) {
                hash[a[i][id]] = a[i];
            }
            for (; j < len; j++) {
                var aVal = a[j], hashVP = hash[aVal[pid]];
                if (hashVP) {
                    (!hashVP[children] ) && (hashVP[children] = []);
                    hashVP[children].push(aVal);
                    hashVP["state"] = {"opened": true};
                } else {
                    r.push(aVal);
                }
            }
            return r;
        }
    }

    renderTreeNodes(data, ...option) {
        if (!data || data.length == 0) {
            return null;
        }
        return data.map((node, i) => {
            let prefixCls = `${(option.length > 0 ? option[0] : 'bh-tree')}`;
            return <TreeNode
                title={node.name}
                key={node.id ? node.id : `${prefixCls}-${i}`}
                id={node.id ? node.id : `${prefixCls}-${i}`}
                disabled={node.disable}
                selected={node.selected}
            >
                {(node.children && node.children.length > 0) ? this.renderTreeNodes(node.children, `${prefixCls}-${i}`) : ""}
            </TreeNode>
        });
    }


    render() {
        return (
            <Tree
                {...this.props}
                className={this.props.profixCls}
                checkable={false}
            >
                {this.renderTreeNodes(this.serializeJSON(this.state.data))}
            </Tree>
        )
    }
}
window.BhTree = BhTree;

export default BhTree;