/*
 * server.js
 * This file is part of <server>
 *
 * Copyright (C) 2015 - packt
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

// numéro port écoute (Attention aux ports < 1024)
var port = 3344;
var express = require('express')
  , app = express()  
  , server = require('http').createServer(app)
  , path = require('path'),
  fs = require('fs'), 
  sys = require('util'),
  exec = require('child_process').exec,
  child, child1;
 
app.set('port', process.env.TEST_PORT || port);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

//Routes = gestion des pages de l'interface (index + home + indicator)
app.get('/', function (req, res)
{
	res.sendfile(__dirname + '/public/index.html');
});


var connectCounter = 0;

server.listen(port);

io = require('socket.io').listen(server),
io.set('log level', 1);			/* Pas de mode DEBUG */
io.sockets.on('connection', function(socket) {
var memTotal, memUsed = 0, memFree = 0, memBuffered = 0, memCached = 0, sendData = 1, percentBuffered, percentCached, percentUsed, percentFree;
var address = socket.handshake.address;

console.log("New connection from " + address.address + ":" + address.port);
connectCounter++; 
console.log("NUMBER OF CONNECTIONS ++: "+ connectCounter);
socket.emit('connected', address.address); 
socket.on('disconnect', function() { connectCounter--;  console.log("NUMBER OF CONNECTIONS --: "+connectCounter);});
 
setInterval(function()
{
	child = exec("vcgencmd measure_temp", function (error, stdout, stderr) 
	{
		if (error !== null) 
		{
			console.log('exec error: ' + error);
		} 
		else 
		{
			var date = new Date().getTime();
			var temp = parseFloat(stdout);
			socket.emit('rpi_temperature', date,temp); 
		}
	}
);}, 1000);
   
});

