import React from 'react';
import InputGroup from '../helper/InputGroup.jsx';
import Button from 'material-ui/Button';

const HostelForm = (props) => {
    let hostelErrorMessage = props.hostelErrorMessage;
    let hostelInserted = props.hostelInserted;
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

    return (
        <form onSubmit={props.handleSubmit} className="form-horizontal">
            {hostelInsert}
            {hostelError}
            <InputGroup focusHandler={props.handleFocus} error={props.hostelErrors.booking_number}
                value={props.hostel.booking_number} handler={props.handleChange} name="booking_number"/>
            <InputGroup focusHandler={props.handleFocus} error={props.hostelErrors.hostel_name}
                value={props.hostel.hostel_name} handler={props.handleChange} name="hostel_name"/>
            <InputGroup focusHandler={props.handleFocus} error={props.hostelErrors.hostel_address}
                value={props.hostel.hostel_address} handler={props.handleChange} name="hostel_address"/>
            <InputGroup focusHandler={props.handleFocus} error={props.hostelErrors.checkin_date}
                value={props.hostel.checkin_date} type="date" handler={props.handleChange}
                name="checkin_date"/>
            <InputGroup focusHandler={props.handleFocus} error={props.hostelErrors.checkout_date}
                value={props.hostel.checkout_date} type="date" handler={props.handleChange}
                name="checkout_date"/>
            <InputGroup focusHandler={props.handleFocus} error={props.hostelErrors.price}
                placeholder={props.pricePlaceholder} value={props.hostel.price} handler={props.handleChange} name="price"/>
            <InputGroup focusHandler={props.handleFocus} error={props.hostelErrors.currency}
                value={props.hostel.currency} handler={props.handleChange} name="currency"/>
            <Button type="submit">Add</Button>
        </form>
    );
};

export default HostelForm;