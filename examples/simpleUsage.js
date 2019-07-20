const Slimbot = require('slimbot');
const slimbot = new Slimbot(process.env['TELEGRAM_BOT_TOKEN']);

// Register listeners
slimbot.on('message', message => {
  // reply when user sends a message
  slimbot.sendMessage(message.chat.id, 'Message received');
});

slimbot.on('edited_message', edited_message => {
  // reply when user edits a message
  slimbot.sendMessage(edited_message.chat.id, 'Message edited');
});

// Call API
slimbot.startPolling();

console.log('polling...');

setTimeout(() => {
  slimbot.stopPolling();
}, 10000);
