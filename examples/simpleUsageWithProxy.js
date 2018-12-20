const Slimbot = require('slimbot');
const socks5proxy = {
  socksHost: process.env['SOCKS5_HOST'], //required
  socksPort: process.env['SOCKS5_PORT'], //required
  socksUsername: process.env['SOCKS5_USER'], //optional
  socksPassword: process.env['SOCKS5_PASSWORD'] //optional
};
const slimbot = new Slimbot(process.env['TELEGRAM_BOT_TOKEN'], socks5proxy);

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
