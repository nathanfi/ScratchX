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
    var the_word = '';
    var lan = '';
    ext.translate = function() {
      var jsonRequest = new XMLHttpRequest();
      jsonRequest.onreadystatechange = function() {
        if (jsonRequest.readyState === XMLHttpRequest.DONE) {
        var JSONtext = jsonRequest.responseText;
            the_word = JSON.parse(JSONtext).text[0];
            // callback(the_word);
        }
      };
      jsonRequest.open("GET", url_beg + "?key=" + key + "&text=" + word_input + "&lang=" + lan[0] + "-" + lan[1]);
      jsonRequest.send();
    };
    ext.getLanguage = function() {
      var countrycode = 'cn';
      loadJSON('https://restcountries.eu/rest/v1/alpha/'+countrycode);
      lan = data.languages[0];
    };
    ext.whatIsTheWord = function() {
      var JSONtext = jsonRequest.responseText;
        the_word = JSON.parse(JSONtext);
    };
    ext.execute = function(word, callback) {
      var word_input = word;

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
