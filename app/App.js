import React from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import 'babel-polyfill';
import 'react-css-modules';
import 'bootstrap-css';
import './css/style.css';
import {api_url} from '../config';
import Navbar from './components/nav/Navbar';

const socket = io.connect(api_url);

const App = (props) => {

    let propsChildren = props.children && React.cloneElement(props.children, {
            auth: props.auth,
            socket: socket,
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

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(App);