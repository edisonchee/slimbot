[![Build Status](https://travis-ci.org/edisonchee/telebot.svg?branch=master)](https://travis-ci.org/edisonchee/telebot)

# Telebot

Telegram Bot API for Node.js.

## Getting started

```javascript
const Telebot = require('../src/telebot');
const telebot = new Telebot(process.env['TELEGRAM_TOKEN_2']);

// Register listeners

telebot.on('message', (message) => {
  telebot.sendMessage(message.chat.id, 'Message received');
});

// Call API

telebot.getUpdates();
```

## Events

Events you can listen to:
* 'message'
* 'callback_query'
* 'inline_query'
* 'chosen_inline_result'

## Methods

Methods implemented:
* sendMessage
* answerCallbackQuery
* editMessageText
* editMessageCaption
* editMessageReplyMarkup
* answerInlineQuery