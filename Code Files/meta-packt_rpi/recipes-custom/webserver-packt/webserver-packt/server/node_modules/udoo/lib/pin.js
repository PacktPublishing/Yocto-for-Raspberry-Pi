/*
 * lib/pin.js
 */

'use strict';

var _ = require('lodash'),
    Q = require('q');

var C = require('./constant'),
    GPIO = require('./gpio');

//----------------------------------------

function Pin(name, mode) {
  this._isDirectionSet = false;
  this._gpio = new GPIO(C._PIN_MAPPING[name]);
  this._name = name;
  this._mode = mode;
}

//----------------------------------------

Pin.prototype._ensureDirection = function (cb) {
  var self = this;

  if (self._isDirectionSet) { return cb(); }

  self._gpio.writeDirection(self._mode, function (err) {
    if (err) { return cb(err); }
    self._isDirectionSet = true;
    cb();
  });
};

Pin.prototype._ensureDirectionSync = function () {
  if (this._isDirectionSet) { return; }

  var result = this._gpio.writeDirectionSync(this._mode);

  this._isDirectionSet = true;

  return result;
};

//----------------------------------------

Pin.prototype.get = function (cb) {
  var self = this,
      dfd = Q.defer();

  self._ensureDirection(function (err) {
    if (err) {
      if (_.isFunction(cb)) { cb(err); }
      return dfd.reject(err);
    }

    self._gpio.readValue(function (err, value) {
      if (err) {
        if (_.isFunction(cb)) { cb(err); }
        return dfd.reject(err);
      }

      if (_.isFunction(cb)) { cb(null, value); }
      dfd.resolve(value);
    });
  });

  return dfd.promise;
};

Pin.prototype.getSync = function () {
  this._ensureDirectionSync();

  return this._gpio.readValueSync();
};

//----------------------------------------

Pin.prototype.getMode = function (cb) {
  var self = this,
      dfd = Q.defer();

  self._ensureDirection(function (err) {
    if (err) {
      if (_.isFunction(cb)) { cb(err); }
      return dfd.reject(err);
    }

    self._gpio.readDirection(function (err, mode) {
      if (err) {
        if (_.isFunction(cb)) { cb(err); }
        return dfd.reject(err);
      }

      if (_.isFunction(cb)) { cb(null, mode); }
      dfd.resolve(mode);
    });
  });

  return dfd.promise;
};

Pin.prototype.getModeSync = function () {
  this._ensureDirectionSync();

  return this._gpio.readDirectionSync();
};

//----------------------------------------

Pin.prototype.reset = function (cb) {
  return this.setInputMode(cb);
};

Pin.prototype.resetSync = function () {
  return this.setInputModeSync();
};

//----------------------------------------

Pin.prototype.set = function (value, cb) {
  var self = this,
      dfd = Q.defer();

  self._ensureDirection(function (err) {
    if (err) {
      if (_.isFunction(cb)) { cb(err); }
      return dfd.reject(err);
    }

    self._gpio.writeValue(value, function (err) {
      if (err) {
        if (_.isFunction(cb)) { cb(err); }
        return dfd.reject(err);
      }

      if (_.isFunction(cb)) { cb(); }
      dfd.resolve();
    });
  });

  return dfd.promise;
};

Pin.prototype.setSync = function (value) {
  this._ensureDirectionSync();

  this._gpio.writeValueSync(value);
};

//----------------------------------------

Pin.prototype.setHigh = function (cb) {
  var self = this,
      dfd = Q.defer();

  self._ensureDirection(function (err) {
    if (err) {
      if (_.isFunction(cb)) { cb(err); }
      return dfd.reject(err);
    }

    self._gpio.writeValue(true, function (err) {
      if (err) {
        if (_.isFunction(cb)) { cb(err); }
        return dfd.reject(err);
      }

      if (_.isFunction(cb)) { cb(); }
      dfd.resolve();
    });
  });

  return dfd.promise;
};

Pin.prototype.setHighSync = function () {
  this._ensureDirectionSync();

  this._gpio.writeValueSync(true);
};

//----------------------------------------

Pin.prototype.setInputMode = function (cb) {
  var self = this,
      dfd = Q.defer();

  self._gpio.writeDirection(C.PIN_MODE.INPUT, function (err) {
    if (err) {
      if (_.isFunction(cb)) { cb(err); }
      return dfd.reject(err);
    }

    self._isDirectionSet = true;
    self._mode = C.PIN_MODE.INPUT;

    if (_.isFunction(cb)) { cb(); }
    dfd.resolve();
  });

  return dfd.promise;
};

Pin.prototype.setInputModeSync = function () {
  this._gpio.writeDirectionSync(C.PIN_MODE.INPUT);
  this._isDirectionSet = true;
  this._mode = C.PIN_MODE.INPUT;
};

//----------------------------------------

Pin.prototype.setLow = function (cb) {
  var self = this,
      dfd = Q.defer();

  self._ensureDirection(function (err) {
    if (err) {
      if (_.isFunction(cb)) { cb(err); }
      return dfd.reject(err);
    }

    self._gpio.writeValue(false, function (err) {
      if (err) {
        if (_.isFunction(cb)) { cb(err); }
        return dfd.reject(err);
      }

      if (_.isFunction(cb)) { cb(); }
      dfd.resolve();
    });
  });

  return dfd.promise;
};

Pin.prototype.setLowSync = function () {
  this._ensureDirectionSync();

  this._gpio.writeValueSync(false);
};

//----------------------------------------

Pin.prototype.setOutputMode = function (cb) {
  var self = this,
      dfd = Q.defer();

  self._gpio.writeDirection(C.PIN_MODE.OUTPUT, function (err) {
    if (err) {
      if (_.isFunction(cb)) { cb(err); }
      return dfd.reject(err);
    }

    self._isDirectionSet = true;
    self._mode = C.PIN_MODE.OUTPUT;

    if (_.isFunction(cb)) { cb(); }
    dfd.resolve();
  });

  return dfd.promise;
};

Pin.prototype.setOutputModeSync = function () {
  this._gpio.writeDirectionSync(C.PIN_MODE.OUTPUT);
  this._isDirectionSet = true;
  this._mode = C.PIN_MODE.OUTPUT;
};

//----------------------------------------

// Public API
exports = module.exports = Pin;
