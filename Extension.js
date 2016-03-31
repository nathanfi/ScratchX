(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    var url_beg = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20160330T170050Z.604550f9f0ae2dd3.cf0f23a139379f9aa5513f13b7a06eabeb1898ad";
    //var word = 'Hello';
    // var lang1 = "en";
    // var lang2 = "es";
    var lan1 = '';
    var lan2 = '';
    ext.setupLanguages = function(lang1,lang2) {
      if (lang1 == 'English') {
        lan1 = 'en';
      } else if (lang1 == 'Spanish') {
        lan1 = 'es';
      } else if (lang1 == 'Italian') {
        lan1 = 'it';
      } else if (lang1 == 'Chinese') {
        lan1 = 'zh';
      } else if (lang1 == 'German') {
        lan1 = 'de';
      } else if (lang1 == 'Russian') {
        lan1 = 'ru';
      } else if (lang1 == 'French') {
        lan1 = 'fr';
      }
      if (lang2 == 'English') {
        lan2 = 'en';
      } else if (lang2 == 'Spanish') {
        lan2 = 'es';
      } else if (lang2 == 'Italian') {
        lan2 = 'it';
      } else if (lang2 == 'Chinese') {
        lan2 = 'zh';
      } else if (lang2 == 'German') {
        lan2 = 'de';
      } else if (lang2 == 'Russian') {
        lan2 = 'ru';
      } else if (lang2 == 'French') {
        lan2 = 'fr';
      }
    };
    ext.getJSON = function(word, lang1, lang2, callback) {
      setupLanguages(lang1,lang2);
      loadJSON(url_beg + "&text=" + word + "&lang=" + lan1 + "-" + lan2, getData);
      ext.getData = function(data) {
        var the_word = data.text[0];
        callback(the_word);
      };
    };

    // ext.getData = function(data, callback) {
    //   var the_word = data.text[0];
    //   callback(the_word);
    // };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          ['R', 'Translate %s from %m.lang1 to %m.lang2', 'getJSON', 'Hello', 'English','Spanish']
        ],
        menus: {
          lang1: ['English', 'Spanish', 'Chinese', 'Russian', 'French', 'German', 'Italian'],
          lang2: ['English', 'Spanish', 'Chinese', 'Russian', 'French', 'German', 'Italian'],
        }
    };

    // Register the extension
    ScratchExtensions.register('Translate', descriptor, ext);
})({});
