import React from 'react';
import {classSet} from 'rc-util';

// sorted array ['0-0','0-1', '0-0-1', '0-1-1'] => ['0-0', '0-1']
const filterMin = (arr) => {
    const a = [];
    arr.forEach((item) => {
        const b = a.filter((i) => {
            return item.indexOf(i) === 0;
        });
        if (!b.length) {
            a.push(item);
        }
    });
    return a;
};

class Tree extends React.Component {
    constructor(props) {
        super(props);
        ['handleKeyDown', 'handleCheck'].forEach((m)=> {
            this[m] = this[m].bind(this);
        });
        this.defaultExpandAll = props.defaultExpandAll;
        const expandedKeys = props.defaultExpandedKeys;
        let checkedKeys = props.defaultCheckedKeys;
        if ('checkedKeys' in props) {
            checkedKeys = props.checkedKeys || [];
        }
        let selectedKeys = props.multiple ? [...props.defaultSelectedKeys] : [props.defaultSelectedKeys[0]];
        if ('selectedKeys' in props) {
            selectedKeys = props.multiple ? [...props.selectedKeys] : [props.selectedKeys[0]];
        }
        this.state = {
            expandedKeys,
            checkedKeys,
            selectedKeys,
        };
        this.contextmenuKeys = [];
    }

    componentWillReceiveProps(nextProps) {
        const props = {};
        if ('checkedKeys' in nextProps) {
            props.checkedKeys = nextProps.checkedKeys;
        }
        if ('selectedKeys' in nextProps) {
            props.selectedKeys = nextProps.multiple ? nextProps.selectedKeys : [nextProps.selectedKeys[0]];
        }
        this.setState(props);
    }

    getCheckKeys() {
        const checkPartKeys = [];
        const checkedKeys = [];
        Object.keys(this.treeNodesChkStates).forEach((item) => {
            const itemObj = this.treeNodesChkStates[item];
            if (itemObj.checked) {
                checkedKeys.push(itemObj.key);
            } else if (itemObj.checkPart) {
                checkPartKeys.push(itemObj.key);
            }
        });
        return {
            checkPartKeys, checkedKeys,
        };
    }

    getOpenTransitionName() {
        const props = this.props;
        let transitionName = props.openTransitionName;
        const animationName = props.openAnimation;
        if (!transitionName && typeof animationName === 'string') {
            transitionName = `${props.prefixCls}-open-${animationName}`;
        }
        return transitionName;
    }

    loopAllChildren(childs, callback) {
        const loop = (children, level) => {
            React.Children.forEach(children, (item, index) => {
                const pos = `${level}-${index}`;
                let newChildren = item.props.children;
                if (newChildren) {
                    if (!Array.isArray(newChildren)) {
                        newChildren = [newChildren];
                    }
                    loop(newChildren, pos);
                }
                callback(item, index, pos);
            });
        };
        loop(childs, 0);
    }

    handleCheckState(obj, checkedArr, unCheckEvent) {
        let evt = false;
        if (typeof unCheckEvent === 'boolean') {
            evt = true;
        }
        const splitPos = (pos) => {
            return pos.split('-');
        };
        // stripTail('x-xx-sss-xx')
        const stripTail = (str) => {
            const arr = str.match(/(.+)(-[^-]+)$/);
            let st = '';
            if (arr && arr.length === 3) {
                st = arr[1];
            }
            return st;
        };
        checkedArr.forEach((_pos) => {
            Object.keys(obj).forEach((i) => {
                if (splitPos(i).length > splitPos(_pos).length && i.indexOf(_pos) === 0) {
                    obj[i].checkPart = false;
                    if (evt) {
                        if (unCheckEvent) {
                            obj[i].checked = false;
                        } else {
                            obj[i].checked = true;
                        }
                    } else {
                        obj[i].checked = true;
                    }
                }
            });
            const loop = (__pos) => {
                const _posLen = splitPos(__pos).length;
                if (_posLen <= 2) {
                    return;
                }
                let sibling = 0;
                let siblingChecked = 0;
                const parentPos = stripTail(__pos);
                Object.keys(obj).forEach((i) => {
                    if (splitPos(i).length === _posLen && i.indexOf(parentPos) === 0) {
                        sibling++;
                        if (obj[i].checked) {
                            siblingChecked++;
                        } else if (obj[i].checkPart) {
                            siblingChecked += 0.5;
                        }
                    }
                });
                const parent = obj[parentPos];
                // sibling 不会等于0
                // 全不选 - 全选 - 半选
                if (siblingChecked === 0) {
                    parent.checked = false;
                    parent.checkPart = false;
                } else if (siblingChecked === sibling) {
                    parent.checked = true;
                    parent.checkPart = false;
                } else {
                    parent.checkPart = true;
                    parent.checked = false;
                }
                loop(parentPos);
            };
            loop(_pos);
        });
    }

