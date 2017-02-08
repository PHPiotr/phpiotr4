import React, { Component, PropTypes } from 'react';

class PlanesNew extends Component
{

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        this.props.planesCallbacks.addBooking(event);
    }

    handleChange(event) {
        this.props.callbacks.handleChange(event, 'plane');
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit} className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="" className="col-sm-2 control-label">Number</label>
                    <div className="col-sm-10">
                        <input type="text" name="confirmation_number" className="form-control" onChange={this.handleChange} value={this.props.plane.confirmation_number} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="" className="col-sm-2 control-label">Currency</label>
                    <div className="col-sm-10">
                        <input type="text" name="currency" className="form-control" onChange={this.handleChange} value={this.props.plane.currency} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="" className="col-sm-2 control-label">Return</label>
                    <div className="col-sm-10">
                        <input type="checkbox" name="is_return" className="form-control" onChange={this.handleChange} value={this.props.plane.is_return} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default">Add</button>
                    </div>
                </div>
            </form>
        );
    };
};

PlanesNew.propTypes = {
    plane: PropTypes.object,
    planesCallbacks: PropTypes.object
};

export default PlanesNew;

