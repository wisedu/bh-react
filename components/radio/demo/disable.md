# 不可用

- order: 1

Radio 不可用。

---

````jsx
import { Radio, Button } from 'antd';

function toggleDisabled() {
  disabled = !disabled;
}

const App = React.createClass({
  getInitialState() {
    return {
      disabled: true
    };
  },
  toggleDisabled() {
    this.setState({
      disabled: !this.state.disabled
    });
  },
  render() {
    return <div>
      <Radio defaultChecked={false} disabled={this.state.disabled}>不可用</Radio>
      <br />
      <Radio defaultChecked={true} disabled={this.state.disabled}>不可用</Radio>
      <div style={{marginTop: 20}}>
        <Button type="primary" onClick={this.toggleDisabled}>
          Toggle disabled
        </Button>
      </div>
    </div>;
  }
});

ReactDOM.render(<App />, document.getElementById('components-radio-demo-disable'));
````
