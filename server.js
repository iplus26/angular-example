'use strict';

var express = require('express');
var app = express();

var rp = require('request-promise');

function format(arr) {
  try {
    switch (arr[0]) {
      case 'topic':
        return {
          type: 'topic',
          title: arr[1],
          url: 'https://www.zhihu.com/topic/' + arr[2],
          avatar: arr[3],
          followerCount: arr[6],
        };
      case 'people':
        return {
          type: 'people',
          title: arr[1],
          url: 'https://www.zhihu.com/people/' + arr[2],
          avatar: arr[3],
          bio: arr[5],
        };
      case 'question':
        return {
          type: 'question',
          title: arr[1],
          url: 'https://www.zhihu.com/question/' + arr[3],
          answerCount: arr[4],
        };
      default:
        return;
    }
  } catch ( e ) {
    console.log(e);
  }
}

app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/zhihu/autocomplete', function(req, res) {

  console.log(req.query);

  var opt = {
    uri: 'https://www.zhihu.com/autocomplete',
    qs: {
      token: req.query.token,
    }
  };

  rp(opt).then(function(data) {

    try {
      var buffer = JSON.parse(data);
      res.json(buffer[0].slice(1, -1).map(function(data) {
        return format(data);
      }));
    } catch ( e ) {
      res.send(e);
    }
  });
});

app.listen(3000, function() {
  console.log('Zhihu API server is running on port 3000');
});