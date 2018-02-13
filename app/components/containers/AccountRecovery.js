import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Button from 'material-ui/Button';
import {FormControl} from 'material-ui/Form';
import NoAuth from './NoAuth';
import * as recoveryActions from '../../actions/recovery/recoveryActions';
import {setAppBarTitle} from '../../actions/app/appActions';
import MessageBar from '../presentation/MessageBar';
import {LinearProgress} from 'material-ui/Progress';
import Input, {InputLabel} from 'material-ui/Input';
import {withStyles} from 'material-ui/styles';
import {formStyles as styles} from '../../utils/styles';

class AccountRecovery extends Component {

    componentDidMount() {
        this.props.setAppBarTitle('Forgot your account\'s password?');
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
                <form className={this.props.classes.root} onSubmit={this.props.handleSubmit}>
                    <FormControl component="fieldset">
                        <FormControl className={this.props.classes.formControl}>
                            <InputLabel htmlFor="password">{`Email: ${this.props.recoveryErrorMessage}`}</InputLabel>
                            <Input
                                id="email"
                                name="email"
                                type={'text'}
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                value={this.props.recoveryEmail}
                                error={!!this.props.recoveryErrorMessage}
                            />
                        </FormControl>
                        <FormControl className={this.props.classes.formControl}>
                            <Button color="primary" type="submit">Send recovery email</Button>
                        </FormControl>
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

export default withStyles(styles)(NoAuth(connect(mapStateToProps, mapDispatchToProps)(AccountRecovery)));