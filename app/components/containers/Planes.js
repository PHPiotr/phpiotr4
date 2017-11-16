import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPlanesIfNeeded} from '../../actions/planes/planesActions';
import {withRouter} from 'react-router-dom';
import Navigation from '../presentation/Navigation';
import Pagination from '../presentation/Pagination';
import PlanesTable from '../presentation/PlanesTable';
import {LinearProgress} from 'material-ui/Progress';
import {setAppBarTitle} from '../../actions/app/appActions';
import {PLANES} from '../../constants';
import FloatingAddButton from '../presentation/FloatingAddButton';

class Planes extends Component {

    componentDidMount() {
        if (!this.props.isLoggedIn) {
            return null;
        }
        const {params} = this.props.match;
        this.props.fetchBookings(params.current, params.page);
        this.props.setAppBarTitle(PLANES);
    }

    render() {
        const items = [];
        items.push(<Navigation key={1} {...this.props}/>);
        if (this.props.planes.isFetching) {
            items.push(<LinearProgress key={2} />);
        } else {
            items.push(<PlanesTable key={3} {...this.props.planes.data} />);
            items.push(<Pagination key={4} {...this.props} />);
            items.push(<FloatingAddButton href={'/bookings/plane/new'} key={5}/>);
        }

        return items;
    }
}

const mapStateToProps = ({planes, auth: {isLoggedIn}}) => ({
    planes,
    isLoggedIn,
    isAdd: false,
    bookingsLabel: 'planes',
    bookingLabel: 'plane',
});
const mapDispatchToProps = dispatch => ({
    fetchBookings(type, page) {
        dispatch(fetchPlanesIfNeeded(type || '', page || 1));
    },
    setAppBarTitle(appBarTitle) {
        dispatch(setAppBarTitle(appBarTitle));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Planes));