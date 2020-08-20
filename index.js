// --------------------creating a udp server --------------------

// creating a udp server
const udp = require('dgram');
const server = udp.createSocket('udp4');




// emits when any error occurs
server.on('error',function(error){
  console.log('Error: ' + error);
  server.close();
});

// emits on new datagram msg
server.on('message',function(msg,info){
  	console.log('Data received from client : ' + msg.toString());
  	console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);

	server.on('listening', () => {
	  const address = server.address();
	  console.log(`server listening ${address.address}:${address.port}`);
	});

	server.bind(4000);
});

module.exports = (port, msg) => {
	var message = new Buffer.from(msg);
	server.send(message, 0, message.length, port, 'localhost', function(err, bytes) {
	    if (err) throw err;

	    let date_ob = new Date();
	    console.log('UDP client message sent, Port: ' + port + ', Timestamp: ' 
	    	+ date_ob.getFullYear() + "-" + ("0" + (date_ob.getMonth() + 1)).slice(-2) + "-" + ("0" + date_ob.getDate()).slice(-2) + " " + date_ob.getHours() + ":" + date_ob.getMinutes() + ":" + date_ob.getSeconds());

	    return true;
	});
}