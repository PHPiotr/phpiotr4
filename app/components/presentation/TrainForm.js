import React from 'react';
import InputGroup from '../helper/InputGroup.jsx';
import ButtonGroup from '../helper/ButtonGroup.jsx';

const TrainForm = (props) => {
    let returnJourneyInputs = null;
    let trainErrorMessage = props.trainErrorMessage;
    let trainInserted = props.trainInserted;
    let trainInsert = null;
    let trainError = null;

    if (props.train.is_return) {
        returnJourneyInputs = (
            <div>
                <InputGroup focusHandler={props.handleFocus} error={props.trainErrors.return_departure_date}
                            value={props.train.return_departure_date} type="date" handler={props.handleChange}
                            name="return_departure_date"/>
            </div>
        );
    }

    if (trainErrorMessage) {
        trainError = (
            <div className="alert alert-danger" role="alert">{trainErrorMessage}</div>
        );
    }

    if (Object.keys(trainInserted).length > 0) {
        trainInsert = (
            <div className="alert alert-success" role="alert">New train was just inserted</div>
        );
    }

    return (
        <form onSubmit={props.handleSubmit} className="form-horizontal">
            {trainInsert}
            {trainError}
            <InputGroup focusHandler={props.handleFocus} error={props.trainErrors.from}
                        value={props.train.from} handler={props.handleChange} name="from"/>
            <InputGroup focusHandler={props.handleFocus} error={props.trainErrors.to}
                        value={props.train.to} handler={props.handleChange} name="to"/>
            <InputGroup focusHandler={props.handleFocus} error={props.trainErrors.departure_date}
                        value={props.train.departure_date} type="date" handler={props.handleChange}
                        name="departure_date"/>
            <InputGroup focusHandler={props.handleFocus} error={props.trainErrors.price}
                        value={props.train.price} handler={props.handleChange} name="price"/>
            <InputGroup focusHandler={props.handleFocus} error={props.trainErrors.currency}
                        value={props.train.currency} handler={props.handleChange} name="currency"/>
            <InputGroup focusHandler={props.handleFocus} error={props.trainErrors.is_return}
                        value={props.train.is_return} type="checkbox" handler={props.handleChange}
                        name="is_return"/>
            {returnJourneyInputs}
            <ButtonGroup>Add</ButtonGroup>
        </form>
    );
};

export default TrainForm;