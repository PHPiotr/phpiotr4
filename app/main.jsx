var React = require("react");
var ReactDOM = require("react-dom");
var ChildrenList = require("./components/ChildrenList.jsx");

var _children = [{name:"Polcia", description:"Królowa Elza! Moc lodu!"},
                {name:"Miłoszek", description:"Szlaban pika... Pociąg jedzie..."}];

function render(){
    ReactDOM.render(<ChildrenList children={_children} />, document.getElementById('container'));
}
render();
