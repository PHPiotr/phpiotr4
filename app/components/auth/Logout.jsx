import {Component} from 'react';
import Auth from '../hoc/Auth.jsx';

class Logout extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.callbacks.handleLogout();
    }

    render() {
        return null;
    }
}

export default Auth(Logout);

