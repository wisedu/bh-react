# 基本用法

- order: 0

简单的 checkbox。

---

````jsx
import { Checkbox } from 'antd';
const container = document.getElementById('components-checkbox-demo-basic');

function onChange(e) {
  console.log('checked = ' + e.target.checked);
}

ReactDOM.render(<label>
  <Checkbox defaultChecked={false} onChange={onChange} />
  Checkbox
</label>, container);
````
