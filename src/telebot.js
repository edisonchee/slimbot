const EventEmitter = require('eventemitter3');
const Request = require('request-promise');

class Telebot extends EventEmitter {
  constructor(token) {
    super();
    this._token = token;
    this._offset = 0;
  }

  getMe() {
    let options = {
      uri: 'https://api.telegram.org/bot' + this._token + '/getUpdates',
      resolveWithFullResponse: true
    };

    return Request(options);
  }

  getUpdates() {
    let options = {
      uri: 'https://api.telegram.org/bot' + this._token + '/getUpdates',
      qs: {
        offset: this._offset + 1,
        timeout: 10
      },
      simple: false,
      resolveWithFullResponse: true,
      forever: true
    };

    return Request(options)
    .then(resp => {
      if (resp.statusCode !== 200) {
        throw new Error('resp.statusCode' + 'resp.body}');
      };

      let updates = JSON.parse(resp.body);

      if (updates.ok) {
        updates.result.forEach(update => {
          this._offset = update.update_id;
        });
        this.processUpdates(updates.result);
        return updates.result;
      };
    })
    .catch(error => {
      throw error;
    })
    .finally(() => {
      setTimeout(() => this.getUpdates(), 300);
    });
  }

  processUpdates(updates) {
    updates.forEach(update => {
      let message = update.message;
      let callbackQuery = update.callbackQuery;
      let inlineQuery = update.inline_query;
      let chosenInlineResult = update.chosen_inline_result;

      if (message) {
        this.emit('message', message);
      } else if (callbackQuery) {
        this.emit('callback_query', callbackQuery);
      } else if (inlineQuery) {
        this.emit('inline_query', inlineQuery);
      } else if (chosenInlineResult) {
        this.emit('chosen_inline_result', chosenInlineResult);
      }
    });
  }
}

module.exports = Telebot;