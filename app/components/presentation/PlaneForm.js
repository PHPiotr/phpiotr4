import React from 'react';
import InputGroup from '../helper/InputGroup.jsx';
import ButtonGroup from '../helper/ButtonGroup.jsx';

const PlaneForm = (props) => {
    let returnFlightInputs = null;
    let planeErrorMessage = props.planeErrorMessage;
    let planeInserted = props.planeInserted;
    let planeInsert = null;
    let planeError = null;

    if (props.plane.is_return) {
        returnFlightInputs = (
            <div>
                <InputGroup focusHandler={props.handleFocus} error={props.planeErrors.return_departure_date}
                            value={props.plane.return_departure_date} type="date" handler={props.handleChange}
                            name="return_departure_date"/>
                <InputGroup focusHandler={props.handleFocus} error={props.planeErrors.return_departure_time}
                            value={props.plane.return_departure_time} type="time" handler={props.handleChange}
                            name="return_departure_time"/>
                <InputGroup focusHandler={props.handleFocus} error={props.planeErrors.return_arrival_time}
                            value={props.plane.return_arrival_time} type="time" handler={props.handleChange}
                            name="return_arrival_time"/>
                <InputGroup focusHandler={props.handleFocus} error={props.planeErrors.return_seat}
                            value={props.plane.return_seat} handler={props.handleChange} name="return_seat"/>
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

    return (
        <form onSubmit={props.handleSubmit} className="form-horizontal">
            {planeInsert}
            {planeError}
            <InputGroup focusHandler={props.handleFocus} error={props.planeErrors.confirmation_code}
                        value={props.plane.confirmation_code} handler={props.handleChange}
                        name="confirmation_code"/>
            <InputGroup focusHandler={props.handleFocus} error={props.planeErrors.from}
                        value={props.plane.from} handler={props.handleChange} name="from"/>
            <InputGroup focusHandler={props.handleFocus} error={props.planeErrors.to}
                        value={props.plane.to} handler={props.handleChange} name="to"/>
            <InputGroup focusHandler={props.handleFocus} error={props.planeErrors.departure_date}
                        value={props.plane.departure_date} type="date" handler={props.handleChange}
                        name="departure_date"/>
            <InputGroup focusHandler={props.handleFocus} error={props.planeErrors.departure_time}
                        value={props.plane.departure_time} type="time" handler={props.handleChange}
                        name="departure_time"/>
            <InputGroup focusHandler={props.handleFocus} error={props.planeErrors.arrival_time}
                        value={props.plane.arrival_time} type="time" handler={props.handleChange}
                        name="arrival_time"/>
            <InputGroup focusHandler={props.handleFocus} error={props.planeErrors.seat}
                        value={props.plane.seat} handler={props.handleChange} name="seat"/>
            <InputGroup focusHandler={props.handleFocus} error={props.planeErrors.price}
                        placeholder={props.pricePlaceholder} value={props.plane.price} handler={props.handleChange} name="price"/>
            <InputGroup focusHandler={props.handleFocus} error={props.planeErrors.currency}
                        value={props.plane.currency} handler={props.handleChange} name="currency"/>
            <InputGroup focusHandler={props.handleFocus} error={props.planeErrors.checked_in}
                        value={props.plane.checked_in} type="checkbox" handler={props.handleChange}
                        name="checked_in"/>
            <InputGroup focusHandler={props.handleFocus} error={props.planeErrors.is_return}
                        value={props.plane.is_return} type="checkbox" handler={props.handleChange}
                        name="is_return"/>
            {returnFlightInputs}
            <ButtonGroup>Add</ButtonGroup>
        </form>
    );
};

export default PlaneForm;