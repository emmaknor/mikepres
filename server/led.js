var five = require("johnny-five");
board = new five.Board({
  port: '/dev/ttyACM2',
});

var led;

board.on("ready", function() {
  led = new five.Led.RGB({
    pins: {
      red: 11,
      green: 10,
      blue: 9,
    },
    isAnode: true,
  });

  led.color('white');

  board.repl.inject({ led });
});

const setColor = (color) => led.color(color);
const getColor = () => led.color();

module.exports = {
  setColor,
  getColor,
}
