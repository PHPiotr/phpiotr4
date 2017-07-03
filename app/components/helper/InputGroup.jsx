import React, {Component} from 'react';
import PropTypes from 'prop-types';

class InputGroup extends Component {

    constructor(props) {
        super(props);

        this.setLabel();
        this.setId();
    }

    setLabel() {

        if (this.props.label) {
            this.label = this.props.label;
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
        let error_span = null;
        let error_class = '';
        if (this.props.error) {
            error_span = (
                <span className="label label-danger">{this.props.error.message}</span>
            );
            error_class = ' has-error';
        }
        return (
            <div className={`clearfix ${this.props.groupClass} ${error_class}`}>
                <label htmlFor={this.id} className={this.props.labelClass}>{this.label}</label>
                <div className={this.props.inputWrapperClass}>
                    <input
                        id={this.id}
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                        name={this.props.name}
                        className={this.props.inputClass}
                        onChange={this.props.handler}
                        onFocus={this.props.focusHandler}
                        value={this.props.value}
                    />
                    {error_span}
                </div>
            </div>
        );
    }
}

InputGroup.defaultProps = {
    type: 'text',
    placeholder: '',
    value: '',
    inputWrapperClass: 'col-sm-2',
    groupClass: 'form-group',
    labelClass: 'col-sm-2 control-label',
    inputClass: 'form-control',
    hasError: '',
};

InputGroup.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired
};

export default InputGroup;

