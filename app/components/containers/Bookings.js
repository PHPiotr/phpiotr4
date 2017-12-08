import React, {Component} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getBookingsIfNeeded} from '../../actions/booking/bookingActions';
import {setAppBarTitle} from '../../actions/app/appActions';
import Navigation from '../presentation/Navigation';
import Pagination from '../presentation/Pagination';
import {LinearProgress} from 'material-ui/Progress';
import FloatingAddButton from '../presentation/FloatingAddButton';

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

const bookings = (WrappedComponent) => {

    const label = WrappedComponent.bookingLabel;
    const labels = WrappedComponent.bookingsLabel;
    const appBarTitle = WrappedComponent.appBarTitle;

    class Bookings extends Component {
        static displayName = `Bookings(${getDisplayName(WrappedComponent)})`;
        componentDidMount() {
            if (!this.props.isLoggedIn) {
                return null;
            }
            const {params} = this.props.match;
            this.props.fetchBookings(params.current, params.page);
            this.props.setAppBarTitle(appBarTitle);
        }

        render() {
            const items = [];
            items.push(<Navigation key={1} {...this.props}/>);
            if (this.props.isFetching) {
                items.push(<LinearProgress key={2}/>);
            } else {
                items.push(<WrappedComponent key={3} {...this.props[label].data} />);
                items.push(<Pagination key={4} {...this.props} />);
                items.push(<FloatingAddButton href={`/bookings/${label}/new`} key={5}/>);
            }

            return items;
        }
    }

    hoistNonReactStatic(Bookings, WrappedComponent);

    const mapStateToProps = ({bookings, auth: {isLoggedIn}}) => ({
        [label]: bookings[label],
        isLoggedIn,
        isAdd: false,
        isFetching: bookings[label].isFetching,
        bookingLabel: WrappedComponent.bookingLabel,
        bookingsLabel: WrappedComponent.bookingsLabel,
    });

    const mapDispatchToProps = dispatch => ({
        fetchBookings(type, page) {
            dispatch(getBookingsIfNeeded(label, labels, type || '', page || 1));
        },
        setAppBarTitle(appBarTitle) {
            dispatch(setAppBarTitle(appBarTitle));
        },
    });

    return withRouter(connect(mapStateToProps, mapDispatchToProps)(Bookings));
};

export default bookings;