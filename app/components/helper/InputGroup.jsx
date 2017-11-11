import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class InputGroup extends Component {

    constructor(props) {
        super(props);

        this.setLabel();
        this.setId();
    }

    setLabel() {

        if (this.props.label) {
            this.label = this.props.label;
            return;
        }

        let splitted = this.props.name.split('_');
        let firstWord = String(splitted.splice(0, 1));
        let firstChar = firstWord.charAt(0);
        let firstCharUpper = firstChar.toUpperCase();
        let restOfFirstWord = firstWord.replace(firstChar, '');

        splitted.unshift(firstCharUpper + restOfFirstWord);

        this.label = splitted.join(' ');
    }

    setId() {
        if (this.props.id) {
            this.id = this.props.id;
        }
        this.id = this.props.name.split('_').join('-');
    }

    render() {
        return (
            <div>
                <TextField
                    error={this.props.error}
                    label={this.label}
                    id={this.id}
                    type={this.props.type}
                    name={this.props.name}
                    onChange={this.props.handler}
                    onFocus={this.props.focusHandler}
                    value={this.props.value}
                />
                {this.props.error && this.props.error.message}
            </div>
        );
    }
}

InputGroup.defaultProps = {
    type: 'text',
    value: '',
};

InputGroup.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
    focusHandler: PropTypes.func,
};

export default InputGroup;

