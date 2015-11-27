import React from 'react';
import ReactDOM from 'react-dom';
import Icon from '../src/iconfont/index.jsx';
import Button from '../src/button/button.jsx';

ReactDOM.render(
    <div className="bh-card bh-card-lv1 bh-p-32">
        <div><a href="http://www.bootcss.com/p/font-awesome/" target="_blank">使用的图标库 Font Awesome</a></div>
        <div className="bh-m-8 bh-pull-left">
            <Icon className="icon-camera-retro" /> normal
        </div>
        <div className="bh-m-8 bh-pull-left">
            <Icon className="icon-camera-retro icon-large" /> large
        </div>
        <div className="bh-m-8 bh-pull-left">
            <Icon className="icon-camera-retro icon-2x" /> 2x
        </div>
        <div className="bh-m-8 bh-pull-left">
            <Icon className="icon-camera-retro icon-3x" /> 3x
        </div>
        <div className="bh-m-8 bh-pull-left">
            <Icon className="icon-camera-retro icon-4x" /> 4x
        </div>


        <div className="bh-m-8 bh-pull-left bh-clearfix">
            <Icon className="icon-spinner icon-spin" />
        </div>
        <div className="bh-m-8 bh-pull-left">
            <Icon className="icon-camera-retro icon-border icon-4x" />
        </div>

        <div className="bh-m-8 bh-pull-left bh-clearfix">
            <Button classType="primary">
                <Icon className="icon-repeat" /> Reload
            </Button>
        </div>
        <div className="bh-m-8 bh-pull-left">
            <Button classType="primary">
                <Icon className="icon-refresh icon-spin" /> Refresh
            </Button>
        </div>


        <div className="bh-clearfix"></div>
    </div>,
    document.getElementById('example')
);