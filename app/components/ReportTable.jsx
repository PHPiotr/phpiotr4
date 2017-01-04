var React = require('react');

module.exports = React.createClass({

    _formatDate: function(date_string) {
        var date= new Date(date_string);
        var day = parseInt(date.getDate(), 10) < 10 ? '0' + date.getDate() : date.getDate();
        var month = parseInt(date.getMonth(), 10) < 9 ? '0' + (parseInt(date.getMonth(), 10) + 1) : (parseInt(date.getMonth(), 10) + 1);
        var year = date.getFullYear();
        return day + '/' + month + '/' + year;
    },

    render: function() {
        var that = this;
        return(
            <table className="table table-hover">
                <thead>
                    <tr>
                        <td>Total cost: {this.props.report.total_cost}</td>
                        <th>Buses</th>
                        <th>Planes</th>
                        <th>Trains</th>
                        <th>Hostels</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Cost:</strong></td>
                        <td>{this.props.report.buses_cost}</td>
                        <td>{this.props.report.planes_cost}</td>
                        <td>{this.props.report.trains_cost}</td>
                        <td>{this.props.report.hostels_cost}</td>
                    </tr>
                    <tr>
                        <td><strong>Amount:</strong></td>
                        <td>{this.props.report.buses.length}</td>
                        <td>{this.props.report.planes.length}</td>
                        <td>{this.props.report.trains.length}</td>
                        <td>{this.props.report.hostels.length}</td>
                    </tr>
                    <tr>
                        <td><strong>Details:</strong></td>
                        <td>
                            <table>
                                <tbody>
                                {
                                    this.props.report.buses.map(function(row, i) {
                                        return (
                                            <tr key={i}>
                                                <td><strong>{i + 1}.</strong></td>
                                                <td>{that._formatDate(row.departure_date)}</td>
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <table>
                                <tbody>
                                {
                                    this.props.report.planes.map(function(row, i) {
                                        return (
                                            <tr key={i}>
                                                <td><strong>{i + 1}.</strong></td>
                                                <td>{that._formatDate(row.departure_date)}</td>
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <table>
                                <tbody>
                                {
                                    this.props.report.trains.map(function(row, i) {
                                        return (
                                            <tr key={i}>
                                                <td><strong>{i + 1}.</strong></td>
                                                <td>{that._formatDate(row.departure_date)}</td>
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <table>
                                <tbody>
                                {
                                    this.props.report.hostels.map(function(row, i) {
                                        return (
                                            <tr key={i}>
                                                <td><strong>{i + 1}.</strong></td>
                                                <td>{that._formatDate(row.checkin_date)}</td>
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
});