import fs from 'fs';
import axios from 'axios';

async function textToSpeech(text, language = 'hi') {
    try {
        // Make a GET request to the gTTS API
        const response = await axios.get('https://translate.google.com/translate_tts', {
            params: {
                ie: 'UTF-8',
                q: text,
                tl: language,
                total: '1',
                idx: '0',
                textlen: text.length,
                client: 'tw-ob',
                prev: 'input',
                ttsspeed: '0.9' // Adjust speed if needed (0.24 is slowest)
            },
            responseType: 'arraybuffer' // Receive response as binary data
        });

        // Write the response data (MP3 audio) to a file
        fs.writeFileSync('./resource/music_ans.mp3', response.data);

        console.log('Text converted to speech and saved as music.mp3');
    } catch (error) {
        console.error('Error converting text to speech:', error.message);
    }
}


// Example usage:
const question = `Which of the following activities is part of India's GDP? 
1. Activities in Indian embassies and consulates in other countries 
2. Air India services between two different countries 
3. Economic activities of residents of India in international waters 
4. Purchase of movie tickets by foreigners in India 
Select the correct answer using the 
code given below: `;

const options = [
    "1 only  ",
    "1, 2 & 3 only",
    "3 & 4 only",
    "All of the above"
];
const answer = 3;
// Concatenate the question and options
let text = "The problem of the day is: " + question + "\n\nOptions are:\n";
options.forEach((option, index) => {
    text += `${index + 1}. ${option}\n`;
});

// Add the answer
text += `The answer is: ${options[answer - 1]}`;

console.log(text);
// Example usage:
// const text = "यह एक सैंपल पाठ है so plz come fast आएगा या नहीं बता दे भाई";
textToSpeech(text);
