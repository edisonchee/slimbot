const Telebot = require('../src/telebot');
const telebot = new Telebot(process.env['TELEGRAM_TOKEN_2']);

// Register listeners

telebot.on('message', (message) => {
  telebot.sendMessage(message.chat.id, 'Message received');
});

// Call API

telebot.startPolling();