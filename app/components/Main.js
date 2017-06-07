// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var History = require("./children/Saved");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({


    getInitialState: function() {
        return {
            searchTerm: "",
            startYear: "",
            endYear: "",
            results: [],
            history: []
        }
    },

    setTerm: function(term, startYear, endYear) {
        this.setState({
            searchTerm: term,
            startYear: startYear,
            endYear: endYear
        })
    },

    componentDidUpdate: function(PrevProps, prevState) {
        if (prevState.searchTerm != this.state.searchTerm) {
            console.log("Old Search");

            helpers.runQuery(this.state.searchTerm, this.state.startYear, this.state.endyear)
                .then(function(data) {
                    if (data != this.state.results) {
                        console.log("Search", data);
                        this.setState({ results: data })
                    }
                }.bind(this))
        }
    },

    // The moment the page renders get the History
    componentDidMount: function() {
        // Get the latest history.
        helpers.getSaved()
            .then(function(response) {
                console.log(response);
                if (response !== this.state.history) {
                    console.log("Saved Articles", response.data);
                    this.setState({ history: response.data });
                }
            }.bind(this));
    },

    //This was giving me errors so I stropped some whitespace and closed divs. Pretty sure its the same layout
    render: function() {
        return ( 
            <div className = "container">
                <div className = "row" >
                   <div className = "jumbotron" >
                        < h2 className = "text-center" > New York Times Article Scubber! </h2> 
                        < p className = "text-center" >
                            <em> Search for and annotate articles of interest </em> 
                        </p>
                    </div>

                    < div className = "col-md-6" >

                        < Form setTerm = { this.setTerm } />

                    </div>

                    <div className = "col-md-6">

                        < Results articles = { this.state.results } />

                    </div>

                    <div className = "row">

                        < History history = { this.state.history } />

                    </div>
                </div>
            </div>
        );
    }
});

// Export the component back for use in other files
module.exports = Main;