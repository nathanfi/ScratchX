(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    var countrycode = '';
    var capital = '';

    ext.getCapital = function(country, callback) {
      var jsonRequestCapital = new XMLHttpRequest();
      jsonRequestCapital.onreadystatechange = function() {
        if (jsonRequestCapital.readyState === XMLHttpRequest.DONE) {
        var JSONtextCapital = jsonRequestCapital.responseText;
            capital = JSON.parse(JSONtextCapital[0]).capital;
            callback(capital);
        }
      };
      var url_beg = 'https://restcountries.eu/rest/v1/name/';
      jsonRequestCapital.open("GET", url_beg + country);
      jsonRequestCapital.send();
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          ['R', 'Display %s capital', 'getCapital', 'United States of America']
        ]
    };

    // Register the extension
    ScratchExtensions.register('Translate', descriptor, ext);
})({});
