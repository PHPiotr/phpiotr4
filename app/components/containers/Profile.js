import React, {Component} from 'react';
import Auth from './Auth';
import {connect} from 'react-redux';
import {setAppBarTitle} from '../../actions/app/appActions';
import {PROFILE} from '../../constants';
import {getProfileIfNeeded} from '../../actions/profile/profileActions';
import {LinearProgress} from 'material-ui/Progress';

class Profile extends Component {

    componentDidMount() {
        this.props.setAppBarTitle(PROFILE);
        this.props.getProfile();
    }

    render() {
        if (this.props.isFetching) {
            return <LinearProgress/>;
        }
        return 'Profile';
    }
}

const mapStateToProps = ({profile}) => ({...profile});
const mapDispatchToProps = dispatch => ({
    setAppBarTitle(title) {
        dispatch(setAppBarTitle(title));
    },
    getProfile() {
        dispatch(getProfileIfNeeded());
    },
});

export default Auth(connect(mapStateToProps, mapDispatchToProps)(Profile));