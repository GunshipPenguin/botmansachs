const amqp = require('amqplib/callback_api');
const childProcess = require('child_process');
const fs = require('fs');

function tryConnect() {
    amqp.connect('amqp://rabbitmq', function(err, conn) {
        if (err) {
            console.error(err)
            setTimeout(tryConnect, 1000)
            return
        }
        conn.createChannel(function(err, ch) {
            if (err) {
                console.error(err)
                setTimeout(tryConnect, 1000)
                return
            }
            const q = 'task_queue';

            ch.assertQueue(q, {durable: true});
            ch.prefetch(1);
            console.log("Runner initialized", q);
            ch.consume(q, function(msg) {
                const bot = JSON.parse(msg.content.toString());
                console.log("Received bot", bot.name);

                fs.writeFile(__dirname + '/source.py', bot.source, function(err) {
                    if (err) {
                        console.error(err)
                        return
                    }

                    const python = childProcess.exec('python3 ./source.py', (error, stdout, stderr) => {
                        clearTimeout(timeout);
                        console.log(error, stdout, stderr);
                        fs.unlink('./source.py', finish)
                    })

                    const timeout = setTimeout(function() {
                        python.kill()
                        fs.unlink('./source.py', finish)
                    }, 7500)

                    function finish() {
                        // ch.ack(msg);
                    }
                })

            }, {noAck: true});
        });
    });
}

tryConnect()