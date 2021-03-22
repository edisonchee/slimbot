[![Build Status](https://travis-ci.com/edisonchee/slimbot.svg?branch=master)](https://travis-ci.com/edisonchee/slimbot)
[![Coverage Status](https://coveralls.io/repos/github/edisonchee/slimbot/badge.svg?branch=master)](https://coveralls.io/github/edisonchee/slimbot?branch=master)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/edisonchee/slimbot/master/LICENSE)

# Slimbot

A fuss-free, thin wrapper around Telegram Bot API for Node.js. No frills.

Updated for [Telegram Bot API 5.1](https://core.telegram.org/bots/api#march-9-2021).
Works with [Node 15.12.0](https://github.com/nodejs/node/releases/tag/v15.12.0).
Runs on latest Node version `15.12.0`. Tested on `10.16.0` and `12.10.0` as well.

_**Note:** Slimbot patch versions (e.g. x.y.**Z**) do not track or reflect Telegram Bot API changes._

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
const slimbot = new Slimbot('123456789:AA...');

// Register listeners

slimbot.on('message', message => {
  slimbot.sendMessage(message.chat.id, 'Message received');
});

// Call API

slimbot.startPolling();
```

Now go ahead and type a message to your bot in Telegram. It should reply you with 'Message received' in the chat. Check out all other events you can listen to in the [wiki](https://github.com/edisonchee/slimbot/wiki#events).

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
* [Creating Sticker Sets](https://github.com/edisonchee/slimbot/blob/master/examples/createStickerSet.js)
* [Socks5 proxy support](./examples/simpleUsageWithProxy.js) Thanks to @lgg for adding this feature! Merged into the public repo in [PR #27](https://github.com/edisonchee/slimbot/pull/27)

## Documentation ([Wiki](https://github.com/edisonchee/slimbot/wiki))

Learn more about the implementation details in the [Wiki](https://github.com/edisonchee/slimbot/wiki). Feel free to contribute to the Wiki or add more examples.

## Contributing

Heartfelt thanks to the following folks for making Slimbot better:
[@lgg](https://github.com/lgg) [@ago](https://github.com/ago) [@rpaskin](https://github.com/rpaskin) [@matteocontrini](https://github.com/matteocontrini) [@jakimenko](https://github.com/jakimenko) [@nahanil](https://github.com/nahanil)

The guiding principle for this library is to be as simple as possible. I put serious thought into adding features to guard against bloat. Nonetheless, I am very open to dialogue and contributions are most welcome.

If you have built a public bot using this library, send me a PM and I'll feature it here.