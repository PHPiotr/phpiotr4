import {Component} from 'react';
import {connect} from 'react-redux';
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
        dispatch(logoutIfNeeded()).then(() => history.push('/login'));
    },
});

export default connect(null, mapDispatchToProps)(Logout);

