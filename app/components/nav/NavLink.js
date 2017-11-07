import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const NavLink = (props) => {
    return (
        <li className={'nav-item'}><Link to={props.to} onClick={props.onClick} className="nav-link">{props.children}</Link></li>
    );
};

export default withRouter(NavLink);
