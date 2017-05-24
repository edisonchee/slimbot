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

  _request(method, params, formData) {
    if (arguments.length === 0 || typeof arguments[0] !== 'string') {
      throw new Error('Please provide method as a string');
    }

    // the 2nd, 3rd or 4th argument could be a callback
    let callback;
    if (typeof arguments[3] == 'function') {
      callback = arguments[3];
    } else if (typeof arguments[2] == 'function') {
      callback = arguments[2];
      formData = null;
    } else if (typeof arguments[1] == 'function') {
      callback = arguments[1];
      params = null;
    }

    let options = {
      uri: 'https://api.telegram.org/bot' + this._token + '/' + method,
      qs: params,
      formData: formData,
      simple: false,
      resolveWithFullResponse: true,
      forever: true
    };

    return Request(options)
    .then(resp => {
      if (resp.statusCode !== 200) {
        throw new Error(resp.statusCode + ':\n'+ resp.body);
      }

      let updates = JSON.parse(resp.body);

      if (updates.ok) {
        callback && callback(null, updates);

        return updates;
      }
    })
    .catch(error => {
      if (callback) {
        callback(error);
      }
      else {
        throw error;
      }
    });
  }

  getMe(callback) {
    return this._request('getMe', callback);
  }

  getUpdates(offset, callback) {
    let params = {
      offset: offset,
      timeout: 10
    };

    return this._request('getUpdates', params, callback);
  }

  setWebhook(url, optionalParams, callback) {
    return this._request('setWebhook', url, optionalParams, callback);
  }

  deleteWebhook(callback) {
    return this._request('deleteWebhook', callback);
  }

  getWebhookInfo(callback) {
    return this._request('getWebhookInfo', callback);
  }

  sendMessage(chatId, text, optionalParams, callback) {
    let params = {
      chat_id: chatId,
      text: text
    };

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams, callback);
    }

    return this._request('sendMessage', params, callback);
  }

  answerCallbackQuery(callbackQueryId, optionalParams, callback) {
    let params = {
      callback_query_id: callbackQueryId
    };

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('answerCallbackQuery', params, callback);
  }

  editMessageText(chatId, messageId, text, optionalParams, callback) {
    let params = {
      chat_id: chatId,
      message_id: messageId,
      text: text
    };

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('editMessageText', params, callback);
  }

  editInlineMessageText(inlineMessageId, text, optionalParams, callback) {
    let params = {
      inline_message_id: inlineMessageId,
      text: text
    };

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('editMessageText', params, callback);
  }

  editMessageCaption(chatId, messageId, caption, optionalParams, callback) {
    let params = {
      chat_id: chatId,
      message_id: messageId,
      caption: caption
    };

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('editMessageCaption', params, callback);
  }

  editInlineMessageCaption(inlineMessagId, caption, optionalParams, callback) {
    let params = {
      inline_message_id: inlineMessageId,
      caption: caption
    };

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('editMessageCaption', params, callback);
  }

  editMessageReplyMarkup(chatId, messageId, replyMarkup, callback) {
    let params = {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: replyMarkup
    }

    return this._request('editMessageReplyMarkup', params, callback);
  }

  editInlineMessageReplyMarkup(inlineMessageId, replyMarkup, callback) {
    let params = {
      inline_message_id: inlineMessageId,
      reply_markup: replyMarkup
    }

    return this._request('editMessageReplyMarkup', params, callback);
  }

  deleteMessage(chatId, messageId) {
    let params = {
      chat_id: chatId,
      message_id: messageId
    }

    return this._request('deleteMessage', params, callback);
  }

  answerInlineQuery(inlineQueryId, results, optionalParams, callback) {
    let params = {
      inline_query_id: inlineQueryId,
      results: results
    };

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('answerInlineQuery', params, callback);
  }

  forwardMessage(chatId, fromChatId, messageId, optionalParams, callback) {
    let params = {
      chat_id: chatId,
      from_chat_id: fromChatId,
      message_id: messageId
    }

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('forwardMessage', params, callback);
  }

  sendPhoto(chatId, photo, optionalParams, callback) {
    let params = {
      chat_id: chatId,
      photo: photo
    };

    let formData = {
      photo: photo
    };

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('sendPhoto', params, formData, callback);
  }

  sendAudio(chatId, audio, optionalParams, callback) {
    let params = {
      chat_id: chatId,
      audio: audio
    };

    let formData = {
      audio: audio
    };

    // write test for file size limit

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('sendAudio', params, formData, callback);
  }

  sendDocument(chatId, document, optionalParams, callback) {
    let params = {
      chat_id: chatId,
      document: document
    };

    let formData = {
      document: document
    };

    // write test for file size limit

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('sendDocument', params, formData, callback);
  }

  sendSticker(chatId, sticker, optionalParams, callback) {
    let params = {
      chat_id: chatId,
      sticker: sticker
    };

    let formData = {
      sticker: sticker
    };

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('sendSticker', params, formData, callback);
  }

  sendVideo(chatId, video, optionalParams, callback) {
    let params = {
      chat_id: chatId,
      video: video
    };

    let formData = {
      video: video
    };

    // write test for file size limit
    // write test for file size type (only .mp4)

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('sendVideo', params, callback);
  }

  sendVoice(chatId, voice, optionalParams, callback) {
    let params = {
      chat_id: chatId,
      voice: voice
    };

    let formData = {
      voice: voice
    };

    // write test for file size limit
    // write test for file size type (only .ogg encoded in OPUS)

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('sendVoice', params, callback);
  }

  sendVideoNote(chatId, videoNote, optionalParams, callback) {
    let params = {
      chat_id: chatId,
      video_note: videoNote
    };

    let formData = {
      video_note: videoNote
    };

    // write test for file size limit
    // write test for file size type (only .ogg encoded in OPUS)

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('sendVideoNote', params, callback);
  }

  sendLocation(chatId, lat, lon, optionalParams, callback) {
    let params = {
      chat_id: chatId,
      latitude: lat,
      longitude: lon
    };

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('sendLocation', params, callback);
  }

  sendVenue(chatId, lat, lon, title, address, optionalParams, callback) {
    let params = {
      chat_id: chatId,
      latitude: lat,
      longitude: lon,
      title: title,
      address: address
    }

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('sendVenue', params, callback);
  }

  sendContact(chatId, phoneNumber, firstName, optionalParams, callback) {
    let params = {
      chat_id: chatId,
      phone_number: phoneNumber,
      first_name: firstName
    }

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('sendContact', params, callback);
  }

  sendChatAction(chatId, action, callback) {
    if (typeof action !== 'string') {
      throw new Error('sendChatAction method needs a string input');
    }

    let params = {
      chat_id: chatId,
      action: action
    };

    return this._request('sendChatAction', params, callback);
  }

  getUserProfilePhotos(userId, optionalParams, callback) {
    let params = {
      user_id: userId,
    };

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('getUserProfilePhotos', params, callback);
  }

  getFile(fileId, callback) {
    let params = {
      file_id: fileId
    };

    return this._request('getFile', params, callback);
  }

  kickChatMember(chatId, userId, callback) {
    let params = {
      chat_id: chatId,
      user_id: userId
    };

    return this._request('kickChatMember', params, callback);
  }

  leaveChat(chatId, callback) {
    let params = {
      chat_id: chatId
    };

    return this._request('leaveChat', params, callback);
  }

  unbanChatMember(chatId, userId, callback) {
    let params = {
      chat_id: chatId,
      user_id: userId
    };

    return this._request('unbanChatMember', params, callback);
  }

  getChat(chatId, callback) {
    let params = {
      chat_id: chatId
    };

    return this._request('getChat', params, callback);
  }

  getChatAdministrators(chatId, callback) {
    let params = {
      chat_id: chatId
    };

    return this._request('getChatAdministrators', params, callback);
  }

  getChatMembersCount(chatId, callback) {
    let params = {
      chat_id: chatId
    };

    return this._request('getChatMembersCount', params, callback);
  }

  getChatMember(chatId, userId, callback) {
    let params = {
      chat_id: chatId,
      user_id: userId
    };

    return this._request('getChatMember', params, callback);
  }

  // Payment

  sendInvoice(chatId, title, description, payload, providerToken, startParameter, currency, prices, optionalParams, callback) {
    let params = {
      chat_id: chatId,
      title: title,
      description: description,
      payload: payload,
      provider_token: providerToken,
      start_parameter: startParameter,
      currency: currency,
      prices: prices
    };

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('sendInvoice', params, callback);
  }

  answerShippingQuery(shippingQueryId, ok) {
    let params = {
      shipping_query_id: shippingQueryId,
      ok: ok
    };

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('answerShippingQuery', params, callback);
  }

  answerPreCheckoutQuery(preCheckoutQueryId, ok, errorMessage) {
    let params = {
      pre_checkout_query_id: preCheckoutQueryId,
      ok: ok,
      error_message: errorMessage
    };

    return this._request('answerShippingQuery', params, callback);
  }

  // Games

  sendGame(chatId, gameShortName, optionalParams, callback) {
    let params = {
      chat_id: chatId,
      game_short_name: gameShortName
    };

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('sendGame', params, callback);
  }

  setGameScore(userId, score, optionalParams, callback) {
    let params = {
      user_id: userId,
      score: score
    }

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('setGameScore', params, callback);
  }

  getGameHighScores(userId, optionalParams, callback) {
    let params = {
      user_id: userId
    };

    if (typeof optionalParams == 'function') {
      callback = optionalParams;
    } else {
      Object.assign(params, optionalParams);
    }

    return this._request('getGameHighScores', params, callback);
  }
}

module.exports = Telegram;
