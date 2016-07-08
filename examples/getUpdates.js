const Slimbot = require('../src/slimbot');
const slimbot = new Slimbot(process.env['TELEGRAM_TOKEN_2']);
const fs = require('fs');

// Register listeners

slimbot.on('message', (message) => {
  // send user a message
  slimbot.sendMessage(message.chat.id, 'Message received');
  // send user an image
  let inputFile = fs.createReadStream(__dirname + '/bulb.png');
  slimbot.sendPhoto(message.chat.id, inputFile).then(message => {
    console.log(message.result.photo);
  });
});

// Call API

slimbot.startPolling();