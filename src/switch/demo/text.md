# 文字和图标

- order: 2

带有文字和图标。

---

````jsx
import { Switch, Icon } from 'antd';
const container = document.getElementById('components-switch-demo-text');

ReactDOM.render(<div>
  <Switch checkedChildren="开" unCheckedChildren="关" />
  <span> </span>
  <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} />
</div>, container);
````
