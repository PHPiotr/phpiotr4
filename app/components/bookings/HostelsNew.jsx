import React, { Component, PropTypes } from 'react';
import InputGroup from '../helper/InputGroup.jsx';
import ButtonGroup from '../helper/ButtonGroup.jsx';


class HostelsNew extends Component
{

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    handleSubmit(event) {
        this.props.hostelsCallbacks.addBooking(event);
    }

    handleChange(event) {
        this.props.callbacks.handleChange(event, 'hostel');
    }

    handleFocus(event) {
        this.props.callbacks.handleFocus(event, 'hostel');
    }

    render() {
        let hostelErrorMessage = this.props.hostelErrorMessage;
        let hostelInserted = this.props.hostelInserted;
        let hostelInsert = null;
        let hostelError = null;

        if (hostelErrorMessage) {
            hostelError = (
                <div className="alert alert-danger" role="alert">{hostelErrorMessage}</div>
            );
        }

        if (Object.keys(hostelInserted).length > 0) {
            hostelInsert = (
                <div className="alert alert-success" role="alert">New hostel was just inserted</div>
            );
        }

        return(
            <form onSubmit={this.handleSubmit} className="form-horizontal">
                {hostelInsert}
                {hostelError}
                <InputGroup focusHandler={this.handleFocus} error={this.props.hostelErrors.booking_number} value={this.props.hostel.booking_number} handler={this.handleChange} name="booking_number" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.hostelErrors.hostel_name} value={this.props.hostel.hostel_name} handler={this.handleChange} name="hostel_name" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.hostelErrors.hostel_address} value={this.props.hostel.hostel_address} handler={this.handleChange} name="hostel_address" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.hostelErrors.checkin_date} value={this.props.hostel.checkin_date} type="date" handler={this.handleChange} name="checkin_date" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.hostelErrors.checkout_date} value={this.props.hostel.checkout_date} type="date" handler={this.handleChange} name="checkout_date" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.hostelErrors.price} value={this.props.hostel.price} handler={this.handleChange} name="price" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.hostelErrors.currency} value={this.props.hostel.currency} handler={this.handleChange} name="currency" />
                <ButtonGroup>Add</ButtonGroup>
            </form>
        );
    };
};

HostelsNew.defaultProps = {
    hostel: {
        booking_number: '',
        hostel_name: '',
        hostel_address: '',
        checkin_date: '',
        checkout_date: '',
        price: '',
        currency: '£',
    },
    errors: {}
};

HostelsNew.propTypes = {
    hostel: PropTypes.object,
    hostelErrors: PropTypes.object,
    hostelErrorMessage: PropTypes.string,
    hostelsCallbacks: PropTypes.object,
    hostelInserted: PropTypes.object
};

export default HostelsNew;

