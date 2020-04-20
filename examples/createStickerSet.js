const Slimbot = require('slimbot');
const slimbot = new Slimbot(process.env['TELEGRAM_BOT_TOKEN']);
const fs = require('fs');

// get your user_id by talking to your bot
let userId = null;
// instructions: https://core.telegram.org/bots/api#createnewstickerset
// Basic formula: 'name_digit_letters_underscores_only' + '_by_' + 'bot_username' (use @yourbotusername without the '@')
let stickerSetName = 'sticker_set_name' + '_by_' + 'your_bot_username';
// This is the title name that will appear on Telegram after you add the sticker set
let stickerSetTitle = 'sticker set name on Telegram';
// can be a local file, where you create a read stream object from, or use a file_id or HTTP URL
// refer to sendFile.js example for usage pattern
let stickerFile = fs.createReadStream(__dirname + './bulb.png');
// actual emoji to replace
let emojis = "😊";

slimbot.on('message', (message) => {
  console.log('Your user id: ', message.from.id);
  userId = message.from.id;

  if (message.text === '/create_sticker_set') {
    slimbot.createNewStickerSet(
      userId,
      stickerSetName,
      stickerSetTitle,
      stickerFile,
      emojis
    )
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(error);
    })
  }
});

slimbot.startPolling();