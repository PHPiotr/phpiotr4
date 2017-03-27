import React, {Component, PropTypes} from 'react';
import Nav from '../nav/Nav.jsx';
import Pagination from '../nav/Pagination.jsx';
import Auth from '../hoc/Auth.jsx';
import moment from 'moment';

class Planes extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let propsChildren = this.props.children && React.cloneElement(this.props.children, {
            planes: this.props.planes,
            plane: this.props.plane,
            planeErrors: this.props.planeErrors,
            planeErrorMessage: this.props.planeErrorMessage,
            planeInserted: this.props.planeInserted,
            callbacks: this.props.callbacks,
            socket: this.props.socket,
            getContent: this.getContent.bind(this),
            labelPlural: 'planes',
            labelSingular: 'plane'
        });
        return (
            <div>
                <Nav booking="planes"/>
                {propsChildren}
            </div>
        );
    }

    getContent() {

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
                <td className="text-right">{`£ ${this.props.callbacks.formatPrice(flight.price)}`}</td>
                <td>{moment(flight.departure_date, 'DD/MM/YYYY').format('DD/MM/YYYY')}</td>
                <td>{flight.return_departure_date ? moment(flight.return_departure_date, 'DD/MM/YYYY').format('DD/MM/YYYY') : ''}</td>
                <td>{flight.from}</td>
                <td>{flight.to}</td>
            </tr>
        ));

        return (
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
                            <td className="info">£ {this.props.callbacks.formatPrice(planes.total_cost)}</td>
                            <td>£ {this.props.callbacks.formatPrice(planes.average_cost)}</td>
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
                    getBookingsCallback={this.props.callbacks.handleList}
                />
            </div>
        );
    }
}

Planes.propTypes = {
    planes: PropTypes.object,
    plane: PropTypes.object,
    planeErrors: PropTypes.object,
    planeInserted: PropTypes.object,
    planeErrorMessage: PropTypes.string,
};

Planes.displayName = 'Planes';

export default Auth(Planes);

