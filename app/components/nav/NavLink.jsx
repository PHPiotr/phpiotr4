import React, { Component } from 'react';
import { Link } from 'react-router';

class NavLink extends Component {

    render() {
        let isActive = this.context.router.isActive(this.props.to, true),
            className = isActive ? "active" : "";

        return (
            <li className={className}><Link {...this.props} activeClassName="active">{this.props.children}</Link></li>
        );    
    };
};

NavLink.contextTypes = {
        router: React.PropTypes.object
};

export default NavLink;
