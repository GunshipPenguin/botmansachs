#!/usr/bin/env node
const amqp = require('amqplib/callback_api');
const Bot = require('./models/bot');

const thinkTickInterval = 10 * 1000
const historyTickInterval = 60 * 1000
let nextHistoryTick = Date.now()
amqp.connect('amqp://rabbitmq', function(err, conn) {
  conn.createChannel(function(err, ch) {
    const q = 'task_queue';

    ch.assertQueue(q, {durable: true});
    
    function tick() {
      const tickStart = Date.now()
      console.log('Think Tick')
      const shouldUpdateHistory = nextHistoryTick <= Date.now()
      if (shouldUpdateHistory) {
        console.log('History Tick')
        nextHistoryTick = Date.now + historyTickInterval
      }
      Bot.find()
        .then(bots => bots.forEach((bot) => {
          if (shouldUpdateHistory) {
            const holdings = Math.round(bot.cash + bot.stocks
              .reduce((result, stock) => result + stock.quantity * stock.price, 0))
            bot.addHistory(tickStart, holdings)
          }
          console.log('Enqueue ' + bot.name + ' script')
          ch.sendToQueue(
            q,
            Buffer.from(JSON.stringify({
              name: bot.name,
              source: bot.source,
              tickStart,
            })),
            { persistent: true }
          )
        }))
        .catch(console.error)
    }

    console.log('Tick dispatcher started')
    setInterval(tick, thinkTickInterval)
  });
});
