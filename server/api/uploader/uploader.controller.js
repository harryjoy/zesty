'use strict';

var fs = require('fs-extra'); //File System - for file manipulation
var path = require('path');
var dirpath = __dirname + '/../../../client/assets/images/items';

// Handle the Form submission POST requests
exports.create = function(req, res) {
  var fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
    var name = Date.now() + path.extname(filename);
    fstream = fs.createWriteStream(dirpath + "/" + name);
    file.pipe(fstream);
    fstream.on('close', function () {    
      return res.send(200, name);
    });
  });
};

// list images from public folder.
exports.list = function(req, res) {
  var files = getFiles(dirpath, false);
  if (!files || files.length === 0) {
    return res.send(404);
  }
  return res.send(200, files);
};

function handleError(res, err) {
  return res.send(500, err);
}

// get list of filenames for a specific folder.
function getFiles(dir, subDirectory, filesToReturn) {
  filesToReturn = filesToReturn || [];
  if (typeof filesToReturn === 'undefined') filesToReturn=[];
  var files = fs.readdirSync(dir);
  for(var i in files){
    if (!files.hasOwnProperty(i)) continue;
    var name = dir+'/'+files[i];
    if (checkExtension(name)) {
      if (fs.statSync(name).isDirectory()){
        if (subDirectory) {
          getFiles(name,filesToReturn);
        }
      } else {
        filesToReturn.push(files[i]);
      }
    }
  }
  return filesToReturn;
}

// check file extension is image or not.
function checkExtension(filename) {
  var ext = path.extname(filename);
  return '|jpg|png|jpeg|bmp|gif|'.indexOf(ext) === -1;
}
