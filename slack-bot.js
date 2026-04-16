require('dotenv').config();
const {
    App,
    matchMessage
} = require('@slack/bolt')
const response = require('./json.json')


const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    // signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true
});


app.message(async ({
    message,
    say
}) => {
    console.log("Mensagem recebida:", message);

    if (!message.text) return;

    const text = message.text.toLowerCase();

    await say({
        text: "Recebi sua mensagem 👀",
        thread_ts: message.ts
    });
});

app.message(async ({
    message,
    say
}) => {
    if (!message.text) return;
    const text = message.text.toLowerCase();

    let found = false

    for (const key in response) {
        if (text.includes(key)) {

            await say({
                text: response[key],
                thread_ts: message.ts
            });

            found = true;
            break;
        }
    }

    if (!found) {
        await say({
            text: `<@${message.user}> não encontrei essa informação. @ItOps pode ajudar?`,
            thread_ts: message.ts
        });
    }
});

(async () => {
    await app.start(3000)
    console.log('Bot rodando!')
})();