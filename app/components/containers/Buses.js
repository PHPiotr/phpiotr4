import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchBusesIfNeeded} from '../../actions/buses/busesActions';
import {withRouter} from 'react-router-dom';
import Navigation from '../presentation/Navigation';
import Pagination from '../presentation/Pagination';
import BusesTable from '../presentation/BusesTable';
import {LinearProgress} from 'material-ui/Progress';
import {setAppBarTitle} from '../../actions/app/appActions';
import {BUSES} from '../../constants';

class Buses extends Component {

    componentWillMount() {
        if (!this.props.isLoggedIn) {
            return null;
        }
        const {params} = this.props.match;
        this.props.fetchBookings(params.current, params.page);
        this.props.setAppBarTitle(BUSES);
    }

    render() {

        if (this.props.buses.isFetching) {
            return <LinearProgress/>;
        }

        return (
            <div>
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
        dispatch(fetchBusesIfNeeded(type || '', page || 1));
    },
    setAppBarTitle(appBarTitle) {
        dispatch(setAppBarTitle(appBarTitle));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buses));