import React, {Component, Fragment} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getBookingsIfNeeded, setIsDeleted} from '../../actions/booking/bookingActions';
import {setAppBarTitle} from '../../actions/app/appActions';
import Navigation from '../presentation/Navigation';
import Pagination from '../presentation/Pagination';
import {LinearProgress} from 'material-ui/Progress';
import FloatingAddButton from '../presentation/FloatingAddButton';
import Auth from './Auth';
import MessageBar from '../presentation/MessageBar';
import NoContent from '../presentation/NoContent';

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

const bookings = (WrappedComponent) => {

    const label = WrappedComponent.bookingLabel;
    const labels = WrappedComponent.bookingsLabel;
    const appBarTitle = WrappedComponent.appBarTitle;

    class Bookings extends Component {
        static displayName = `Bookings(${getDisplayName(WrappedComponent)})`;

        componentWillReceiveProps(nextProps) {
            const {params} = this.props.match;
            const nextParams = nextProps.match.params;
            if (params.current !== nextParams.current || params.page !== nextParams.page) {
                this.props.fetchBookings(nextParams.current, nextParams.page);
            }
        }

        componentDidMount() {
            if (!this.props.isLoggedIn) {
                return null;
            }
            const {params} = this.props.match;
            this.props.fetchBookings(params.current, params.page);
            this.props.setAppBarTitle(appBarTitle);
        }

        render() {

            // Do not show both LinearProgress and NoContent at the same time
            let content;
            if (this.props.isFetching || !this.props[label].data.bookings) {
                content = <LinearProgress/>;
            } else {
                content = this.props[label].data.bookingsLength
                    ? <WrappedComponent {...this.props[label].data}/>
                    : <NoContent/>;
            }

            return (
                <Fragment>
                    <Navigation {...this.props}/>
                    {content}
                    <Pagination {...this.props}/>
                    <FloatingAddButton href={`/bookings/${label}/new`}/>
                    <MessageBar
                        open={this.props[label].isDeleted}
                        message="Deleted"
                        onClose={this.props.onClose}
                    />
                </Fragment>
            );
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
        onClose() {
            dispatch(setIsDeleted({label, isDeleted: false}));
        },
    });

    return Auth(withRouter(connect(mapStateToProps, mapDispatchToProps)(Bookings)));
};

export default bookings;