(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    var url_beg = "https://translate.yandex.net/api/v1.5/tr.json/translate";
    var key = "trnsl.1.1.20160330T170050Z.604550f9f0ae2dd3.cf0f23a139379f9aa5513f13b7a06eabeb1898ad";
    var the_word = '';
    var lang = '';
    var lan = '';
    ext.setupLanguages = function() {
        switch(lang) {
          case 'English':    lan = 'en'; break;
          case 'Spanish':    lan = 'es'; break;
          case 'Chinese':    lan = 'zh'; break;
          case 'Italian':    lan = 'it'; break;
          case 'German':     lan = 'de'; break;
          case 'Russian':    lan = 'ru'; break;
          case 'French':     lan = 'fr'; break;
          case 'Portuguese': lan = 'pt'; break;
          default: the_word = 'That language is not supported.';// break;
        }
    };
    ext.translate = function(word, language, callback) {
      var word_input = word;
      lang = language;
      ext.setupLanguages();
      var jsonRequest = new XMLHttpRequest();
      jsonRequest.onreadystatechange = function() {
        if (jsonRequest.readyState === XMLHttpRequest.DONE) {
          var JSONtext = jsonRequest.responseText;
          if (the_word === '') {
            the_word = JSON.parse(JSONtext).text[0];
          }
          callback(the_word);
          // the_word = null;
          lang = null;
          lan = null;
          word_input = null;
        }
      };
      jsonRequest.open("GET", url_beg + "?key=" + key + "&text=" + word_input + "&lang=" + lan);
      jsonRequest.send();
    };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          ['R', 'Translate %s into %s', 'translate', 'Hello', 'Spanish']
        ]
    };

    // Register the extension
    ScratchExtensions.register('Translate', descriptor, ext);
})({});
