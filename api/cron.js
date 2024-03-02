import axios from 'axios';
import { BASE_URL } from '../config/env.js';

export default async function handler(req, res) {
    try {
        const infoResponse = await axios.post(`${BASE_URL}api/send-poll`, {subject :"ENGLISH", sheet :"SHEET2"});
        console.log(infoResponse)
        res.status(200).json({ success: true,message:"Cron Job Successfull"});
    } catch (error) {
        res.status(500).json({ success: false,message: 'Cron Job Failed', error: error }); 
    }
  }


