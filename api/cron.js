// import axios from 'axios';
// import { BASE_URL } from '../config/env.js';

// console.log("called1")
// // export default async function handler(req, res) {
// //     console.log("called2")
// //     try {
// //         console.log("called3")

// //         const infoResponse = await axios.post(`${BASE_URL}api/send-poll`,{data : {subject :"ENGLISH", sheet :"SHEET2"}});
// //         console.log("called4")

// //         console.log(infoResponse)
// //         console.log("called5")

// //         res.status(200).json({ success: true,message:"Cron Job Successfull"});
// //         console.log("called6")

// //     } catch (error) {
// //         console.log("called7")

// //         res.status(500).json({ success: false,message: 'Cron Job Failed', error: error }); 
// //     }
// //   }


// export default async function handler(req, res) {
//     const subject = "ENGLISH";
//     const sheet = "SHEET2";
//     const qiResponse = await axios.get(`${BASE_URL}mongo/QI`,{data : { subject, sheet }});

//     if (!qiResponse.data.success) {
//         return res.status(500).json({ success: false, message: "Failed Cron Job " });
//     }
//     res.status(200).json({ success: true,message:"Cron Job successful" });

// }


export default async function handler(request, response) {
    const result = await fetch(
      'http://worldtimeapi.org/api/timezone/America/Chicago',
    );
    const data = await result.json();
   
    return response.json({ datetime: data.datetime });
  }