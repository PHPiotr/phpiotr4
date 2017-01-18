var React = require('react');
var ReactDOM = require('react-dom');
var NewPlane = require('./components/planes/NewPlane.jsx');

(function() {
    ReactDOM.render(<NewPlane action="/bookings/planes" method="post" />, document.getElementById('new-plane'));
})();
