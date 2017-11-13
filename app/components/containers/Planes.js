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

class Planes extends Component {

    componentWillMount() {
        if (!this.props.isLoggedIn) {
            return null;
        }
        const {params} = this.props.match;
        this.props.fetchBookings(params.current, params.page);
        this.props.setAppBarTitle(PLANES);
    }

    render() {

        if (this.props.planes.isFetching) {
            return <LinearProgress/>;
        }

        return (
            <div>
                <Navigation {...this.props} />
                <PlanesTable {...this.props.planes.data} />
                <Pagination {...this.props} />
            </div>
        );
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