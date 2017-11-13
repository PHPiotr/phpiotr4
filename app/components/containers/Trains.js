import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTrainsIfNeeded} from '../../actions/trains/trainsActions';
import {withRouter} from 'react-router-dom';
import Navigation from '../presentation/Navigation';
import Pagination from '../presentation/Pagination';
import TrainsTable from '../presentation/TrainsTable';
import {LinearProgress} from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

class Trains extends Component {

    componentWillMount() {
        if (!this.props.isLoggedIn) {
            return null;
        }
        const {params} = this.props.match;
        this.props.fetchBookings(params.current, params.page);
    }

    render() {

        if (this.props.trains.isFetching) {
            return <LinearProgress/>;
        }
        return (
            <div>
                <Typography style={{padding: '23px'}} type="headline">Trains</Typography>
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
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Trains));