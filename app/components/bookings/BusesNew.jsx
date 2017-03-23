import React, { Component, PropTypes } from 'react';
import InputGroup from '../helper/InputGroup.jsx';
import ButtonGroup from '../helper/ButtonGroup.jsx';
import Auth from '../hoc/Auth.jsx';

class BusesNew extends Component
{

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    handleSubmit(event) {
        this.props.callbacks.handleAdd(event, 'bus', 'buses');
    }

    handleChange(event) {
        this.props.callbacks.handleChange(event, 'bus');
    }

    handleFocus(event) {
        this.props.callbacks.handleFocus(event, 'bus');
    }

    render() {
        let returnJourneyInputs = null;
        let busErrorMessage = this.props.busErrorMessage;
        let busInserted = this.props.busInserted;
        let busInsert = null;
        let busError = null;

        if (this.props.bus.is_return) {
            returnJourneyInputs = (
                <div>
                    <InputGroup focusHandler={this.handleFocus} error={this.props.busErrors.return_departure_date} value={this.props.bus.return_departure_date} type="date" handler={this.handleChange} name="return_departure_date" />
                    <InputGroup focusHandler={this.handleFocus} error={this.props.busErrors.return_departure_time} value={this.props.bus.return_departure_time} type="time" handler={this.handleChange} name="return_departure_time" />
                    <InputGroup focusHandler={this.handleFocus} error={this.props.busErrors.return_arrival_time} value={this.props.bus.return_arrival_time} type="time" handler={this.handleChange} name="return_arrival_time" />
                    <InputGroup focusHandler={this.handleFocus} error={this.props.busErrors.return_seat} value={this.props.bus.return_seat} handler={this.handleChange} name="return_seat" />
                </div>
            );
        }

        if (busErrorMessage) {
            busError = (
                <div className="alert alert-danger" role="alert">{busErrorMessage}</div>
            );
        }

        if (Object.keys(busInserted).length > 0) {
            busInsert = (
                <div className="alert alert-success" role="alert">New bus was just inserted</div>
            );
        }

        return(
            <form onSubmit={this.handleSubmit} className="form-horizontal">
                {busInsert}
                {busError}
                <InputGroup focusHandler={this.handleFocus} error={this.props.busErrors.booking_number} value={this.props.bus.booking_number} handler={this.handleChange} name="booking_number" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.busErrors.from} value={this.props.bus.from} handler={this.handleChange} name="from" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.busErrors.to} value={this.props.bus.to} handler={this.handleChange} name="to" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.busErrors.departure_date} value={this.props.bus.departure_date} type="date" handler={this.handleChange} name="departure_date" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.busErrors.departure_time} value={this.props.bus.departure_time} type="time" handler={this.handleChange} name="departure_time" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.busErrors.arrival_time} value={this.props.bus.arrival_time} type="time" handler={this.handleChange} name="arrival_time" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.busErrors.price} value={this.props.bus.price} handler={this.handleChange} name="price" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.busErrors.currency} value={this.props.bus.currency} handler={this.handleChange} name="currency" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.busErrors.is_return} value={this.props.bus.is_return} type="checkbox" handler={this.handleChange} name="is_return" />
                {returnJourneyInputs}
                <ButtonGroup>Add</ButtonGroup>
            </form>
        );
    };
};

BusesNew.defaultProps = {
    bus: {
        booking_number: '',
        from: 'Katowice',
        to: 'London',
        departure_date: '',
        departure_time: '',
        arrival_time: '',
        price: '',
        currency: '£',
        is_return: false,
        return_departure_date: '',
        return_departure_time: ''
    },
    errors: {}
};

BusesNew.propTypes = {
    bus: PropTypes.object,
    busErrors: PropTypes.object,
    busErrorMessage: PropTypes.string,
    busesCallbacks: PropTypes.object,
    busInserted: PropTypes.object
};

export default Auth(BusesNew);

