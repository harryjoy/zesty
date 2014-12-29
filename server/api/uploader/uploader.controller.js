'use strict';

var fs = require('fs-extra'); //File System - for file manipulation
var path = require('path');
var dirImgPath = __dirname + '/../../../client/assets/images/items';
var dirFilePath = __dirname + '/../../../client/assets/files';

// Handle the Form submission POST requests
exports.create = function(req, res) {
  var fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
    var name = Date.now() + path.extname(filename);
    fstream = fs.createWriteStream(dirImgPath + "/" + name);
    file.pipe(fstream);
    fstream.on('close', function () {    
      return res.send(200, name);
    });
  });
};

// Handle the Form submission POST requests
exports.createFile = function(req, res) {
  var fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
    var name = Date.now() + '_' + filename.replace(' ', '_');
    fstream = fs.createWriteStream(dirFilePath + "/" + name);
    file.pipe(fstream);
    fstream.on('close', function () {    
      return res.send(200, name);
    });
  });
};

// list images from public folder.
exports.list = function(req, res) {
  var files = getFiles(dirImgPath, false, true);
  if (!files || files.length === 0) {
    return res.send(404);
  }
  return res.send(200, files);
};

// list images from public folder.
exports.listFile = function(req, res) {
  var files = getFiles(dirFilePath, false, false);
  if (!files || files.length === 0) {
    return res.send(404);
  }
  return res.send(200, files);
};

function handleError(res, err) {
  return res.send(500, err);
}

// get list of filenames for a specific folder.
function getFiles(dir, subDirectory, images, filesToReturn) {
  filesToReturn = filesToReturn || [];
  if (typeof filesToReturn === 'undefined') filesToReturn=[];
  var files = fs.readdirSync(dir);
  for(var i in files){
    if (!files.hasOwnProperty(i)) continue;
    var name = dir+'/'+files[i];
    var valid = true;
    if (images) {
      valid = checkExtension(name);
    }
    if (valid) {
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
