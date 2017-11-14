import React from 'react';
import BookingDetails from './BookingDetails';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Grid from 'material-ui/Grid';

const ReportTable = ({report}) => {
    return (
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
                        <BookingDetails details={report.buses}/>
                    </TableBody>
                </Table>
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
                        <BookingDetails details={report.planes}/>
                    </TableBody>
                </Table>
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
                        <BookingDetails details={report.trains}/>
                    </TableBody>
                </Table>
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
                        <BookingDetails details={report.hostels} isHostel={true}/>
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    );
};

export default ReportTable;