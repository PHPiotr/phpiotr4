import React, { Component, PropTypes } from 'react';
import Pagination from '../nav/Pagination.jsx';
import moment from 'moment';

class PlanesPast extends Component {

    constructor(props) {
        super(props);
        this.getPlanes = this.getPlanes.bind(this);
    }

    componentDidMount() {
        this.props.planesCallbacks.getBookings('past');
        this.props.socket.on('insert_plane', this.getPlanes);
    };

    componentWillUnmount() {
        this.props.socket.removeListener('insert_plane', this.getPlanes);
    };

    getPlanes() {
        this.props.planesCallbacks.getBookings('past');
        console.log('socket on insert fetched past planes');
        alert('Sockets!');
    };

    render() {

        let planes = this.props.planes;
        let flights_length = planes.flights_length;

        if (!flights_length) {
            return (
                    <div className="row-fluid">
                        <p>{`No ${planes.title}`}</p>
                    </div>
            );
        }
        
        let indexCalc = (planes.current_page - 1) * planes.max_per_page;
        
        let flights = planes.flights.map((flight, flightIndex) => (
                <tr key={flight.confirmation_code}>
                    <td className="text-right">{`${flightIndex + 1 + indexCalc}.`}</td>
                    <td>{flight.confirmation_code}</td>
                    <td className="text-right">{`£ ${flight.price}`}</td>
                    <td>{moment(flight.departure_date, 'DD/MM/YYYY').add(1, 'day').format('DD/MM/YYYY')}</td>
                    <td>{flight.return_departure_date ? moment(flight.return_departure_date, 'DD/MM/YYYY').add(1, 'day').format('DD/MM/YYYY') : ''}</td>
                    <td>{flight.from}</td>
                    <td>{flight.to}</td>
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
                                    <td className="info">£ {planes.total_cost}</td>
                                    <td>£ {planes.average_cost}</td>
                                    <td>{planes.flights_length}</td>
                                    <td>{planes.flights_length - planes.return_flights_length}</td>
                                    <td>{planes.return_flights_length}</td>
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
                                    <th className="t ext-right">Price</th>
                                    <th>Going out</th>
                                    <th>Coming back</th>
                                    <th>Departs from</th>
                                    <th>Arrives to</th>
                                </tr>
                            </thead>
                            <tbody>
                                {flights}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        booking_type={planes.selected}
                        pages_count={planes.pages_count}
                        bookings_length={planes.flights_length}
                        max_per_page={planes.max_per_page}
                        current_page={planes.current_page}
                        is_first_page={planes.is_first_page}
                        is_last_page={planes.is_last_page}
                        active={planes.active}
                        getBookingsCallback={this.props.planesCallbacks.getBookings}
                    />
                </div>
                );
    };
};

PlanesPast.propTypes = {
    planes: PropTypes.object,
    planesCallbacks: PropTypes.object
};

export default PlanesPast;

