import React, { Component, PropTypes } from 'react';

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
        return (
                <div className={this.props.groupClass + ' ' + this.props.hasError}>
                    <label htmlFor={this.id} className={this.props.labelClass}>{this.label}</label>
                    <div className={this.props.inputWrapperClass}>
                    <input
                        id={this.id}
                        type={this.props.type}
                        name={this.props.name}
                        className={this.props.inputClass}
                        onChange={this.props.handler}
                        onFocus={this.props.focusHandler}
                        value={this.props.value}
                    />
                    </div>
                </div>
        );
    };
};

InputGroup.defaultProps = {
    type: 'text',
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

