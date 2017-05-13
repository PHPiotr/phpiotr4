import React from 'react';
import formatPrice from '../helper/formatPrice';
import moment from 'moment';

const PlanesTable = (props) => {
    if (props.planes.data === undefined) {
        return null;
    }

    let planes = props.planes.data;

    if (planes.flights_length === undefined) {
        return null;
    }

    let flights_length = planes.flights_length;

    if (!flights_length) {
        return (
            <div className="row-fluid">
                <p>{`No ${planes.title.toLowerCase()}`}</p>
            </div>
        );
    }

    let indexCalc = (planes.current_page - 1) * planes.max_per_page;

    let flights = planes.flights.map((flight, flightIndex) => (
        <tr key={flight.confirmation_code}>
            <td className="text-right">{`${flightIndex + 1 + indexCalc}.`}</td>
            <td>{flight.confirmation_code}</td>
            <td className="text-right">{`£ ${formatPrice(flight.price)}`}</td>
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
                        <td className="info">£ {formatPrice(planes.total_cost)}</td>
                        <td>£ {formatPrice(planes.average_cost)}</td>
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
        </div>
    );
};

export default PlanesTable;