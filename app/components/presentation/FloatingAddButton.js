import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import {withRouter} from 'react-router-dom';

const styles = theme => ({
    button: {
        margin: 0,
        top: 'auto',
        right: theme.spacing.unit,
        bottom: theme.spacing.unit,
        left: 'auto',
        position: 'fixed',
    },
});

const FloatingAddButton = (props) => {

    const handleOnClick = (event) => {
        event.preventDefault();
        props.history.push(props.href);
    };

    return (
        <Button
            fab
            color="primary"
            aria-label="add"
            className={props.classes.button}
            href={props.href}
            onClick={handleOnClick}
        >
            <AddIcon/>
        </Button>
    );
};

FloatingAddButton.propTypes = {
    classes: PropTypes.object.isRequired,
    href: PropTypes.string.isRequired,
};

export default withStyles(styles)(withRouter(FloatingAddButton));