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
    return this._request('getMe');
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

    return this._request('answerCallbackQuery', params)
  }

  editMessageText(chatId, messageId, text, optionalParams) {
    let params = {
      chat_id: chatId,
      message_id: messageId,
      text: text
    }

    Object.assign(params, optionalParams);

    return this._request('editMessageText', params);
  }

  editInlineMessageText(inlineMessageId, text, optionalParams) {
    let params = {
      inline_message_id: inlineMessageId,
      text: text
    }

    Object.assign(params, optionalParams);

    return this._request('editMessageText', params);
  }

  editMessageCaption(chatId, messageId, caption, optionalParams) {
    let params = {
      chat_id: chatId,
      message_id: messageId,
      caption: caption
    }

    Object.assign(params, optionalParams);

    return this._request('editMessageCaption', params);
  }

  editInlineMessageCaption(inlineMessagId, caption, optionalParams) {
    let params = {
      inline_message_id: inlineMessageId,
      caption: caption
    }

    Object.assign(params, optionalParams);

    return this._request('editMessageCaption', params);
  }

  editMessageReplyMarkup(chatId, messageId, replyMarkup) {
    let params = {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: replyMarkup
    }

    return this._request('editMessageReplyMarkup', params);
  }

  editInlineMessageReplyMarkup(inlineMessageId, replyMarkup) {
    let params = {
      inline_message_id: inlineMessageId,
      reply_markup: replyMarkup
    }

    return this._request('editMessageReplyMarkup', params);
  }

  answerInlineQuery(inlineQueryId, results, optionalParams) {
    let params = {
      inline_query_id: inlineQueryId,
      results: results
    }

    Object.assign(params, optionalParams);

    return this._request('answerInlineQuery', params);
  }

  forwardMessage(chatId, fromChatId, messageId, optionalParams) {
    let params = {
      chat_id: chatId,
      from_chat_id: fromChatId,
      message_id: messageId
    }

    Object.assign(params, optionalParams);

    return this._request('forwardMessage', params);
  }

  sendPhoto(chatId, photo, optionalParams) {
    let params = {
      chat_id: chatId,
      photo: photo
    }

    let formData = {
      photo: photo
    }

    Object.assign(params, optionalParams);

    return this._request('sendPhoto', params, formData);
  }

  sendAudio(chatId, audio, optionalParams) {
    let params = {
      chat_id: chatId,
      audio: audio
    }

    let formData = {
      audio: audio
    }

    // write test for file size limit

    Object.assign(params, optionalParams);

    return this._request('sendAudio', params, formData);
  }

  sendDocument(chatId, document, optionalParams) {
    let params = {
      chat_id: chatId,
      document: document
    }

    let formData = {
      document: document
    }

    // write test for file size limit

    Object.assign(params, optionalParams);

    return this._request('sendDocument', params, formData);
  }

  sendSticker(chatId, sticker, optionalParams) {
    let params = {
      chat_id: chatId,
      sticker: sticker
    }

    let formData = {
      sticker: sticker
    }

    Object.assign(params, optionalParams);

    return this._request('sendSticker', params, formData);
  }

  sendVideo(chatId, video, optionalParams) {
    let params = {
      chat_id: chatId,
      video: video
    }

    let formData = {
      video: video
    }

    // write test for file size limit
    // write test for file size type (only .mp4)

    Object.assign(params, optionalParams);

    return this._request('sendVideo', params);
  }

  sendVoice(chatId, voice, optionalParams) {
    let params = {
      chat_id: chatId,
      voice: voice
    }

    let formData = {
      voice: voice
    }

    // write test for file size limit
    // write test for file size type (only .ogg encoded in OPUS)

    Object.assign(params, optionalParams);

    return this._request('sendVoice', params);
  }

  sendLocation(chatId, lat, lon, optionalParams) {
    let params = {
      chat_id: chatId,
      latitude: lat,
      longitude: lon
    }

    Object.assign(params, optionalParams);

    return this._request('sendLocation', params);
  }

  sendVenue(chatId, lat, lon, title, address, optionalParams) {
    let params = {
      chat_id: chatId,
      latitude: lat,
      longitude: lon,
      title: title,
      address: address
    }

    Object.assign(params, optionalParams);

    return this._request('sendVenue', params);
  }

  sendContact(chatId, phoneNumber, firstName, optionalParams) {
    let params = {
      chat_id: chatId,
      phone_number: phoneNumber,
      first_name: firstName
    }

    Object.assign(params, optionalParams);

    return this._request('sendContact', params);
  }

  sendChatAction(chatId, action) {
    if (typeof action !== 'string') {
      throw new Error('sendChatAction method needs a string input');
    }

    let params = {
      chat_id: chatId,
      action: action
    }

    return this._request('sendChatAction', params);
  }

  getUserProfilePhotos(userId, optionalParams) {
    let params = {
      user_id: userId,
    }

    Object.assign(params, optionalParams);

    return this._request('getUserProfilePhotos', params);
  }

  getFile(fileId) {
    let params = {
      file_id: fileId
    }

    return this._request('getFile', params);
  }

  kickChatMember(chatId, userId) {
    let params = {
      chat_id: chatId,
      user_id: userId
    }

    return this._request('kickChatMember', params);
  }

  leaveChat(chatId) {
    let params = {
      chat_id: chatId
    }

    return this._request('leaveChat', params);
  }

  unbanChatMember(chatId, userId) {
    let params = {
      chat_id: chatId,
      user_id: userId
    }

    return this._request('unbanChatMember', params);
  }

  getChat(chatId) {
    let params = {
      chat_id: chatId
    }

    return this._request('getChat', params);
  }

  getChatAdministrators(chatId) {
    let params = {
      chat_id: chatId
    }

    return this._request('getChatAdministrators', params);
  }

  getChatMembersCount(chatId) {
    let params = {
      chat_id: chatId
    }

    return this._request('getChatMembersCount', params);
  }

  getChatMember(chatId, userId) {
    let params = {
      chat_id: chatId,
      user_id: userId
    }

    return this._request('getChatMember', params);
  }

  // Games

  sendGame(chatId, gameShortName, optionalParams) {
    let params = {
      chat_id: chatId,
      game_short_name: gameShortName
    }

    Object.assign(params, optionalParams);

    return this._request('sendGame', params);
  }

  setGameScore(userId, score, optionalParams) {
    let params = {
      user_id: userId,
      score: score
    }

    Object.assign(params, optionalParams);

    return this._request('setGameScore', params);
  }

  getGameHighScores(userId, optionalParams) {
    let params = {
      user_id: userId
    }

    Object.assign(params, optionalParams);

    return this._request('getGameHighScores', params);
  }
}

module.exports = Telegram;