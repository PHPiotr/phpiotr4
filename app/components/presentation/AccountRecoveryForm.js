import React from 'react';
import Button from 'material-ui/Button';
import {FormControl} from 'material-ui/Form';
import Input, {InputLabel} from 'material-ui/Input';
import {withStyles} from 'material-ui/styles';
import {formStyles as styles} from '../../utils/styles';

const AccountRecoveryForm = (props) => {

    const handleChange = (event) => {
        props.setRecoveryEmail(event.target.value);
    };

    const handleFocus = () => {
        if (props.recoveryErrorMessage) {
            props.setRecoveryErrorMessage('');
        }
    };

    return (
        <form className={props.classes.root} onSubmit={props.handleSubmit}>
            <FormControl component="fieldset">
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Email: ${props.recoveryErrorMessage}`}</InputLabel>
                    <Input
                        id="email"
                        name="email"
                        type={'text'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        value={props.recoveryEmail}
                        error={!!props.recoveryErrorMessage}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <Button variant="raised" color="primary" type="submit">Send recovery email</Button>
                </FormControl>
            </FormControl>
        </form>
    );
};

export default withStyles(styles)(AccountRecoveryForm);