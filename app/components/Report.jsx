import Auth from './hoc/Auth.jsx';
import ReportForm from './ReportForm.jsx';
import React, {Component} from 'react';

class Report extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ReportForm />
        );
    };
}

export default Auth(Report);