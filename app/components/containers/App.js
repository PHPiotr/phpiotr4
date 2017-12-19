import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Navbar from '../presentation/Navbar';
import {withCookies} from 'react-cookie';

class App extends Component {
    componentDidMount() {
        const jssStyles = document.getElementById('jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        return [
            <Navbar key={1}/>,
            <div key={2} style={{paddingTop: 70}}>{this.props.children && React.cloneElement(this.props.children, {})}</div>,
        ];
    }
}

export default withRouter(connect()(withCookies(App)));