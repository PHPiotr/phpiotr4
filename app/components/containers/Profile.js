import React, {Component} from 'react';
import Auth from './Auth';
import {connect} from 'react-redux';
import {setAppBarTitle} from '../../actions/app/appActions';
import {PROFILE} from '../../constants';

class Profile extends Component {

    componentDidMount() {
        this.props.dispatch(setAppBarTitle(PROFILE));
    }

    render() {
        return 'Profile';
    }
}

export default Auth(connect()(Profile));