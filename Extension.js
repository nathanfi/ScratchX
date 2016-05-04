(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    var the_word = '';
    var word_input = '';
    var languagecode = '';
    var latitude = '47.03';
    var longitude = '10.2';
    var countrycode = '';

    ext.execute = function(word, callback) {
      word_input = word;
      var jsonRequestCountry = new XMLHttpRequest();
      jsonRequestCountry.onreadystatechange = function() {
        if (jsonRequestCountry.readyState === XMLHttpRequest.DONE) {
          var JSONtextCountry = jsonRequestCountry.responseText;
          countrycode = JSON.parse(JSONtextCountry);
          var jsonRequestLanguage = new XMLHttpRequest();
          jsonRequestLanguage.onreadystatechange = function() {
            if (jsonRequestLanguage.readyState === XMLHttpRequest.DONE) {
            var JSONtextLanguage = jsonRequestLanguage.responseText;
                languagecode = JSON.parse(JSONtextLanguage).languages[0];
                var jsonRequestTranslate = new XMLHttpRequest();
                jsonRequestTranslate.onreadystatechange = function() {
                  if (jsonRequestTranslate.readyState === XMLHttpRequest.DONE) {
                    var JSONtext = jsonRequestTranslate.responseText;
                    the_word = JSON.parse(JSONtext).text[0];
                    callback(the_word);
                  }
                };
                var url_begTranslate = "https://translate.yandex.net/api/v1.5/tr.json/translate?";
                var key = "trnsl.1.1.20160330T170050Z.604550f9f0ae2dd3.cf0f23a139379f9aa5513f13b7a06eabeb1898ad";
                jsonRequestTranslate.open("GET", url_begTranslate + "key=" + key + "&text=" + word_input + "&lang=" + languagecode);
                jsonRequestTranslate.send();
            }
          };
          var url_begLanguage = 'https://restcountries.eu/rest/v1/alpha/';
          jsonRequestLanguage.open("GET", url_begLanguage + countrycode);
          jsonRequestLanguage.send();
        }
      };
      var url_begCountry = 'http://api.geonames.org/countryCode?';
      jsonRequestCountry.open("GET", url_begCountry + 'lat=' + latitude + '&lng=' + longitude + '&username=nathanfi');
      jsonRequestCountry.send();
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
// ext.getLanguage = function() {
//   var jsonRequestLanguage = new XMLHttpRequest();
//   jsonRequestLanguage.onreadystatechange = function() {
//     if (jsonRequestLanguage.readyState === XMLHttpRequest.DONE) {
//     var JSONtextLanguage = jsonRequestLanguage.responseText;
//         languagecode = JSON.parse(JSONtextLanguage).languages[0];
//         ext.translate();
//     }
//   };
//   var url_beg_getLanguage = 'https://restcountries.eu/rest/v1/alpha/';
//   jsonRequestLanguage.open("GET", url_beg_getLanguage + countrycode);
//   jsonRequestLanguage.send();
// };

// ext.translate = function() {
//   var jsonRequestTranslate = new XMLHttpRequest();
//   jsonRequestTranslate.onreadystatechange = function() {
//     if (jsonRequestTranslate.readyState === XMLHttpRequest.DONE) {
//     var JSONtext = jsonRequestTranslate.responseText;
//         the_word = JSON.parse(JSONtext).text[0];
//         // callback(the_word);
//     }
//   };
//   var url_begTranslate = "https://translate.yandex.net/api/v1.5/tr.json/translate?";
//   var key = "trnsl.1.1.20160330T170050Z.604550f9f0ae2dd3.cf0f23a139379f9aa5513f13b7a06eabeb1898ad";
//   jsonRequestTranslate.open("GET", url_begTranslate + "key=" + key + "&text=" + word_input + "&lang=" + languagecode);
//   jsonRequestTranslate.send();
// };
