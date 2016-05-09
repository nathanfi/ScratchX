(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    var answer1 = '';
    var output;
    var request_option = '?fullText=true';
    var url_beginning = 'https://restcountries.eu/rest/v1/name/';
    var didOneWork;
    var didTwoWork;

    ext.getInfo = function(option, country_input, callback) {
      var country = country_input;
      var stuffsucks;
      var answer2;
      var answer3;
      var fullNameRequest = new XMLHttpRequest();
      fullNameRequest.onreadystatechange = function() {
        if (fullNameRequest.readyState === XMLHttpRequest.DONE) {
          var fullNameText = fullNameRequest.responseText;
          try {
            switch (option) {
              case 'Capital': answer1 = JSON.parse(fullNameText)[0].capital; break;
              case 'Region': answer1 = JSON.parse(fullNameText)[0].region; break;
              case 'Sub-Region': answer1 = JSON.parse(fullNameText)[0].subregion;  break;
              case 'Population': stuffsucks = JSON.parse(fullNameText)[0].population;
                answer2 = stuffsucks.toString();
                answer3 = answer2.split('');
                for (i=answer3.length-3; i >0; i=i-3) {
                  answer3.splice(i, 0, ',');
                }
                for (i = 0; i < answer3.length; i++) {
                  answer1 = answer1.concat(answer3[i]);
                } break;
              case 'Area': stuffsucks = JSON.parse(fullNameText)[0].area;
              answer2 = stuffsucks.toString();
              answer3 = answer2.split('');
              for (i=answer3.length-3; i >0; i=i-3) {
                answer3.splice(i, 0, ',');
              }
              for (i = 0; i < answer3.length; i++) {
                answer1 = answer1.concat(answer3[i]);
              } break;
            case 'Native Name': answer1 = JSON.parse(fullNameText)[0].nativeName; break;
            }
            didOneWork = 'yes';
            output = answer1;
            answer1 = '';
            if (output === '' || output == ' ') {
              output = 'This country has no capital.';
            }
            callback(output);
            output = '';
            didOneWork = 'no';
            didTwoWork = 'no';
          } catch (e) {
            didOneWork = 'no';
            var halfNameRequest = new XMLHttpRequest();
            halfNameRequest.onreadystatechange = function() {
              if (halfNameRequest.readyState === XMLHttpRequest.DONE) {
                var halfNameText = halfNameRequest.responseText;
                try {
                  if (option == 'Capital') {
                    answer1 = JSON.parse(halfNameText)[0].capital;
                    didTwoWork = 'yes';
                  } else if (option == 'Region') {
                    answer1 = JSON.parse(halfNameText)[0].region;
                    didTwoWork = 'yes';
                  } else if (option == 'Sub-Region') {
                    answer1 = JSON.parse(halfNameText)[0].subregion;
                    didTwoWork = 'yes';
                  } else if (option == 'Population') {
                    stuffsucks = JSON.parse(halfNameText)[0].population;
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
                    stuffsucks = JSON.parse(halfNameText)[0].area;
                    answer2 = stuffsucks.toString();
                    answer3 = answer2.split('');
                    for (i=answer3.length-3; i >0; i=i-3) {
                      answer3.splice(i, 0, ',');
                    }
                    for (i = 0; i < answer3.length; i++) {
                      answer1 = answer1.concat(answer3[i]);
                    }
                    didTwoWork = 'yes';
                  } else if (option == 'Native Name') {
                    answer1 = JSON.parse(halfNameText)[0].nativeName;
                    didTwoWork = 'yes';
                  }
                } catch (e) {
                  didTwoWork = 'no';
                }
                if (didOneWork == 'no' && didTwoWork == 'yes') {
                  output = answer1;
                } else if (didTwoWork == 'no') {
                  output = 'N/A';
                }
                if (output === '' || output == ' ') {
                  output = 'This country has no capital';
                }
                callback(output);
                output = '';
                didOneWork = 'no';
                didTwoWork = 'no';
              }
            };
            halfNameRequest.open("GET", url_beginning + country);
            halfNameRequest.send();
          }
        }
      };
      fullNameRequest.open("GET", url_beginning + country + request_option);
      fullNameRequest.send();
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          ['R', '%m.option_input of %s', 'getInfo', 'Capital', 'Afghanistan']
        ],
        menus: {
          option_input: ['Capital', 'Sub-Region', 'Region', 'Population', 'Area', 'Native Name']
        },
        url: 'http://nathanfi.github.io/ScratchX/CountryInfo/README.md'
    };

    // Register the extension
    ScratchExtensions.register('Country Information', descriptor, ext);
})({});
