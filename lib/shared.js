var qs = require('querystring')
  , sys = require('sys')
  , http = require('http')
  , urlParser = require('url')
  , emptyCallback = function() {console.log("Empty callback invoked. Are you missing a callback somewhere?")};
  
module.exports = function(options) {
    
  function httpGet(url, callback) {
    callback = callback || emptyCallback;
    
    console.log('calling: ' + url);

    var parsedUrl = urlParser.parse(url, true), request, result = "";

    if(parsedUrl.protocol == "https:" && !parsedUrl.port) {
      parsedUrl.port = 443;
    }

    if(parsedUrl.query === undefined) {
      parsedUrl.query = {};
    }
    
    var path = parsedUrl.pathname + "?" + qs.stringify(parsedUrl.query);
    //console.log("Requesting: " + path);
    request = http.request({
      "host" : parsedUrl.hostname,
      "port" : parsedUrl.port,
      "path" : path,
      "method" : "GET",
      "headers" : {
        "Content-Length": 0
      }
    }, function(res) {
      res.on("data", function(chunk) {
        result += chunk;
      });
      res.on("end", function() {
        callback(null, res.statusCode, result);
      });
    });
    request.on("error", function(error) {
      console.log("Error calling remote host: " + error.message);
      callback(error);
    });

    request.end();
  }
  
  /**
   * Takes result data from vasttrafik api and converts to JS object.
   */
   function parseResult(url, status, result, callback) {
     callback = callback || emptyCallback;

     if(status !== undefined && result !== undefined) {
       try {
         var json = JSON.parse(result);
         callback(null, json);
       } catch (e) {
         callback(e);
         return;
       }
     } else {
       callback(new Error("No response for " + url));
     }
   }
  
  function callApi(path, params, callback) {
    
    callback = callback || emptyCallback;
    console.log('params:' + JSON.stringify(params));
    
    params = params || {};
    params.authKey = params.authKey || options.apiKey;
    params.format = params.format || 'json';
    var url = options.vasttrafik.apiUrl + path + "?" + qs.stringify(params);
    
    httpGet(url, function(error, status, result) {
      if(error) {
        callback(error);
      } else {
        parseResult(url, status, result, callback);
      }
    });
    
  }
  
  return {
      "callApi" : callApi
    , "httpGet" : httpGet
  }
  
}