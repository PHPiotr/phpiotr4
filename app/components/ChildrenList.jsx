var React = require("react");
var ChildInfo = require("./ChildInfo.jsx");

module.exports = React.createClass({
   render:function(){
       return(
           <div className="row">
                {
                    this.props.children.map(function(child, index) {
                        return(
                            <ChildInfo info={child} key={"child-"+index} />
                        )
                    })
                }
           </div>
       )
   }
});