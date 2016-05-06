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
    var didTwoWork;

    ext.getInfo = function(option_input, country_input, callback) {
      var option = option_input;
      var country = country_input;
      var stuffsucks;
      var answer2;
      var answer3;
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
            } else if (option == 'Sub-Region') {
              answer1 = JSON.parse(JSONtext1)[0].subregion;
              didOneWork = 'yes';
            } else if (option == 'Population') {
              stuffsucks = JSON.parse(JSONtext1)[0].population;
              answer2 = stuffsucks.toString();
              answer3 = answer2.split('');
              for (i=answer3.length-3; i >0; i=i-3) {
                answer3.splice(i, 0, ',');
              }
              for (i = 0; i < answer3.length; i++) {
                answer1 = answer1.concat(answer3[i]);
              }
              didOneWork = 'yes';
            } else if (option == 'Area') {
              stuffsucks = JSON.parse(JSONtext1)[0].area;
              answer2 = stuffsucks.toString();
              answer3 = answer2.split('');
              for (i=answer3.length-3; i >0; i=i-3) {
                answer3.splice(i, 0, ',');
              }
              for (i = 0; i < answer3.length; i++) {
                answer1 = answer1.concat(answer3[i]);
              }
              didOneWork = 'yes';
            }
          } catch (e) {
            didOneWork = 'no';
          }
          if (didOneWork == 'yes') {
            answer = answer1;
            answer1 = '';
          } else {
            var jsonRequest2 = new XMLHttpRequest();
            jsonRequest2.onreadystatechange = function() {
              if (jsonRequest2.readyState === XMLHttpRequest.DONE) {
                var JSONtext2 = jsonRequest2.responseText;
                try {
                  if (option == 'Capital') {
                    answer1 = JSON.parse(JSONtext2)[0].capital;
                    didTwoWork = 'yes';
                  } else if (option == 'Region') {
                    answer1 = JSON.parse(JSONtext2)[0].region;
                    didTwoWork = 'yes';
                  } else if (option == 'Sub-Region') {
                    answer1 = JSON.parse(JSONtext2)[0].subregion;
                    didTwoWork = 'yes';
                  } else if (option == 'Population') {
                    stuffsucks = JSON.parse(JSONtext2)[0].population;
                    answer2 = stuffsucks.toString();
                    answer3 = answer2.split('');
                    for (i=answer3.length-3; i >0; i=i-3) {
                      answer3.splice(i, 0, ',');
                    }
                    for (i = 0; i < answer3.length; i++) {
                      answer1 = answer1.concat(answer3[i]);
                    }
                    didTwoWork = 'yes';
                  } else if (option == 'Area') {
                    stuffsucks = JSON.parse(JSONtext1)[0].area;
                    answer2 = stuffsucks.toString();
                    answer3 = answer2.split('');
                    for (i=answer3.length-3; i >0; i=i-3) {
                      answer3.splice(i, 0, ',');
                    }
                    for (i = 0; i < answer3.length; i++) {
                      answer1 = answer1.concat(answer3[i]);
                    }
                    didTwoWork = 'yes';
                  }
                } catch (e) {
                  didTwoWork = 'no';
                }
                if (didOneWork == 'no' && didTwoWork == 'yes') {
                  answer = answer1;
                } else if (didTwoWork == 'no') {
                  answer = 'N/A';
                }
                if (answer == '' || answer == ' ') {
                  answer = 'This country has no capital';
                }
                callback(answer);
                answer = '';
                didOneWork = 'no';
                didTwoWork = 'no';
              }
            };
            jsonRequest2.open("GET", url_beg + country);
            jsonRequest2.send();
          }
          if (didOneWork == 'yes') {
            if (answer == '' || answer == ' ') {
              answer = 'This country has no capital.';
            }
            callback(answer);
            answer = '';
            didOneWork = 'no';
            didTwoWork = 'no';
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
          option_input: ['Capital', 'Sub-Region', 'Region', 'Population', 'Area']
        }
    };

    // Register the extension
    ScratchExtensions.register('Country Information', descriptor, ext);
})({});
