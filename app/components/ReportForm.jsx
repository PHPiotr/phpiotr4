var React = require('react');
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
                buses_cost: '0.00',
                planes_cost: '0.00',
                trains_cost: '0.00',
                hostels_cost: '0.00'
            }
        };
    },
    componentDidMount: function() {
        var that = this;
        $(function() {
            var from = $('#report-from');
            var to = $('#report-to');

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
                    <form className="form-inline">
                        <div className="form-group">
                            <label className="sr-only" htmlFor="report-from">From</label>
                            <input className="form-control" type="text" name="report_from" id="report-from" placeholder="From" />
                        </div>
                        <div className="form-group">
                            <label className="sr-only" htmlFor="report-to">To</label>
                            <input className="form-control" type="text" name="report_to" id="report-to" placeholder="To" />
                        </div>
                    </form>
                    <ReportTable report={this.state.report}/>
                </div>
        );
    }
});