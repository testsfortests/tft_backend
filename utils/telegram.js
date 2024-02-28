import TelegramBot from 'node-telegram-bot-api';
import { BOT_TOKEN } from '../config/env.js';

export function initializeTelegramBot() {
    const bot = new TelegramBot(BOT_TOKEN, { polling: true });

    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const messageText = msg.text;

        // console.log(`Received message from ${chatId}: ${messageText}`);

        bot.sendMessage(chatId, messageText)
            .then(() => {
                console.log('Message sent successfully');
            })
            .catch(error => {
                console.error('Error sending message:', error.message);
            });
    });

    return bot;
}
