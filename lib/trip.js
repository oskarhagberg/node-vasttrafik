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
    params = params || {};
    if(typeof(origin) === 'object') {
      params.originCoordLat = origin.lat;
      params.originCoordLong = origin.lng;
      params.originCoordName = origin.name || 'origin';
    } else if (origin) {
      params.originId = origin;
    } else {
      throw new Error('Trips.getTrip: invalid origin');
    }
    if(typeof(destination) === 'object') {
      params.destCoordLat = destination.lat;
      params.destCoordLong = destination.lng;
      params.destCoordName = destination.name || 'destination';
    } else if (destination) {
      params.destId = destination;
      
    } else {
      throw new Error('Trips.getTrip: invalid destination');
    }
    
    shared.callApi('/trip', params, callback);
  }
  
  return {
      "getTrip": getTrip
  }

}