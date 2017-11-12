import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Navbar from '../presentation/Navbar';

const App = ({children}) => [
    <Navbar key={1}/>,
    <div key={2} style={{paddingTop: 70}}>{children && React.cloneElement(children, {})}</div>,
];

export default withRouter(connect()(App));