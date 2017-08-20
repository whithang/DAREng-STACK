var request = require("request");
var db = require('../database/index.js');

var postImageToImgur = function(img, callBack) {

  var options = { method: 'POST',
    url: 'https://api.imgur.com/3/image',
    headers:
     { 'postman-token': '98d23b42-ebbc-5873-4088-389950592104',
       'cache-control': 'no-cache',
       authorization: 'Client-ID ca81384e1743235',
       'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
    formData: {
      type: 'url',
      image: img.url
     }
    };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    let result = JSON.parse(body);
    console.log('imgur xpost success', result.data.link);
    db.save(result.data.link);
    callBack(result.data.link);
  });
};

module.exports.postImageToImgur = postImageToImgur;
