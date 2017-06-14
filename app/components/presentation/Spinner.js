import React from 'react';
import '../../css/spinner.css';

const Spinner = ({isFetching}) => {

    if (!isFetching) {
        return null;
    }

    return (
        <div className="modal fade in" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-sm" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Loading...</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Spinner;