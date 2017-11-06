import React from 'react';
import formatPrice from '../helper/formatPrice';
import moment from 'moment';

const TrainsTable = (props) => {
    if (props.trains.data === undefined) {
        return null;
    }

    let trains = props.trains.data;

    if (trains.journeys_length === undefined) {
        return null;
    }

    let journeys_length = trains.journeys_length;

    if (!journeys_length) {
        return (
            <div className="row-fluid">
                <p>{`No ${trains.title.toLowerCase()}`}</p>
            </div>
        );
    }

    let indexCalc = (trains.current_page - 1) * trains.max_per_page;

    let journeys = trains.journeys.map((journey, journeyIndex) => (
        <tr key={journey._id}>
            <td className="text-right">{`${journeyIndex + 1 + indexCalc}.`}</td>
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
                            <td className="info">£ {formatPrice(trains.total_cost)}</td>
                            <td>£ {formatPrice(trains.average_cost)}</td>
                            <td>{trains.journeys_length}</td>
                            <td>{trains.journeys_length - trains.return_journeys_length}</td>
                            <td>{trains.return_journeys_length}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="row-fluid">
                <table className="table table-hover table-condensed table-bordered">
                    <thead>
                        <tr>
                            <th></th>
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

export default TrainsTable;