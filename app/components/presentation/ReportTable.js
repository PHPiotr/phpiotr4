import React from 'react';
import BookingDetails from './BookingDetails';
import Table, {TableBody, TableCell, TableRow} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import ExpandIcon from 'material-ui-icons/ExpandMore';
import CollapseIcon from 'material-ui-icons/ExpandLess';
import NoContent from './NoContent';
import Typography from 'material-ui/Typography';

const ReportTable = ({report, toggleDetailsOpen}) => {
    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={3}>
                <Typography style={{padding: '23px'}} type="headline">Buses</Typography>
                {report.buses.length ? (
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell>£{report.busesCost}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Avg / singles</TableCell>
                                <TableCell>{`£${report.busesAvg} / ${report.busesSinglesQuantity}`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <IconButton title={'Bookings'} aria-label={'Bookings'}
                                        onClick={() => toggleDetailsOpen('buses')}>
                                        {report.busesDetailsOpen ? <CollapseIcon/> : <ExpandIcon/>}
                                    </IconButton>
                                </TableCell>
                                <TableCell>{report.buses.length}</TableCell>
                            </TableRow>
                            {report.busesDetailsOpen && <BookingDetails label="bus" details={report.buses}/>}
                        </TableBody>
                    </Table>
                ) : <NoContent/>}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={3}>
                <Typography style={{padding: '23px'}} type="headline">Planes</Typography>
                {report.planes.length ? (
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell>£{report.planesCost}</TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell>Avg / singles</TableCell>
                                <TableCell>{`£${report.planesAvg} / ${report.planesSinglesQuantity}`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <IconButton aria-label={'Bookings'} onClick={() => toggleDetailsOpen('planes')}>
                                        {report.planesDetailsOpen ? <CollapseIcon/> : <ExpandIcon/>}
                                    </IconButton>
                                </TableCell>
                                <TableCell>{report.planes.length}</TableCell>
                            </TableRow>
                            {report.planesDetailsOpen && <BookingDetails label="plane" details={report.planes}/>}
                        </TableBody>
                    </Table>
                ) : <NoContent text="No planes"/>}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={3}>
                <Typography style={{padding: '23px'}} type="headline">Trains</Typography>
                {report.trains.length ? (
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell>£{report.trainsCost}</TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell>Avg / singles</TableCell>
                                <TableCell>{`£${report.trainsAvg} / ${report.trainsSinglesQuantity}`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <IconButton aria-label={'Bookings'} onClick={() => toggleDetailsOpen('trains')}>
                                        {report.trainsDetailsOpen ? <CollapseIcon/> : <ExpandIcon/>}
                                    </IconButton>
                                </TableCell>
                                <TableCell>{report.trains.length}</TableCell>
                            </TableRow>
                            {report.trainsDetailsOpen && <BookingDetails label="train" details={report.trains}/>}
                        </TableBody>
                    </Table>
                ) : <NoContent text="No trains"/>}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={3}>
                <Typography style={{padding: '23px'}} type="headline">Hostels</Typography>
                {report.hostels.length ? (
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell>£{report.hostelsCost}</TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell>Average</TableCell>
                                <TableCell>£{report.hostelsAvg}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <IconButton aria-label={'Bookings'}
                                        onClick={() => toggleDetailsOpen('hostels')}>
                                        {report.hostelsDetailsOpen ? <CollapseIcon/> : <ExpandIcon/>}
                                    </IconButton>
                                </TableCell>
                                <TableCell>{report.hostels.length}</TableCell>
                            </TableRow>
                            {report.hostelsDetailsOpen &&
                            <BookingDetails label="hostel" details={report.hostels} isHostel={true}/>}
                        </TableBody>
                    </Table>
                ) : <NoContent text="No hostels"/>}
            </Grid>
        </Grid>
    );
};

export default ReportTable;