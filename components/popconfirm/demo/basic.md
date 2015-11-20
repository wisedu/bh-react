# 基本

- order: 0

最简单的用法。

---

````jsx
import { Popconfirm, message } from 'antd';

function confirm() {
  message.success('点击了确定');
}

function cancel() {
  message.error('点击了取消');
}

ReactDOM.render(
  <Popconfirm title="确定要删除这个任务吗？" onConfirm={confirm} onCancel={cancel}>
    <a href="javascript:;">删除</a>
  </Popconfirm>
, document.getElementById('components-popconfirm-demo-basic'));
````

