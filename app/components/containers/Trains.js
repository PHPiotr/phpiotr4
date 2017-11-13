import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTrainsIfNeeded} from '../../actions/trains/trainsActions';
import {withRouter} from 'react-router-dom';
import Navigation from '../presentation/Navigation';
import Pagination from '../presentation/Pagination';
import TrainsTable from '../presentation/TrainsTable';
import {LinearProgress} from 'material-ui/Progress';
import {setAppBarTitle} from '../../actions/app/appActions';
import {TRAINS} from '../../constants';

class Trains extends Component {

    componentWillMount() {
        if (!this.props.isLoggedIn) {
            return null;
        }
        const {params} = this.props.match;
        this.props.fetchBookings(params.current, params.page);
        this.props.setAppBarTitle(TRAINS);
    }

    render() {

        if (this.props.trains.isFetching) {
            return <LinearProgress/>;
        }
        return (
            <div>
                <Navigation {...this.props} />
                <TrainsTable {...this.props.trains.data} />
                <Pagination {...this.props} />
            </div>
        );
    }
}

const mapStateToProps = ({trains, auth: {isLoggedIn}}) => ({
    trains,
    isLoggedIn,
    isAdd: false,
    bookingsLabel: 'trains',
    bookingLabel: 'train',
});
const mapDispatchToProps = dispatch => ({
    fetchBookings(type, page) {
        dispatch(fetchTrainsIfNeeded(type || '', page || 1));
    },
    setAppBarTitle(appBarTitle) {
        dispatch(setAppBarTitle(appBarTitle));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Trains));