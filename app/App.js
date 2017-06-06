import React, {Component} from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import 'babel-polyfill';
import 'react-css-modules';
import 'bootstrap-css';
import './css/style.css';
import Navbar from './components/nav/Navbar';

const socket = null;//io.connect(process.env.API_URL);

class App extends Component {

    componentWillMount()
    {
        this.props.onLoad();
    }

    render() {
        let propsChildren = this.props.children && React.cloneElement(this.props.children, {
                auth: this.props.auth,
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
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    onLoad() {
        if (ownProps.router.location.query.d !== undefined) {
            return ownProps.router.push(ownProps.router.location.query.d);
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);