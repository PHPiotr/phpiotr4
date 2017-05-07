import React, {Component, PropTypes} from 'react';
import io from 'socket.io-client';
import 'babel-polyfill';
import config from '../config';
import cookie from 'cookie-monster';
import { connect } from 'react-redux';
import {setLoggedIn} from './actions';

const socket = io.connect(config.api_url);

class AppWrapper extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let that = this;

        let tokenCookie = cookie.getItem(config.token_key);
        if (undefined !== tokenCookie) {
            config.api_headers['Authorization'] = `Bearer ${tokenCookie}`;
            that.props.dispatch(setLoggedIn());
        }
    }

    render() {
        return this.props.children && React.cloneElement(this.props.children, {
                report: this.props.report,
                dateFilter: this.props.dateFilter,
                auth: this.props.auth,
                bookings: this.props.bookings,
                socket: socket,
            });
    }
}

AppWrapper.displayName = 'AppWrapper';

const mapStateToProps = (state) => ({
    report: state.report,
    dateFilter: state.dateFilter,
    auth: state.auth,
    bookings: state.bookings,
    auth: state.auth,
    socket: socket,
});

AppWrapper = connect(mapStateToProps)(AppWrapper);

export default AppWrapper;

