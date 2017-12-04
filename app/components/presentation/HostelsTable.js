import React from 'react';
import formatPrice from '../../utils/formatPriceUtil';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import BookingDetails from './BookingDetails';
import NoContent from './NoContent';
import {HOSTELS} from '../../constants';

const HostelsTable = (props) => {

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
                <BookingDetails label="hostel" details={props.bookings} isHostel={true} offset={(props.currentPage - 1) * props.maxPerPage}/>
            </TableBody>
        </Table>
    );
};

HostelsTable.bookingLabel = 'hostel';
HostelsTable.bookingsLabel = 'hostels';
HostelsTable.appBarTitle = HOSTELS;

export default HostelsTable;