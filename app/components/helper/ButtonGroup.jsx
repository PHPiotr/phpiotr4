import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ButtonGroup extends Component {
    render() {
        return (
            <div className={this.props.groupClass}>
                <div className={this.props.buttonWrapperClass}>
                    <button type={this.props.type} className={this.props.buttonClass}>
                        {this.props.children}
                    </button>
                </div>
            </div>
        );
    }
}

ButtonGroup.defaultProps = {
    type: 'submit',
    groupClass: 'form-group',
    buttonWrapperClass: 'col-sm-offset-2 col-sm-10',
    buttonClass: 'btn btn-default'
};

ButtonGroup.propTypes = {
    children: PropTypes.string.isRequired
};

export default ButtonGroup;
