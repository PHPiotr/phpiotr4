import React from 'react';
import PropTypes from 'prop-types';
import {TableCell, TableRow} from 'material-ui/Table';
import List, {ListItem, ListItemText} from 'material-ui/List';

const BookingDetails = ({details, isHostel}) => {

    if (!details.length) {
        return null;
    }

    const formatDate = (date_string) => {
        const date = new Date(date_string);
        const getDate = parseInt(date.getDate(), 10);
        const day = getDate < 10 ? `0${getDate}` : getDate;
        const getMonth = parseInt(date.getMonth(), 10) + 1;
        const month = getMonth < 10 ? `0${getMonth}` : getMonth;
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const getPrice = number => 0 === number ? '0.00' : (number / 100).toFixed(2);

    const items = [];
    if (isHostel) {
        details.map(function (row, i) {
            const checkIn = formatDate(row.checkin_date);
            const checkOut = formatDate(row.checkout_date);
            items.push(
                <TableRow key={`${i}hostel`}>
                    <TableCell>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary={`${i + 1}. ${checkIn} - ${checkOut}`}
                                    secondary={row.hostel_name} />
                            </ListItem>
                        </List>
                    </TableCell>
                    <TableCell>£{getPrice(row.price)}</TableCell>
                </TableRow>
            );
        });
    } else {
        details.map(function (row, i) {
            const departDate = formatDate(row.departure_date);
            const returnDate = row.is_return ? ' - ' + formatDate(row.return_departure_date) : '';
            items.push(
                <TableRow key={i}>
                    <TableCell>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary={`${i + 1}. ${departDate}${returnDate}`}
                                    secondary={`${row.from} - ${row.to}`} />
                            </ListItem>
                        </List>
                    </TableCell>
                    <TableCell>£{getPrice(row.price)}</TableCell>
                </TableRow>
            );
        });
    }

    return items;
};

BookingDetails.propTypes = {
    details: PropTypes.array.isRequired,
    isHostel: PropTypes.bool,
};

BookingDetails.defaultProps = {
    isHostel: false,
};

BookingDetails.displayName = 'BookingCell';

export default BookingDetails;