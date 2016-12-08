var React = require("react");
var EventInfo = require("./EventInfo.jsx");

module.exports = React.createClass({
    render: function() {
        var events = [
            {
                label: "Next flight",
                link: null,
                date: null
            },
            {
                label: "Next stay",
                link: null,
                date: null
            }
        ];
        return(
            <div className="row">
                {
                    events.map(function(event, index) {
                        return(
                            <EventInfo info={event} key={"event-" + index} />
                        )
                    })
                }
            </div>
        );
    }
});