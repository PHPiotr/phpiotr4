import React from 'react';
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
        <li className={`nav-item ${active}`}><Link to={props.to} onClick={props.onClick} activeClassName="active" className="nav-link">{props.children}</Link></li>
    );
};

export default withRouter(NavLink);
