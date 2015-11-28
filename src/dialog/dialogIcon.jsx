import React from 'react';

let DialogIcon = React.createClass({
    render: function () {
        let props = this.props;
        let icon;
        if(props.showType === "success"){
            icon = <div className="bh-dialog-icon bh-dialog-icon-success">
                        <span className="bh-dialog-icon-line bh-dialog-icon-tip bh-dialog-successTip-animate"></span>
                        <span className="bh-dialog-icon-line bh-dialog-icon-long bh-dialog-successLong-animate"></span>
                        <div className="bh-dialog-success-icon-placeholder"></div>
                        <div className="bh-dialog-success-icon-fix"></div>
                    </div>
        }else if(props.showType === "warning"){
            icon = <div className="bh-dialog-icon bh-dialog-icon-warning">
                        <span className="bh-dialog-warning-body bh-dialog-warningBody-animate"></span>
                        <span className="bh-dialog-warning-dot bh-dialog-warningDot-animate"></span>
                    </div>
        }else if(props.showType === "danger"){
            icon = <div className="bh-dialog-icon bh-dialog-icon-error">
                          <span className="bh-dialog-error-mark">
                                <span className="bh-dialog-icon-line bh-dialog-error-iconLeft bh-dialog-errorLeft-animate"></span>
                                <span className="bh-dialog-icon-line bh-dialog-error-iconRight bh-dialog-errorRight-animate"></span>
                          </span>
                    </div>
        }
        return (icon);
    }
});

export default DialogIcon;
