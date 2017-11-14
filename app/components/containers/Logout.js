import {Component} from 'react';
import {connect} from 'react-redux';
import {logoutIfNeeded} from '../../actions/login';
import {setAppBarTitle} from '../../actions/app/appActions';
import {HOME} from '../../constants';

class Logout extends Component {

    componentWillMount() {
        this.props.setAppBarTitle(HOME);
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
    setAppBarTitle(appBarTitle) {
        dispatch(setAppBarTitle(appBarTitle));
    },
});

export default connect(null, mapDispatchToProps)(Logout);