    handleCheck(treeNode) {
        const tnProps = treeNode.props;
        let checked = !tnProps.checked;
        if (tnProps.checkPart) {
            checked = true;
        }
        let pos;
        Object.keys(this.treeNodesChkStates).forEach((item) => {
            const itemObj = this.treeNodesChkStates[item];
            if (itemObj.key === (treeNode.key || tnProps.eventKey)) {
                pos = item;
                itemObj.checked = checked;
                itemObj.checkPart = false;
            }
        });
        this.handleCheckState(this.treeNodesChkStates, [pos], !checked);
        const checkKeys = this.getCheckKeys();
        this.checkPartKeys = checkKeys.checkPartKeys;
        let checkedKeys = checkKeys.checkedKeys;
        const newSt = {
            event: 'check',
            node: treeNode,
        };
        if (!('checkedKeys' in this.props)) {
            this.setState({
                checkedKeys,
            });
            newSt.checked = checked;
        } else {
            checkedKeys = this.state.checkedKeys;
        }
        newSt.checkedKeys = checkedKeys;
        if (this.props.onCheck) {
            this.props.onCheck(newSt);
        }
    }

    handleSelect(treeNode) {
        const props = this.props;
        let selectedKeys = [...this.state.selectedKeys];
        const eventKey = treeNode.props.eventKey;
        const index = selectedKeys.indexOf(eventKey);
        let selected;
        if (index !== -1) {
            selected = false;
            selectedKeys.splice(index, 1);
        } else {
            selected = true;
            if (!props.multiple) {
                selectedKeys.length = 0;
            }
            selectedKeys.push(eventKey);
        }
        const newSt = {
            event: 'select',
            node: treeNode,
        };
        if (!('selectedKeys' in this.props)) {
            this.setState({
                selectedKeys: selectedKeys,
            });
            newSt.selected = selected;
        } else {
            selectedKeys = this.state.selectedKeys;
        }
        newSt.selectedKeys = selectedKeys;
        if (props.onSelect) {
            props.onSelect(newSt);
        }
    }

    handleContextMenu(e, treeNode) {
        const selectedKeys = [...this.state.selectedKeys];
        const eventKey = treeNode.props.eventKey;
        if (this.contextmenuKeys.indexOf(eventKey) === -1) {
            this.contextmenuKeys.push(eventKey);
        }
        this.contextmenuKeys.forEach((key) => {
            const index = selectedKeys.indexOf(key);
            if (index !== -1) {
                selectedKeys.splice(index, 1);
            }
        });
        if (selectedKeys.indexOf(eventKey) === -1) {
            selectedKeys.push(eventKey);
        }
        this.setState({
            selectedKeys,
        });
        this.props.onRightClick({event: e, node: treeNode});
    }

    handleExpand(treeNode) {
        const thisProps = this.props;
        const tnProps = treeNode.props;
        const expandedKeys = this.state.expandedKeys.concat([]);
        const expanded = !tnProps.expanded;
        if (this.defaultExpandAll) {
            this.loopAllChildren(thisProps.children, (item, index, pos) => {
                const key = item.key || pos;
                if (expandedKeys.indexOf(key) === -1) {
                    expandedKeys.push(key);
                }
            });
            this.defaultExpandAll = false;
        }
        const index = expandedKeys.indexOf(tnProps.eventKey);
        if (expanded) {
            if (index === -1) {
                expandedKeys.push(tnProps.eventKey);
                if (thisProps.onDataLoaded) {
                    return thisProps.onDataLoaded(treeNode).then(() => {
                        this.setState({
                            expandedKeys: expandedKeys,
                        });
                    }).catch(() => {
                        // console.error('Something went wrong', reason);
                    });
                }
            }
        } else {
            expandedKeys.splice(index, 1);
        }
        this.setState({
            expandedKeys: expandedKeys,
        });
    }

