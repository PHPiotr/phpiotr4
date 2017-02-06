var React = require('react');
var ReactDOM = require('react-dom');
var Report = require('./components/Report.jsx');
var ReactHotLoader = require('react-hot-loader');
var AppContainer = ReactHotLoader.AppContainer;

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
