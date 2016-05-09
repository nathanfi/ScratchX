(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    var info = ''; // a filler
    var output;
    var request_option = '?fullText=true';
    var url_beginning = 'https://restcountries.eu/rest/v1/name/';

    ext.getInfo = function(option, country, callback) {
      var holderVariant;
      var fullNameRequest = new XMLHttpRequest();
      fullNameRequest.onreadystatechange = function() {
        if (fullNameRequest.readyState === XMLHttpRequest.DONE) {
          var fullNameText = fullNameRequest.responseText;
          try {
            switch (option) {
              case 'Capital': info = JSON.parse(fullNameText)[0].capital; break;
              case 'Region': info = JSON.parse(fullNameText)[0].region; break;
              case 'Sub-Region': info = JSON.parse(fullNameText)[0].subregion; break;
              case 'Native Name': info = JSON.parse(fullNameText)[0].nativeName; break;
              case 'Population': holderVariant = ((JSON.parse(fullNameText)[0].population).toString()).split('');
                for (i=holderVariant.length-3; i >0; i=i-3) { holderVariant.splice(i, 0, ','); }
                for (i = 0; i < holderVariant.length; i++) { info = info.concat(holderVariant[i]); } break;
              case 'Area': holderVariant = ((JSON.parse(fullNameText)[0].area).toString()).split('');
                for (i=holderVariant.length-3; i >0; i=i-3) { holderVariant.splice(i, 0, ','); }
                for (i = 0; i < holderVariant.length; i++) { info = info.concat(holderVariant[i]); } break;
            }
            output = info;
            if (output === '' || output == ' ') {
              output = 'This country has no capital.';
            }
            callback(output);
            output = '';
            info = '';
          } catch (e) {
            var halfNameRequest = new XMLHttpRequest();
            halfNameRequest.onreadystatechange = function() {
              if (halfNameRequest.readyState === XMLHttpRequest.DONE) {
                var halfNameText = halfNameRequest.responseText;
                try {
                  switch (option) {
                    case 'Capital': info = JSON.parse(halfNameText)[0].capital; break;
                    case 'Region': info = JSON.parse(halfNameText)[0].region; break;
                    case 'Sub-Region': info = JSON.parse(halfNameText)[0].subregion; break;
                    case 'Native Name': info = JSON.parse(halfNameText)[0].nativeName; break;
                    case 'Population': holderVariant = ((JSON.parse(halfNameText)[0].population).toString()).split('');
                      for (i=holderVariant.length-3; i >0; i=i-3) { holderVariant.splice(i, 0, ','); }
                      for (i = 0; i < holderVariant.length; i++) { info = info.concat(holderVariant[i]); } break;
                    case 'Area': holderVariant = ((JSON.parse(halfNameText)[0].area).toString()).split('');
                      for (i=holderVariant.length-3; i >0; i=i-3) { holderVariant.splice(i, 0, ','); }
                      for (i = 0; i < holderVariant.length; i++) { info = info.concat(holderVariant[i]); } break;
                    }
                  output = info;
                  if (output === '' || output == ' ') {
                    output = 'This country has no capital.';
                  }
                } catch (e) {
                  output = 'Please choose a real country.';
                }
                callback(output);
                output = '';
                info = '';
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
