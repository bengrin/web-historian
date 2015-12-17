var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelper = require('./http-helpers');
var url = require('url')

var actions = {

  'GET' : function (req, res) {
    var pathname = url.parse(req.url).pathname;
    if (pathname === '/'){
      pathname = 'index.html';
    }
    httpHelper.serveAssets(req, pathname, function(data){
      //httpHelper.sendResponse(req, data)
      if (data === 'err') {
      res.writeHead(404, httpHelper.headers);
      res.end();
      } else {
      res.writeHead(200, httpHelper.headers);
      res.end(data);
      }
    });
  
  }
}


exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  if (action){
    action(req, res);
  } else {
    httpHelper.sendResponse(res, "Not found", 404)
  }


  // if (req.url === "/") {
  //   httpHelper.serveAssets(res, "index.html", function (data) {
  //     res.writeHead(201, httpHelper.headers);
  //     res.write(data);
  //     res.end();
  //   })
  
  // } else if (req.url) {
  //   console.log("url",req.url)
    
  //   httpHelper.serveAssets(res, req.url, function (data) {
  //     //console.log(data)
  //     res.writeHead(201, httpHelper.headers);
  //     res.write(data);
  //     res.end();
  //   })
  // }



  //res.end(archive.paths.list);
};
