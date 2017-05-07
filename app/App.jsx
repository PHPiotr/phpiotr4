import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import 'react-css-modules';
import 'bootstrap-css';
import './css/style.css';
import config from '../config';
import Navbar from './components/nav/Navbar';

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.props.socket.removeListener(config.event.auth_failed);
        this.props.socket.removeListener(config.event.token_received);
    }

    render() {
        let propsChildren = this.props.children && React.cloneElement(this.props.children, {
                auth: this.props.auth,
                report: this.props.report,
                bookings: this.props.bookings,
                socket: this.props.socket,
            });

        return (
            <div>
                <Navbar />
                <div className="container-fluid">
                    {propsChildren}
                </div>
            </div>
        );
    }
}

App.displayName = 'App';

export default App;



