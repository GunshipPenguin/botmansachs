#!/usr/bin/env node
const amqp = require('amqplib/callback_api');
const Bot = require('./models/bot');

const tickInterval = 10 * 1000
const historyInterval = 60 * 1000
let nextHistoryTick = Date.now()
amqp.connect('amqp://rabbitmq', function(err, conn) {
  conn.createChannel(function(err, ch) {
    const q = 'task_queue';

    ch.assertQueue(q, {durable: true});
    
    function tick() {
      const tickStart = Date.now()
      const shouldUpdateHistory = nextHistoryTick <= Date.now()
      if (shouldUpdateHistory) {
        nextHistoryTick = Date.now + historyInterval
      }
      console.log('Tick ' + tickStart)
      Bot.find()
        .then(bots => bots.forEach((bot) => {
          if (shouldUpdateHistory) {
            const holdings = Math.round(bot.cash + bot.stocks
              .reduce((result, stock) => result + stock.quantity * stock.price, 0))
            bot.updateHistory(tickStart, holdings)
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
    setInterval(tick, tickInterval)
  });
});
