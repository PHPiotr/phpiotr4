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
        this.onDateFilterFormSubmit = this.onDateFilterFormSubmit.bind(this);
    }

    componentWillUnmount() {
        this.props.socket.removeListener(config.event.auth_failed);
        this.props.socket.removeListener(config.event.token_received);
    }

    onDateFilterFormSubmit(event) {
        this.props.callbacks.handleSubmitDate(event);
    }

    render() {
        let propsChildren = this.props.children && React.cloneElement(this.props.children, {
                callbacks: this.props.callbacks,
                auth: this.props.auth,
                report: this.props.report,
                bookings: this.props.bookings,
                socket: this.props.socket,
            });

        return (
            <div>
                <Navbar onDateFilterFormSubmit={this.onDateFilterFormSubmit} />
                <div className="container-fluid">
                    {propsChildren}
                </div>
            </div>
        );
    }
}

App.displayName = 'App';

export default App;



