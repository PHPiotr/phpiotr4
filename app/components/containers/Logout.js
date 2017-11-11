import {Component} from 'react';
import {connect} from 'react-redux';
import cookie from 'cookie-monster';
import {logoutIfNeeded} from '../../actions/login';

class Logout extends Component {

    componentWillMount() {
        this.props.logout();
    }

    render() {
        return null;
    }
}

const mapDispatchToProps = (dispatch, {history}) => ({
    logout() {
        cookie.removeItem(process.env.TOKEN_KEY);
        dispatch(logoutIfNeeded()).then(() => history.push('/login'));
    },
});

export default connect(null, mapDispatchToProps)(Logout);

