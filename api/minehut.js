// M:TOP
const request = require('request');

const BASEAPI = `https://api.minehut.com`;

class MinehutAPI {
	constructor() {
		this.session = null;
    this.auth = null;
	}
  async ghostLogin(token) { // M:GHOSTLOGIN
    var API = {
      method: "POST",
      uri: BASEAPI + `/users/ghost_login`,
      headers: {
        "Authorization": process.env[`MH_${token.id}`]
      }
    };
    request.post(API, function(err, res, body) {
      if (err) throw err;
      if (res.statusCode !== 200) console.warn(`${res.statusCode} : ${body}`);
      var data = JSON.parse(body);
      this.auth = data.token;
      this.session = data.sessionId;
    });
  };
};

module.exports = MinehutAPI;