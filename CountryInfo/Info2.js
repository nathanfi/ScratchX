(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    var answer;
    var url_option = '?fullText=true';

    ext.getInfo = function(option_input, country_input, callback) {
      var option = option_input;
      var country = country_input;
      var jsonRequest = new XMLHttpRequest();
      jsonRequest.onreadystatechange = function() {
        if (jsonRequest.readyState === XMLHttpRequest.DONE) {
          var JSONtext = jsonRequest.responseText;
          url_option = '?fullText=true';
            if (JSON.parse(JSONtext).message == "Not Found") {
              url_option = '';
              var jsonRequest2 = new XMLHttpRequest();
              jsonRequest2.onreadystatechange = function() {
                if (jsonRequest2.readyState === XMLHttpRequest.DONE) {
                  var JSONtext2 = jsonRequest2.responseText;
                  if (JSON.parse(JSONtext2).message == "Not Found") {
                    answer = 'N/A';
                  } else if (option == 'Capital') {
                    answer = JSON.parse(JSONtext2)[0].capital;
                  } else if (option == 'Region') {
                    answer = JSON.parse(JSONtext2)[0].region;
                  } else if (option == 'Subregion') {
                    answer = JSON.parse(JSONtext2)[0].subregion;
                  } else if (option == 'Population') {
                    answer = JSON.parse(JSONtext2)[0].population;
                  }
                }
              };
            } else if (option == 'Capital') {
                answer = JSON.parse(JSONtext)[0].capital;
              } else if (option == 'Region') {
                answer = JSON.parse(JSONtext)[0].region;
              } else if (option == 'Subregion') {
                answer = JSON.parse(JSONtext)[0].subregion;
              } else if (option == 'Population') {
                answer = JSON.parse(JSONtext)[0].population;
              }
              callback(answer);
            }
        };
      var url_beg = 'https://restcountries.eu/rest/v1/name/';
      jsonRequest.open("GET", url_beg + country + url_option);
      jsonRequest.send();
    };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          ['R', '%m.option_input of %s', 'getInfo', 'Capital', 'Afghanistan']
        ],
        menus: {
          option_input: ['Capital', 'Region', 'Sub-Region', 'Population']
        }
    };

    // Register the extension
    ScratchExtensions.register('Country Information', descriptor, ext);
})({});
