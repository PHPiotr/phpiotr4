import Auth from './Auth.jsx';
import ReportForm from './ReportForm.jsx';
import React from 'react';

class Report extends Auth {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <ReportForm />
        );
    };
}

export default Report;