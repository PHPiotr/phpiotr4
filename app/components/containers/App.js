import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Navbar from '../presentation/Navbar';
import Card from 'material-ui/Card';

const App = ({children}) => [
    <Navbar key={1}/>,
    <Card key={2} style={{paddingTop: 70}}>{children && React.cloneElement(children, {})}</Card>,
];

export default withRouter(connect()(App));