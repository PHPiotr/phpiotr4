var React = require("react");

module.exports = React.createClass({
    render: function() {
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    {this.props.info.label}
                </div>
                <div className="panel-body">
                    <a href={this.props.info.link}>{this.props.info.date}</a>
                </div>
            </div>
        );
    }
});