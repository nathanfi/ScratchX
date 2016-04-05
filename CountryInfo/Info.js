(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    var countrycode = '';

    ext.getCountry = function() {
      var jsonRequestCountry = new XMLHttpRequest();
      jsonRequestCountry.onreadystatechange = function() {
        if (jsonRequestCountry.readyState === XMLHttpRequest.DONE) {
        var JSONtextCountry = jsonRequestCountry.responseText;
        var countrycode_uppercase = JSON.parse(JSONtextCountry);
          countryCode = countrycode_uppercase.toLowerCase();
            // countryCode = jsonRequestCountry.responseText;

        }
      };
      var url_beg = 'http://api.geonames.org/countryCode?';
      jsonRequestCountry.open("GET", url_beg + 'lat=' + latitude + '&lng=' + longitude + '&username=nathanfi');
      jsonRequestCountry.send();
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          ['R', 'Display %m.country\'s capital', 'getCountry', 'Hello']
        ],
        menus: {
          country: ['Europe: %m.europe', 'Asia: %m.asia'],
          europe: ['England', 'France'],
          asia: ['Israel, Russia']
        }
    };

    // Register the extension
    ScratchExtensions.register('Translate', descriptor, ext);
})({});
