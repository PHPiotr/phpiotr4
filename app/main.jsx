var React = require("react");
var ReactDOM = require("react-dom");
var Report = require("./components/Report.jsx");

function render() {
    ReactDOM.render(<Report />, document.getElementById('container'));
}
render();
