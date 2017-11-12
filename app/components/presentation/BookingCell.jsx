import React from 'react';
import PropTypes from 'prop-types';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';

const BookingCell = ({details, isHostel}) => {

    if (!details.length) {
        return null;
    }

    const formatDate = (date_string) => {
        var date = new Date(date_string);
        var day = parseInt(date.getDate(), 10) < 10 ? '0' + date.getDate() : date.getDate();
        var month = parseInt(date.getMonth(), 10) < 9 ? '0' + (parseInt(date.getMonth(), 10) + 1) : (parseInt(date.getMonth(), 10) + 1);
        var year = date.getFullYear();
        return day + '/' + month + '/' + year;
    };

    const truncate = (string) => {

        return !string ? '' : string.substring(0, 3);
    };

    const getPrice = (number) => {
        if (0 === number) {
            return '0.00';
        }
        return (number / 100).toFixed(2);
    };

    const rows = [];
    if (isHostel) {
        details.map(function (row, i) {
            rows.push(
                <TableRow key={`${i}hostel`}>
                    <TableCell>{i + 1}.</TableCell>
                    <TableCell>{formatDate(row.checkin_date) + '-' + formatDate(row.checkout_date)}</TableCell>
                    <TableCell>{row.hostel_name}</TableCell>
                    <TableCell>{getPrice(row.price)}</TableCell>
                </TableRow>
            );
        })
    }
    details.map(function (row, i) {
        rows.push(
            <TableRow key={i}>
                <TableCell>{i + 1}.</TableCell>
                <TableCell>{formatDate(row.departure_date)}{row.is_return ? '-' + formatDate(row.return_departure_date) : null}</TableCell>
                <TableCell>{truncate(row.from) + '-' + truncate(row.to)}</TableCell>
                <TableCell>{getPrice(row.price)}</TableCell>
            </TableRow>
        );
    });

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>When</TableCell>
                    <TableCell>Where</TableCell>
                    <TableCell>£</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows}
            </TableBody>
        </Table>
    );
};

BookingCell.propTypes = {
    details: PropTypes.array.isRequired,
    isHostel: PropTypes.bool,
};

BookingCell.defaultProps = {
    isHostel: false
};

BookingCell.displayName = 'BookingCell';

export default BookingCell;