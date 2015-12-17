var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
 
 //read file siteassets + asset, function
  // if err
    // read archivedSites
      //if  error
        //send 404
    // if no erro 
        //send response (res data)
 //if no error
 // send response( res data)

 var assetPath = archive.paths.siteAssets + '/' + asset;
 var archivedPath = archive.paths.archivedSites + '/' + asset;
 //console.log('test', archivedPath)

 
  fs.readFile(assetPath, "utf8", function (err, data) {
    if (err) { 
      fs.readFile(archivedPath, "utf8", function (err, data) {
        if (err){
          console.log("file not found")
          callback('err');
        } else {
          callback(data);
        }
      })
    } else {
      callback(data);
    }
  })

 


};

exports.sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(data);
};

// As you progress, keep thinking about what helper functions you can put here!
