const amqp = require('amqplib/callback_api');

function tryConnect() {
    amqp.connect('amqp://rabbitmq', function(err, conn) {
        if (err) {
            console.error(err)
            setTimeout(tryConnect, 1000)
            return
        }
        conn.createChannel(function(err, ch) {
            const q = 'task_queue';

            ch.assertQueue(q, {durable: true});
            ch.prefetch(1);
            console.log("Runner initialized", q);
            ch.consume(q, function(msg) {
            const bot = JSON.parse(msg.content.toString());

            console.log("Received bot", bot);
            ch.ack(msg);
            }, {noAck: false});
        });
    });
}

tryConnect()