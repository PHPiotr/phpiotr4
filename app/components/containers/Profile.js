import React, {Component, Fragment} from 'react';
import Auth from './Auth';
import {connect} from 'react-redux';
import {setAppBarTitle} from '../../actions/app/appActions';
import {PROFILE} from '../../constants';
import {getProfileIfNeeded} from '../../actions/profile/profileActions';
import {LinearProgress} from 'material-ui/Progress';
import List, { ListItem, ListItemText } from 'material-ui/List';
import {formatDateTime} from '../../utils/formatDateUtil';

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
                <List>
                    <ListItem button>
                        <ListItemText primary="Login" secondary={this.props.login} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Email" secondary={this.props.email} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Created" secondary={formatDateTime(this.props.createdAt)} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Last modified" secondary={formatDateTime(this.props.updatedAt)} />
                    </ListItem>
                </List>
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