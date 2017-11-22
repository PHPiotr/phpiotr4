import React from 'react';
import PropTypes from 'prop-types';
import {TableCell, TableRow} from 'material-ui/Table';
import List, {ListItem, ListItemText} from 'material-ui/List';
import {withRouter} from 'react-router-dom';
import formatDate from '../../utils/formatDateUtil';
import getPrice from '../../utils/formatPriceUtil';

const BookingDetails = ({label, details, isHostel, offset, history}) => {

    if (!details.length) {
        return null;
    }

    const style = {paddingLeft: 0, paddingRight: 0};
    const handleClick = id => history.push(`/bookings/${label}/${id}`);
    const rowStyle = {cursor: 'pointer'};
    const items = [];
    if (isHostel) {
        details.map(function (row, i) {
            const checkIn = formatDate(row.checkin_date);
            const checkOut = formatDate(row.checkout_date);
            items.push(
                <TableRow style={rowStyle} key={`${i}hostel`} onClick={() => handleClick(row.booking_number)}>
                    <TableCell>
                        <List>
                            <ListItem style={style}>
                                <ListItemText
                                    primary={`${i + 1 + (offset || 0)}. ${checkIn} - ${checkOut}`}
                                    secondary={row.hostel_name} />
                            </ListItem>
                        </List>
                    </TableCell>
                    <TableCell>
                        <List>
                            <ListItem style={style}>
                                <ListItemText
                                    primary={`£${getPrice(row.price)}`}
                                    secondary={row.booking_number} />
                            </ListItem>
                        </List>
                    </TableCell>
                </TableRow>
            );
        });
    } else {
        details.map(function (row, i) {
            const departDate = formatDate(row.departure_date);
            const returnDate = row.is_return ? ' - ' + formatDate(row.return_departure_date) : '';
            items.push(
                <TableRow style={rowStyle} key={i} onClick={() => handleClick(row.booking_number || row.confirmation_code)}>
                    <TableCell>
                        <List>
                            <ListItem style={style}>
                                <ListItemText
                                    primary={`${i + 1 + (offset || 0)}. ${departDate}${returnDate}`}
                                    secondary={`${row.from} - ${row.to}`} />
                            </ListItem>
                        </List>
                    </TableCell>
                    <TableCell>
                        <List>
                            <ListItem style={style}>
                                <ListItemText
                                    primary={`£${getPrice(row.price)}`}
                                    secondary={row.booking_number || row.confirmation_code || ''} />
                            </ListItem>
                        </List>
                    </TableCell>
                </TableRow>
            );
        });
    }

    return items;
};

BookingDetails.propTypes = {
    details: PropTypes.array.isRequired,
    isHostel: PropTypes.bool,
    label: PropTypes.string.isRequired,
};

BookingDetails.defaultProps = {
    isHostel: false,
};

BookingDetails.displayName = 'BookingCell';

export default withRouter(BookingDetails);