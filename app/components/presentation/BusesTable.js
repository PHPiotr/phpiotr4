import React from 'react';
import formatPrice from '../../utils/formatPriceUtil';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import BookingDetails from './BookingDetails';

const BusesTable = ({journeys, journeys_length, return_journeys_length, title, current_page, max_per_page, total_cost, average_cost}) => {

    journeys_length || 0;
    if (!journeys_length) {
        return title ? <Typography type="title">{`No ${title.toLowerCase()}`}</Typography> : null;
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
                    <TableCell>{journeys_length}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Singles</TableCell>
                    <TableCell>{journeys_length - return_journeys_length}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Returns</TableCell>
                    <TableCell>{return_journeys_length}</TableCell>
                </TableRow>
                <BookingDetails details={journeys} offset={(current_page - 1) * max_per_page}/>
            </TableBody>
        </Table>
    );
};

export default BusesTable;