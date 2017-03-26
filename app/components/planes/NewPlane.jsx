var React = require('react');
var Form = require('../form/Form.jsx');
var FormGroup = require('../form/FormGroup.jsx');
var FormButton = require('../form/FormButton.jsx');
var NewPlane = React.createClass({
    getDefaultProps: function() {
        return {
            defaultCurrency: '£',
            method: 'post'
        };
    },
    getInitialState: function() {
        return {
            confirmation_code: null,
            from: null,
            to: null,
            departure_date: null,
            departure_time: null,
            arrival_time: null,
            seat: null,
            price: null,
            currency: '£',
            return_departure_date: null,
            return_departure_time: null,
            return_arrival_time: null
        };
    },
    componentDidMount: function() {
        $(function() {
            $("#departure-date, #return-departure-date").datepicker();
        });
    },
    render: function() {
        return (
                <Form action={this.props.action} method={this.props.method}>
                    <FormGroup type="text" name="confirmation_code" label="Confirmation code" value={this.state.confirmation_code} />
                    <FormGroup type="text" name="from" id="from" label="Fky from" value={this.state.from} />
                    <FormGroup type="text" name="to" id="to" label="Fly to" value={this.state.to} />
                    <FormGroup type="text" name="departure_date" id="departure-date" label="Departure date" value={this.state.departure_date} />
                    <FormGroup type="text" name="departure_time" id="departure-time" label="Departure time" value={this.state.departure_time} />
                    <FormGroup type="text" name="arrival_time" id="arrival-time" label="Arrival time" value={this.state.arrival_time} />
                    <FormGroup type="text" name="seat" id="seat" label="Seat" value={this.state.seat} />
                    <FormGroup type="text" name="price" id="price" label="Price" value={this.state.price} />
                    <FormGroup type="text" name="currency" id="currency" label="Currency" value={this.state.currency} defaultValue={this.props.defaultCurrency} />
                    <FormGroup type="chackbox" name="checked_in" id="checked-in" label="Checked in" value="1" />
                    <FormGroup type="chackbox" name="is_return" id="is-return" label="Is return" value="1" />
                    <FormGroup type="text" name="return_departure_date" id="return-departure-date" label="Return departure date" value={this.state.return_departure_date} />
                    <FormGroup type="text" name="return_departure_time" id="return-departure-time" label="Return departure time" value={this.state.return_departure_time} />
                    <FormGroup type="text" name="return_arrival_time"   id="return-arrival-time"   label="Return arrival time"   value={this.state.return_arrival_time} />
                    <FormGroup type="text" name="seat" id="seat" label="Seat" value={this.state.seat} />
                    <FormButton />
                </Form>
        );
    }
});

module.exports = NewPlane;
