import React from 'react';
import formatPrice from '../../utils/formatPriceUtil';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import BookingDetails from './BookingDetails';
import NoContent from './NoContent';

const HostelsTable = ({bookings, bookings_length, current_page, max_per_page, total_cost, average_cost}) => {

    bookings_length || 0;
    if (!bookings_length) {
        return <NoContent/>;
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell>£{formatPrice(total_cost)}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>Average</TableCell>
                    <TableCell>£{formatPrice(average_cost)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Bookings</TableCell>
                    <TableCell>{bookings_length}</TableCell>
                </TableRow>
                <BookingDetails details={bookings} isHostel={true} offset={(current_page - 1) * max_per_page}/>
            </TableBody>
        </Table>
    );
};

export default HostelsTable;