/*
 * lib/gpio.js
 */

'use strict';

var fs = require('fs'),
    util = require('util');

var C = require('./constant');

function GPIO(number) {
  this._number = number;
}

GPIO.prototype.readDirection = function (cb) {
  fs.readFile(
    util.format(C._PATH_FORMAT.DIRECTION, this._number),
    function (err, data) {
      if (err) { return cb(err); }
      cb(null, data.toString());
    }
  );

  return this;
};

GPIO.prototype.readDirectionSync = function () {
  var data = fs.readFileSync(
    util.format(C._PATH_FORMAT.DIRECTION, this._number)
  );

  return data.toString();
};

GPIO.prototype.readValue = function (cb) {
  fs.readFile(
    util.format(C._PATH_FORMAT.VALUE, this._number),
    function (err, data) {
      if (err) { return cb(err); }
      cb(null, !!parseInt(data.toString(), 10));
    }
  );

  return this;
};

GPIO.prototype.readValueSync = function () {
  var data = fs.readFileSync(
    util.format(C._PATH_FORMAT.VALUE, this._number)
  );

  return !!parseInt(data.toString(), 10);
};

GPIO.prototype.writeDirection = function (direction, cb) {
  fs.writeFile(
    util.format(C._PATH_FORMAT.DIRECTION, this._number),
    direction,
    cb
  );

  return this;
};

GPIO.prototype.writeDirectionSync = function (direction) {
  return fs.writeFileSync(
    util.format(C._PATH_FORMAT.DIRECTION, this._number),
    direction
  );
};

GPIO.prototype.writeValue = function (value, cb) {
  fs.writeFile(
    util.format(C._PATH_FORMAT.VALUE, this._number),
    !value ? '0' : '1',
    cb
  );

  return this;
};

GPIO.prototype.writeValueSync = function (value) {
  return fs.writeFileSync(
    util.format(C._PATH_FORMAT.VALUE, this._number),
    !value ? '0' : '1'
  );
};

// Public API
exports = module.exports = GPIO;
