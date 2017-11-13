import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchHostelsIfNeeded} from '../../actions/hostels/hostelsActions';
import {withRouter} from 'react-router-dom';
import Navigation from '../presentation/Navigation';
import Pagination from '../presentation/Pagination';
import HostelsTable from '../presentation/HostelsTable';
import {LinearProgress} from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

class Hostels extends Component {

    componentWillMount() {
        if (!this.props.isLoggedIn) {
            return null;
        }
        const {params} = this.props.match;
        this.props.fetchBookings(params.current, params.page);
    }

    render() {

        if (this.props.hostels.isFetching) {
            return <LinearProgress/>;
        }

        return (
            <div>
                <Typography style={{padding: '23px'}} type="headline">Hostels</Typography>
                <Navigation {...this.props} />
                <HostelsTable {...this.props.hostels.data} />
                <Pagination {...this.props} />
            </div>
        );
    }
}

const mapStateToProps = ({hostels, auth: {isLoggedIn}}) => ({
    hostels,
    isLoggedIn,
    isAdd: false,
    bookingsLabel: 'hostels',
    bookingLabel: 'hostel',
});
const mapDispatchToProps = dispatch => ({
    fetchBookings(type, page) {
        dispatch(fetchHostelsIfNeeded(type || '', page || 1));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hostels));