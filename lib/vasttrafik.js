var defaultOptions = require('./options.default');

function mergeDefaults(o1, o2) {
  for(var p in o2) {
    try {
      if(typeof o2[p] == "object") {
        o1[p] = mergeDefaults(o1[p], o2[p]);
      } else if(typeof o1[p] == "undefined") {
        o1[p] = o2[p];
      }
    } catch(e) {
      o1[p] = o2[p];
    }
  }

  return o1;
}

module.exports = function(options) {
  
  function configure(options) {
    options = options || {};
    mergeDefaults(options, defaultOptions);
    
    if(!options.apiKey) {
      throw new Error('Configuration Error: apiKey required');
    }
    
    return options;
  }
  
  options = configure(options);
  
  return {
      "Location": require('./location')(options)
    , "Trip": require('./trip')(options)
  }
}