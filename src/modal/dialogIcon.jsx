import React from 'react';

let DialogIcon = React.createClass({
    render: function () {
        let props = this.props;
        let icon;
        if(props.showType === "success"){
            icon = <div className="sweet-alert">
                        <div className="sa-icon sa-success">
                            <span className="sa-line sa-tip animateSuccessTip"></span>
                            <span className="sa-line sa-long animateSuccessLong"></span>
                            <div className="sa-placeholder"></div>
                            <div className="sa-fix"></div>
                        </div>
                    </div>
        }else if(props.showType === "warning"){
            icon = <div className="sweet-alert">
                        <div className="sa-icon sa-warning pulseWarning">
                            <span className="sa-body pulseWarningIns"></span>
                            <span className="sa-dot pulseWarningPoint"></span>
                        </div>
                    </div>
        }else if(props.showType === "danger"){
            icon = <div className="sweet-alert">
                        <div className="sa-icon sa-error animateErrorIcon">
                              <span className="sa-x-mark animateXMark">
                                    <span className="sa-line sa-left errorAnimateLeft"></span>
                                    <span className="sa-line sa-right errorAnimateRight"></span>
                              </span>
                        </div>
                    </div>
        }
        return (icon);
    }
});

export default DialogIcon;
