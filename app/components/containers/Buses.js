import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchBusesIfNeeded} from '../../actions/buses/busesActions';
import {withRouter} from 'react-router-dom';
import Navigation from '../presentation/Navigation';
import Pagination from '../presentation/Pagination';
import BusesTable from '../presentation/BusesTable';
import {LinearProgress} from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

class Buses extends Component {

    componentWillMount() {
        if (!this.props.isLoggedIn) {
            return null;
        }
        const {params} = this.props.match;
        this.props.fetchBookings(params.current, params.page);
    }

    render() {

        if (this.props.buses.isFetching) {
            return <LinearProgress/>;
        }

        return (
            <div>
                <Typography style={{padding: '23px'}} type="headline">Buses</Typography>
                <Navigation {...this.props} />
                <BusesTable {...this.props.buses.data} />
                <Pagination {...this.props} />
            </div>
        );
    }
}

const mapStateToProps = ({buses, auth: {isLoggedIn}}) => {
    return {
        buses,
        isLoggedIn,
        isAdd: false,
        bookingsLabel: 'buses',
        bookingLabel: 'bus',
    };
};
const mapDispatchToProps = dispatch => ({
    fetchBookings(type, page) {
        dispatch(fetchBusesIfNeeded(type || 'current', page || 1));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buses));