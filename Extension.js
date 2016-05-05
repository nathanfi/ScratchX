(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    var url_begTranslate = "https://translate.yandex.net/api/v1.5/tr.json/translate?";
    var key = "trnsl.1.1.20160330T170050Z.604550f9f0ae2dd3.cf0f23a139379f9aa5513f13b7a06eabeb1898ad";
    var url_begLanguage = 'https://restcountries.eu/rest/v1/alpha/';
    var url_begCountry = 'http://api.geonames.org/countryCode?';

    ext.execute = function(word, latitude, longitude, callback) {
      var word_input = word;
      var jsonRequestCountry = new XMLHttpRequest();
      var jsonRequestLanguage = new XMLHttpRequest();
      var jsonRequestTranslate = new XMLHttpRequest();
      var didThisWork = 'not yet';
      jsonRequestCountry.onreadystatechange = function() {
        if (jsonRequestCountry.readyState === XMLHttpRequest.DONE) {
          var JSONtextCountry = jsonRequestCountry.responseText;
          var countrycode;
          try {
            countrycode = JSON.parse(JSONtextCountry).countryCode;
            didThisWork = 'yes';
          } catch (e) {
              if (JSON.parse(JSONtextCountry).status.message == 'invalid lat/lng') {
                callback('Invalid Latitude/Longitude');
              } else if (JSON.parse(JSONtextCountry).status.message == 'no country code found') {
              callback ('There is no country at this Latitude/Longitude.');
            }
          }
          if (didThisWork == 'yes') {
          jsonRequestLanguage.onreadystatechange = function() {
            if (jsonRequestLanguage.readyState === XMLHttpRequest.DONE) {
              var JSONtextLanguage = jsonRequestLanguage.responseText;
              var languagecode = JSON.parse(JSONtextLanguage).languages[0];
              jsonRequestTranslate.onreadystatechange = function() {
                if (jsonRequestTranslate.readyState === XMLHttpRequest.DONE) {
                  var JSONtext = jsonRequestTranslate.responseText;
                  var the_word = JSON.parse(JSONtext).text[0];
                  callback(the_word);
                }
              };
              jsonRequestTranslate.open("GET", url_begTranslate + "key=" + key + "&text=" + word_input + "&lang=" + languagecode);
              jsonRequestTranslate.send();
            }
          };
          jsonRequestLanguage.open("GET", url_begLanguage + countrycode);
          jsonRequestLanguage.send();
        }
      }
      };
      jsonRequestCountry.open("GET", url_begCountry + 'lat=' + latitude + '&lng=' + longitude + '&username=nathanfi' + '&type=JSON');
      jsonRequestCountry.send();
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          ['R', '%s in the language of %s ,  %s', 'execute', 'Hello', '54.0', '12.0']
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
