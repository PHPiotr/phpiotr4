import React from 'react';
import BookingCell from '../helper/BookingCell.jsx';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Grid from 'material-ui/Grid';

const ReportTable = (props) => {
    const report = props.report;
    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Buses</TableCell>
                                <TableCell>£{report.buses_cost}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Average</TableCell>
                                <TableCell>£{report.buses_avg}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Journeys</TableCell>
                                <TableCell>{report.buses_singles_quantity}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Bookings</TableCell>
                                <TableCell>{report.buses.length}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <BookingCell colSpan="2" details={report.buses}/>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Planes</TableCell>
                                <TableCell>£{report.planes_cost}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Average</TableCell>
                                <TableCell>£{report.planes_avg}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Journeys</TableCell>
                                <TableCell>{report.planes_singles_quantity}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Bookings</TableCell>
                                <TableCell>{report.planes.length}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <BookingCell colSpan="2" details={report.planes}/>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Trains</TableCell>
                                <TableCell>£{report.trains_cost}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Average</TableCell>
                                <TableCell>£{report.trains_avg}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Journeys</TableCell>
                                <TableCell>{report.trains_singles_quantity}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Bookings</TableCell>
                                <TableCell>{report.trains.length}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <BookingCell details={report.trains}/>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Hostels</TableCell>
                                <TableCell>£{report.hostels_cost}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Average</TableCell>
                                <TableCell>£{report.hostels_avg}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Bookings</TableCell>
                                <TableCell>{report.hostels.length}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <BookingCell details={report.hostels} isHostel={true}/>
                </Grid>
            </Grid>
        </div>
    );
};

export default ReportTable;