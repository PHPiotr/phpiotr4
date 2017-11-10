import React from 'react';
import formatPrice from '../helper/formatPrice';
import moment from 'moment';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Typography from 'material-ui/Typography';

const TrainsTable = ({journeys, journeys_length, return_journeys_length, title, current_page, max_per_page, total_cost, average_cost}) => {

    journeys_length || 0;
    if (!journeys_length) {
        return title ? <Typography type="title">{`No ${title.toLowerCase()}`}</Typography> : null;
    }
    const index = (current_page - 1) * max_per_page;
    const items = journeys.map((b, i) => (
        <TableRow key={b._id}>
            <TableCell>{`${i + 1 + index}.`}</TableCell>
            <TableCell>{formatPrice(b.price)}</TableCell>
            <TableCell>{moment(b.departure_date, 'DD/MM/YYYY').format('DD/MM/YYYY')}</TableCell>
            <TableCell>{!!b.return_departure_date && moment(b.return_departure_date, 'DD/MM/YYYY').format('DD/MM/YYYY')}</TableCell>
            <TableCell>{b.from}</TableCell>
            <TableCell>{b.to}</TableCell>
        </TableRow>
    ));

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell>Average</TableCell>
                        <TableCell>Bookings</TableCell>
                        <TableCell>Single</TableCell>
                        <TableCell>Return</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>£ {formatPrice(total_cost)}</TableCell>
                        <TableCell>£ {formatPrice(average_cost)}</TableCell>
                        <TableCell>{journeys_length}</TableCell>
                        <TableCell>{journeys_length - return_journeys_length}</TableCell>
                        <TableCell>{return_journeys_length}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell>£</TableCell>
                        <TableCell>Out</TableCell>
                        <TableCell>Back</TableCell>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items}
                </TableBody>
            </Table>
        </div>
    );
};

export default TrainsTable;