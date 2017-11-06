import React from 'react';
import BookingCell from '../helper/BookingCell.jsx';

const ReportTable = (props) => {
    const report = props.report;
    return (
        <div>
            <h1>Total cost: £{report.total_cost}</h1>

            <div className="row">
                <div className="col-xl-3 col-lg-6 col-md-12 col col-sm-12">
                    <table className="table table-bordered table-sm ">
                        <thead className="thead-default">
                            <tr>
                                <th>Buses</th>
                                <td className="table-info">£{report.buses_cost}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Average</td>
                                <td>£{report.buses_avg}</td>
                            </tr>
                            <tr>
                                <td>Journeys</td>
                                <td>{report.buses_singles_quantity}</td>
                            </tr>
                            <tr>
                                <td>Bookings</td>
                                <td>{report.buses.length}</td>
                            </tr>
                        </tbody>
                    </table>
                    <BookingCell colSpan="2" details={report.buses}/>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12">
                    <table className="table table-bordered table-sm ">
                        <thead className="thead-default">
                            <tr>
                                <th>Planes</th>
                                <td className="table-info">£{report.planes_cost}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Average</td>
                                <td>£{report.planes_avg}</td>
                            </tr>
                            <tr>
                                <td>Journeys</td>
                                <td>{report.planes_singles_quantity}</td>
                            </tr>
                            <tr>
                                <td>Bookings</td>
                                <td>{report.planes.length}</td>
                            </tr>
                        </tbody>
                    </table>
                    <BookingCell colSpan="2" details={report.planes}/>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12">
                    <table className="table table-bordered table-sm ">
                        <thead className="thead-default">
                            <tr>
                                <th>Trains</th>
                                <td className="table-info">£ {report.trains_cost}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Average</td>
                                <td>£{report.trains_avg}</td>
                            </tr>
                            <tr>
                                <td>Journeys</td>
                                <td>{report.trains_singles_quantity}</td>
                            </tr>
                            <tr>
                                <td>Bookings</td>
                                <td>{report.trains.length}</td>
                            </tr>
                        </tbody>
                    </table>
                    <BookingCell details={report.trains}/>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12">
                    <table className="table table-bordered table-sm ">
                        <thead className="thead-default">
                            <tr>
                                <th>Hostels</th>
                                <td className="table-info">£ {report.hostels_cost}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Average</td>
                                <td>£{report.hostels_avg}</td>
                            </tr>
                            <tr>
                                <td>Bookings</td>
                                <td>{report.hostels.length}</td>
                            </tr>
                        </tbody>
                    </table>
                    <BookingCell details={report.hostels} isHostel={true}/>
                </div>
            </div>
        </div>
    );
};

export default ReportTable;