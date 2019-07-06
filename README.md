[![Build Status](https://travis-ci.org/edisonchee/slimbot.svg?branch=master)](https://travis-ci.org/edisonchee/slimbot)
[![Coverage Status](https://coveralls.io/repos/github/edisonchee/slimbot/badge.svg?branch=master)](https://coveralls.io/github/edisonchee/slimbot?branch=master)
[![Dependency Status](https://david-dm.org/edisonchee/slimbot.svg)](https://david-dm.org/edisonchee/slimbot)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/edisonchee/slimbot/master/LICENSE)

# Slimbot

A fuss-free, thin wrapper around Telegram Bot API for Node.js. No frills.

Updated for [Bot API 4.1](https://core.telegram.org/bots/api#august-27-2018).
Works with [Node 11.12.0](https://github.com/nodejs/node/releases/tag/v11.12.0).

## Resources
* [Release Notes](https://github.com/edisonchee/slimbot/releases)
* [Changelog](https://github.com/edisonchee/slimbot/blob/master/CHANGELOG.md)
* [Examples](https://github.com/edisonchee/slimbot/tree/master/examples)

* [Slimbot Wiki](https://github.com/edisonchee/slimbot/wiki)
* [Official Telegram Bot API Documentation](https://core.telegram.org/bots/api)

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

## How it works

All methods return a promise. This means you can inspect the returned [objects](https://core.telegram.org/bots/api#available-types) if you want to:

```javascript
slimbot.sendMessage('123456789', 'Message received')
  .then(message => {
    console.log(message);
  });
```

In this case, the ```sendMessage``` method returns a [Message](https://core.telegram.org/bots/api#message) object as stated in the [documentation](https://core.telegram.org/bots/api#sendmessage).

You can also use callbacks instead of promises:

```javascript
const Slimbot = require('./src/slimbot');
const slimbot = new Slimbot(process.env['TELEGRAM_BOT_TOKEN']);

function callback(err, obj) {
  if (err) {
    // handle error
    console.log(obj);
  }
  // handle returned object
  console.log(obj);
};

slimbot.on('message', message => {
  slimbot.sendMessage(message.chat.id, 'Message received', callback);
});

slimbot.startPolling(callback);
```

## Examples

* [Simple Usage](https://github.com/edisonchee/slimbot/blob/master/examples/simpleUsage.js)
* [Sending Files](https://github.com/edisonchee/slimbot/blob/master/examples/sendFile.js)
* [Inline Keyboards](https://github.com/edisonchee/slimbot/blob/master/examples/inlineKeyboard.js)
* [Inline Queries](https://github.com/edisonchee/slimbot/blob/master/examples/inlineQuery.js)
* [Socks5 proxy support](./examples/simpleUsageWithProxy.js) Thanks to @lgg for adding this feature! Merged into the public repo in [PR #27](https://github.com/edisonchee/slimbot/pull/27)

## Documentation ([Wiki](https://github.com/edisonchee/slimbot/wiki))

Learn more about the implementation details in the [Wiki](https://github.com/edisonchee/slimbot/wiki). Feel free to contribute to the Wiki or add more examples.

## Contributing

The guiding principle for this library is to be as simple as possible. I put serious thought into adding features to guard against bloat. Nonetheless, I am very open to dialogue and contributions are most welcome.

If you have built a public bot using this library, send me a PM and I'll feature it here.