import React from 'react';
import formatPrice from '../../utils/formatPriceUtil';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import BookingDetails from './BookingDetails';
import {BUSES} from '../../constants';
import Bookings from '../containers/Bookings';

const BusesTable = props => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>£{formatPrice(props.totalCost)}</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                <TableCell>Average</TableCell>
                <TableCell>£{formatPrice(props.averageCost)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Bookings</TableCell>
                <TableCell>{props.bookingsLength}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Singles</TableCell>
                <TableCell>{props.bookingsLength - props.returnBookingsLength}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Returns</TableCell>
                <TableCell>{props.returnBookingsLength}</TableCell>
            </TableRow>
            <BookingDetails label="bus" details={props.bookings} offset={(props.currentPage - 1) * props.maxPerPage}/>
        </TableBody>
    </Table>
);

BusesTable.bookingLabel = 'bus';
BusesTable.bookingsLabel = 'buses';
BusesTable.appBarTitle = BUSES;

export default Bookings(BusesTable);