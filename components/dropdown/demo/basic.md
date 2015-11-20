# 基本

- order: 0

最简单的下拉菜单。

---

````jsx
import { Menu, Dropdown, Button, Icon } from 'antd';

const menu = <Menu>
  <Menu.Item>
    <a target="_blank" href="http://www.alipay.com/">第一个菜单项</a>
  </Menu.Item>
  <Menu.Item>
    <a target="_blank" href="http://www.taobao.com/">第二个菜单项</a>
  </Menu.Item>
  <Menu.Item>
    <a target="_blank" href="http://www.tmall.com/">第三个菜单项</a>
  </Menu.Item>
</Menu>;

ReactDOM.render(
  <Dropdown overlay={menu}>
    <Button>
      某按钮 <Icon type="down" />
    </Button>
  </Dropdown>
, document.getElementById('components-dropdown-demo-basic'));
````

<style>
.code-box-demo .ant-btn {
  margin-right: 6px;
}
</style>
