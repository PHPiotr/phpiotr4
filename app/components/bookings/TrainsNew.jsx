import React, { Component, PropTypes } from 'react';
import InputGroup from '../helper/InputGroup.jsx';
import ButtonGroup from '../helper/ButtonGroup.jsx';
import Auth from '../hoc/Auth.jsx';

class TrainsNew extends Component
{

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    handleSubmit(event) {
        this.props.callbacks.handleAdd(event, 'train', 'trains');
    }

    handleChange(event) {
        this.props.callbacks.handleChange(event, 'train');
    }

    handleFocus(event) {
        this.props.callbacks.handleFocus(event, 'train');
    }

    render() {
        let returnJourneyInputs = null;
        let trainErrorMessage = this.props.trainErrorMessage;
        let trainInserted = this.props.trainInserted;
        let trainInsert = null;
        let trainError = null;

        if (this.props.train.is_return) {
            returnJourneyInputs = (
                <div>
                    <InputGroup focusHandler={this.handleFocus} error={this.props.trainErrors.return_departure_date} value={this.props.train.return_departure_date} type="date" handler={this.handleChange} name="return_departure_date" />
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

        return(
            <form onSubmit={this.handleSubmit} className="form-horizontal">
                {trainInsert}
                {trainError}
                <InputGroup focusHandler={this.handleFocus} error={this.props.trainErrors.from} value={this.props.train.from} handler={this.handleChange} name="from" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.trainErrors.to} value={this.props.train.to} handler={this.handleChange} name="to" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.trainErrors.departure_date} value={this.props.train.departure_date} type="date" handler={this.handleChange} name="departure_date" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.trainErrors.price} value={this.props.train.price} handler={this.handleChange} name="price" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.trainErrors.currency} value={this.props.train.currency} handler={this.handleChange} name="currency" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.trainErrors.is_return} value={this.props.train.is_return} type="checkbox" handler={this.handleChange} name="is_return" />
                {returnJourneyInputs}
                <ButtonGroup>Add</ButtonGroup>
            </form>
        );
    };
};

TrainsNew.defaultProps = {
    train: {
        from: '',
        to: '',
        departure_date: '',
        price: '',
        currency: '£',
        is_return: false,
        return_departure_date: '',
    },
    errors: {}
};

TrainsNew.propTypes = {
    train: PropTypes.object,
    trainErrors: PropTypes.object,
    trainErrorMessage: PropTypes.string,
    trainsCallbacks: PropTypes.object,
    trainInserted: PropTypes.object
};

export default Auth(TrainsNew);

