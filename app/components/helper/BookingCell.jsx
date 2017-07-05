import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BookingCell extends Component {

    render() {
        if (0 === this.props.details.length) {
            return (
                <td>-</td>
            );
        }
        return (
            <td>
                <table className="table table-bordered table-hover table-sm table-responsive">
                    <tbody>
                    <tr>
                        <th></th>
                        <th>When</th>
                        <th>Where</th>
                        <th>Price</th>
                    </tr>
                    {this.getDetails()}
                    </tbody>
                </table>
            </td>
        );
    }

    getDetails() {
        const that = this;
        if (that.props.isHostel) {
            return that.props.details.map(function (row, i) {
                return (
                    <tr key={i}>
                        <td><strong>{i + 1}.</strong></td>
                        <td>{that.formatDate(row.checkin_date) + '-' + that.formatDate(row.checkout_date)}</td>
                        <td>{row.hostel_name}</td>
                        <td>{that.getPrice(row.price)}</td>
                    </tr>
                );
            })
        }
        return that.props.details.map(function (row, i) {
            return (
                <tr key={i}>
                    <td><strong>{i + 1}.</strong></td>
                    <td>{that.formatDate(row.departure_date)}{row.is_return ? '-' + that.formatDate(row.return_departure_date) : null}</td>
                    <td>{that.truncate(row.from) + '-' + that.truncate(row.to)}</td>
                    <td>{that.getPrice(row.price)}</td>
                </tr>
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
        return '£ ' + (number / 100).toFixed(2);
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