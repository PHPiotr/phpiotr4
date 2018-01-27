import React, {Component, Fragment} from 'react';
import Auth from './Auth';
import {connect} from 'react-redux';
import {setAppBarTitle} from '../../actions/app/appActions';
import {PROFILE} from '../../constants';
import {getProfileIfNeeded} from '../../actions/profile/profileActions';
import {LinearProgress} from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

class Profile extends Component {

    componentDidMount() {
        this.props.setAppBarTitle(PROFILE);
        this.props.getProfile();
    }

    render() {
        if (this.props.isFetching) {
            return <LinearProgress/>;
        }
        return (
            <Fragment>
                <Typography style={{padding: '23px'}} type="headline">{this.props.login}</Typography>
            </Fragment>
        );
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