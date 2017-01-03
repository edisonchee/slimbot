[![Build Status](https://travis-ci.org/edisonchee/slimbot.svg?branch=master)](https://travis-ci.org/edisonchee/slimbot)
[![Coverage Status](https://coveralls.io/repos/github/edisonchee/slimbot/badge.svg?branch=master)](https://coveralls.io/github/edisonchee/slimbot?branch=master)
[![Dependency Status](https://david-dm.org/edisonchee/slimbot.svg)](https://david-dm.org/edisonchee/slimbot)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/edisonchee/slimbot/master/LICENSE)

# Slimbot

A fuss-free, thin wrapper around Telegram Bot API for Node.js. No frills.

Updated for [Bot API 2.3.1](https://core.telegram.org/bots/api-changelog#december-4-2016).

## Resources
* [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
* [Release Notes](https://github.com/edisonchee/slimbot/releases)
* [Examples](https://github.com/edisonchee/slimbot/tree/master/examples)
* [Wiki](https://github.com/edisonchee/slimbot/wiki)

## Getting started

```javascript
npm i slimbot
```

```javascript
const Slimbot = require('slimbot');
const slimbot = new Slimbot(process.env['TELEGRAM_BOT_TOKEN']);

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
