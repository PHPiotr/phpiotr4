import React from 'react';
import formatPrice from '../../utils/formatPriceUtil';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import BookingDetails from './BookingDetails';
import NoContent from './NoContent';
import {TRAINS} from '../../constants';
import Bookings from '../containers/Bookings';

const TrainsTable = (props) => {

    if (!props.bookingsLength) {
        return <NoContent/>;
    }

    return (
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
                <BookingDetails label="train" details={props.bookings} offset={(props.currentPage - 1) * props.maxPerPage}/>
            </TableBody>
        </Table>
    );
};

TrainsTable.bookingLabel = 'train';
TrainsTable.bookingsLabel = 'trains';
TrainsTable.appBarTitle = TRAINS;

export default Bookings(TrainsTable);