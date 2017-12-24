import React from 'react';
import formatPrice from '../../utils/formatPriceUtil';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import BookingDetails from './BookingDetails';
import {PLANES} from '../../constants';
import Bookings from '../containers/Bookings';

const PlanesTable = props => (
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
            <BookingDetails label="plane" details={props.bookings} offset={(props.currentPage - 1) * props.maxPerPage}/>
        </TableBody>
    </Table>
);

PlanesTable.bookingLabel = 'plane';
PlanesTable.bookingsLabel = 'planes';
PlanesTable.appBarTitle = PLANES;

export default Bookings(PlanesTable);