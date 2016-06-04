[![Build Status](https://travis-ci.org/edisonchee/telebot.svg?branch=master)](https://travis-ci.org/edisonchee/telebot)
[![Coverage Status](https://coveralls.io/repos/github/edisonchee/telebot/badge.svg?branch=subclass)](https://coveralls.io/github/edisonchee/telebot?branch=subclass)

# Telebot

A fuss-free, thin wrapper around Telegram Bot API for Node.js.

## Getting started

```javascript
const Telebot = require('../src/telebot');
const telebot = new Telebot(process.env['TELEGRAM_TOKEN']);

// Register listeners

telebot.on('message', message => {
  telebot.sendMessage(message.chat.id, 'Message received');
});

// Call API

telebot.startPolling();
```

## Events

Events you can listen to:
* 'message'
* 'edited_message'
* 'callback_query'
* 'inline_query'
* 'chosen_inline_result'

Take note that ```inline_query``` and ```chosen_inline_result``` only works if you have sent ```/setinline``` and ```/setinlinefeedback``` commands to @BotFather. [Read the docs for more information](https://core.telegram.org/bots/inline).

```javascript
telebot.on('message', message => {
  // do something with message
});

telebot.on('edited_message', message => {
  // do something with message
});

telebot.on('callback_query', query => {
  // do something with query
});

telebot.on('inline_query', query => {
  // do something with query
});

telebot.on('chosen_inline_result', result => {
  // do something with result
});

```

## Methods

All methods found in the [Telegram Bot API Documentation](https://core.telegram.org/bots/api#available-methods) have been implemented.

Use them as they are described in the docs, providing the required parameters and if you wish, the optional parameters:

```javascript
telebot.sendMessage('123456789', 'text');

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

telebot.sendMessage('123456789', 'text', optionalParams);
```

Additional methods implemented are:
* editInlineMessageText
* editInlineMessageCaption
* editInlineMessageReplyMarkup

Call these additional methods with ```inline_message_id``` rather than ```chat_id``` and ```message_id```.

```javascript

telebot.editMessageText('123456789', 1234, 'edited message');

telebot.editInlineMessageText('4321', 'edited message');

```