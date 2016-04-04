(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    var url_beg = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20160330T170050Z.604550f9f0ae2dd3.cf0f23a139379f9aa5513f13b7a06eabeb1898ad";
    var word = 'Hello';
    // var lang1 = "en";
    // var lang2 = "es";
    var lan1 = '';
    var lan2 = '';
    var the_word = '';
    var lang = [];
    var lan = [];
    ext.setupLanguages = function() {
      for (i=0;i<2;i++) {
        switch(lang[i]) {
          case 'English'   : lan[i] = 'en'; break;
          case 'Spanish'   : lan[i] = 'es'; break;
          case 'Italian'   : lan[i] = 'it'; break;
          case 'Chinese'   : lan[i] = 'zh'; break;
          case 'German'    : lan[i] = 'de'; break;
          case 'Russian'   : lan[i] = 'ru'; break;
          case 'French'    : lan[i] = 'fr'; break;
          case 'Japanese'  : lan[i] = 'ja'; break;
          case 'Portuguese': lan[i] = 'pt'; break;
        }
      }
    };
    ext.translate = function(word, language1, language2, callback) {
      lang[0] = language1;
      lang[1] = language2;
      setupLanguages();
      var jsonRequest = new XMLHttpRequest();
      jsonRequest.onreadystatechange = function() {
        if (jsonRequest.readyState === XMLHttpRequest.DONE) {
        var JSONtext = jsonRequest.responseText;
            the_word = JSON.parse(JSONtext).text[0];
            callback(the_word);
        }
      };
      jsonRequest.open("GET", url_beg + "&text=" + word + "&lang=" + lan[0] + "-" + lan[1]);
      jsonRequest.send();
    };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          ['R', 'Translate %s from %m.lang1 to %m.lang2', 'translate', 'Hello', 'English','Spanish']
        ],
        menus: {
          lang1: ['English', 'Spanish', 'Chinese', 'Russian', 'French', 'German', 'Italian'],
          lang2: ['English', 'Spanish', 'Chinese', 'Russian', 'French', 'German', 'Italian']
        }
    };

    // Register the extension
    ScratchExtensions.register('Translate', descriptor, ext);
})({});
