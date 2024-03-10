import gtts from "gtts";

// const num1 = ["first","second","third","fourth"]
const num2 = ["a","b","c","d"]

function createMusic(question, options, ans) {    
    let text1 = "The problem of the day is: " + question + "\n\nOptions are:\n";
    options.forEach((option, index) => {
        text1 += `${num2[index]}. ${option}\n`;
    });
    
    let text2 = `\nThe correct answer is : ${num2[ans-1]} that is ${options[ans-1]}`;
    
    // Create gTTS instance and save to MP3 file
    const tts1 = new gtts(text1, 'en'); // 'hi' for Hindi language
    tts1.save('./resource/music/music_que.mp3', function(err, result) {
        if (err) {
            console.error('Error converting text to speech:', err);
        } else {
            console.log('Speech saved to output.mp3');
        }
    });

    const tts2 = new gtts(text2, 'en'); // 'hi' for Hindi language
    tts2.save('./resource/music/music_ans.mp3', function(err, result) {
        if (err) {
            console.error('Error converting text to speech:', err);
        } else {
            console.log('Speech saved to output.mp3');
        }
    });

}

// Example
// const question = `Which of the following activities is part of India's GDP? 
// 1. Activities in Indian embassies and consulates in other countries 
// 2. Air India services between two different countries 
// 3. Economic activities of residents of India in international waters 
// 4. Purchase of movie tickets by foreigners in India 
// Select the correct answer using the 
// code given below: `;

// const options = [
//     "1 only  ",
//     "1, 2 & 3 only",
//     "3 & 4 only",
//     "All of the above"
// ];
// const answer = 3;


// createMusic(question,options,answer)