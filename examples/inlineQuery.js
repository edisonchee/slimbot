const Slimbot = require('slimbot');
const slimbot = new Slimbot(process.env['TELEGRAM_BOT_TOKEN']);

// Register listener
// Make sure you enable inline queries with @BotFather first!
// Refer to Telegram Bot API docs for types of InlineQueryResult you can send (https://core.telegram.org/bots/api#inline-mode)

slimbot.on('inline_query', query => {
  console.log(query);
  let results = JSON.stringify([{
    'type': 'article',
    'id': 'ec',
    'title': 'Edison Chee on Medium',
    'description': 'UX Research. UI Design. Web Development',
    'thumb_url': 'http://edisonchee.com/img/favicon.ico',
    'input_message_content': {
      'message_text': 'Featured article: [Rethinking top-level navigation labels](https://blog.gds-gov.tech/rethinking-top-level-navigation-labels-75c9759613af#.ke516y2qw)',
      'parse_mode': 'Markdown',
      'disable_web_page_preview': false
    }
  }, {
    'type': 'article',
    'id': 'gt',
    'title': 'Singapore GovTech Blog',
    'description': 'Be Happy, Be Awesome!',
    'thumb_url': 'https://cdn-images-1.medium.com/max/82/1*hB4KIovectkFlSXV3NhHUQ.png',
    'input_message_content': {
      'message_text': 'View all posts: [GovTech Blog](https://blog.gds-gov.tech/)',
      'parse_mode': 'Markdown',
      'disable_web_page_preview': false
    }
  }]);

  slimbot.answerInlineQuery(query.id, results);
});

// Call API
slimbot.startPolling();

// Now try typing @YourBotName after enabling inline queries with BotFather. You should get a list of links as defined in the results variable.