[![Build Status](https://travis-ci.org/edisonchee/telebot.svg?branch=master)](https://travis-ci.org/edisonchee/telebot)
[![Coverage Status](https://coveralls.io/repos/github/edisonchee/telebot/badge.svg?branch=subclass)](https://coveralls.io/github/edisonchee/telebot?branch=subclass)

# Telebot

A fuss-free, thin wrapper around Telegram Bot API for Node.js.

## Getting started

```javascript
const Telebot = require('../src/telebot');
const telebot = new Telebot(process.env['TELEGRAM_TOKEN']);

// Register listeners

telebot.on('message', (message) => {
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

## Methods

All methods found in their [documentation](https://core.telegram.org/bots/api#available-methods) is implemented.

Additional methods implemented are:
* editInlineMessageText
* editInlineMessageCaption
* editInlineMessageReplyMarkup

Call these methods with ```inline_message_id``` rather than ```chat_id``` and ```message_id```.

```javascript

telebot.editMessageText('123456789', 1234, 'edited message');

telebot.editInlineMessageText('4321', 'edited message');

```