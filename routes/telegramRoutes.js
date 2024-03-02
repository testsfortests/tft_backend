import express from 'express';
import axios from 'axios';
const router = express.Router();
import { TESTING_CHAT_ID,POLL_URL,SEND_MSG_URL,BASE_URL } from '../config/env.js';

//done
router.post('/send-message', async (req, res) => {
    try {
        const { message } = req.body;
        if(!message){
          return res.status(500).json({status:false,message: "message is missing" });
        }
        const chatId = req.body && req.body.chatId ? req.body.chatId :  TESTING_CHAT_ID  ;        

        const messageParams = {
            chat_id: chatId, 
            text: message
        };
        const response = await axios.post(SEND_MSG_URL, messageParams);
        res.status(200).json({ success: true,message:'Message sent successfully', data: response.data });
    } catch (error) {
        res.status(500).json({ success: false,message:'Error sending message', error: error.message });
    }
});

//done
router.post('/send-poll', async(req, res) => {
    const { question,options,answer } = req.body;
        if(!question || !options || !answer){
          return res.status(500).json({status:false,message: "question or options or answer are missing" });
        }
    const explanation = req.body && req.body.explanation ? req.body.explanation : "VISIT TESTS FOR TESTS";        
    const chatId = req.body && req.body.chatId ? req.body.chatId :  TESTING_CHAT_ID  ;        

    const parameters = {
        "chat_id": chatId, // handle
        "question": question,
        "options": JSON.stringify(options), 
        "is_anonymous": true,
        "correct_option_id": answer-1,
        "explanation": explanation,
        "type": "quiz"
    };

    try {
        const response = await axios.post(POLL_URL, parameters, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        res.status(200).json({ success: true,message:"Poll sent successfully", data: response.data }); 
    } catch (error) {
        res.status(500).json({ success: false,message:"API POLL FAILED", error: error.message }); 
    }
    
});

export default router;
