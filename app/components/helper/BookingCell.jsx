import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';

class BookingCell extends Component {

    render() {
        if (0 === this.props.details.length) {
            return null;
        }
        return (
            <Table className="table table-hover table-sm booking-details">
                <TableHead>
                    <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell>When</TableCell>
                        <TableCell>Where</TableCell>
                        <TableCell>£</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.getDetails()}
                </TableBody>
            </Table>
        );
    }

    getDetails() {
        const that = this;
        if (that.props.isHostel) {
            return that.props.details.map(function (row, i) {
                return (
                    <TableRow key={i}>
                        <TableCell>{i + 1}.</TableCell>
                        <TableCell>{that.formatDate(row.checkin_date) + '-' + that.formatDate(row.checkout_date)}</TableCell>
                        <TableCell>{row.hostel_name}</TableCell>
                        <TableCell>{that.getPrice(row.price)}</TableCell>
                    </TableRow>
                );
            })
        }
        return that.props.details.map(function (row, i) {
            return (
                <TableRow key={i}>
                    <TableCell>{i + 1}.</TableCell>
                    <TableCell>{that.formatDate(row.departure_date)}{row.is_return ? '-' + that.formatDate(row.return_departure_date) : null}</TableCell>
                    <TableCell>{that.truncate(row.from) + '-' + that.truncate(row.to)}</TableCell>
                    <TableCell>{that.getPrice(row.price)}</TableCell>
                </TableRow>
            );
        });
    }

    formatDate(date_string) {
        var date = new Date(date_string);
        var day = parseInt(date.getDate(), 10) < 10 ? '0' + date.getDate() : date.getDate();
        var month = parseInt(date.getMonth(), 10) < 9 ? '0' + (parseInt(date.getMonth(), 10) + 1) : (parseInt(date.getMonth(), 10) + 1);
        var year = date.getFullYear();
        return day + '/' + month + '/' + year;
    }

    truncate(string) {
        return string.substring(0, 3);
    }

    getPrice(number) {
        if (0 === number) {
            return '0.00';
        }
        return (number / 100).toFixed(2);
    }

}

BookingCell.propTypes = {
    details: PropTypes.array.isRequired,
    isHostel: PropTypes.bool,
};

BookingCell.defaultProps = {
    isHostel: false
};

BookingCell.displayName = 'BookingCell';

export default BookingCell;