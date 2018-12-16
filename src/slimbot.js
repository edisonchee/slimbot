'use strict';

const EventEmitter = require('eventemitter3');
const Telegram = require('./telegram');

class Slimbot extends Telegram(EventEmitter) {
  constructor(token, proxy) {
    super(token, proxy);
    this._offset = undefined;
  }

  _processUpdates(updates) {
    updates.result.forEach(update => {
      this._offset = update.update_id + 1;
      let message = update.message;
      let editedMessage = update.edited_message;
      let channelPost = update.channel_post;
      let editedChannelPost = update.edited_channel_post;
      let callbackQuery = update.callback_query;
      let inlineQuery = update.inline_query;
      let chosenInlineResult = update.chosen_inline_result;
      let shippingQuery = update.shipping_query;
      let preCheckoutQuery = update.pre_checkout_query;

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
      setTimeout(() => this.startPolling(callback), 100);
    });
  }
}

module.exports = Slimbot;
