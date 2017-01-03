const Slimbot = require('slimbot');
const slimbot = new Slimbot(process.env['TELEGRAM_BOT_TOKEN']);

// Register listener
// Make sure you enable inline queries with @BotFather first!
// Refer to Telegram Bot API docs for types of InlineQueryResult you can send (https://core.telegram.org/bots/api#inline-mode)

slimbot.on('inline_query', query => {
  let results = JSON.stringify([{
    'type': 'article',
    'id': 'ec',
    'title': 'Edison Chee on Medium',
    'url': 'https://medium.com/@edisonchee'
  }, {
    'type': 'article',
    'id': 'gt',
    'title': 'Singapore GovTech Blog',
    'url': 'https://blog.gds-gov.tech'
  }]);

  slimbot.answerInlineQuery(query.id, results);
});

// Call API
slimbot.startPolling();

// Now try typing @YourBotName after enabling inline queries with BotFather. You should get a list of links as defined in the results variable.