module.exports = function(options) {
  
  var shared = require('./shared')(options);
   
 /**
  * Gets trip suggestions
  *
  * @memberof module:vasttrafik/Trip
  * @param {Object} origin can be {lat: {number}, lng: {number}, [name]: {String}}
  *                 or a location id
  * @param {Object} destination can be {lat: {number}, lng: {number}, [name]: {String}}
  *                 or a location id     
  * @param {Object} [params] An object containing additional parameters, all optional
                    {viaId: {String}, searchForArrival, {0 or 1}, maxWalkDist: {Number}, walkSpeed: {Number}, needGeo: (0 or 1), numTrips: {Number}}
  * @param {Function} callback The function to cal with results, function({Error} error, {Object} results)
  */
  function getTrip(origin, destination, params, callback) {
    params = params || {};
    if(typeof origin.lat !== 'undefined' && typeof origin.lng !== 'undefined') {
      params.originCoordLat = origin.lat;
      params.originCoordLong = origin.lng;
      params.originCoordName = origin.name || 'origin';
    } else if (typeof origin === 'string') {
      params.originId = origin;
    } else {
      return callback(new Error('Trips.getTrip: invalid origin'));
    }
    if(typeof destination.lat !== 'undefined' && typeof destination.lng !== 'undefined') {
      params.destCoordLat = destination.lat;
      params.destCoordLong = destination.lng;
      params.destCoordName = destination.name || 'destination';
    } else if (typeof destination === 'string') {
      params.destId = destination;
    } else {
      return callback(new Error('Trips.getTrip: invalid destination'));
    }
    
    shared.callApi('/trip', params, callback);
  }
  
  return {
      "getTrip": getTrip
  }

}