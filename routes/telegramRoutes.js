import express from 'express';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
const router = express.Router();
import FormData from 'form-data'
import {upload} from "../utils/multer.js"
import logger from '../utils/logger.js';

import dotenv from "dotenv" 
dotenv.config()

import {SEND_MSG_URL,POLL_URL, SEND_FILE_URL} from "../utils/constants.js"

router.post('/send-message', async (req, res) => {
    try {
        const { message } = req.body;
        if(!message){
          return res.status(500).json({status:false,message: "message is missing" });
        }
        const chatId = req.body && req.body.chatId ? req.body.chatId :  process.env.TESTING_CHAT_ID  ;        

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


router.post('/send-poll', async(req, res) => {
    let { question,options,answer } = req.body;
        if(!question || !options || !answer){
          return res.status(500).json({status:false,message: "question or options or answer are missing" });
        }
    const explanation = req.body && req.body.explanation ? req.body.explanation : "VISIT TESTS FOR TESTS";        
    const chatId = req.body && req.body.chatId ? req.body.chatId :  process.env.TESTING_CHAT_ID  ;        

    if (question.length >= 300){
        const response = await axios.post(`${process.env.BASE_URL}tele/send-message`,{message :question});
        question = "CHOOSE : "
    }

    const parameters = {
        "chat_id": process.env.TEST_MODE == "QA" ? process.env.TESTING_CHAT_ID : chatId, 
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

router.post('/send-file',upload.single('file'), async (req, res) => {
    try {
        // Check if a file path was provided in the request
        logger.info("TELE SEND-FILE ENDPOINT CALLED !")
        if (!req.file) {
            return res.status(400).send('No file was uploaded.');
        }
        const filePath = req.file.path;         
        const fileStream = fs.createReadStream(filePath);

        // Prepare the parameters for sending the file to Telegram
        const chatId = req.body.chatId || process.env.TESTING_CHAT_ID;
        const caption = req.body.caption || 'File from TFT_BOT';

        // Create a FormData object to construct the request body
        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('caption', caption);
        formData.append('document', fileStream, { filename: path.basename(filePath) }); // Adjust the filename and extension accordingly

        // Send a POST request to the Telegram Bot API endpoint
        const response = await axios.post(SEND_FILE_URL, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        fs.unlinkSync(filePath);
        // Check if the message was sent successfully
        if (response.status === 200 && response.data.ok) {
            return res.status(200).json({ success: true, message: 'File sent successfully.', data: response.data });
        } else {
            return res.status(500).json({ success: false, message: 'Failed to send file to Telegram.', error: response.data });
        }
    } catch (error) {
        logger.error('Error sending file to Telegram:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});


export default router;
