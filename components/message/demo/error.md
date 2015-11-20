# 错误或失败

- order: 1

操作失败反馈。

---

````jsx
import { message, Button } from 'antd';

const error = function() {
  message.error('这是一条失败的提示这是一条失败的提示这是一条失败的提示');
};

ReactDOM.render(<Button type="primary" onClick={error}>显示失败提示</Button>
, document.getElementById('components-message-demo-error'));
````
