const EventEmitter = require('eventemitter3');
const Request = require('request-promise');

class Telebot extends EventEmitter {
  constructor(token) {
    super();
    this._token = token;
    this._offset = 0;
  }

  _request(method, params) {

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
        return updates.result;
      };
    })
    .catch(error => {
      throw error;
    });
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
        throw new Error(resp.statusCode + ':\n'+ resp.body);
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

  sendMessage(chatId, text, optionalParams) {
    if (chatId === undefined) {
      throw 'chat_id is undefined';
    } else if (text === undefined) {
      throw 'please provide a message to send';
    };

    let params = {
      chat_id: chatId,
      text: text
    };

    Object.assign(params, optionalParams);

    this._request('sendMessage', params)
  }

  answerCallbackQuery(callbackQueryId, optionalParams) {
    if (callback_query === undefined) {
      throw 'callback_query_id is undefined';
    };

    let params = {
      callback_query_id: callbackQueryId
    }

    Object.assign(params, optionalParams);

    this._request('answerCallbackQuery', params)
  }

  editMessageText(chatId, messageId, inlineMessageId, text, optionalParams) {
    let params = {};
    if (chatId === undefined && messageId === undefined) {
      params = {
        inline_message_id: inlineMessageId,
        text: text
      };
    } else {
      params = {
        chat_id: chatId,
        message_id: messageId,
        text: text
      }
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

  processUpdates(updates) {
    updates.forEach(update => {
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
}

module.exports = Telebot;