// Include React
var React = require("react");

var helpers = require("../utils/helpers");

// Creating the Results component
var Results = React.createClass({
  // Here we render the function

    //Added set state method to hold results with validation
    getInitialState() {
    var results = [{
      headline : " ",
      blurb : " ",
      url : "#"
    }] || this.props.results;
    return {"results" : results};
  },

  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className= "panel-body text-center">
          {this.state.results.map(function(search, i){
            console.log("test");
            return(
            <div id= "resultDiv" key={i}>
              <h3>{search.headline}</h3>
              <p>{search.blurb}</p>
              <a href={search.url}><button type="button" className="btn btn-success">View on New York Times</button></a>
              <button type="button" className="btn btn-info" onClick={helpers.postSaved(search.headline, search.url)}>Save Article</button>
            </div>
              );
          })}
        </div>
      </div>
      )
  }
});

module.exports = Results; 