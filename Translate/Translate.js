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
    //var word = 'Hello';
    var lan2 = '';
    var the_word = '';
    var lang = [];
    var lan = [];
    ext.setupLanguages = function() {
      for (i=0;i<=1;i++) {
        switch(lang[i]) {
          case 'English':    lan[i] = 'en'; break;
          case 'Spanish':    lan[i] = 'es'; break;
          case 'Chinese':    lan[i] = 'zh'; break;
          case 'Italian':    lan[i] = 'it'; break;
          case 'German':     lan[i] = 'de'; break;
          case 'Russian':    lan[i] = 'ru'; break;
          case 'French':     lan[i] = 'fr'; break;
          case 'Portuguese': lan[i] = 'pt'; break;
          default: the_word = 'That language is not supported.'; break;
        }
      }
    };
    ext.translate = function(word, language2, language1, option, callback) {
      var word_input = word;
      lang[0] = language1;
      lang[1] = language2;
      ext.setupLanguages();
      if (the_word !== '') {
        callback(the_word);
      } else {
      var jsonRequest = new XMLHttpRequest();
      jsonRequest.onreadystatechange = function() {
        if (jsonRequest.readyState === XMLHttpRequest.DONE) {
        var JSONtext = jsonRequest.responseText;
            the_word = JSON.parse(JSONtext).text[0];
            callback(the_word);
        }
      };
      if (option == 2){
        jsonRequest.open("GET", url_beg + "?key=" + key + "&text=" + word_input + "&lang=" + lan[1]);
      } else if (option == 1) {
        jsonRequest.open("GET", url_beg + "?key=" + key + "&text=" + word_input + "&lang=" + lan[0] + "-" + lan[1]);
      }
      jsonRequest.send();
    }
    };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          ['R', 'Translate %s into %s', 'translate', 'Hello', 'Spanish', '', 1]
          // ['R', 'Translate %s into %m.lang2', 'translate', 'Hello', 'Spanish', '', 1],
          // ['R', 'Translate %s from %m.lang1 into %m.lang2', 'translate', 'Hello', 'Spanish', 'English', 2]
        ],
        menus: {
          lang1: ['English', 'Spanish', 'Chinese', 'French', 'German', 'Italian', 'Portuguese', 'Russian'],
          lang2: ['English', 'Spanish', 'Chinese', 'French', 'German', 'Italian', 'Portuguese', 'Russian']
        }
    };

    // Register the extension
    ScratchExtensions.register('Translate', descriptor, ext);
})({});
