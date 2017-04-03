import React, {Component, PropTypes} from 'react';
import Nav from '../nav/Nav.jsx';
import Pagination from '../nav/Pagination.jsx';
import Auth from '../hoc/Auth.jsx';
import moment from 'moment';

class Trains extends Component {

    render() {
        let bookings = this.props.bookings;
        let propsChildren = this.props.children && React.cloneElement(this.props.children, {
            trains: bookings.trains,
            train: bookings.train,
            trainErrors: bookings.trainErrors,
            trainErrorMessage: bookings.trainErrorMessage,
            trainInserted: bookings.trainInserted,
            callbacks: this.props.callbacks,
            socket: this.props.socket,
            getContent: this.getContent.bind(this),
            labelPlural: 'trains',
            labelSingular: 'train'
        });
        return (
            <div>
                <Nav booking="trains"/>
                {propsChildren}
            </div>
        );
    }

    getContent() {

        let trains = this.props.bookings.trains;
        let journeys_length = trains.journeys_length;

        if (!journeys_length) {
            return (
                <div className="row-fluid">
                    <p>{`No ${trains.title}`}</p>
                </div>
            );
        }

        let indexCalc = (trains.current_page - 1) * trains.max_per_page;

        let journeys = trains.journeys.map((journey, journeyIndex) => (
            <tr key={journey._id}>
                <td className="text-right">{`${journeyIndex + 1 + indexCalc}.`}</td>
                <td className="text-right">{`£ ${this.props.callbacks.formatPrice(journey.price)}`}</td>
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
                            <td className="info">£ {this.props.callbacks.formatPrice(trains.total_cost)}</td>
                            <td>£ {this.props.callbacks.formatPrice(trains.average_cost)}</td>
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
                <Pagination
                    booking_type={trains.selected}
                    pages_count={trains.pages_count}
                    bookings_length={trains.journeys_length}
                    max_per_page={trains.max_per_page}
                    current_page={trains.current_page}
                    is_first_page={trains.is_first_page}
                    is_last_page={trains.is_last_page}
                    active={trains.active}
                    getBookingsCallback={this.props.callbacks.handleList}
                />
            </div>
        );
    }
}

Trains.propTypes = {
    trains: PropTypes.object,
    train: PropTypes.object,
    trainErrors: PropTypes.object,
    trainInserted: PropTypes.object,
    trainErrorMessage: PropTypes.string,
};

Trains.displayName = 'Trains';

export default Auth(Trains);

