var assert = require('assert')
  , options = require('./options')
  , vasttrafik = require('./../lib/vasttrafik')(options);

function reportError(test, message) {
  console.log(test + " :  \033[22;31mERROR: " + message + "\x1B[0m");
}

function ok(test) {
  console.log(test + " : \033[22;32mOK\x1B[0m");
}

function TestSuite() {
  
  var Tests = {
    "Location": {}
  };
  
  Tests.Location.getName = function() {
    var test = "vasttrafik.Location.getName(q=kungsportsplatsen)";
    try{
      vasttrafik.Location.getName('kungsportsplatsen', null, function(error, result){
        if(error) {
          reportError(test, error.message);
        } else {
          assert.ok(result);
          assert.ok(result.LocationList);
          ok(test);
        }
      });
    } catch(e) {
      reportError(e);
    }
  }
  
  Tests.Location.getNearbyStops = function() {
    var test = "vasttrafik.Location.getNearbyStops(lat=57.720084, lng=11.944586, max=10)";
    try{
      vasttrafik.Location.getNearbyStops(57.720084, 11.944586, 10, null, function(error, result){
        if(error) {
          reportError(test, error.message);
        } else {
          console.log(result.LocationList.StopLocation);
          assert.ok(result);
          assert.ok(result.LocationList);
          ok(test);
        }
      });
    } catch(e) {
      reportError(e);
    }
  }
  
  return {
    "Tests" : Tests,
    "execute" : function(testGroup, testName) {
      for(var group in Tests) {
        if(!testGroup || (testGroup && testGroup == group)) {
          for(var test in Tests[group]) {
            if(!testName ||(testName && testName == test)) {
              var t = Tests[group][test];
              if(t && typeof(t) == "function") {
                console.log("Running: " + test);
                t.call(this);
              }
            }
          }
        }
      }
    }
  }

}

TestSuite().execute();