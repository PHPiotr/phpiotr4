import React from 'react';
import ReactDOM from 'react-dom';
import Report from './components/Report.jsx';
import { AppContainer } from 'react-hot-loader';

const render = (Component) => {
    ReactDOM.render(
            <AppContainer>
                <Component/>
            </AppContainer>,
            document.getElementById('container')
            );
};

render(Report);

if (module.hot) {
    module.hot.accept('./components/Report.jsx', () => {
        render(Report);
    });
}
