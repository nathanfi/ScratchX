(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    var countrycode = '';
    var capital = '';

    ext.getCountry = function(country) {
      switch (country) {
        case 'United States':             countrycode = 'us'; break;
        case 'America':                   countrycode = 'us'; break;
        case 'United States of America':  countrycode = 'us'; break;
        case 'Afghanistan':               countrycode = 'af'; break;
        case 'Albania':                   countrycode = 'al'; break;
        case 'Algeria':                   countrycode = 'dz'; break;
        case 'American Samoa':            countrycode = 'as'; break;
        case 'Andorra':                   countrycode = 'ad'; break;
        case 'Angola':                    countrycode = 'af'; break;
        case 'Anguilla':                  countrycode = 'ai'; break;
        case 'Antartica':                 countrycode = 'aq'; break;
        case 'Antiga and Barbuda':        countrycode = 'ag'; break;
        case 'Argentina':                 countrycode = 'ar'; break;
        case 'Armenia':                   countrycode = 'am'; break;
        case 'Aruba':                     countrycode = 'aw'; break;
        case 'Australia':                 countrycode = 'au'; break;
        case 'Austria':                   countrycode = 'at'; break;
        case 'Azerbaijan':                countrycode = 'az'; break;
      }
    };
    ext.getCapital = function(country, callback) {
      ext.getCountry(country);
      var jsonRequestCapital = new XMLHttpRequest();
      jsonRequestCapital.onreadystatechange = function() {
        if (jsonRequestCapital.readyState === XMLHttpRequest.DONE) {
        var JSONtextCapital = jsonRequestCapital.responseText;
            capital = JSON.parse(JSONtextLanguage).capital[0];
        }
      };
      var url_beg = 'https://restcountries.eu/rest/v1/alpha/';
      jsonRequestCapital.open("GET", url_beg + countrycode);
      jsonRequestCapital.send();
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          ['R', 'Display %s capital', 'getCapital', 'United States of America']
        ]
    };

    // Register the extension
    ScratchExtensions.register('Translate', descriptor, ext);
})({});
