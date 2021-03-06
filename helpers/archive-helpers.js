var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb){
  
  fs.readFile(exports.paths.list, function (err, data) {
    if (err) { throw err; }
    var sites = data.toString().split("\n");
    cb(sites)
  });

};

exports.isUrlInList = function(url, cb){
  exports.readListOfUrls(function(sites){
    cb(_.contains(sites, url));
  })
};

exports.addUrlToList = function(url, cb){
  
  exports.isUrlInList(url, function (bool) {
    if (!bool) {
      fs.appendFile(exports.paths.list, url + "\n", function (err){
        if (err) { throw err}
        if (cb) {
          cb(url)
        }
      });
    };
  });
};

exports.isUrlArchived = function(url, cb){
  fs.readdir(exports.paths.archivedSites, function(err, sites){
    if (err) {throw err}
    cb(_.contains(sites, url));
  })

};

exports.downloadUrls = function(){
};
