const EventEmitter = require('eventemitter3');
const Request = require('request-promise');

const Telegram = EventEmitter => class extends EventEmitter {
  constructor(token) {
    super();
    if (token === undefined) {
      throw new Error('Please provide a Telegram bot token when instantiating');
    }
    this._token = token;
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

  getMe() {
    return this._request('getMe').then(updates => {
      return updates.result;
    });
  }

  getUpdates(offset) {
    let params = {
      offset: offset,
      timeout: 10
    };

    return this._request('getUpdates', params);
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

  forwardMessage(chatId, fromChatId, messageId, optionalParams) {
    let params = {
      chat_id: chatId,
      from_chat_id: fromChatId,
      message_id: messageId
    }

    Object.assign(params, optionalParams);

    this._request('forwardMessage', params);
  }

  sendPhoto(chatId, photo, optionalParams) {
    let params = {
      chat_id: chatId,
      photo: photo
    }

    Object.assign(params, optionalParams);

    this._request('sendPhoto', params);
  }

  sendAudio(chatId, audio, optionalParams) {
    let params = {
      chat_id: chatId,
      audio: audio
    }

    Object.assign(params, optionalParams);

    this._request('sendAudio', params);
  }

  sendDocument(chatId, document, optionalParams) {
    let params = {
      chat_id: chatId,
      document: document
    }

    Object.assign(params, optionalParams);

    this._request('sendDocument', params);
  }
}

module.exports = Telegram;