import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import {FormControl} from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import NoAuth from './NoAuth';

class AccountRecovery extends Component {

    handleSubmit = () => {};

    render() {
        if (this.props.isLoggedIn) {
            return null;
        }

        return (
            <Fragment>
                <Typography style={{padding: '23px'}} type="headline">Forgot your account's password?</Typography>
                <form style={{padding: '20px'}} onSubmit={this.handleSubmit}>
                    <FormControl component="fieldset">
                        <TextField
                            helperText="Enter your email address and we'll send you a recovery link."
                            id={'email'}
                            type={'email'}
                            name={'email'}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            value={''}
                        />
                        <Button raised color="primary" style={{marginTop: '20px'}} type="submit">Send recovery email</Button>
                    </FormControl>
                </form>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
    };
};

export default NoAuth(connect(mapStateToProps)(AccountRecovery));