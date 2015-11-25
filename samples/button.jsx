import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../src/button/button.jsx';
//import ButtonGroup from './button-group';
//
//Button.Group = ButtonGroup;
//export default Button;

ReactDOM.render(
    <div>
        <Button classType="default">Default</Button>
        <Button classType="primary">Primary</Button>
        <Button classType="success">Success</Button>
        <Button classType="info">Info</Button>
        <Button classType="warning">Warning</Button>
        <Button classType="danger">Danger</Button>
        <Button classType="default disabled">disabled</Button>
        <Button classType="default small">small</Button>
        <Button classType="default large">large</Button>
        <Button classType="default large block">block button</Button>
    </div>,
    document.getElementById('example')
);