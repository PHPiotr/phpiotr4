import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import 'babel-polyfill';
import 'react-css-modules';
import 'bootstrap-css';
import './css/style.css';
import Navbar from './components/nav/Navbar';

class App extends Component {

    componentWillMount()
    {
        this.props.onLoad();
    }

    render() {
        let propsChildren = this.props.children && React.cloneElement(this.props.children, {
            auth: this.props.auth,
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

const mapStateToProps = state => ({
    auth: state.auth,
});
const mapDispatchToProps = (dispatch, {location: {query}, history}) => ({
    onLoad() {
        if (query && query.d) {
            return history.push(query.d);
        }
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));