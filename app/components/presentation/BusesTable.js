import React from 'react';
import formatPrice from '../helper/formatPrice';
import moment from 'moment';

const BusesTable = (props) => {
    if (props.buses.data === undefined) {
        return null;
    }

    let buses = props.buses.data;

    let journeys_length = buses.journeys_length !== undefined ? buses.journeys_length : 0;

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
            <td className="text-right">{`£ ${formatPrice(journey.price)}`}</td>
            <td>{moment(journey.departure_date, 'DD/MM/YYYY').format('DD/MM/YYYY')}</td>
            <td>{journey.return_departure_date ? moment(journey.return_departure_date, 'DD/MM/YYYY').format('DD/MM/YYYY') : ''}</td>
            <td>{journey.from}</td>
            <td>{journey.to}</td>
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
                        <td className="info">£ {formatPrice(buses.total_cost)}</td>
                        <td>£ {formatPrice(buses.average_cost)}</td>
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
        </div>
    );
};

export default BusesTable;