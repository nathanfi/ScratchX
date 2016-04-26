// TODO: MAKE A GAME WHERE YOU HAVE TO GUESS THE CAPITAL
(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    var answer1 = '';
    var answer;
    var url_option = '?fullText=true';
    var url_beg = 'https://restcountries.eu/rest/v1/name/';
    var didOneWork;

    ext.getInfo = function(option_input, country_input, callback) {
      var option = option_input;
      var country = country_input;
      if (country == 'Britain') {
        country = 'Great Britain';
      }
      var jsonRequest = new XMLHttpRequest();
      jsonRequest.onreadystatechange = function() {
        if (jsonRequest.readyState === XMLHttpRequest.DONE) {
          var JSONtext1 = jsonRequest.responseText;
          try {
            if (option == 'Capital') {
              answer1 = JSON.parse(JSONtext1)[0].capital;
              didOneWork = 'yes';
            } else if (option == 'Region') {
              answer1 = JSON.parse(JSONtext1)[0].region;
              didOneWork = 'yes';
            } else if (option == 'Population') {
              var answer2 = string(JSON.parse(JSONtext1)[0].population);
              didOneWork = 'yes';
              answer1 = answer2;
              /*var answer3 = answer2.split('');
              for (i=answer3.length-3; i >0; i=i-3) {
                answer3.splice(i, 0, ',');
              }
              var answer4 = '';
              for (i = 0; i < answer3.length; i++) {
                answer1.concat(answer3[i]);*/
                // answer1 = answer4;
              }
              // answer1 = answer4;
            // }
          } catch (e) {
            didOneWork = 'no';
          }
          if (didOneWork == 'yes') {
            answer = answer1;
          } else {
            answer = 'N/A';
          }
          callback(answer);
          answer = '';
          didOneWork = 'no';
          // answer1 = '';
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
          option_input: ['Capital', 'Region', 'Population']
        }
    };

    // Register the extension
    ScratchExtensions.register('Country Information', descriptor, ext);
})({});
