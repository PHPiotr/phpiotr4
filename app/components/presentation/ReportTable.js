import React from 'react';
import BookingCell from '../helper/BookingCell.jsx';

const ReportTable = (props) => {
    const report = props.report;
    return (
        <table className="table table-bordered table-sm">
            <thead className="thead-default">
            <tr>
                <td className="table-info">£ {report.total_cost}</td>
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
                <BookingCell details={report.buses}/>
                <BookingCell details={report.planes}/>
                <BookingCell details={report.trains}/>
                <BookingCell details={report.hostels} isHostel={true}/>
            </tr>
            </tbody>
        </table>
    );
};

export default ReportTable;