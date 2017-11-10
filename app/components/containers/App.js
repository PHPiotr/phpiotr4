import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Navbar from '../nav/Navbar';
import Card from 'material-ui/Card';

const App = ({children}) => <div><Navbar/><Card style={{paddingTop: 70}}>{children && React.cloneElement(children, {})}</Card></div>;

export default withRouter(connect()(App));