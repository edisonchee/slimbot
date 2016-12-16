[![Build Status](https://travis-ci.org/edisonchee/slimbot.svg?branch=master)](https://travis-ci.org/edisonchee/slimbot)
[![Coverage Status](https://coveralls.io/repos/github/edisonchee/slimbot/badge.svg?branch=master)](https://coveralls.io/github/edisonchee/slimbot?branch=master)
[![Dependency Status](https://david-dm.org/edisonchee/slimbot.svg)](https://david-dm.org/edisonchee/slimbot)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/edisonchee/slimbot/master/LICENSE)

# Slimbot

A fuss-free, thin wrapper around Telegram Bot API for Node.js. No frills.

## Getting started

```javascript
npm i slimbot
```

```javascript
const Slimbot = require('slimbot');
const slimbot = new Slimbot(process.env['TELEGRAM_TOKEN']);

// Register listeners

slimbot.on('message', message => {
  slimbot.sendMessage(message.chat.id, 'Message received');
});

// Call API

slimbot.startPolling();
```

Now go ahead and type a message to your bot in Telegram. It should reply you with 'Message received' in the chat.

All methods return a promise. This means you can inspect the returned [objects](https://core.telegram.org/bots/api#available-types) if you want to:

```javascript
slimbot.sendMessage('123456789', 'Message received').then(message => {
  console.log(message);
});
```

In this case, the ```sendMessage``` method returns a [Message](https://core.telegram.org/bots/api#message) object as stated in the [documentation](https://core.telegram.org/bots/api#sendmessage).

## Events

Events you can listen to:
* 'message'
* 'edited_message'
* 'channel_post'
* 'edited_channel_post'
* 'callback_query'
* 'inline_query'
* 'chosen_inline_result'

Take note that ```inline_query``` and ```chosen_inline_result``` only works if you have sent ```/setinline``` and ```/setinlinefeedback``` commands to @BotFather. [Read the docs for more information](https://core.telegram.org/bots/inline).

```javascript
slimbot.on('message', message => {
  // do something with message
});

slimbot.on('edited_message', message => {
  // do something with message
});

slimbot.on('channel_post', post => {
  // do something with post
});

slimbot.on('edited_channel_post', post => {
  // do something with post
});

slimbot.on('callback_query', query => {
  // do something with query
});

slimbot.on('inline_query', query => {
  // do something with query
});

slimbot.on('chosen_inline_result', result => {
  // do something with result
});
```

## Methods

All methods found in the [Telegram Bot API Documentation](https://core.telegram.org/bots/api#available-methods) have been implemented.

Use them as they are described in the docs, providing the required parameters and if you wish, the optional parameters:

```javascript
slimbot.sendMessage('123456789', 'hello');

let optionalParams = {
  parse_mode: true,
  disable_web_page_preview: true,
  disable_notification: true,
  reply_to_message_id: 1234,
  reply_markup: {
    inline_keyboard: [[
      { text: 'Today', callback_data: 'pick_today' },
      { text: 'Pick a date', callback_data: 'pick_date' }
    ]]
  }
}

slimbot.sendMessage('123456789', 'hello', optionalParams);
```

### Sending files

There are [3 ways](https://core.telegram.org/bots/api#sending-files) to send files:
1. Using a ```file_id``` when the the file already exists on Telegram's servers
2. Using a ```HTTP URL```
3. Uploading a file to Telegram's servers

Check out the [full example](https://github.com/edisonchee/slimbot/blob/master/examples/sendFile.js) to learn how it works.

```javascript
const fs = require('fs');

// Method 1
slimbot.sendPhoto(chat_id, 'AgADBQADqacxG2gbbxCWBkgvcmeAgxVPyjIABBlug37DKyhDEU0AAgI');

// Method 2
slimbot.sendPhoto(chat_id, 'https://fbatwork.files.wordpress.com/2016/10/govtech-logo.jpg');

// Method 3
let inputFile = fs.createReadStream(__dirname + '/bulb.png');
slimbot.sendPhoto(chat_id, inputFile).then(message => {
  // once successful, you can grab the file_id of the file
  console.log(message.result.photo[0].file_id);
});
```

## Additional methods implemented
These are actually convenience methods that use the same underlying ```editMessageText``` method in the [API](https://core.telegram.org/bots/api#editmessagetext).
* editInlineMessageText
* editInlineMessageCaption
* editInlineMessageReplyMarkup

Call these additional methods with ```inline_message_id``` rather than ```chat_id``` and ```message_id```.

```javascript
// slimbot.editMessageText(chat_id, message_id, 'edited message');
slimbot.editMessageText('123456789', 1234, 'edited message');

// slimbot.editInlineMessageText(inline_message_id, 'edited message');
slimbot.editInlineMessageText('4321', 'edited message');
```