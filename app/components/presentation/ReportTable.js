import React from 'react';
import BookingDetails from './BookingDetails';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import ExpandIcon from 'material-ui-icons/ExpandMore';
import CollapseIcon from 'material-ui-icons/ExpandLess';

const ReportTable = ({report, toggleDetailsOpen}) => {
    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={3}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Buses</TableCell>
                            <TableCell>£{report.buses_cost}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Avg / singles</TableCell>
                            <TableCell>{`£${report.buses_avg} / ${report.buses_singles_quantity}`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <IconButton title={'Bookings'} aria-label={'Bookings'} onClick={() => toggleDetailsOpen('buses')}>
                                    {report.busesDetailsOpen ? <CollapseIcon/> : <ExpandIcon/>}
                                </IconButton>
                            </TableCell>
                            <TableCell>{report.buses.length}</TableCell>
                        </TableRow>
                        {report.busesDetailsOpen && <BookingDetails details={report.buses}/>}
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
                            <TableCell>Avg / singles</TableCell>
                            <TableCell>{`£${report.planes_avg} / ${report.planes_singles_quantity}`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <IconButton aria-label={'Bookings'} onClick={() => toggleDetailsOpen('planes')}>
                                    {report.planesDetailsOpen ? <CollapseIcon/> : <ExpandIcon/>}
                                </IconButton>
                            </TableCell>
                            <TableCell>{report.planes.length}</TableCell>
                        </TableRow>
                        {report.planesDetailsOpen && <BookingDetails details={report.planes}/>}
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
                            <TableCell>Avg / singles</TableCell>
                            <TableCell>{`£${report.trains_avg} / ${report.trains_singles_quantity}`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <IconButton aria-label={'Bookings'} onClick={() => toggleDetailsOpen('trains')}>
                                    {report.trainsDetailsOpen ? <CollapseIcon/> : <ExpandIcon/>}
                                </IconButton>
                            </TableCell>
                            <TableCell>{report.trains.length}</TableCell>
                        </TableRow>
                        {report.trainsDetailsOpen && <BookingDetails details={report.trains}/>}
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
                            <TableCell>
                                <IconButton aria-label={'Bookings'} onClick={() => toggleDetailsOpen('hostels')}>
                                    {report.hostelsDetailsOpen ? <CollapseIcon/> : <ExpandIcon/>}
                                </IconButton>
                            </TableCell>
                            <TableCell>{report.hostels.length}</TableCell>
                        </TableRow>
                        {report.hostelsDetailsOpen && <BookingDetails details={report.hostels} isHostel={true}/>}
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    );
};

export default ReportTable;