// Include React
var React = require("react");

// Creating the Form component
var Form = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { term: "" };
  },

  // This function will respond to the user input
  _handleChange: function(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);


  },

  // When a user submits...
  _handleClick: function() {
    console.log("Button has been clicked");
    console.log(this.state.term);
    console.log(this.state.startYear);
    console.log(this.state.endYear);

    this.props.setTerm(this.state.term, this.state.startYear, this.state.endYear);

  },

  render: function() {

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">New York Times API React Application</h3>
        </div>
        <div className="panel-body text-center">
          <form>
            <div className="form-group">
              {/*Note how each of the form elements has an id that matches the state. This is not necessary but it is convenient.
                  Also note how each has an onChange event associated with our handleChange event. 
                */}
              <h3>Search Term: </h3><input type="text" className="form-control text-center" id="term" onChange={this._handleChange} required />
              <br />
              <h3>Start Year: </h3><input type="text" className="form-control text-center" id="startYear" onChange={this._handleChange} />
              <br />
              <h3>End Year: </h3><input type="text" className="form-control text-center" id="endYear" onChange={this._handleChange} />
              <br />
              <button type="button" className="btn btn-primary" onClick={this._handleClick}>Submit</button>
            </div>
          </form>
        </div>
      </div>
      )
  }
});

module.exports = SearchForm; 