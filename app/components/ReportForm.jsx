var React = require('react');
var ReportAlert = require('./ReportAlert.jsx');
var ReportTable = require('./ReportTable.jsx');

module.exports = React.createClass({
    getInitialState: function(){
        return {
            report: {
                total_cost: '0.00',
                buses: [],
                planes: [],
                trains: [],
                hostels: [],
                buses_singles_quantity: 0,
                planes_singles_quantity: 0,
                trains_singles_quantity: 0,
                buses_cost: '0.00',
                buses_avg: '0.00',
                planes_cost: '0.00',
                planes_avg: '0.00',
                trains_cost: '0.00',
                trains_avg: '0.00',
                hostels_cost: '0.00',
                hostels_avg: '0.00'
            },
            insert: null
        };
    },
    componentDidMount: function() {
        var that = this;
        // $(function() {
        //     var from = $('#report-from');
        //     var to = $('#report-to');
        //     var socket = io();
        //     var date = new Date();
        //     var year = date.getFullYear();
        //     var month = date.getMonth();
        //     var default_from = new Date(year, month, 1);
        //     var default_to = new Date(year, month + 1, 0);
        //
        //     from.datepicker().datepicker('option', 'dateFormat', 'dd/mm/yy').datepicker('setDate', default_from);
        //     to.datepicker().datepicker('option', 'dateFormat', 'dd/mm/yy').datepicker('setDate', default_to);
        //
        //     that._update();
        //
        //     // $('#report-from, #report-to').change(function() {
        //     //     that._update();
        //     // });
        //
        //     socket.on('insert', function(booking) {
        //         that._update();
        //         that.setState({
        //             insert: booking
        //         });
        //         setTimeout(function() {
        //             that.setState({
        //                 insert: null
        //             });
        //         }, 3000);
        //     });
        // });
    },
    _update: function() {
        // var that = this;
        // var from = $('#report-from');
        // var to = $('#report-to');
        // var from_value = from.val();
        // var to_value = to.val();
        // from.datepicker('option', 'maxDate', to_value);
        // to.datepicker('option', 'minDate', from_value);
        // $.ajax({
        //     url: '/report',
        //     type: 'GET',
        //     dataType: 'json',
        //     data: {
        //         from: from_value,
        //         to: to_value
        //     },
        //     success: function(data) {
        //         //that.setState({report: data});
        //     }
        // });
    },
    render: function() {
        return(
                <div>
                    <ReportAlert insert={this.state.insert}/>
                    <ReportTable report={this.state.report}/>
                </div>
        );
    }
});