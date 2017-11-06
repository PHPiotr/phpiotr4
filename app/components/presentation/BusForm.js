import React from 'react';
import InputGroup from '../helper/InputGroup.jsx';
import ButtonGroup from '../helper/ButtonGroup.jsx';

const BusForm = (props) => {
    let returnJourneyInputs = null;
    let busErrorMessage = props.busErrorMessage;
    let busInserted = props.busInserted;
    let busInsert = null;
    let busError = null;

    if (props.bus.is_return) {
        returnJourneyInputs = (
            <div>
                <InputGroup focusHandler={props.handleFocus} error={props.busErrors.return_departure_date}
                    value={props.bus.return_departure_date} type="date" handler={props.handleChange}
                    name="return_departure_date"/>
                <InputGroup focusHandler={props.handleFocus} error={props.busErrors.return_departure_time}
                    value={props.bus.return_departure_time} type="time" handler={props.handleChange}
                    name="return_departure_time"/>
                <InputGroup focusHandler={props.handleFocus} error={props.busErrors.return_arrival_time}
                    value={props.bus.return_arrival_time} type="time" handler={props.handleChange}
                    name="return_arrival_time"/>
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

    return (
        <form onSubmit={props.handleSubmit} className="form-horizontal">
            {busInsert}
            {busError}
            <InputGroup focusHandler={props.handleFocus} error={props.busErrors.booking_number}
                value={props.bus.booking_number} handler={props.handleChange} name="booking_number"/>
            <InputGroup focusHandler={props.handleFocus} error={props.busErrors.from}
                value={props.bus.from} handler={props.handleChange} name="from"/>
            <InputGroup focusHandler={props.handleFocus} error={props.busErrors.to} value={props.bus.to}
                handler={props.handleChange} name="to"/>
            <InputGroup focusHandler={props.handleFocus} error={props.busErrors.departure_date}
                value={props.bus.departure_date} type="date" handler={props.handleChange}
                name="departure_date"/>
            <InputGroup focusHandler={props.handleFocus} error={props.busErrors.departure_time}
                value={props.bus.departure_time} type="time" handler={props.handleChange}
                name="departure_time"/>
            <InputGroup focusHandler={props.handleFocus} error={props.busErrors.arrival_time}
                value={props.bus.arrival_time} type="time" handler={props.handleChange}
                name="arrival_time"/>
            <InputGroup focusHandler={props.handleFocus} error={props.busErrors.price}
                placeholder={props.pricePlaceholder} value={props.bus.price} handler={props.handleChange} name="price"/>
            <InputGroup focusHandler={props.handleFocus} error={props.busErrors.currency}
                value={props.bus.currency} handler={props.handleChange} name="currency"/>
            <InputGroup focusHandler={props.handleFocus} error={props.busErrors.is_return}
                value={props.bus.is_return} type="checkbox" handler={props.handleChange}
                name="is_return"/>
            {returnJourneyInputs}
            <ButtonGroup>Add</ButtonGroup>
        </form>
    );
};

export default BusForm;