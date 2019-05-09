/*
 * server.js
 * This file is part of <server>
 *
 * Copyright (C) 2016 - packt
 *
 * <server> is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * <server> is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with <server>. If not, see <http://www.gnu.org/licenses/>.
 */

var express = require('express')
    , app = express()
    , server = require('http').createServer(app)
    , path = require('path'),
    fs = require('fs'),
    sys = require('util'),
    exec = require('child_process').exec,
    child, child1;

io = require('socket.io').listen(server),
                io.set('log level', 1); /* DEBUG MODE */

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
    socket.on('light', function(msg) {
        child = exec(msg, function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    });
});

server.listen(3344, function() {
    console.log('listening on *:3344');
});

