// import TelegramBot from 'node-telegram-bot-api';
// import {SEND_MSG_URL} from "./constants.js"
// import axios from 'axios';

// export function initializeTelegramBot() {
//     const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

//     bot.on('message',async (msg) => {
//         const chatId = msg.chat.id; // admin addition #
//         const messageText = msg.text;

//         // console.log(`Received message from ${chatId}: ${messageText}`);
//         if (messageText === "msg") {
//         const messageParams = {
//             chat_id: process.env.TESTING_CHAT_ID, 
//             text: "This is a Testing Message from BOT"
//         };
//         const response = await axios.post(SEND_MSG_URL, messageParams);
//         }
//         bot.sendMessage(chatId, messageText)
//             .then(() => {
//                 console.log('Message sent successfully',messageText);
//             })
//             .catch(error => {
//                 console.error('Error sending message:', error.message);
//             });
//     });

//     return bot;
// }
