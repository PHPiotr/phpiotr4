var React = require('react');
var Form = React.createClass({
    name: 'Form',
    propTypes: {
        action: React.PropTypes.string.isRequired,
        method: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            method: 'post'
        };
    },
    render: function() {
        return (
                <form action={this.props.action} className="form-horizontal" method={this.props.method}>
                    {this.props.children}
                </form>
        );
    }
});

module.exports = Form;
