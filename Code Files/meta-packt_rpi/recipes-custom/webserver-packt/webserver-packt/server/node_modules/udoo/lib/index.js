/*
 * lib/index.js
 */

'use strict';

var fs = require('fs'),
    util = require('util');

var _ = require('lodash'),
    Q = require('q'),
    async = require('async');

var C = require('./constant'),
    Pin = require('./pin');

function gpioNumbers() {
  return _.uniq(_.values(C._PIN_MAPPING)).sort();
}

function inputPin(name) {
  if (_.isString(name)) { name = name.toUpperCase(); }

  if (!_.has(C._PIN_MAPPING, name)) {
    throw new Error('Invalid pin name - ' + name);
  }

  return new Pin(name, C.PIN_MODE.INPUT);
}

function outputPin(name) {
  if (_.isString(name)) { name = name.toUpperCase(); }

  if (!_.has(C._PIN_MAPPING, name)) {
    throw new Error('Invalid pin name - ' + name);
  }

  return new Pin(name, C.PIN_MODE.OUTPUT);
}

function pinNames() {
  return _.keys(C._PIN_MAPPING).sort();
}

function reset(cb) {
  var dfd = Q.defer();

  async.map(gpioNumbers(), function (gpioNumber, cb) {
    fs.writeFile(
      util.format(C._PATH_FORMAT.DIRECTION, gpioNumber),
      C.PIN_MODE.INPUT,
      cb
    );
  }, function (err) {
    if (err) {
      if (_.isFunction(cb)) { cb(err); }
      return dfd.reject(err);
    }
    if (_.isFunction(cb)) { cb(); }
    dfd.resolve();
  });

  return dfd.promise;
}

function resetSync() {
  gpioNumbers().forEach(function (gpioNumber) {
    fs.writeFileSync(
      util.format(C._PATH_FORMAT.DIRECTION, gpioNumber),
      C.PIN_MODE.INPUT
    );
  });
}

// Public API
exports.gpioNumbers = gpioNumbers;
exports.inputPin = inputPin;
exports.outputPin = outputPin;
exports.pinNames = pinNames;
exports.reset = reset;
exports.resetSync = resetSync;

// Export constants as read-only values.
_.each(C, function (val, key) {
  if (key[0] === '_') { return; }
  Object.defineProperty(exports, key, {
    get: function () {
      return val;
    }
  });
});

// Export dependencies.
_.each({
  _: require('lodash'),
  Q: require('q'),
  async : require('async')
}, function (val, key) {
  Object.defineProperty(exports, key, {
    get: function () {
      return val;
    }
  });
});
