// Include React
var React = require("react");

// Creating the Results component
var Results = React.createClass({
  // Here we render the function
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className= "panel-body text-center">
          {this.props.results.map(function(search, i){
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