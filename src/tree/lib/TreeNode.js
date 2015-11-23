import React from 'react';
import {joinClasses, classSet} from 'rc-util';
import Animate from 'rc-animate';
import assign from 'object-assign';

const defaultTitle = '---';

class TreeNode extends React.Component {
  constructor(props) {
    super(props);
    ['handleExpand', 'handleCheck', 'handleContextMenu'].forEach((m)=> {
      this[m] = this[m].bind(this);
    });
    this.state = {
      dataLoading: false,
    };
  }

  getPosition(pos) {
    const obj = {
      last: false,
      center: false,
    };
    const siblings = Object.keys(this.props.root.treeNodesChkStates).filter((item) => {
      const len = pos.length;
      return len === item.length && pos.substring(0, len - 2) === item.substring(0, len - 2);
    });
    const sLen = siblings.length;
    const posIndex = Number(pos.substr(-1, 1));
    if (sLen === 1 || posIndex === sLen - 1) {
      obj.last = true;
    } else {
      obj.center = true;
    }
    return obj;
  }

  handleCheck() {
    this.props.root.handleCheck(this);
  }

  handleSelect() {
    this.props.root.handleSelect(this);
  }

  handleContextMenu(e) {
    e.preventDefault();
    this.props.root.handleContextMenu(e, this);
  }

  handleExpand() {
    const callbackPromise = this.props.root.handleExpand(this);
    if (callbackPromise && typeof callbackPromise === 'object') {
      const setLoading = (dataLoading) => {
        this.setState({
          dataLoading,
        });
      };
      setLoading(true);
      callbackPromise.then(() => {
        setLoading(false);
      }, () => {
        setLoading(false);
      });
    }
  }

  // keyboard event support
  handleKeyDown(e) {
    e.preventDefault();
  }

  renderSwitcher(props, expandedState) {
    const prefixCls = props.prefixCls;
    const switcherCls = {
      [`${prefixCls}-switcher`]: true,
    };
    if (props.disabled) {
      switcherCls[`${prefixCls}-switcher-disabled`] = true;
      return <span className={classSet(switcherCls)}></span>;
    }

    const posObj = this.getPosition(props.pos);

    if (!props.showLine) {
      switcherCls[prefixCls + '-noline_' + expandedState] = true;
    } else if (props.pos === '0-0') {
      switcherCls[`${prefixCls}-roots_${expandedState}`] = true;
    } else {
      switcherCls[`${prefixCls}-center_${expandedState}`] = posObj.center;
      switcherCls[`${prefixCls}-bottom_${expandedState}`] = posObj.last;
    }
    return <span className={classSet(switcherCls)} onClick={this.handleExpand}></span>;
  }

  renderCheckbox(props) {
    const prefixCls = props.prefixCls;
    const checkboxCls = {
      [`${prefixCls}-checkbox`]: true,
    };
    if (props.checkPart) {
      checkboxCls[`${prefixCls}-checkbox-indeterminate`] = true;
    } else if (props.checked) {
      checkboxCls[`${prefixCls}-checkbox-checked`] = true;
    }
    let customEle = null;
    if (typeof props.checkable !== 'boolean') {
      customEle = props.checkable;
    }
    if (props.disabled) {
      checkboxCls[`${prefixCls}-checkbox-disabled`] = true;
      //return <span ref="checkbox" className={classSet(checkboxCls)}>{customEle}</span>;
      return <input type="checkbox" ref="checkbox" className={classSet(checkboxCls)} disabled />;
    }
    //return (<span ref="checkbox" className={classSet(checkboxCls)} onClick={this.handleCheck}>{customEle}</span>);
    return (<input type="checkbox" ref="checkbox" className={classSet(checkboxCls)} onChange={this.handleCheck} />);
  }

  renderChildren(props) {
    const renderFirst = this.renderFirst;
    this.renderFirst = 1;
    let transitionAppear = true;
    if (!renderFirst && props.expanded) {
      transitionAppear = false;
    }
    const children = props.children;
    let newChildren = children;
    if (!children) {
      return children;
    }
    if (children.type === TreeNode || Array.isArray(children) &&
      children.every((item) => {
        return item.type === TreeNode;
      })) {
      const cls = {
        [`${props.prefixCls}-child-tree`]: true,
        [`${props.prefixCls}-child-tree-open`]: props.expanded,
      };
      if (props.showLine) {
        cls[`${props.prefixCls}-line`] = this.getPosition(props.pos).center;
      }
      const animProps = {};
      if (props.openTransitionName) {
        animProps.transitionName = props.openTransitionName;
      } else if (typeof props.openAnimation === 'object') {
        animProps.animation = assign({}, props.openAnimation);
        if (!transitionAppear) {
          delete animProps.animation.appear;
        }
      }
      newChildren = this.newChildren = (
        <Animate {...animProps}
          showProp="expanded"
          transitionAppear={transitionAppear}
          component="">
          <ul className={classSet(cls)} expanded={props.expanded}>
            {React.Children.map(children, (item, index) => {
              return props.root.renderTreeNode(item, index, props.pos);
            }, props.root)}
          </ul>
        </Animate>
      );
    }
    return newChildren;
  }

  render() {
    const props = this.props;
    const prefixCls = props.prefixCls;
    const expandedState = props.expanded ? 'open' : 'close';
    const iconEleCls = {
      [`${prefixCls}-iconEle`]: true,
      [`${prefixCls}-icon_loading`]: this.state.dataLoading,
      [`${prefixCls}-icon__${expandedState}`]: true,
    };

    let canRenderSwitcher = true;
    const content = props.title;
    let newChildren = this.renderChildren(props);
    if (!newChildren || newChildren === props.children) {
      // content = newChildren;
      newChildren = null;
      if (!props.onDataLoaded) {
        canRenderSwitcher = false;
      }
    }

    const selectHandle = () => {
      const icon = (props.showIcon || props.onDataLoaded && this.state.dataLoading) ? <span className={classSet(iconEleCls)}></span> : null;
      const title = <span className={`${prefixCls}-title`}>{content}</span>;
      const domProps = {};
      if (!props.disabled) {
        if (props.selected) {
          domProps.className = `${prefixCls}-item ${prefixCls}-node-selected`;
        }else {
          domProps.className = `${prefixCls}-item`;
        }
        domProps.onClick = () => {
          this.handleSelect();
          //if (props.checkable) {
          //  this.handleCheck();
          //}
        };
        if (props.onRightClick) {
          domProps.onContextMenu = this.handleContextMenu;
        }
      }
      return (
          <div {...domProps} ref="item" >
            <div className={`${prefixCls}-item-mask`}></div>
            <div className={`${prefixCls}-item-content`}>
              {canRenderSwitcher ? this.renderSwitcher(props, expandedState) : <span className={`${prefixCls}-switcher-noop`}></span>}
              {props.checkable ? this.renderCheckbox(props) : null}
              <a ref="selectHandle" title={content} >
                {icon} {title}
              </a>
            </div>
          </div>
      );
    };


    return (

      <li className={joinClasses(props.className, props.disabled ? `${prefixCls}-treenode-disabled` : '')}>
          {selectHandle()}
        {newChildren}
      </li>
    );
  }
}
TreeNode.propTypes = {
  prefixCls: React.PropTypes.string,
  expanded: React.PropTypes.bool,
  root: React.PropTypes.object,
  onSelect: React.PropTypes.func,
};
TreeNode.defaultProps = {
  title: defaultTitle,
};

export default TreeNode;
