import React, { Component, PropTypes } from 'react';
import Pagination from '../nav/Pagination.jsx';
import moment from 'moment';

class BusesCurrent extends Component {

    constructor(props) {
        super(props);
        this.getBuses = this.getBuses.bind(this);
    }

    componentDidMount() {
        this.props.busesCallbacks.getBookings('current');
        this.props.socket.on('insert_bus', this.getBuses);
    };

    componentWillUnmount() {
        this.props.socket.removeListener('insert_bus', this.getBuses);
    };

    getBuses() {
        this.props.busesCallbacks.getBookings('current');
        console.log('socket on insert fetched current buses');
        alert('Sockets!');
    };

    render() {

        let buses = this.props.buses;
        let journeys_length = buses.journeys_length;

        if (!journeys_length) {
            return (
                <div className="row-fluid">
                    <p>{`No ${buses.title}`}</p>
                </div>
            );
        }

        let indexCalc = (buses.current_page - 1) * buses.max_per_page;

        let journeys = buses.journeys.map((journey, journeyIndex) => (
            <tr key={journey.booking_number}>
                <td className="text-right">{`${journeyIndex + 1 + indexCalc}.`}</td>
                <td>{journey.booking_number}</td>
                <td className="text-right">{`£ ${journey.price}`}</td>
                <td>{moment(journey.departure_date, 'DD/MM/YYYY').format('DD/MM/YYYY')}</td>
                <td>{journey.return_departure_date ? moment(journey.return_departure_date, 'DD/MM/YYYY').format('DD/MM/YYYY') : ''}</td>
                <td>{journey.from}</td>
                <td>{journey.to}</td>
            </tr>
        ));

        return(
            <div>
                <div className="row-fluid">
                    <table className="table table-hover table-condensed table-bordered">
                        <thead>
                        <tr>
                            <th>Total</th>
                            <th>Average</th>
                            <th>Bookings</th>
                            <th>Single</th>
                            <th>Return</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="info">£ {buses.total_cost}</td>
                            <td>£ {buses.average_cost}</td>
                            <td>{buses.journeys_length}</td>
                            <td>{buses.journeys_length - buses.return_journeys_length}</td>
                            <td>{buses.return_journeys_length}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="row-fluid">
                    <table className="table table-hover table-condensed table-bordered">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Code</th>
                            <th className="text-right">Price</th>
                            <th>Going out</th>
                            <th>Coming back</th>
                            <th>Departs from</th>
                            <th>Arrives to</th>
                        </tr>
                        </thead>
                        <tbody>
                        {journeys}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    booking_type={buses.selected}
                    pages_count={buses.pages_count}
                    bookings_length={buses.journeys_length}
                    max_per_page={buses.max_per_page}
                    current_page={buses.current_page}
                    is_first_page={buses.is_first_page}
                    is_last_page={buses.is_last_page}
                    active={buses.active}
                    getBookingsCallback={this.props.busesCallbacks.getBookings}
                />
            </div>
        );
    };
};

BusesCurrent.propTypes = {
    buses: PropTypes.object,
    busesCallbacks: PropTypes.object
};

export default BusesCurrent;

