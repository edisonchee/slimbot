const Bluebird = require('bluebird');
const mockery = require('mockery');
let Telebot;
let telebot;

describe('Telebot', () => {

  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });

    mockery.registerMock('request-promise', options => {
      let response = {
        statusCode: 200,
        body: '{ result: test }',
        options: options
      }
      return Bluebird.resolve(response);
    });

    Telebot = require('../../src/telebot');
    telebot = new Telebot('token');
  });

  afterEach(() => {
    mockery.disable();
    mockery.deregisterAll();
  })

  describe('Core', () => {
    describe('instantiating', () => {
      it('should throw an error if token is not provided', () => {
        expect(() => { const bot = new Telebot(); }).toThrow();
      });
    });

    describe('_request', () => {
      it('should throw an error if no method provided', (done) => {
        expect(() => { telebot._request(); }).toThrow();
        expect(() => { telebot._request(['getMe']); }).toThrow();
        done();
      });

      it('should return a promise', (done) => {
        expect(typeof telebot._request('getUpdates').then === 'function').toEqual(true);
        done();
      });
    });

    describe('_processUpdates', () => {
      let updates;
      let result;
      let flag;
      let payload;
      beforeEach(() => {
        updates = {
          result: [
            { message: 'message' },
            { edited_message: 'edited_message' },
            { callback_query: 'callback_query' },
            { inline_query: 'inline_query' },
            { chosen_inline_result: 'chosen_inline_result' }
          ]
        };
      });

      it('should emit "message" if update is of type "message"', () => {
        telebot.on('message', (data) => {
          if (data !== undefined) {
            flag = true;
            payload = data;
          };
        });
        telebot._processUpdates(updates);
        expect(flag).toEqual(true);
        expect(payload).toEqual('message');
      });

      it('should emit "edited_message" if update is of type "edited_message"', () => {
        telebot.on('edited_message', (data) => {
          if (data !== undefined) {
            flag = true;
            payload = data;
          };
        });
        telebot._processUpdates(updates);
        expect(flag).toEqual(true);
        expect(payload).toEqual('edited_message');
      });

      it('should emit "callback_query" if update is of type "callback_query"', () => {
        telebot.on('callback_query', (data) => {
          if (data !== undefined) {
            flag = true;
            payload = data;
          };
        });
        telebot._processUpdates(updates);
        expect(flag).toEqual(true);
        expect(payload).toEqual('callback_query');
      });

      it('should emit "inline_query" if update is of type "inline_query"', () => {
        telebot.on('inline_query', (data) => {
          if (data !== undefined) {
            flag = true;
            payload = data;
          };
        });
        telebot._processUpdates(updates);
        expect(flag).toEqual(true);
        expect(payload).toEqual('inline_query');
      });

      it('should emit "chosen_inline_result" if update is of type "chosen_inline_result"', () => {
        telebot.on('chosen_inline_result', (data) => {
          if (data !== undefined) {
            flag = true;
            payload = data;
          };
        });
        telebot._processUpdates(updates);
        expect(flag).toEqual(true);
        expect(payload).toEqual('chosen_inline_result');
      });

    });
  });

  // Telegram Bot API methods

  describe('startPolling', () => {
    let currentOffset;
    beforeEach(() => {
      currentOffset = telebot._offset;
      telebot.startPolling();
    });

    it('should increase offset by 1', () => {
      expect(currentOffset < telebot._offset).toEqual(true);
    });

    it('should call telebot._request', () => {
      spyOn(telebot, '_request').and.returnValue(Bluebird.resolve());
      telebot.startPolling();
      expect(telebot._request).toHaveBeenCalled();
    });

    it('should call telebot._processUpdates', (done) => {
      spyOn(telebot, '_request').and.returnValue(Bluebird.resolve({}));
      spyOn(telebot, '_processUpdates');
      telebot.startPolling().then(() => {
        expect(telebot._processUpdates).toHaveBeenCalled();
        done();
      });
    });
  });
});