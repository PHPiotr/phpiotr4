import React from 'react';
import formatPrice from '../../utils/formatPriceUtil';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import BookingDetails from './BookingDetails';
import NoContent from './NoContent';
import {BUSES} from '../../constants';

const BusesTable = (props) => {

    if (!props.bookings_length) {
        return <NoContent/>;
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell>£{formatPrice(props.total_cost)}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>Average</TableCell>
                    <TableCell>£{formatPrice(props.average_cost)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Bookings</TableCell>
                    <TableCell>{props.bookings_length}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Singles</TableCell>
                    <TableCell>{props.bookings_length - props.return_bookings_length}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Returns</TableCell>
                    <TableCell>{props.return_bookings_length}</TableCell>
                </TableRow>
                <BookingDetails label="bus" details={props.bookings} offset={(props.current_page - 1) * props.max_per_page}/>
            </TableBody>
        </Table>
    );
};

BusesTable.bookingLabel = 'bus';
BusesTable.bookingsLabel = 'buses';
BusesTable.appBarTitle = BUSES;

export default BusesTable;