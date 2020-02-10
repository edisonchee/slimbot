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
            { update_id: 1000, message: 'message' },
            { update_id: 1001, edited_message: 'edited_message' },
            { update_id: 1002, channel_post: 'channel_post' },
            { update_id: 1003, edited_channel_post: 'edited_channel_post' },
            { update_id: 1004, callback_query: 'callback_query' },
            { update_id: 1005, inline_query: 'inline_query' },
            { update_id: 1006, chosen_inline_result: 'chosen_inline_result' },
            { update_id: 1007, shipping_query: 'shipping_query' },
            { update_id: 1008, pre_checkout_query: 'pre_checkout_query' },
            { update_id: 1009, poll: 'poll' },
            { update_id: 1010, poll_answer: 'poll_answer' }
          ]
        };
      });

      it('should take the id of last update increased by 1 as offset', () => {
        slimbot._processUpdates(updates);
        expect(slimbot._offset).toEqual(1011);
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

      it('should emit "poll" if update is of type "poll"', () => {
        slimbot.on('poll', data => {
          if (data !== undefined) {
            flag = true;
            payload = data;
          };
        });
        slimbot._processUpdates(updates);
        expect(flag).toEqual(true);
        expect(payload).toEqual('poll');
      });

      it('should emit "poll_answer" if update is of type "poll_answer"', () => {
        slimbot.on('poll_answer', data => {
          if (data !== undefined) {
            flag = true;
            payload = data;
          };
        });
        slimbot._processUpdates(updates);
        expect(flag).toEqual(true);
        expect(payload).toEqual('poll_answer');
      });

    });
  });

  // Slimbot API methods

  describe('startPolling', () => {
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

    it('should store timeout object', done => {
      spyOn(slimbot, '_request').and.returnValue(Bluebird.resolve({}));
      spyOn(slimbot, '_processUpdates');
      slimbot.startPolling().then(() => {
        expect(slimbot._processUpdates).toHaveBeenCalled();
        expect(slimbot._timeout).not.toBe(undefined);
        expect(typeof slimbot._timeout.refresh).toBe('function');
        done();
      });
    });
  });

  describe('stopPolling', () => {
    it('should call slimbot.stopPolling', () => {
      spyOn(slimbot, 'stopPolling');
      slimbot.stopPolling();
      expect(slimbot.stopPolling).toHaveBeenCalled();
      expect(slimbot._timeout).toBe(undefined);
    });
  });
});