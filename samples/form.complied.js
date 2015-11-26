'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _indexJs = require('../index.js');

var FormItem = _indexJs.Form.Item;
//const RadioGroup = Radio.Group;

var Demo = _react2['default'].createClass({
  displayName: 'Demo',

  mixins: [_indexJs.Form.ValueMixin],

  getInitialState: function getInitialState() {
    return {
      formData: {
        userName: '大眼萌 minion',
        password: undefined,
        gender: 'male',
        remark: undefined,
        agreement: undefined
      }
    };
  },

  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    // message.success("收到表单值~~~ ：" + JSON.stringify(this.state.formData, function(k, v) {
    //   if (typeof v === 'undefined') {
    //     return '';
    //   }
    //   return v;
    // }));
  },

  render: function render() {
    var formData = this.state.formData;
    return _react2['default'].createElement(
      _indexJs.Form,
      { horizontal: true, onSubmit: this.handleSubmit },
      _react2['default'].createElement(
        FormItem,
        {
          label: '用户名：',
          labelCol: { span: 6 },
          wrapperCol: { span: 6 },
          required: true },
        _react2['default'].createElement(
          'p',
          { className: 'ant-form-text', id: 'userName', name: 'userName' },
          '大眼萌 minion'
        )
      ),
      _react2['default'].createElement(
        FormItem,
        {
          id: 'password',
          label: '密码：',
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
          required: true },
        _react2['default'].createElement(_indexJs.Input, { type: 'password', id: 'password', name: 'password', placeholder: '请输入密码', value: formData.password, onChange: this.setValue.bind(this, 'password') })
      ),
      _react2['default'].createElement(
        FormItem,
        {
          id: 'remark',
          label: '备注：',
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
          required: true,
          help: '随便写点什么' },
        _react2['default'].createElement(_indexJs.Input, { type: 'textarea', placeholder: '随便写', id: 'remark', name: 'remark', value: formData.remark, onChange: this.setValue.bind(this, 'remark') })
      )
    );
  }
});

_reactDom2['default'].render(_react2['default'].createElement(Demo, null), document.getElementById('app'));
