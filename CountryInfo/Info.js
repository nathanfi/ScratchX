(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    var answer1;
    var answer2;
    var answer;
    var url_option = '?fullText=true';
    var url_beg = 'https://restcountries.eu/rest/v1/name/';
    var didTwoWork;
    var didOneWork;

    ext.getInfo = function(option_input, country_input) {
      var option = option_input;
      var country = country_input;
      var jsonRequest2 = new XMLHttpRequest();
      jsonRequest2.onreadystatechange = function() {
        if (jsonRequest2.readyState === XMLHttpRequest.DONE) {
          var JSONtext2 = jsonRequest2.responseText;
          if (JSON.parse(JSONtext2).status == 404) {
            didTwoWork = 'no';
          } else if (option == 'Capital') {
            answer2 = JSON.parse(JSONtext2)[0].capital;
          } else if (option == 'Region') {
            answer2 = JSON.parse(JSONtext2)[0].region;
          } else if (option == 'Subregion') {
            answer2 = JSON.parse(JSONtext2)[0].subregion;
          } else if (option == 'Population') {
            answer2 = JSON.parse(JSONtext2)[0].population;
          }
        }
        ext.requestFull(callback);
      };
      jsonRequest2.open("GET", url_beg + country);
      jsonRequest2.send();
    };
    ext.requestFull = function(option_input, country_input, callback) {
      ext.getInfo(option_input, country_input);
      var jsonRequest = new XMLHttpRequest();
      jsonRequest.onreadystatechange = function() {
        if (jsonRequest.readyState === XMLHttpRequest.DONE) {
          var JSONtext1 = jsonRequest.responseText;
          url_option = '?fullText=true';
          if (JSON.parse(JSONtext1).status == 404) {
            didOneWork = 'no';
          } else if (option == 'Capital') {
            answer1 = JSON.parse(JSONtext1)[0].capital;
          } else if (option == 'Region') {
            answer1 = JSON.parse(JSONtext1)[0].region;
          } else if (option == 'Subregion') {
            answer1 = JSON.parse(JSONtext1)[0].subregion;
          } else if (option == 'Population') {
            answer1 = JSON.parse(JSONtext1)[0].population;
          }
          if (didOneWork === null) {
            answer = answer1;
          } else if (didTwoWork == 'no' && didOneWork == 'no') {
            answer = 'N/A';
          } else {
            answer = answer2;
          }
          callback(answer);
          didOneWork = null;
          didTwoWork = null;
        }
      };
      jsonRequest.open("GET", url_beg + country + url_option);
      jsonRequest.send();
    };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          ['R', '%m.option_input of %s', 'requestFull', 'Capital', 'Afghanistan']
        ],
        menus: {
          option_input: ['Capital', 'Region', 'Sub-Region', 'Population']
        }
    };

    // Register the extension
    ScratchExtensions.register('Country Information', descriptor, ext);
})({});
