import React from 'react';
import Upload from 'rc-upload';
import assign from 'object-assign';
import UploadList from './uploadList';
import getFileItem from './getFileItem';
const prefixCls = 'ant-upload';

function noop() {
}

// Fix IE file.status problem
// via coping a new Object
function fileToObject(file) {
  return {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.filename || file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    response: file.response,
    error: file.error,
    percent: 0
  };
}

/**
 * 生成Progress percent: 0.1 -> 0.98
 *   - for ie
 */
function genPercentAdd() {
  let k = 0.1;
  const i = 0.01;
  const end = 0.98;
  return function(start) {
    if (start >= end) {
      return start;
    } else {
      start += k;
      k = k - i;
      if (k < 0.001) {
        k = 0.001;
      }
    }
    return start * 100;
  };
}

const AntUpload = React.createClass({
  getInitialState() {
    return {
      fileList: this.props.fileList || this.props.defaultFileList || [],
      dragState: 'drop'
    };
  },
  onStart(file) {
    let targetItem;
    let nextFileList = this.state.fileList.concat();
    if (file.length > 0) {
      targetItem = file.map(function(f) {
        f = fileToObject(f);
        f.status = 'uploading';
        return f;
      });
      nextFileList = nextFileList.concat(file);
    } else {
      targetItem = fileToObject(file);
      targetItem.status = 'uploading';
      nextFileList.push(targetItem);
    }
    this.onChange({
      file: targetItem,
      fileList: nextFileList
    });
    // fix ie progress
    if (!window.FormData) {
      this.autoUpdateProgress(0, targetItem);
    }
  },
  autoUpdateProgress(percent, file) {
    const getPercent = genPercentAdd();
    let curPercent = 0;
    this.progressTimer = setInterval(() => {
      curPercent = getPercent(curPercent);
      this.onProgress({
        percent: curPercent
      }, file);
    }, 200);
  },
  removeFile(file) {
    let fileList = this.state.fileList;
    let targetItem = getFileItem(file, fileList);
    let index = fileList.indexOf(targetItem);
    if (index !== -1) {
      fileList.splice(index, 1);
      return fileList;
    }
    return null;
  },
  onSuccess(response, file) {
    this.clearProgressTimer();
    // 服务器端需要返回标准 json 字符串
    // 否则视为失败
    try {
      if (typeof response === 'string') {
        JSON.parse(response);
      }
    } catch (e) {
      this.onError(new Error('No response'), response, file);
      return;
    }
    let fileList = this.state.fileList;
    let targetItem = getFileItem(file, fileList);
    // 之前已经删除
    if (targetItem) {
      targetItem.status = 'done';
      targetItem.response = response;
      this.onChange({
        file: targetItem,
        fileList: fileList
      });
    }
  },
  onProgress(e, file) {
    let fileList = this.state.fileList;
    let targetItem = getFileItem(file, fileList);
    if (!targetItem) return;
    targetItem.percent = e.percent;
    this.onChange({
      event: e,
      file: file,
      fileList: this.state.fileList
    });
  },
  onError(error, response, file) {
    this.clearProgressTimer();
    let fileList = this.state.fileList;
    let targetItem = getFileItem(file, fileList);
    targetItem.error = error;
    targetItem.response = response;
    targetItem.status = 'error';
    this.handleRemove(targetItem);
  },
  handleRemove(file) {
    let fileList = this.removeFile(file);
    if (fileList) {
      this.onChange({
        file: file,
        fileList: fileList
      });
    }
  },
  handleManualRemove(file) {
    file.status = 'removed';
    this.handleRemove(file);
  },
  onChange(info) {
    this.setState({
      fileList: info.fileList
    });
    this.props.onChange(info);
  },
  getDefaultProps() {
    return {
      type: 'select',
      name: '',
      multipart: false,
      action: '',
      data: {},
      accept: '',
      onChange: noop,
      showUploadList: true
    };
  },
  componentWillReceiveProps(nextProps) {
    if ('fileList' in nextProps) {
      this.setState({
        fileList: nextProps.fileList
      });
    }
  },
  onFileDrop(e) {
    if (e.type === 'dragover') {
      this.setState({
        dragState: 'dragover'
      });
    } else {
      this.setState({
        dragState: 'drop'
      });
    }
  },
  clearProgressTimer() {
    clearInterval(this.progressTimer);
  },
  render() {
    let type = this.props.type || 'select';
    let props = assign({}, this.props, {
      onStart: this.onStart,
      onError: this.onError,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
    });
    let uploadList;
    if (this.props.showUploadList) {
      uploadList = <UploadList items={this.state.fileList} onRemove={this.handleManualRemove} />;
    }
    if (type === 'drag') {
      let dragUploadingClass = '';
      let fileList = this.state.fileList;
      const dragState = this.state.dragState;
      for (let i = 0; i < fileList.length; i ++) {
        if (fileList[i].status === 'uploading') {
          dragUploadingClass = ` ${prefixCls}-drag-uploading ${dragState === 'drop' ? '' : `${prefixCls}-drag-hover`}`;
          break;
        }
      }
      return (
        <div className={prefixCls + ' ' + prefixCls + '-drag-area'} onDrop={this.onFileDrop} onDragOver={this.onFileDrop}>
          <div className={prefixCls + ' ' + prefixCls + '-drag' + dragUploadingClass}>
            <Upload {...props}>
              <div className={prefixCls + '-drag-container'}>
                {this.props.children}
              </div>
            </Upload>
          </div>
          { uploadList }
        </div>
      );
    } else if (type === 'select') {
      return (
        <div>
          <div className={prefixCls + ' ' + prefixCls + '-select'}>
            <Upload {...props}>
              {this.props.children}
            </Upload>
          </div>
          { uploadList }
        </div>
      );
    }
  }
});

AntUpload.Dragger = React.createClass({
  render() {
    return <AntUpload {...this.props} type="drag" style={{height: this.props.height}}/>;
  }
});

export default AntUpload;
