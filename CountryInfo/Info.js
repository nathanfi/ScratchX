(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    var answer = '';
    var JSONtext;
    var option = '';
    var howMany = 1;
    var url_option = '?fullText=true';
    var country = '';

    ext.getInfo = function(option_input, country_input, callback) {
      if (howMany == 1) {
      option = option_input;
      country = country_input;
      }
      try {
        var jsonRequest = new XMLHttpRequest();
        jsonRequest.onreadystatechange = function() {
          if (jsonRequest.readyState === XMLHttpRequest.DONE) {
            var JSONtext = jsonRequest.responseText;
            if (option == 'Capital') {
              answer = JSON.parse(JSONtext)[0].capital;
            } else if (option == 'Region') {
              answer = JSON.parse(JSONtext)[0].region;
            } else if (option == 'Subregion') {
              answer = JSON.parse(JSONtext)[0].subregion;
            } else if (option == 'Population') {
              answer = JSON.parse(JSONtext)[0].population;
            }
            answer = '';
            jsonRequest = undefined;
            callback(answer);
          }
        };
        var url_beg = 'https://restcountries.eu/rest/v1/name/';
        jsonRequest.open("GET", url_beg + country + url_option);
        jsonRequest.send();

      } catch (error) {
          if (howMany == 1) {
            howMany++;
            ext.getInfo();
          } else if (howMany == 2) {
            answer = 'N/A';
          }
      }
    };
    ext.nonFull = function() {
      var jsonRequest1 = new XMLHttpRequest();
      jsonRequest1.onreadystatechange = function() {
        if (jsonRequest1.readyState === XMLHttpRequest.DONE) {
          var JSONtext = jsonRequest1.responseText;
          ext.parse();
        }
      };
      var url_beg1 = 'https://restcountries.eu/rest/v1/name/';
      jsonRequest1.open("GET", url_beg1 + country);
      jsonRequest1.send();
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          ['R', '%m.option_input of %s', 'getInfo', 'Capital', 'Afghanistan']
          // ,['R', 'Capital of %s', 'getInfo', 'Britain', 'Capital'],
          // ['R', 'Region of %s', 'getInfo', 'Britain', 'Region'],
          // ['R', 'Sub-Region of %s', 'getInfo', 'Britain', 'Subregion'],
          // ['R', 'Population of %s', 'getInfo', 'Britain', 'Population']
        ],
        menus: {
          option_input: ['Capital', 'Region', 'Sub-Region', 'Population']
        }
    };

    // Register the extension
    ScratchExtensions.register('Country Information', descriptor, ext);
})({});
