import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import {FormControl} from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import NoAuth from './NoAuth';
import * as recoveryActions from '../../actions/recovery/recoveryActions';
import {setAppBarTitle} from '../../actions/app/appActions';
import MessageBar from '../presentation/MessageBar';
import {LinearProgress} from 'material-ui/Progress';

class AccountRecovery extends Component {

    componentDidMount() {
        this.props.setAppBarTitle('Account recovery');
    }

    componentWillUnmount() {
        this.props.setAppBarTitle(null);
    }

    handleChange = (event) => {
        this.props.setRecoveryEmail(event.target.value);
    };

    handleFocus = () => {
        if (this.props.recoveryErrorMessage) {
            this.props.setRecoveryErrorMessage('');
        }
    };

    render() {
        if (this.props.isLoggedIn) {
            return null;
        }
        if (this.props.isRecovering) {
            return <LinearProgress/>;
        }

        return (
            <Fragment>
                <Typography style={{padding: '23px'}} type="headline">Forgot your account's password?</Typography>
                <form style={{padding: '20px'}} onSubmit={this.props.handleSubmit}>
                    <FormControl component="fieldset">
                        <TextField
                            helperText={this.props.recoveryErrorMessage || 'Test Enter your email address and we\'ll send you a recovery link.'}
                            id={'email'}
                            type={'text'}
                            name={'email'}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            value={this.props.email}
                            error={!!this.props.recoveryErrorMessage}
                        />
                        <Button raised color="primary" style={{marginTop: '20px'}} type="submit">Send recovery email</Button>
                    </FormControl>
                </form>
                <MessageBar
                    open={this.props.isRecovered}
                    message="Recovery email sent"
                    onClose={this.props.onClose}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = ({recovery, auth}) => ({...recovery, isLoggedIn: auth.isLoggedIn});
const mapDispatchToProps = (dispatch) => {
    return {
        setRecoveryEmail(email) {
            dispatch(recoveryActions.setRecoveryEmail(email));
        },
        handleSubmit(event) {
            event.preventDefault();
            dispatch(recoveryActions.recoverAccountIfNeeded());
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