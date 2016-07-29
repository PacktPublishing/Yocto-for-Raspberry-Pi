[![Logo](https://raw.github.com/pilwon/node-udoo/master/resource/udoo.png)](http://www.udoo.org/)

[![NPM](https://nodei.co/npm/udoo.png?downloads=false&stars=false)](https://npmjs.org/package/udoo) [![NPM](https://nodei.co/npm-dl/udoo.png?months=6)](https://npmjs.org/package/udoo)


`node-udoo` is a [UDOO](http://www.udoo.org/) [GPIO](https://www.kernel.org/doc/Documentation/gpio.txt) abstraction library for [Node.js](http://nodejs.org/) & [command line tool](#command-line-tool). All shared GPIO pinouts described in the [UDOO Pinout Diagram](https://raw.github.com/pilwon/node-udoo/master/resource/pinout-diagram.pdf) are supported.

This library provides user an option to develop UDOO apps on Node.js using asynchronous (both callback & promise styles) and synchronous patterns. However, it is strongly recommended to stick to Node.js' asynchronous (non-blocking I/O) style.


## Demo Video

[![Demo Video on YouTube](https://raw.github.com/pilwon/node-udoo/master/resource/youtube.png)](https://www.youtube.com/watch?v=tjS-Fe-7dDA)


## Installation

    $ npm install udoo

* [Compiled Node.js and NPM binaries for Linaro Ubuntu can be found here.](https://github.com/pilwon/nodejs-for-linaro-ubuntu)


## GPIOs Warnings

Please pay attention to the `GPIOs Warnings` section of the [UDOO Starting Manual](https://raw.github.com/pilwon/node-udoo/master/resource/manual.pdf):

> When changing i.MX6 GPIOs directions, it is necessary to pay special attention. New direction must be compatible with SAM3x8E pinout configuration and/or with the load of the physical pin.

If you are not interacting with SAM3X (or you don't really understand what this is all about), just reset all shared pinouts to `INPUT` mode on `SAM3X` (`Arduino Due` microcontroller) using [this sketch file](https://github.com/pilwon/node-udoo/blob/master/resource/reset.pde) so you can move the potential direction conflict issue out of the way.


## Usage

[Blink](http://arduino.cc/en/Tutorial/Blink) example from [Arduino Tutorials](http://arduino.cc/en/Tutorial/HomePage) implemented in different styles:

### Asynchronous Version w/ Callbacks

```js
var udoo = require('udoo');

var led = udoo.outputPin(13),
    on = false;

(function loop() {
  led.set(on = !on, function () {
    setTimeout(loop, 1000);
  });
}());
```

### Asynchronous Version w/ [Promise (Q)](https://github.com/kriskowal/q)

```js
var udoo = require('udoo');

var led = udoo.outputPin(13),
    on = false;

(function loop() {
  led
    .set(on = !on)
    .done(function () {
      setTimeout(loop, 1000);
    });
}());
```

### Asynchronous Version w/ [Async.js](https://github.com/caolan/async)

```js
var udoo = require('udoo');

var led = udoo.outputPin(13),
    on = false;

udoo.async.forever(function (cb) {
  udoo.async.series([
    function (cb) {
      led.set(on = !on, cb);
    },
    function (cb) {
      setTimeout(cb, 1000);
    }
  ], cb);
});
```

### Synchronous Version (not recommended)

```js
var udoo = require('udoo');

var led = udoo.outputPin(13),
    on = false;

(function loop() {
  led.setSync(on = !on);
  setTimeout(loop, 1000);
}());
```

* [See more comprehensive examples here.](https://github.com/pilwon/node-udoo/tree/master/examples)


## API

* `node-udoo` API provides all these patterns: **asynchronous style using callbacks**, **asynchronous style using promise**, and **synchronous style**.

* You will be tempted to use synchronous style because the code looks simpler and easier, however it is not the recommended way to program in Node.js.

* All asynchronous API functions accept callback as the last parameter. Whether you pass a callback function or not, they will always return a promise object built using [Q](https://github.com/kriskowal/q). You can do whatever you want with the returned promise, or stick with the traditional callback style.

* Pin name can be any of key values in [PIN_MAPPING](https://github.com/pilwon/node-udoo/blob/master/lib/constant.js).

```js
// List all supported pinouts
.gpioNumbers()
.pinNames()

// Create new pin
.inputPin(pinName)
.outputPin(pinName)

// Pin getter/setter (append `Sync` for synchronous calls)
.get(callback)              // Returns `true` for high/1, `false` for low/0
.setHigh(callback)          // Sets true/high/1
.setLow(callback)           // Sets false/low/0
.set(value, callback)       // Sets (boolean) value

// Pin mode (append `Sync` for synchronous calls)
.getMode(callback)          // Returns one of `udoo.PIN_MODE.*`
.setInputMode(callback)     // Change to input mode
.setOutputMode(callback)    // Change to output mode

// Reset (calling on `udoo` resets all pinouts to `INPUT` mode)
.reset(callback)
.resetSync()

// Constants
.PIN_MODE
.PIN_MODE_INVERT

// Libraries exported
._                    // Lodash (underscore.js)
.Q                    // Q (promise)
.async                // Async.js
```


## Command Line Tool

`node-udoo` comes with a convenient command line tool (`udoo`) for quick and easy control of UDOO GPIO pins. The command line tool can be installed using the following command:

    $ sudo npm install udoo -g


### Available Commands

    $ udoo help
    $ udoo high [<pinName> <pinName> ...]     # aliases: `udoo on`, `udoo 1`
    $ udoo low [<pinName> <pinName> ...]      # aliases: `udoo off`, `udoo 0`
    $ udoo reset [<pinName> <pinName> ...]
    $ udoo blink [<pinName> <pinName> ...]


## TODOs

Here is a list of various ports need to be supported. Please contribute to the `node-udoo` project by sending [Pull Requests](https://help.github.com/articles/using-pull-requests).

1. ~~GPIO (all 51 shared GPIO pinouts described in the [UDOO Pinout Diagram](https://raw.github.com/pilwon/node-udoo/master/resource/pinout-diagram.pdf))~~
2. PWM
3. SPI
4. UARTs
5. I2C
6. Can Bus
7. USB-OTG
8. DAC
9. JTAG
10. DMA


## Credits

  See the [contributors](https://github.com/pilwon/node-udoo/graphs/contributors).


## License

<pre>
The MIT License (MIT)

Copyright (c) 2013 Pilwon Huh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre>
