import React, { Component, PropTypes } from 'react';
import InputGroup from '../helper/InputGroup.jsx';
import ButtonGroup from '../helper/ButtonGroup.jsx';


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
        let returnFlightInputs = null;

        if (this.props.plane.is_return) {
            returnFlightInputs = (
                <div>
                    <InputGroup value={this.props.plane.return_departure_date} type="date" handler={this.handleChange} name="return_departure_date" />
                    <InputGroup value={this.props.plane.return_departure_time} type="time" handler={this.handleChange} name="return_departure_time" />
                    <InputGroup value={this.props.plane.return_arrival_time} type="time" handler={this.handleChange} name="return_arrival_time" />
                    <InputGroup value={this.props.plane.return_seat} handler={this.handleChange} name="return_seat" />
                </div>
            );
        }

        return(
            <form onSubmit={this.handleSubmit} className="form-horizontal">
                <InputGroup value={this.props.plane.confirmation_number} handler={this.handleChange} name="confirmation_number" />
                <InputGroup value={this.props.plane.from} handler={this.handleChange} name="from" />
                <InputGroup value={this.props.plane.to} handler={this.handleChange} name="to" />
                <InputGroup value={this.props.plane.departure_date} type="date" handler={this.handleChange} name="departure_date" />
                <InputGroup value={this.props.plane.departure_time} type="time" handler={this.handleChange} name="departure_time" />
                <InputGroup value={this.props.plane.arrival_time} type="time" handler={this.handleChange} name="arrival_time" />
                <InputGroup value={this.props.plane.seat} handler={this.handleChange} name="seat" />
                <InputGroup value={this.props.plane.price} handler={this.handleChange} name="price" />
                <InputGroup value={this.props.plane.currency} handler={this.handleChange} name="currency" />
                <InputGroup value={this.props.plane.checked_in} type="checkbox" handler={this.handleChange} name="checked_in" />
                <InputGroup value={this.props.plane.is_return} type="checkbox" handler={this.handleChange} name="is_return" />
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
    }
};

PlanesNew.propTypes = {
    plane: PropTypes.object,
    planesCallbacks: PropTypes.object
};

export default PlanesNew;

