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
    "Location": {},
    "Trip": {},
    "StationBoard": {}
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
          // console.log(result.LocationList.StopLocation);
          assert.ok(result);
          assert.ok(result.LocationList);
          ok(test);
        }
      });
    } catch(e) {
      reportError(e);
    }
  }
  
  Tests.Trip.getTripByCoord = function() {
    var test = "vasttrafik.Trip.getTripByCoord()";
    try{
      
      var origin = {
          lat: 57.69633
        , lng: 11.98773
        , name: 'start'
      };
      
      var destination = {
          lat: 57.65814
        , lng: 12.01278
        , name: 'stop'  
      }
      
      var params = {
        needGeo : 1
      }
      
      vasttrafik.Trip.getTrip(origin, destination, params, function(error, result){
        if(error) {
          reportError(test, error.message);
        } else {
          assert.ok(result);
          assert.ok(result.TripList);
          assert.ok(result.TripList.Trip.length > 0)
          ok(test);
        }
      });
    } catch(e) {
      reportError(e);
    }
  }
  
  Tests.Trip.getTripById = function() {
    var test = "vasttrafik.Trip.getTripById()";
    try{
      
      var origin = "9022014007520001";
      var dest = "9022014001760005";
      var params = {};
      vasttrafik.Trip.getTrip(origin, dest, params, function(error, result){
        if(error) {
          reportError(test, error.message);
        } else {
          assert.ok(result);
          assert.ok(result.TripList);
          assert.ok(result.TripList.Trip.length > 0)
          ok(test);
        }
      });
    } catch(e) {
      reportError(e);
    }
  }
  
  Tests.StationBoard.getArrivals = function() {
    var test = "vasttrafik.StationBoard.getArrivals()";
    try{
      
      var id = "9022014007520001";
      var dir = "9022014001760005";
      var params = {};
      vasttrafik.StationBoard.getArrivals(id, dir, new Date(), params, function(error, result){
        if(error) {
          reportError(test, error.message);
        } else {
          assert.ok(result);
          assert.ok(result.ArrivalBoard);
          assert.ok(result.ArrivalBoard.Arrival);
          ok(test);
        }
      });
    } catch(e) {
      reportError(e);
    }
  }
  
  Tests.StationBoard.getDepartures = function() {
    var test = "vasttrafik.StationBoard.getDepartures()";
    try{
      
      var id = "9022014007520001";
      var dir = "9022014001760005";
      var params = {};
      vasttrafik.StationBoard.getDepartures(id, dir, new Date(), params, function(error, result){
        if(error) {
          reportError(test, error.message);
        } else {
          console.log(result);
          assert.ok(result);
          assert.ok(result.DepartureBoard);
          assert.ok(result.DepartureBoard.Departure);
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