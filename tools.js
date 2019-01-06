const axios = require("axios");

module.exports = {
  wordList: async function(offset = 100) {
    try {
      const response = axios.get(
        "https://od-api.oxforddictionaries.com:443/api/v1/wordlist/en/registers%3DRare?word_length=%3E7%2C&exact=false&limit=100&offset=" +
          offset,
        {
          headers: {
            Accept: "application/json",
            app_id: "c6d85d99",
            app_key: "c0ea834fd7340b7993f8110df321523f"
          }
        }
      );
      return response;
    } catch (error) {
      console.log("ERROR", error);
    }
  },
  wordDefinition: async function(word) {
    if (!word) {
      return "no word given";
    }
    try {
      response = await axios.get(
        "https://od-api.oxforddictionaries.com:443/api/v1/entries/en/" + word,
        {
          headers: {
            Accept: "application/json",
            app_id: "c6d85d99",
            app_key: "c0ea834fd7340b7993f8110df321523f"
          }
        }
      );
      return response;
    } catch (error) {
      console.log("ERROR", error);
    }
  },
  getObject: function(object, keyName) {
    if (object.hasOwnProperty(keyName)) return object;

    for (var i = 0; i < Object.keys(object).length; i++) {
      if (typeof object[Object.keys(object)[i]] == "object") {
        var o = this.getObject(object[Object.keys(object)[i]], keyName);
        if (o != null) return o;
      }
    }

    return null;
  }
};
