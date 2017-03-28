import Auth from './hoc/Auth.jsx';
import React, {Component} from 'react';

class Report extends Component {

    constructor(props) {
        super(props);
        this.props.callbacks.handleReport();
    }

    _formatDate(date_string) {
        var date = new Date(date_string);
        var day = parseInt(date.getDate(), 10) < 10 ? '0' + date.getDate() : date.getDate();
        var month = parseInt(date.getMonth(), 10) < 9 ? '0' + (parseInt(date.getMonth(), 10) + 1) : (parseInt(date.getMonth(), 10) + 1);
        var year = date.getFullYear();
        return day + '/' + month + '/' + year;
    }

    _truncate(string, start, end) {
        start || 0;
        end || 3;
        return string.substring(start, end);
    }

    _getPrice(number) {
        if (0 === number) {
            return '0.00';
        }
        return '£ ' + (number / 100).toFixed(2);
    }

    render() {
        return this.getContent(this);
    }

    getContent(that) {
        let report = this.props.report;
        let busesMap, planesMap, trainsMap, hostelsMap;
        busesMap = report.buses.map(function (row, i) {
            return (
                <tr key={i}>
                    <td><strong>{i + 1}.</strong></td>
                    <td>{that._formatDate(row['departure_date'])}{row['is_return'] ? '-' + that._formatDate(row['return_departure_date']) : null}</td>
                    <td>{that._truncate(row['from']) + '-' + that._truncate(row['to'])}</td>
                    <td>{that._getPrice(row['price'])}</td>
                </tr>
            );
        });
        hostelsMap = report.hostels.map(function (row, i) {
            return (
                <tr key={i}>
                    <td><strong>{i + 1}.</strong></td>
                    <td>{that._formatDate(row.checkin_date) + '-' + that._formatDate(row.checkout_date)}</td>
                    <td>{that._getPrice(row.price)}</td>
                </tr>
            );
        });
        planesMap = report.planes.map(function (row, i) {
            return (
                <tr key={i}>
                    <td><strong>{i + 1}.</strong></td>
                    <td>{that._formatDate(row.departure_date)}{row.is_return ? '-' + that._formatDate(row.return_departure_date) : null}</td>
                    <td>{that._truncate(row.from) + '-' + that._truncate(row.to)}</td>
                    <td>{that._getPrice(row.price)}</td>
                </tr>
            );
        });
        trainsMap = report.trains.map(function (row, i) {
            return (
                <tr key={i}>
                    <td><strong>{i + 1}.</strong></td>
                    <td>{that._formatDate(row.departure_date)}</td>
                    <td>{that._truncate(row.from) + '-' + that._truncate(row.to)}</td>
                    <td>{row.is_return ? 'R' : null}</td>
                    <td>{that._getPrice(row.price)}</td>
                </tr>
            );
        });
        return (
            <table className="table table-bordered table-hover table-condensed">
                <thead>
                <tr>
                    <td className="info">£{report.total_cost}</td>
                    <th>Buses</th>
                    <th>Planes</th>
                    <th>Trains</th>
                    <th>Hostels</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><strong>Total:</strong></td>
                    <td>£ {report.buses_cost}</td>
                    <td>£ {report.planes_cost}</td>
                    <td>£ {report.trains_cost}</td>
                    <td>£ {report.hostels_cost}</td>
                </tr>
                <tr>
                    <td><strong>Average:</strong></td>
                    <td>£ {report.buses_avg}</td>
                    <td>£ {report.planes_avg}</td>
                    <td>£ {report.trains_avg}</td>
                    <td>£ {report.hostels_avg}</td>
                </tr>
                <tr>
                    <td><strong>Journeys:</strong></td>
                    <td>{report.buses_singles_quantity}</td>
                    <td>{report.planes_singles_quantity}</td>
                    <td>{report.trains_singles_quantity}</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td><strong>Bookings:</strong></td>
                    <td>{report.buses.length}</td>
                    <td>{report.planes.length}</td>
                    <td>{report.trains.length}</td>
                    <td>{report.hostels.length}</td>
                </tr>
                <tr>
                    <td><strong>Details:</strong></td>
                    <td>
                        <table className="table table-bordered table-condensed">
                            <tbody>{busesMap}</tbody>
                        </table>
                    </td>
                    <td>
                        <table className="table table-bordered table-condensed">
                            <tbody>{planesMap}</tbody>
                        </table>
                    </td>
                    <td>
                        <table className="table table-bordered table-condensed">
                            <tbody>{trainsMap}</tbody>
                        </table>
                    </td>
                    <td>
                        <table className="table table-bordered table-condensed">
                            <tbody>{hostelsMap}</tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default Auth(Report);