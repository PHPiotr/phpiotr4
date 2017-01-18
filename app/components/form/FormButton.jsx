var React = require('react');
var FormButton = React.createClass({
    render: function() {
        return (
            <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                    <button type="submit" className="btn btn-default">Add</button>
                </div>
            </div>
        );
    }
});
module.exports = FormButton;
