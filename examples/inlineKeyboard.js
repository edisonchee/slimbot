const Slimbot = require('slimbot');
const slimbot = new Slimbot(process.env['TELEGRAM_BOT_TOKEN']);

// Register listener
slimbot.on('message', message => {
  // define inline keyboard to send to user
  let optionalParams = {
    parse_mode: 'Markdown',
    reply_markup: JSON.stringify({
      inline_keyboard: [[
        { text: 'Hello', callback_data: 'hello' }
      ],[
        { text: 'Good', callback_data: 'good' },
        { text: 'Day', callback_data: 'day' }
      ],[
        { text: 'How', callback_data: 'how' },
        { text: 'Are', callback_data: 'are' },
        { text: 'You', callback_data: 'you' }
      ]
      ]
    })
  };
  // reply when user sends a message, and send him our inline keyboard as well
  slimbot.sendMessage(message.chat.id, 'Message received', optionalParams);
});

// Because each inline keyboard button has callback data, you can listen for the callback data and do something with them

slimbot.on('callback_query', query => {
  if (query.data === 'hello') {
    slimbot.sendMessage(query.message.chat.id, 'Hello to you too!');
  }
});

// Call API
slimbot.startPolling();

// Now try talking to your bot, and click on the Hello button. Your bot should reply you with "Hello to you too!".