var React = require("react");
var ReactDOM = require("react-dom");
var EventsList = require("./components/EventsList.jsx");

function render() {
    ReactDOM.render(<EventsList />, document.getElementById('container'));
}
render();
