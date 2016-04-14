// TODO: MAKE A GAME WHERE YOU HAVE TO GUESS THE CAPITAL
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

    ext.getInfo = function(option_input, country_input, callback) {
      var option = option_input;
      var country = country_input;
      var jsonRequest = new XMLHttpRequest();
      jsonRequest.onreadystatechange = function() {
        if (jsonRequest.readyState === XMLHttpRequest.DONE) {
          var JSONtext1 = jsonRequest.responseText;
          if (option == 'Capital') {
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
          if(answer === null || answer === '' || answer == 'null') {
            ext.getInfo(option_input,country_input);
            didOneWork = null;
            didTwoWork = null;
          } else {
            callback(answer);
            didOneWork = null;
            didTwoWork = null;
          }
        }
      };
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
