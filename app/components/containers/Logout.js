import {Component} from 'react';
import {connect} from 'react-redux';
import cookie from 'cookie-monster';
import {logoutIfNeeded} from '../../actions/login';

class Logout extends Component {

    componentWillMount() {
        console.log('componentWillMount class Logout extends Component');
        this.props.logout();
    }

    render() {
        return null;
    }
}

const mapDispatchToProps = (dispatch, {history}) => ({
    logout() {
        dispatch(logoutIfNeeded())
            .then((shouldLogout) => {
                if (shouldLogout) {
                    cookie.removeItem(process.env.TOKEN_KEY);
                    history.push('/login');
                }
            });
    },
});

export default connect(null, mapDispatchToProps)(Logout);

