const EventEmitter = require('eventemitter3');
const Request = require('request-promise');

class Telebot extends EventEmitter {
  constructor(token) {
    super();
    if (token === undefined) {
      throw new Error('Please provide a Telegram bot token when instantiating');
    }
    this._token = token;
    this._offset = 0;
  }

  _request(method, params) {
    if (arguments.length === 0 || typeof arguments[0] !== 'string') {
      throw new Error('Please provide method as a string');
    }

    let options = {
      uri: 'https://api.telegram.org/bot' + this._token + '/' + method,
      qs: params,
      simple: false,
      resolveWithFullResponse: true,
      forever: true
    };

    return Request(options)
    .then(resp => {
      if (resp.statusCode !== 200) {
        throw new Error(resp.statusCode + ':\n'+ resp.body);
      };
      let updates = JSON.parse(resp.body);

      if (updates.ok) {
        return updates;
      };
    })
    .catch(error => {
      throw error;
    });
  }

  _processUpdates(updates) {
    updates.result.forEach(update => {
      this._offset = update.update_id;
      let message = update.message;
      let callbackQuery = update.callback_query;
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

  getMe() {
    return this._request('getMe').then(updates => {
      return updates.result;
    });
  }

  getUpdates() {
    this._offset++;
    let params = {
      offset: this._offset,
      timeout: 10
    };

    return this._request('getUpdates', params)
    .then(updates => {
      this._processUpdates(updates);
    })
    .finally(() => {
      setTimeout(() => this.getUpdates(), 300);
    });
  }

  sendMessage(chatId, text, optionalParams) {
    let params = {
      chat_id: chatId,
      text: text
    };

    Object.assign(params, optionalParams);

    return this._request('sendMessage', params);
  }

  answerCallbackQuery(callbackQueryId, optionalParams) {
    let params = {
      callback_query_id: callbackQueryId
    }

    Object.assign(params, optionalParams);

    this._request('answerCallbackQuery', params)
  }

  editMessageText(chatId, messageId, text, optionalParams) {
    let params = {
      chat_id: chatId,
      message_id: messageId,
      text: text
    }

    Object.assign(params, optionalParams);

    this._request('editMessageText', params);
  }

  editMessageCaption(chatId, messageId, caption, optionalParams) {
    let params = {
      chat_id: chatId,
      message_id: messageId,
      caption: caption
    }

    Object.assign(params, optionalParams);

    this._request('editMessageCaption', params);
  }

  editMessageReplyMarkup(chatId, messageId, replyMarkup) {
    let params = {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: replyMarkup
    }

    this._request('editMessageReplyMarkup', params);
  }

  answerInlineQuery(inlineQueryId, results, optionalParams) {
    let params = {
      inline_query_id: inlineQueryId,
      results: results
    }

    Object.assign(params, optionalParams);

    this._request('answerInlineQuery', params);
  }
}

module.exports = Telebot;