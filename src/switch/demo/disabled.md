# 不可用

- order: 1

Switch 失效状态。

---

````jsx
import { Switch, Button } from 'antd';
const container = document.getElementById('components-switch-demo-disabled');

const Test = React.createClass({
  getInitialState() {
    return {
      disabled: true
    }
  },
  toggle(){
    this.setState({
      disabled: !this.state.disabled
    });
  },
  render() {
    return <div>
      <Switch disabled={this.state.disabled} />
      <br />
      <br />
      <Button type="primary" onClick={this.toggle}>Toggle disabled</Button>
    </div>;
  }
});

ReactDOM.render(<Test />, container);
````
