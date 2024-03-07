import fs from 'fs';
import https from 'https';
import FormData from 'form-data';

// Define your authentication credentials
const ACCESS_TOKEN = '1083255189662-9gsvl1s9s0nfme2phiomq9k8vovs6c5c.apps.googleusercontent.com'; // You can obtain this through OAuth 2.0 or another authentication method

// Define the video parameters
const videoParams = {
    title: 'My Video Title',
    description: 'My Video Description',
    tags: ['tag1', 'tag2'],
    privacyStatus: 'private', // 'private', 'public', 'unlisted'
    videoPath: 'path_to_your_video_file.mp4'
};

// Function to upload the video to YouTube
function uploadVideoToYouTube(videoParams, accessToken) {
    const form = new FormData();
    form.append('data', fs.createReadStream(videoParams.videoPath));
    form.append('snippet', JSON.stringify({
        title: videoParams.title,
        description: videoParams.description,
        tags: videoParams.tags,
        privacyStatus: videoParams.privacyStatus
    }));

    const options = {
        hostname: 'www.googleapis.com',
        path: '/upload/youtube/v3/videos?part=snippet',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/related; boundary=' + form.getBoundary(),
            'Content-Length': form.getLengthSync()
        }
    };

    const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log('Video uploaded successfully:', data);
        });
    });

    form.pipe(req);

    req.on('error', (e) => {
        console.error('Error uploading video:', e);
    });

    req.end();
}

// Call the function to upload the video
uploadVideoToYouTube(videoParams, ACCESS_TOKEN);
