import React, { Component, PropTypes } from 'react';
import InputGroup from '../helper/InputGroup.jsx';
import ButtonGroup from '../helper/ButtonGroup.jsx';
import Auth from '../Auth.jsx';

class PlanesNew extends Auth
{

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    handleSubmit(event) {
        this.props.callbacks.handleAdd(event, 'plane', 'planes');
    }

    handleChange(event) {
        this.props.callbacks.handleChange(event, 'plane');
    }

    handleFocus(event) {
        this.props.callbacks.handleFocus(event, 'plane');
    }

    render() {
        let returnFlightInputs = null;
        let planeErrorMessage = this.props.planeErrorMessage;
        let planeInserted = this.props.planeInserted;
        let planeInsert = null;
        let planeError = null;

        if (this.props.plane.is_return) {
            returnFlightInputs = (
                <div>
                    <InputGroup focusHandler={this.handleFocus} error={this.props.planeErrors.return_departure_date} value={this.props.plane.return_departure_date} type="date" handler={this.handleChange} name="return_departure_date" />
                    <InputGroup focusHandler={this.handleFocus} error={this.props.planeErrors.return_departure_time} value={this.props.plane.return_departure_time} type="time" handler={this.handleChange} name="return_departure_time" />
                    <InputGroup focusHandler={this.handleFocus} error={this.props.planeErrors.return_arrival_time} value={this.props.plane.return_arrival_time} type="time" handler={this.handleChange} name="return_arrival_time" />
                    <InputGroup focusHandler={this.handleFocus} error={this.props.planeErrors.return_seat} value={this.props.plane.return_seat} handler={this.handleChange} name="return_seat" />
                </div>
            );
        }

        if (planeErrorMessage) {
            planeError = (
                <div className="alert alert-danger" role="alert">{planeErrorMessage}</div>
            );
        }

        if (Object.keys(planeInserted).length > 0) {
            planeInsert = (
                <div className="alert alert-success" role="alert">New plane was just inserted</div>
            );
        }

        return(
            <form onSubmit={this.handleSubmit} className="form-horizontal">
                {planeInsert}
                {planeError}
                <InputGroup focusHandler={this.handleFocus} error={this.props.planeErrors.confirmation_code} value={this.props.plane.confirmation_code} handler={this.handleChange} name="confirmation_code" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.planeErrors.from} value={this.props.plane.from} handler={this.handleChange} name="from" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.planeErrors.to} value={this.props.plane.to} handler={this.handleChange} name="to" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.planeErrors.departure_date} value={this.props.plane.departure_date} type="date" handler={this.handleChange} name="departure_date" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.planeErrors.departure_time} value={this.props.plane.departure_time} type="time" handler={this.handleChange} name="departure_time" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.planeErrors.arrival_time} value={this.props.plane.arrival_time} type="time" handler={this.handleChange} name="arrival_time" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.planeErrors.seat} value={this.props.plane.seat} handler={this.handleChange} name="seat" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.planeErrors.price} value={this.props.plane.price} handler={this.handleChange} name="price" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.planeErrors.currency} value={this.props.plane.currency} handler={this.handleChange} name="currency" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.planeErrors.checked_in} value={this.props.plane.checked_in} type="checkbox" handler={this.handleChange} name="checked_in" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.planeErrors.is_return} value={this.props.plane.is_return} type="checkbox" handler={this.handleChange} name="is_return" />
                {returnFlightInputs}
                <ButtonGroup>Add</ButtonGroup>
            </form>
        );
    };
};

PlanesNew.defaultProps = {
    plane: {
        confirmation_code: '',
        from: 'Katowice',
        to: 'London',
        departure_date: '',
        departure_time: '',
        arrival_time: '',
        seat: '',
        price: '',
        currency: '£',
        checked_in: false,
        is_return: false,
        return_departure_date: '',
        return_departure_time: '',
        return_seat: ''
    },
    errors: {}
};

PlanesNew.propTypes = {
    plane: PropTypes.object,
    planeErrors: PropTypes.object,
    planeErrorMessage: PropTypes.string,
    planesCallbacks: PropTypes.object,
    planeInserted: PropTypes.object
};

export default PlanesNew;