    // all keyboard events callbacks run from here at first
    handleKeyDown(e) {
        e.preventDefault();
    }

    renderTreeNode(child, index, level = 0) {
        const key = child.key || `${level}-${index}`;
        const state = this.state;
        const props = this.props;
        const cloneProps = {
            ref: 'treeNode',
            root: this,
            eventKey: key,
            pos: `${level}-${index}`,
            onDataLoaded: props.onDataLoaded,
            onRightClick: props.onRightClick,
            prefixCls: props.prefixCls,
            showLine: props.showLine,
            showIcon: props.showIcon,
            checkable: props.checkable,
            expanded: this.defaultExpandAll || state.expandedKeys.indexOf(key) !== -1,
            selected: state.selectedKeys.indexOf(key) !== -1,
            checked: this.checkedKeys.indexOf(key) !== -1,
            checkPart: this.checkPartKeys.indexOf(key) !== -1,
            openTransitionName: this.getOpenTransitionName(),
            openAnimation: props.openAnimation,
        };
        return React.cloneElement(child, cloneProps);
    }

    render() {
        const props = this.props;
        const domProps = {
            className: classSet(props.className, props.prefixCls),
            role: 'tree-node',
        };
        if (props.focusable) {
            domProps.tabIndex = '0';
            domProps.onKeyDown = this.handleKeyDown;
        }
        const checkedKeys = this.state.checkedKeys;
        const checkedPos = [];
        this.treeNodesChkStates = {};
        this.loopAllChildren(props.children, (item, index, pos) => {
            const key = item.key || pos;
            let checked = false;
            if (checkedKeys.indexOf(key) !== -1) {
                checked = true;
                checkedPos.push(pos);
            }
            this.treeNodesChkStates[pos] = {
                key: key,
                checked: checked,
                checkPart: false,
            };
        });
        this.handleCheckState(this.treeNodesChkStates, filterMin(checkedPos.sort()));
        const checkKeys = this.getCheckKeys();
        this.checkPartKeys = checkKeys.checkPartKeys;
        this.checkedKeys = checkKeys.checkedKeys;
        this.newChildren = React.Children.map(props.children, this.renderTreeNode, this);
        return (
            <ul {...domProps} ref="tree">
                {this.newChildren}
            </ul>
        );
    }
}

Tree.propTypes = {
    prefixCls: React.PropTypes.string,
    checkable: React.PropTypes.oneOfType([
        React.PropTypes.bool,
        React.PropTypes.node,
    ]),
    multiple: React.PropTypes.bool,
    showLine: React.PropTypes.bool,
    showIcon: React.PropTypes.bool,
    defaultExpandAll: React.PropTypes.bool,
    defaultExpandedKeys: React.PropTypes.arrayOf(React.PropTypes.string),
    checkedKeys: React.PropTypes.arrayOf(React.PropTypes.string),
    defaultCheckedKeys: React.PropTypes.arrayOf(React.PropTypes.string),
    selectedKeys: React.PropTypes.arrayOf(React.PropTypes.string),
    defaultSelectedKeys: React.PropTypes.arrayOf(React.PropTypes.string),
    onCheck: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    onDataLoaded: React.PropTypes.func,
    onRightClick: React.PropTypes.func,
    openTransitionName: React.PropTypes.string,
    openAnimation: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
};

Tree.defaultProps = {
    prefixCls: 'bh-tree',
    multiple: false,
    checkable: false,
    showLine: false,
    showIcon: true,
    defaultExpandAll: false,
    defaultExpandedKeys: [],
    defaultCheckedKeys: [],
    defaultSelectedKeys: [],
};

export default Tree;
