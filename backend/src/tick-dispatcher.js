#!/usr/bin/env node
const amqp = require('amqplib/callback_api');
const Bot = require('./models/bot');

amqp.connect('amqp://rabbitmq', function(err, conn) {
  conn.createChannel(function(err, ch) {
    const q = 'task_queue';

    ch.assertQueue(q, {durable: true});
    
    function tick() {
      const tickStart = Date.now()
      console.log('Tick ' + tickStart)
      Bot.find()
        .then(bots => bots.forEach((bot) => {
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
    setInterval(tick, 10000)
  });
});
