import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import NoAuth from './NoAuth';
import * as recoveryActions from '../../actions/recovery/recoveryActions';
import {setAppBarTitle} from '../../actions/app/appActions';
import MessageBar from '../presentation/MessageBar';
import {LinearProgress} from 'material-ui/Progress';
import AccountRecoveryForm from '../presentation/AccountRecoveryForm';

class AccountRecovery extends Component {

    componentDidMount() {
        this.props.setAppBarTitle('Forgot your account\'s password?');
    }

    componentWillUnmount() {
        this.props.setAppBarTitle(null);
    }

    render() {
        if (this.props.isLoggedIn) {
            return null;
        }
        if (this.props.isRecovering) {
            return <LinearProgress/>;
        }

        return (
            <Fragment>
                <AccountRecoveryForm {...this.props}/>
                <MessageBar
                    open={this.props.isRecovered}
                    message="Recovery email sent"
                    onClose={this.props.onClose}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = ({recovery, auth: {isLoggedIn}}) => ({...recovery, isLoggedIn});
const mapDispatchToProps = (dispatch) => {
    return {
        setRecoveryEmail(email) {
            dispatch(recoveryActions.setRecoveryEmail(email));
        },
        handleSubmit(event) {
            event.preventDefault();
            dispatch(recoveryActions.recoverAccountIfNeeded(location));
        },
        setAppBarTitle(title) {
            dispatch(setAppBarTitle(title));
        },
        onClose() {
            dispatch(recoveryActions.setIsRecovered(false));
        },
        setRecoveryErrorMessage(message) {
            dispatch(recoveryActions.setRecoveryErrorMessage(message));
        },
    };
};

export default NoAuth(connect(mapStateToProps, mapDispatchToProps)(AccountRecovery));