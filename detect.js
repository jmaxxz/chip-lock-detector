const noble = require('noble');
const five = require('johnny-five');
const chipio = require('chip-io');

var board = new five.Board({
  io: new chipio()
});

board.on('ready', function() {
  var led = new five.Led(11);

  noble.on('stateChange', function(state) {
    if (state === 'poweredOn') {
      noble.startScanning(["bd4ac6100b4511e38ffd0800200c9a66"], true);
    } else {
      noble.stopScanning();
    }
  });

  noble.on('discover', function(peripheral){
    led.pulse();
  });
});
