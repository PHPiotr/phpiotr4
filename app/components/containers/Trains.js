import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getBookingsIfNeeded} from '../../actions/index';
import {withRouter} from 'react-router-dom';
import Navigation from '../presentation/Navigation';
import Pagination from '../presentation/Pagination';
import TrainsTable from '../presentation/TrainsTable';
import {LinearProgress} from 'material-ui/Progress';
import {setAppBarTitle} from '../../actions/app/appActions';
import {TRAINS} from '../../constants';
import FloatingAddButton from '../presentation/FloatingAddButton';

class Trains extends Component {

    componentDidMount() {
        if (!this.props.isLoggedIn) {
            return null;
        }
        const {params} = this.props.match;
        this.props.fetchBookings(params.current, params.page);
        this.props.setAppBarTitle(TRAINS);
    }

    render() {
        const items = [];
        items.push(<Navigation key={1} {...this.props}/>);
        if (this.props.train.isFetching) {
            items.push(<LinearProgress key={2} />);
        } else {
            items.push(<TrainsTable key={3} {...this.props.train.data} />);
            items.push(<Pagination key={4} {...this.props} />);
            items.push(<FloatingAddButton href={'/bookings/train/new'} key={5}/>);
        }

        return items;
    }
}

const mapStateToProps = ({bookings: {train}, auth: {isLoggedIn}}) => ({
    train,
    isLoggedIn,
    isAdd: false,
    bookingsLabel: 'trains',
    bookingLabel: 'train',
});
const mapDispatchToProps = dispatch => ({
    fetchBookings(type, page) {
        dispatch(getBookingsIfNeeded('train', 'trains', type || '', page || 1));
    },
    setAppBarTitle(appBarTitle) {
        dispatch(setAppBarTitle(appBarTitle));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Trains));