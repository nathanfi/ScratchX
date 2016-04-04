(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    var the_word = '';
    var languagecode = '';
    var lattitude = 47.03;
    var longitude = 10.2;
    var countrycode = '';

    ext.translate = function() {
      var jsonRequestTranslate = new XMLHttpRequest();
      jsonRequestTranslate.onreadystatechange = function() {
        if (jsonRequestTranslate.readyState === XMLHttpRequest.DONE) {
        var JSONtext = jsonRequestTranslate.responseText;
            the_word = JSON.parse(JSONtext).text[0];
            // callback(the_word);
        }
      };
      var url_beg = "https://translate.yandex.net/api/v1.5/tr.json/translate?";
      var key = "trnsl.1.1.20160330T170050Z.604550f9f0ae2dd3.cf0f23a139379f9aa5513f13b7a06eabeb1898ad";
      jsonRequestTranslate.open("GET", url_beg + "key=" + key + "&text=" + word_input + "&lang=" + languagecode);
      jsonRequestTranslate.send();
    };

    ext.getCountry = function() {
      var jsonRequestCountry = new XMLHttpRequest();
      jsonRequestCountry.onreadystatechange = function() {
        if (jsonRequestCountry.readyState === XMLHttpRequest.DONE) {
        var JSONtextCountry = jsonRequestCountry.responseText;
            countrycode = JSON.parse(JSONtextCountry);
        }
      };
      var url_beg = 'http://api.geonames.org/countryCode?';
      jsonRequestCountry.open("GET", url_beg + 'lat=' + lattitude + '&lng=' + longitude + '&username=nathanfi');
      jsonRequestCountry.send();
    };

    ext.getLanguage = function() {
      var jsonRequestLanguage = new XMLHttpRequest();
      jsonRequestLanguage.onreadystatechange = function() {
        if (jsonRequestLanguage.readyState === XMLHttpRequest.DONE) {
        var JSONtextLanguage = jsonRequestLanguage.responseText;
            languagecode = JSON.parse(JSONtextLanguage).languages[0];
        }
      };
      var url_beg = 'https://restcountries.eu/rest/v1/alpha/';
      jsonRequestLanguage.open("GET", url_beg + countrycode);
      jsonRequestLanguage.send();
    };

    ext.execute = function(word, callback) {
      var word_input = word;
      ext.getCountry();
      ext.getLanguage();
      ext.translate();
      callback(the_word);
    };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          ['R', 'Display %s in the local language', 'execute', 'Hello']
        ]
    };

    // Register the extension
    ScratchExtensions.register('Translate', descriptor, ext);
})({});
