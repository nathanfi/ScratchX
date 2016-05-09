(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    var output;
    var request_option = '?fullText=true';
    var url_beginning = 'https://restcountries.eu/rest/v1/name/';

    ext.getInfo = function(option, country, callback) {
      var filler;
      var fullNameRequest = new XMLHttpRequest();
      fullNameRequest.onreadystatechange = function() {
        if (fullNameRequest.readyState === XMLHttpRequest.DONE) {
          var fullNameText = fullNameRequest.responseText;
          try {
            switch (option) {
              case 'Capital':     output = JSON.parse(fullNameText)[0].capital;    break;
              case 'Region':      output = JSON.parse(fullNameText)[0].region;     break;
              case 'Sub-Region':  output = JSON.parse(fullNameText)[0].subregion;  break;
              case 'Native Name': output = JSON.parse(fullNameText)[0].nativeName; break;
              case 'Population':  filler = ((JSON.parse(fullNameText)[0].population).toString()).split('');
                                    for (i=filler.length-3; i >0; i=i-3) { filler.splice(i, 0, ','); }
                                    for (i = 0; i < filler.length; i++) { output = output.concat(filler[i]); } break;
              case 'Area':        filler = ((JSON.parse(fullNameText)[0].area).toString()).split('');
                                    for (i=filler.length-3; i >0; i=i-3) { filler.splice(i, 0, ','); }
                                    for (i = 0; i < filler.length; i++) { output = output.concat(filler[i]); } break;
              case 'Population Density': var pop; var area; filler = ((JSON.parse(fullNameText)[0].population).toString()).split('');
                                    for (i=filler.length-3; i >0; i=i-3) { filler.splice(i, 0, ','); }
                                    for (i = 0; i < filler.length; i++) { pop = pop.concat(filler[i]); }
                                    filler = ((JSON.parse(fullNameText)[0].area).toString()).split('');
                                    for (i=filler.length-3; i >0; i=i-3) { filler.splice(i, 0, ','); }
                                    for (i = 0; i < filler.length; i++) { area = area.concat(filler[i]); }
                                    filler = round(parseInt(pop)/parseInt(area));
                                    for (i=filler.length-3; i >0; i=i-3) { filler.splice(i, 0, ','); }
                                    for (i = 0; i < filler.length; i++) { output = output.concat(filler[i]); } break;
            }
            if (output === '' || output == ' ') {
              output = 'This country has no capital.';
            }
            callback(output);
            output = '';
            filler = '';
          } catch (e) {
            var halfNameRequest = new XMLHttpRequest();
            halfNameRequest.onreadystatechange = function() {
              if (halfNameRequest.readyState === XMLHttpRequest.DONE) {
                var halfNameText = halfNameRequest.responseText;
                try {
                  switch (option) {
                    case 'Capital':     output = JSON.parse(halfNameText)[0].capital;    break;
                    case 'Region':      output = JSON.parse(halfNameText)[0].region;     break;
                    case 'Sub-Region':  output = JSON.parse(halfNameText)[0].subregion;  break;
                    case 'Native Name': output = JSON.parse(halfNameText)[0].nativeName; break;
                    case 'Population':  filler = ((JSON.parse(halfNameText)[0].population).toString()).split('');
                                          for (i=filler.length-3; i >0; i=i-3) { filler.splice(i, 0, ','); }
                                          for (i = 0; i < filler.length; i++) { output = output.concat(filler[i]); } break;
                    case 'Area':        filler = ((JSON.parse(halfNameText)[0].area).toString()).split('');
                                          for (i=filler.length-3; i >0; i=i-3) { filler.splice(i, 0, ','); }
                                          for (i = 0; i < filler.length; i++) { output = output.concat(filler[i]); } break;
                    case 'Population Density': var pop; var area; filler = ((JSON.parse(halfNameText)[0].population).toString()).split('');
                                          for (i=filler.length-3; i >0; i=i-3) { filler.splice(i, 0, ','); }
                                          for (i = 0; i < filler.length; i++) { pop = pop.concat(filler[i]); }
                                          filler = ((JSON.parse(halfNameText)[0].area).toString()).split('');
                                          for (i=filler.length-3; i >0; i=i-3) { filler.splice(i, 0, ','); }
                                          for (i = 0; i < filler.length; i++) { area = area.concat(filler[i]); }
                                          filler = round(parseInt(pop)/parseInt(area));
                                          for (i=filler.length-3; i >0; i=i-3) { filler.splice(i, 0, ','); }
                                          for (i = 0; i < filler.length; i++) { output = output.concat(filler[i]); } break;
                    }
                  if (output === '' || output == ' ') {
                    output = 'This country has no ' + option + '.';
                  }
                } catch (e) {
                  output = 'Please choose a real country.';
                }
                callback(output);
                output = '';
                filler = '';
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
          option_input: ['Capital', 'Sub-Region', 'Region', 'Population', 'Area', 'Native Name', 'Population Density']
        },
        url: 'http://nathanfi.github.io/ScratchX/CountryInfo/README.md'
    };

    // Register the extension
    ScratchExtensions.register('Country Information', descriptor, ext);
})({});
