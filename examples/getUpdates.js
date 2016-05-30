const Telebot = require('./telebot');
const telebot = new Telebot(process.env['TELEGRAM_TOKEN_2']);

// Register listeners

telebot.on('message', (message) => {
  console.log(message);
});

telebot.on('callback_query', (callbackQuery) => {
  console.log(callbackQuery);
});

telebot.on('inline_query', (inlineQuery) => {
  console.log(inlineQuery);
});

telebot.on('chosen_inline_result', (chosenInlineResult) => {
  console.log(chosenInlineResult);
});

// Call API

telebot.getUpdates();