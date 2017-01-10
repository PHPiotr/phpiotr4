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
        $(function() {
            var from = $('#report-from');
            var to = $('#report-to');
            var socket = io();

            from.datepicker();
//            from.datepicker('option', 'dateFormat', 'dd/mm/yy');
            to.datepicker();
//            to.datepicker('option', 'dateFormat', 'dd/mm/yy');

            from.change(function() {
                to.datepicker('option', 'minDate', $(this).val());
                that._onChange($(this).val(), to.val(), that);
            });

            to.change(function() {
                from.datepicker('option', 'maxDate', $(this).val());
                that._onChange(from.val(), $(this).val(), that);
            });

            socket.on('insert', function(booking) {
                that._onChange(from.val(), to.val(), that);
                that.setState({
                    insert: booking
                });
                setTimeout(function() {
                    that.setState({
                        insert: null
                    });
                }, 3000);
            });
        });
    },
    _onChange: function(from, to, that) {
        $.ajax({
            url: '/report',
            type: 'GET',
            dataType: 'json',
            data: {
                from: from,
                to: to
            },
            beforeSend: function() {
                console.log('before');
            },
            success: function(data) {
                console.log(data);
                that.setState({report: data});
            }
        });
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