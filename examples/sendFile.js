const Slimbot = require('slimbot');
const slimbot = new Slimbot(process.env['TELEGRAM_BOT_TOKEN']);
const fs = require('fs');

// This is a working example that helps you understand how sending files with a Telegram Bot works
// Just copy/paste and run it

let fileId = 'AgADBQADqacxG2gbbxCWBkgvcmeAgxVPyjIABBlug37DKyhDEU0AAgI';
let fileURL = 'https://fbatwork.files.wordpress.com/2016/10/govtech-logo.jpg';
let fileUpload = fs.createReadStream(__dirname + './bulb.png');

// Register a listener to start the ball rolling
// Send a message to your bot and it will try to send you 3 images!
slimbot.on('message', (message) => {
  // Method 1: Using file_id
  slimbot.sendPhoto(message.chat.id, fileId).then(message => {
    console.log(message.result.photo);
  });

  // Method 2: Using HTTP URL
  slimbot.sendPhoto(message.chat.id, fileURL).then(message => {
    console.log(message.result.photo);
  });

  // Method 3: Uploading a file to Telegram's servers
  slimbot.sendPhoto(message.chat.id, fileUpload).then(message => {
    console.log(message.result.photo);
  });
});

// fileId may be expired by the time you read this (I don't know how long Telegram keeps files on its servers)
// If this happens, use Method 3 to send a file, obtain the file_id of the uploaded file and try Method 1 again

// Call API
slimbot.startPolling();