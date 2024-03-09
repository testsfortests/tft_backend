import express from 'express';
import axios from 'axios';
const router = express.Router();
import dotenv from "dotenv" 
dotenv.config()

import {SEND_MSG_URL} from "../utils/constants.js"

router.get('/cron', async (req, res) => {
    console.log("TEST CRON CALLED...")
    try {
        const message = req.body && req.body.message ? req.body.message :  "This is a testing message !"  ;        
        const chatId = req.body && req.body.chatId ? req.body.chatId :  process.env.TESTING_CHAT_ID  ;        

        const messageParams = {
            chat_id: chatId, 
            text: message
        };
        console.log("test",SEND_MSG_URL,chatId)
        const response = await axios.post(SEND_MSG_URL, messageParams);
        res.status(200).json({ success: true,message:'Message sent successfully', data: response.data });
    } catch (error) {
        res.status(500).json({ success: false,message:'Error sending message', error: error.message });
    }
});


export default router;