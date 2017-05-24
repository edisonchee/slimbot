const Bluebird = require('bluebird');
const mockery = require('mockery');
let Slimbot;
let slimbot;

describe('Slimbot', () => {

  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });

    mockery.registerMock('request-promise', options => {
      let response = {
        statusCode: 200,
        body: '{ "result": ["test"] }',
        options: options
      };
      return Bluebird.resolve(response);
    });

    Slimbot = require('../../src/slimbot');
    slimbot = new Slimbot('token');
  });

  afterEach(() => {
    mockery.disable();
    mockery.deregisterAll();
  })

  describe('Core', () => {
    describe('instantiating', () => {
      it('should throw an error if token is not provided', () => {
        expect(() => { const bot = new Slimbot(); }).toThrow();
      });
    });

    describe('_request', () => {
      it('should throw an error if no method provided', done => {
        expect(() => { slimbot._request(); }).toThrow();
        expect(() => { slimbot._request(['getMe']); }).toThrow();
        done();
      });

      it('should return a promise', done => {
        expect(typeof slimbot._request('getUpdates').then === 'function').toEqual(true);
        done();
      });
    });

    describe('_processUpdates', () => {
      let updates;
      let flag;
      let payload;
      beforeEach(() => {
        updates = {
          result: [
            { message: 'message' },
            { edited_message: 'edited_message' },
            { channel_post: 'channel_post' },
            { edited_channel_post: 'edited_channel_post' },
            { callback_query: 'callback_query' },
            { inline_query: 'inline_query' },
            { chosen_inline_result: 'chosen_inline_result' },
            { shipping_query: 'shipping_query' },
            { pre_checkout_query: 'pre_checkout_query' }
          ]
        };
      });

      it('should emit "message" if update is of type "message"', () => {
        slimbot.on('message', data => {
          if (data !== undefined) {
            flag = true;
            payload = data;
          };
        });
        slimbot._processUpdates(updates);
        expect(flag).toEqual(true);
        expect(payload).toEqual('message');
      });

      it('should emit "edited_message" if update is of type "edited_message"', () => {
        slimbot.on('edited_message', data => {
          if (data !== undefined) {
            flag = true;
            payload = data;
          };
        });
        slimbot._processUpdates(updates);
        expect(flag).toEqual(true);
        expect(payload).toEqual('edited_message');
      });

      it('should emit "channel_post" if update is of type "channel_post"', () => {
        slimbot.on('channel_post', data => {
          if (data !== undefined) {
            flag = true;
            payload = data;
          };
        });
        slimbot._processUpdates(updates);
        expect(flag).toEqual(true);
        expect(payload).toEqual('channel_post');
      });

      it('should emit "edited_channel_post" if update is of type "edited_channel_post"', () => {
        slimbot.on('edited_channel_post', data => {
          if (data !== undefined) {
            flag = true;
            payload = data;
          };
        });
        slimbot._processUpdates(updates);
        expect(flag).toEqual(true);
        expect(payload).toEqual('edited_channel_post');
      });

      it('should emit "callback_query" if update is of type "callback_query"', () => {
        slimbot.on('callback_query', data => {
          if (data !== undefined) {
            flag = true;
            payload = data;
          };
        });
        slimbot._processUpdates(updates);
        expect(flag).toEqual(true);
        expect(payload).toEqual('callback_query');
      });

      it('should emit "inline_query" if update is of type "inline_query"', () => {
        slimbot.on('inline_query', data => {
          if (data !== undefined) {
            flag = true;
            payload = data;
          };
        });
        slimbot._processUpdates(updates);
        expect(flag).toEqual(true);
        expect(payload).toEqual('inline_query');
      });

      it('should emit "chosen_inline_result" if update is of type "chosen_inline_result"', () => {
        slimbot.on('chosen_inline_result', data => {
          if (data !== undefined) {
            flag = true;
            payload = data;
          };
        });
        slimbot._processUpdates(updates);
        expect(flag).toEqual(true);
        expect(payload).toEqual('chosen_inline_result');
      });

      it('should emit "shipping_query" if update is of type "shipping_query"', () => {
        slimbot.on('shipping_query', data => {
          if (data !== undefined) {
            flag = true;
            payload = data;
          };
        });
        slimbot._processUpdates(updates);
        expect(flag).toEqual(true);
        expect(payload).toEqual('shipping_query');
      });

      it('should emit "pre_checkout_query" if update is of type "pre_checkout_query"', () => {
        slimbot.on('pre_checkout_query', data => {
          if (data !== undefined) {
            flag = true;
            payload = data;
          };
        });
        slimbot._processUpdates(updates);
        expect(flag).toEqual(true);
        expect(payload).toEqual('pre_checkout_query');
      });

    });
  });

  // Slimbot API methods

  describe('startPolling', () => {
    it('should increase offset by 1', () => {
      slimbot.startPolling();
      expect(0 < slimbot._offset).toEqual(true);
    });

    it('should call slimbot._request', () => {
      spyOn(slimbot, '_request').and.returnValue(Bluebird.resolve());
      slimbot.startPolling();
      expect(slimbot._request).toHaveBeenCalled();
    });

    it('should call slimbot._processUpdates', done => {
      spyOn(slimbot, '_request').and.returnValue(Bluebird.resolve({}));
      spyOn(slimbot, '_processUpdates');
      slimbot.startPolling().then(() => {
        expect(slimbot._processUpdates).toHaveBeenCalled();
        done();
      });
    });
  });
});