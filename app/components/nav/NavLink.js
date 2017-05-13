import React, {Component, PropTypes} from 'react';
import {Link, withRouter} from 'react-router';

const NavLink = (props) => {

    let active = '';
    if (props.router.isActive(props.to, true)) {
        active = 'active';
    }
    if (!active) {
        if (props.current !== undefined) {
            if (props.current) {
                active = 'active';
            }
        }
    }

    return (
        <li className={active}><Link to={props.to} onClick={props.onClick} activeClassName="active">{props.children}</Link></li>
    );
}

export default withRouter(NavLink);
