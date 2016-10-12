const noble = require('noble');
const five = require('johnny-five');
const chipio = require('chip-io');

const minRssi = -70;
const maxRssi = -35;
const minBrightness = 5;
const maxBrightness = 254;
const rssiIncrement = (maxBrightness-minBrightness)/(maxRssi - minRssi);

var board = new five.Board({
  repl: false,
  io: new chipio()
});


board.on('ready', function() {
  var led = new chipio.StatusLed();
  var rssiIndicator = new five.Led(18);
  var sawBeacon = false;
  var previousRssi = minRssi;

  led.off();
  rssiIndicator.off();

  board.on('exit', function() {
    led.off();
    rssiIndicator.off();
  });

  setInterval(function(){
    if(!sawBeacon) {
      led.off();
      rssiIndicator.off();
    }
    sawBeacon = false;
  }, 1000);

  noble.on('stateChange', function(state) {
    if (state === 'poweredOn') {
      noble.startScanning(["bd4ac6100b4511e38ffd0800200c9a66"], true);
    } else {
      noble.stopScanning();
    }
  });

  noble.on('discover', function(peripheral){
    if(sawBeacon && peripheral.rssi <= previousRssi) {
      return;
    }
    sawBeacon = true;
    previousRssi = peripheral.rssi;
    led.on();
    var rssi = Math.max(peripheral.rssi, minRssi);
    rssi = Math.min(peripheral.rssi, maxRssi);
    normalizedRssi =  (rssi-minRssi) * rssiIncrement;
    rssiIndicator.brightness(minBrightness + normalizedRssi);
  });
});
