import React from 'react';
import Dialog from 'rc-dialog';
import { Dom } from 'rc-util';
import AlertDialog from './alert.jsx';
import ConfirmDialog from './confirm.jsx';
import DialogIcon from './dialogIcon.jsx';

function noop() {}

let mousePosition;
let mousePositionEventBinded;

let BhDialog = React.createClass({
  getInitialState() {
    return {
      prefixCls: 'bh-dialog',
      width: this.props.width ? this.props.width : 564,
      height: this.props.height ? this.props.height : "auto",
      animation: 'zoom',
      maskAnimation: 'fade',
      visible: this.props.visible ? this.props.visible : false,
      title: this.props.title ? <h4>{this.props.title}</h4> : '',
      closable: this.props.closable ? this.props.closable : true,
      onClose: this.onClose,
      type: this.props.type,
      content: this.props.content,
      showType: this.props.showType
    };
  },
  componentWillReceiveProps(nextProps){
    this.setState({
      visible: nextProps.visible
    });
  },
  componentDidMount() {
    if (mousePositionEventBinded) {
      return;
    }
    // 只有点击事件支持从鼠标位置动画展开
    Dom.addEventListener(document.body, 'click', function onDocumentMousemove(e) {
      mousePosition = {
        x: e.pageX,
        y: e.pageY
      };
      // 20ms 内发生过点击事件，则从点击位置动画展示
      // 否则直接 zoom 展示
      // 这样可以兼容非点击方式展开
      setTimeout(() => mousePosition = null, 20);
    });

    mousePositionEventBinded = true;
  },
  onClose(){
    this.setState({
      visible: false
    });
  },

  render: function () {
    let state = this.state;
    if(state.visible){
      if(state.type === "alert"){
        if(state.showType){
          state.title = <div><DialogIcon {...this.props} /> <h4>{this.props.title}</h4> </div>;
        }
        state.footer = <AlertDialog {...this.props} onClose={this.onClose} />;
        state.closable = this.props.closable ? this.props.closable : false;
      }else if(state.type === "confirm"){
        state.footer = <ConfirmDialog {...this.props} onClose={this.onClose} />;
        state.closable = this.props.closable ? this.props.closable : false;
      }
      return (<Dialog style={{width:state.width, height: state.height}} mousePosition={mousePosition} {...state}>
              </Dialog>);
    }else{
      return (<div></div>);
    }
  }
});

export default BhDialog;
