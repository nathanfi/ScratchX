(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.getInfo = function(country, option, callback) {
      var jsonRequest = new XMLHttpRequest();
      jsonRequest.onreadystatechange = function() {
        if (jsonRequest.readyState === XMLHttpRequest.DONE) {
        var JSONtext = jsonRequest.responseText;
        if (option == 'Capital') {
            var capital = JSON.parse(JSONtext)[0].capital;
            callback(capital);
          } else if (option == 'Region') {
            var region = JSON.parse(JSONtext)[0].region;
            callback(region);
          } else if (option == 'Sub-Region') {
            var sub_region = JSON.parse(JSONtext)[0].subregion;
            callback(sub_region);
          } else if (option == 'Population') {
            var population = JSON.parse(JSONtext)[0].population;
            callback(population);
          }
        }
      };
      var url_beg = 'https://restcountries.eu/rest/v1/name/';
      jsonRequestCapital.open("GET", url_beg + country + '?fullText=true');
      jsonRequestCapital.send();
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          ['R', 'Capital of %s', 'getInfo', 'United States', 'Capital'],
          ['R', 'Region of %s', 'getInfo', 'United States', 'Region'],
          ['R', 'Sub-Region of %s', 'getInfo', 'United States', 'Sub-Region'],
          ['R', 'Population of %s', 'getInfo', 'United States', 'Population']
        ]
    };

    // Register the extension
    ScratchExtensions.register('Country Information', descriptor, ext);
})({});
