module.exports = function(options) {
  
  var shared = require('./shared')(options);
  
  /*
   * originCoordLat
   * originCoordLong
   * originCoordName
   * originId
   * 
   * destCoordLat
   * destCoordLong
   * destCoordName
   * destId
   * 
   * viaId
   * searchForArrival
   * maxWalkDist
   * walkSpeed
   * needGeo
   * numTrips
   */
  function getTrip(origin, destination, params, callback) {
    if(!params) {
      callback(new Error("Trip.getTrip: params required"));
    }
    shared.callApi('/trip', params, callback);
  }
  
  return {
      "getTrip": getTrip
  }

}