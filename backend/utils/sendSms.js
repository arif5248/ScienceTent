var http = require("http");
var querystring = require("querystring");

const sendSMS = async (options) => {
  var postData = querystring.stringify({
    token: process.env.SMS_TOKEN,
    to: options.number,
    message: options.message,
  });

  var options = {
    hostname: "api.greenweb.com.bd",
    path: "/api.php",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": postData.length,
    },
  };

  var req = http.request(options, function (res) {
    res.setEncoding("utf8");

    res.on("data", function (chunk) {
      console.log("BODY:", chunk);
    });

    res.on("end", function () {});
  });

  req.on("error", function (e) {
    console.log("Problem with request:", e.message);
  });

  req.write(postData);
  req.end();
};

module.exports = sendSMS;
