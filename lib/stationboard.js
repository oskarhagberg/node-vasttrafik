module.exports = function(options) {
  
  var shared = require('./shared')(options);
  
 /**
  * Gets station arrivals
  *
  * @memberof module:vasttrafik/StationBoard
  * @param {String} id of the station
  * @param {String} direction of the transportation
  * @param {Date} time The time of the arrival
  * @param {Object} [params] An object containing additional parameters
  * @param {Function} callback The function to cal with results, function({Error} error, {Object} results)
  */
  function getArrivals(id, direction, time, params, callback) {
    params = params || {};
    if(!id || !direction) {
      return callback(new Error('missing id or direction'));
    }
    params.id = id;
    params.direction = direction;
    time = time || new Date();
    var d = time.getDate();
    var m = time.getMonth() + 1; //months are zero based
    var y = time.getFullYear();
    var h = time.getHours();
    var min = time.getMinutes()
    params.date = y + '-' + m + '-' + d; 
    params.time = h + ':' + min;
    shared.callApi('/arrivalBoard', params, callback);
  }
  
  /**
    * Gets station departures
    *
    * @memberof module:vasttrafik/StationBoard
    * @param {String} id of the station
    * @param {String} direction of the transportation
    * @param {Date} time The time of the departure
    * @param {Object} [params] An object containing additional parameters
    * @param {Function} callback The function to cal with results, function({Error} error, {Object} results)
    */
    function getDepartures(id, direction, time, params, callback) {
      params = params || {};
      if(!id || !direction) {
        return callback(new Error('missing id or direction'));
      }
      params.id = id;
      params.direction = direction;
      time = time || new Date();
      var d = time.getDate();
      var m = time.getMonth() + 1; //months are zero based
      var y = time.getFullYear();
      var h = time.getHours();
      var min = time.getMinutes()
      params.date = y + '-' + m + '-' + d; 
      params.time = h + ':' + min;
      shared.callApi('/departureBoard', params, callback);
    }
  
  return {
      "getDepartures": getDepartures
    , "getArrivals": getArrivals
  }

}
