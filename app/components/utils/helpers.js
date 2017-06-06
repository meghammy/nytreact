// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// New York Times API
var NYT = "7e3d20da52e441f58a167331f71023be";

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to NYT Articles.
  runQuery: function(term, startYear, endYear) {

    console.log("Search" + term);
    console.log("between" +startYear +"and" +endYear);




  var queryURL; 
    if(startYear && !endYear){
      var start = "&begin_date="+startYear+"0101";
      queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+term+start+NYT;
    }
    else if(startYear && endYear){
      var start = "&begin_date="+startYear+"0101";
      var end = "&end_date="+endYear+"1231";
      queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+term+start+end+NYT;
    }
    else if(!startYear && endYear){
      var end = "&end_date="+endYear+"1231";
      queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+term+end+NYT;
    }
    else{
      queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+term+NYT;
    }
 
    return axios.get(queryURL)
      .then(function(response){
        var returnArr = [];
        var length = response.data.response.docs.length;
        console.log(length);
        for(var i = 0; i < length; i++){
          returnArr.push({
            headline: response.data.response.docs[i].headline.main,
            blurb: response.data.response.docs[i].lead_paragraph,
            url: response.data.response.docs[i].web_url
          });
          console.log(returnArr);
        }
        return returnArr;
      })
  },
  //This function hits the route required to get the saved articles, then returns them. 
  getSaved: function(){
    return axios.get("/api/")
      .then(function(response){
        console.log("Saved articles are: "+response);
        return response;
      });
  },
  //This function posts to the route required to save new articles, then returns them. 
  postSaved: function(title, url){
    return axios.post('/api/', {title: title, date: Date.now(), url: url})
      .then(function(results){
        console.log("Posting to Mongo");
        return results;
      })
  }
}

//Export so we can use this elsewhere. 
module.exports = helpers; 
