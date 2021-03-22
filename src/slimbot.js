'use strict';

const EventEmitter = require('eventemitter3');
const Telegram = require('./telegram');

class Slimbot extends Telegram(EventEmitter) {
  constructor(token, proxy) {
    super(token, proxy);
    this._offset = undefined;
    this._timeout = undefined;
  }

  _processUpdates(updates) {
    updates.result.forEach(update => {
      this._offset = update.update_id + 1;
      let message = update.message;
      let editedMessage = update.edited_message;
      let channelPost = update.channel_post;
      let editedChannelPost = update.edited_channel_post;
      let inlineQuery = update.inline_query;
      let chosenInlineResult = update.chosen_inline_result;
      let callbackQuery = update.callback_query;
      let shippingQuery = update.shipping_query;
      let preCheckoutQuery = update.pre_checkout_query;
      let pollQuery = update.poll;
      let pollAnswerQuery = update.poll_answer;
      let myChatMember = update.my_chat_member;
      let chatMember = update.chat_member;

      if (message) {
        this.emit('message', message);
      } else if (editedMessage) {
        this.emit('edited_message', editedMessage);
      } else if (channelPost) {
        this.emit('channel_post', channelPost);
      } else if (editedChannelPost) {
        this.emit('edited_channel_post', editedChannelPost);
      } else if (callbackQuery) {
        this.emit('callback_query', callbackQuery);
      } else if (inlineQuery) {
        this.emit('inline_query', inlineQuery);
      } else if (chosenInlineResult) {
        this.emit('chosen_inline_result', chosenInlineResult);
      } else if (shippingQuery) {
        this.emit('shipping_query', shippingQuery);
      } else if (preCheckoutQuery) {
        this.emit('pre_checkout_query', preCheckoutQuery)
      } else if (pollQuery) {
        this.emit('poll', pollQuery)
      } else if (pollAnswerQuery) {
        this.emit('poll_answer', pollAnswerQuery)
      } else if (myChatMember) {
        this.emit('my_chat_member', myChatMember)
      } else if (chatMember) {
        this.emit('chat_member', chatMember)
      }
    });
  }

  startPolling(callback) {
    return super.getUpdates(this._offset)
    .then(updates => {
      if (updates !== undefined) {
        this._processUpdates(updates);
      }
      return null;
    })
    .catch(error => {
      if (callback) {
        callback(error);
      }
      else {
        throw error;
      }
    })
    .finally(() => {
      if (this._timeout && typeof this._timeout.refresh === 'function') {
        this._timeout.refresh();
      } else {
        this._timeout = setTimeout(() => this.startPolling(callback), 100);
      }
    });
  }

  stopPolling() {
    clearTimeout(this._timeout);
  }
}

module.exports = Slimbot;
