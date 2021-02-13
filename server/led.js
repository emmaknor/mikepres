const five = require("johnny-five");

let led;

const connect = () => {
  const board = new five.Board({
    port: '/dev/ttyACM2',
  });

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
}

const setColor = (color) => led && led.color(color);
const getColor = () => led && led.color() || '#000000';

module.exports = {
  setColor,
  getColor,
}
