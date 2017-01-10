var React = require('react');
var ReportAlert = React.createClass({

    render: function() {

        if (!this.props.insert) {
            return null;
        }

        return (
            <div className="row">
                <div className="alert alert-success alert-dismissible">
                    <a className="close" href="#" data-dismiss="alert" aria-label="close">×</a>
                    Hello, inserted element!!!
                </div>
            </div>
        );
    }
});
module.exports = ReportAlert;