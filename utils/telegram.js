import TelegramBot from 'node-telegram-bot-api';

export function initializeTelegramBot() {
    const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

    bot.on('message', (msg) => {
        const chatId = msg.chat.id; // admin addition #
        const messageText = msg.text;

        // // console.log(`Received message from ${chatId}: ${messageText}`);
        // if (messageText === "send-message") {
        //     // Call the API endpoint to send a message
        //     console.log(SEND_MSG_URL)
        //     axios.post(SEND_MSG_URL)
        //         .then(response => {
        //             console.log('Message sent successfully:', response.data);
        //             bot.sendMessage(chatId, 'Message sent successfully');
        //         })
        //         .catch(error => {
        //             console.error('Error sending message:', error);
        //             bot.sendMessage(chatId, 'Error sending message');
        //         });
        // }

        bot.sendMessage(chatId, messageText)
            .then(() => {
                console.log('Message sent successfully',messageText);
            })
            .catch(error => {
                console.error('Error sending message:', error.message);
            });
    });

    return bot;
}
