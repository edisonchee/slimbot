const Telebot = require('../src/telebot');
const telebot = new Telebot(process.env['TELEGRAM_TOKEN_2']);

// Register listeners

telebot.on('message', (message) => {
  telebot.sendMessage(message.chat.id, 'Message received');
  console.log(message);
});

telebot.on('callback_query', (callbackQuery) => {
  let text = '';
  let params = {};
  if (callbackQuery.data === 'pick_today') {
    text = 'Now booking Queen Room 1\n\nDate: <date>';
    params = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: '8:00am - 9:00am', callback_data: 'pick_time' }],
          [{ text: '9:00am - 10:00am', callback_data: 'pick_time' }],
          [{ text: '10:00am - 11:00am', callback_data: 'pick_time' }],
          [{ text: '11:00am - 12:00pm', callback_data: 'pick_time' }],
          [{ text: '12:00pm - 1:00pm', callback_data: 'pick_time' }],
          [{ text: '1:00pm - 2:00pm', callback_data: 'pick_time' }],
          [{ text: '2:00pm - 3:00pm', callback_data: 'pick_time' }],
          [{ text: '3:00pm - 4:00pm', callback_data: 'pick_time' }],
          [{ text: '4:00pm - 5:00pm', callback_data: 'pick_time' }],
          [{ text: '5:00pm - 6:00pm', callback_data: 'pick_time' }],
        ]
      })
    };
  } else if (callbackQuery.data === 'pick_date') {
    text = 'Now booking Queen Room 1\n\nPlease choose a date';
    params = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: '1', callback_data: 'pick_date_calendar' },
          { text: '2', callback_data: 'pick_date_calendar' },
          { text: '3', callback_data: 'pick_date_calendar' },
          { text: '4', callback_data: 'pick_date_calendar' },
          { text: '5', callback_data: 'pick_date_calendar' }],
          [{ text: '6', callback_data: 'pick_date_calendar' },
          { text: '7', callback_data: 'pick_date_calendar' },
          { text: '8', callback_data: 'pick_date_calendar' },
          { text: '9', callback_data: 'pick_date_calendar' },
          { text: '10', callback_data: 'pick_date_calendar' }],
          [{ text: '11', callback_data: 'pick_date_calendar' },
          { text: '12', callback_data: 'pick_date_calendar' },
          { text: '13', callback_data: 'pick_date_calendar' },
          { text: '14', callback_data: 'pick_date_calendar' },
          { text: '15', callback_data: 'pick_date_calendar' }],
          [{ text: '16', callback_data: 'pick_date_calendar' },
          { text: '17', callback_data: 'pick_date_calendar' },
          { text: '18', callback_data: 'pick_date_calendar' },
          { text: '19', callback_data: 'pick_date_calendar' },
          { text: '20', callback_data: 'pick_date_calendar' }],
          [{ text: '21', callback_data: 'pick_date_calendar' },
          { text: '22', callback_data: 'pick_date_calendar' },
          { text: '23', callback_data: 'pick_date_calendar' },
          { text: '24', callback_data: 'pick_date_calendar' },
          { text: '25', callback_data: 'pick_date_calendar' }],
          [{ text: '26', callback_data: 'pick_date_calendar' },
          { text: '27', callback_data: 'pick_date_calendar' },
          { text: '28', callback_data: 'pick_date_calendar' },
          { text: '29', callback_data: 'pick_date_calendar' },
          { text: '30', callback_data: 'pick_date_calendar' }],
          [{ text: 'Previous Month', callback_data: 'previous_month' },
          { text: 'Next Month', callback_data: 'next_month' }]
        ]
      })
    };
  } else if (callbackQuery.data === 'pick_time') {
    text = 'Now booking Queen Room 1\n\nDetails\nDate: <date>\nTime: <timeslot>';
    params = {
      reply_markup: JSON.stringify({
        inline_keyboard: [[
          { text: 'Cancel', callback_data: 'cancel_booking' },
          { text: 'Confirm', callback_data: 'confirm_booking' }
        ]]
      })
    };
  };
  telebot.editMessageText(undefined, undefined, callbackQuery.inline_message_id, text, params);
  console.log(callbackQuery);
});

telebot.on('inline_query', (inlineQuery) => {
  let results = [{
    'type': 'article',
    'id': 'queen_room_1',
    'title': 'Queen Room 1',
    'input_message_content': {
      'message_text': 'Now booking Queen Room 1',
      'disable_web_page_preview': true
    },
    reply_markup: {
      inline_keyboard: [[
        { text: 'Today', callback_data: 'pick_today' },
        { text: 'Pick a date', callback_data: 'pick_date' }
      ]]
    }
  },
  {
    'type': 'article',
    'id': 'queen_room_2',
    'title': 'Queen Room 2',
    'input_message_content': {
      'message_text': 'Now booking Queen Room 2',
      'disable_web_page_preview': true
    },
    reply_markup: {
      inline_keyboard: [[
        { text: 'Today', callback_data: 'pick_today' },
        { text: 'Pick a date', callback_data: 'pick_date' }
      ]]
    }
  },
  {
    'type': 'article',
    'id': 'queen_room_combined',
    'title': 'Queen Room Combined',
    'input_message_content': {
      'message_text': 'Now booking Queen Room Combined',
      'disable_web_page_preview': true
    },
    reply_markup: {
      inline_keyboard: [[
        { text: 'Today', callback_data: 'pick_today' },
        { text: 'Pick a date', callback_data: 'pick_date' }
      ]]
    }
  },
  {
    'type': 'article',
    'id': 'drone_room',
    'title': 'Drone Room',
    'input_message_content': {
      'message_text': 'Now booking Drone Room',
      'disable_web_page_preview': true
    },
    reply_markup: {
      inline_keyboard: [[
        { text: 'Today', callback_data: 'pick_today' },
        { text: 'Pick a date', callback_data: 'pick_date' }
      ]]
    }
  },
  {
    'type': 'article',
    'id': 'fgd_room',
    'title': 'Focus Group Discussion Room',
    'input_message_content': {
      'message_text': 'Now booking Focus Group Discussion Room',
      'disable_web_page_preview': true
    },
    reply_markup: {
      inline_keyboard: [[
        { text: 'Today', callback_data: 'pick_today' },
        { text: 'Pick a date', callback_data: 'pick_date' }
      ]]
    }
  }]
  telebot.answerInlineQuery(inlineQuery.id, JSON.stringify(results), { cache_time: 5 });
  console.log(inlineQuery);
});

telebot.on('chosen_inline_result', (chosenInlineResult) => {
  console.log(chosenInlineResult);
});

// Call API

telebot.getUpdates();