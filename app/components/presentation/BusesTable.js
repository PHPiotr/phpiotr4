import React from 'react';
import formatPrice from '../../utils/formatPriceUtil';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import BookingDetails from './BookingDetails';
import NoContent from './NoContent';
import {BUSES} from '../../constants';

const BusesTable = ({journeys, journeys_length, return_journeys_length, current_page, max_per_page, total_cost, average_cost}) => {

    journeys_length || 0;
    if (!journeys_length) {
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
                <BookingDetails label="bus" details={journeys} offset={(current_page - 1) * max_per_page}/>
            </TableBody>
        </Table>
    );
};

BusesTable.bookingLabel = 'bus';
BusesTable.bookingsLabel = 'buses';
BusesTable.appBarTitle = BUSES;

export default BusesTable;