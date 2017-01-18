var React = require('react');
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
var FormGroup = React.createClass({
    name: 'FormGroup',
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string,
        id: React.PropTypes.string,
        type: React.PropTypes.string,
        value: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            type: 'text',
            defaultValue: '',
            id: '',
            label: ''
        };
    },
    render: function() {
        return (
                <div className="form-group">
                    <label htmlFor={this.props.id} className="col-sm-2 control-label">{this.props.label}</label>
                    <div className="col-sm-10">
                        <input type={this.props.type} name={this.props.name} className="form-control" id={this.props.id} value={this.props.defaultValue} />
                    </div>
                </div>
                );
    }
});

module.exports = FormGroup;
