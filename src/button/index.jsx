import React from 'react';
import ReactDOM from 'react-dom';
import Button from './button';
//import ButtonGroup from './button-group';
//
//Button.Group = ButtonGroup;
//export default Button;

ReactDOM.render(
    <div>
        <Button className="bh-btn bh-btn-default">Default</Button>
        <Button className="bh-btn bh-btn-primary">Primary</Button>
        <Button className="bh-btn bh-btn-success">Success</Button>
        <Button className="bh-btn bh-btn-info">Info</Button>
        <Button className="bh-btn bh-btn-warning">Warning</Button>
        <Button className="bh-btn bh-btn-danger">Danger</Button>
        <Button className="bh-btn bh-btn-default bh-disabled">disabled</Button>
        <Button className="bh-btn bh-btn-default bh-btn-small">small</Button>
        <Button className="bh-btn bh-btn-default bh-btn-large">large</Button>
        <Button className="bh-btn bh-btn-default bh-btn-large bh-btn-block">block button</Button>
    </div>,
    document.getElementById('example')
);