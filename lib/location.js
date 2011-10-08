module.exports = function(options) {
  
  var shared = require('./shared')(options);
  
  /**
   * Gets a list of addresses, or addresses and stops, matching the search string for with highest ranking in 
   * search algoritm, handles spelling mistakes etc.
   *
   * @memberof module:vasttrafik/Routing
   * @param {String} q The search string
   * @param {Object} [params] An object containing additional parameters
   * @param {Function} callback The function to cal with results, function({Error} error, {Object} results)
   */
  function getName(q, params, callback) {
    if(!q) {
      callback(new Error("Location.getName: q required"));
      return;
    }
    params = params || {};
    params.input = q;

    shared.callApi('/location.name', params, callback);
  }
  
  function getNearbyStops(lat, lng, max, params, callback) {
    if(!lat || !lng) {
      callback(new Error("Location.getNearbyStops: lat/lng required"));
    }
    params = params || {};
    params.originCoordLat = lat;
    params.originCoordLong = lng;
    params.maxNo = max || 20;
    
    shared.callApi('/location.nearbystops', params, callback);
  }
  
  return {
      "getName": getName
    , "getNearbyStops": getNearbyStops
  }

}