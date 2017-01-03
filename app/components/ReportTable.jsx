var React = require('react');

module.exports = React.createClass({

    render: function() {
        return(
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Total cost</th>
                        <th>Buses cost</th>
                        <th>Planes cost</th>
                        <th>Trains cost</th>
                        <th>Hostels cost</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{this.props.report.total_cost}</td>
                        <td>{this.props.report.buses_cost}</td>
                        <td>{this.props.report.planes_cost}</td>
                        <td>{this.props.report.trains_cost}</td>
                        <td>{this.props.report.hostels_cost}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
});