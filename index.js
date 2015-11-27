import React from 'react';
import ReactDOM from 'react-dom';

// require('./style/index.less');
//
// // matchMedia polyfill for
// // https://github.com/WickyNilliams/enquire.js/issues/82
// if (typeof window !== 'undefined') {
//   const matchMediaPolyfill = function matchMediaPolyfill() {
//     return {
//       matches: false,
//       addListener: function () {
//       },
//       removeListener: function () {
//       }
//     };
//   };
//   window.matchMedia = window.matchMedia || matchMediaPolyfill;
// }

const bhReact = {
  // Affix: require('./src/affix'),
  // Datepicker: require('./src/datepicker'),
  // Tooltip: require('./src/tooltip'),
  // Carousel: require('./src/carousel'),
  // Tabs: require('./src/tabs'),
  // Modal: require('./src/modal'),
  // Dropdown: require('./src/dropdown'),
  // Progress: require('./src/progress'),
  // Popover: require('./src/popover'),
  // Select: require('./src/select'),
  // Breadcrumb: require('./src/breadcrumb'),
  // Popconfirm: require('./src/popconfirm'),
  // Pagination: require('./src/pagination'),
  // Steps: require('./src/steps'),
  // InputNumber: require('./src/input-number'),
  // Switch: require('./src/switch'),
  Checkbox: require('./src/checkbox'),
  // Table: require('./src/table'),
  // Tag: require('./src/tag'),
  // Collapse: require('./src/collapse'),
  // message: require('./src/message'),
  // Slider: require('./src/slider'),
  // QueueAnim: require('./src/queue-anim'),
  Radio: require('./src/radio'),
  // notification: require('./src/notification'),
  // Alert: require('./src/alert'),
  Validation: require('./src/validation'),
  // Tree: require('./src/tree'),
  // Upload: require('./src/upload'),
  // Badge: require('./src/badge'),
  // Menu: require('./src/menu'),
  // Timeline: require('./src/timeline'),
  Button: require('./src/button'),
  // ButtonGroup: require('./src/button').Group,
  // Icon: require('./src/iconfont'),
  Row: require('./src/layout').Row,
  Col: require('./src/layout').Col,
  // Spin: require('./src/spin'),
  Form: require('./src/form').Form,
  Input: require('./src/form').Input,
  // Calendar: require('./src/calendar'),
  // Timepicker: require('./src/timepicker')
  AA: require('./src/form')
};

bhReact.version = require('./package.json').version;

// if (process.env.NODE_ENV !== 'production') {
//   const warning = require('warning');
//   const semver = require('semver');
//   const reactVersionInDeps = require('./package.json').devDependencies.react;
//   warning(semver.satisfies(React.version, reactVersionInDeps) || semver.gtr(React.version, reactVersionInDeps),
//     `antd@${antd.version} need react@${reactVersionInDeps} or higher, which is react@${React.version} now.`);
// }



if (typeof module !== 'undefined' && module.exports) {
  module.exports = bhReact;
} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
  // register as 'classnames', consistent with npm package name
  define('bhReact', function () {
    return bhReact;
  });
} else {
  window.React = React;
  window.ReactDOM = ReactDOM;
  window.bhReact = bhReact;
}
