'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Tree, {TreeNode} from '../lib';
import '../assets/tree.scss';



class Demo extends React.Component {

    handleSelect (info) {
        console.log(info)
    }

    handleCheck (info) {
        console.log(info)
    }


    render () {
        return (
            <Tree
                className="myCls"
                checkable={false}
                showIcon={true}
                onSelect={this.handleSelect}
                multiple={true}
                defaultExpandAll={true}
                >
                <TreeNode title="parent 1" key="0-1">
                    <TreeNode title="parent 1-0" key="0-1-1" disabled={true}>
                        <TreeNode title="leaf" key="random" />
                        <TreeNode title="leaf" key='2' />
                    </TreeNode>
                    <TreeNode className="" title="parent 1-1" key='1-1'>
                        <TreeNode key='1-1-1' title={<span style={{color: 'red'}}>sss</span>} />
                    </TreeNode>
                </TreeNode>
            </Tree>
        )
    }
}


ReactDOM.render(<Demo/>, document.getElementById('main'));

