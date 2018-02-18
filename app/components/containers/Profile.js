import React, {Component, Fragment} from 'react';
import Auth from './Auth';
import {connect} from 'react-redux';
import {setAppBarTitle} from '../../actions/app/appActions';
import {PROFILE} from '../../constants';
import {getProfileIfNeeded} from '../../actions/profile/profileActions';
import {LinearProgress} from 'material-ui/Progress';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import EditIcon from 'material-ui-icons/Edit';
import {formatDateTime} from '../../utils/formatDateUtil';
import jwtDecode from 'jwt-decode';

class Profile extends Component {

    componentDidMount() {
        this.props.setAppBarTitle(PROFILE);
        const {sub} = jwtDecode(this.props.token);
        this.props.getProfile(sub);
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
                    <ListItem button>
                        <ListItemText primary="Password" secondary={'Change password'} />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Edit" href="/password-change" onClick={this.props.handleOnChangePasswordClick}>
                                <EditIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Fragment>
        );
    }
}

const mapStateToProps = ({profile, auth: {token}}) => ({...profile, token});
const mapDispatchToProps = (dispatch, {history}) => ({
    setAppBarTitle(title) {
        dispatch(setAppBarTitle(title));
    },
    getProfile(sub) {
        dispatch(getProfileIfNeeded(sub));
    },
    handleOnChangePasswordClick(event) {
        event.preventDefault();
        history.push('/password-change');
    },
});

export default Auth(connect(mapStateToProps, mapDispatchToProps)(Profile));