const express = require('express');
const cors = require('cors');
const { YoutubeTranscript } = require('youtube-transcript');

const app = express();
app.use(cors()); // Isse tera frontend backend se connect ho payega
app.use(express.json());

// API link jo data nikal kar degi
app.get('/fetch', async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) return res.status(400).json({ error: "URL missing" });

    try {
        const transcriptList = await YoutubeTranscript.fetchTranscript(videoUrl);
        // Data ko clean karke AI training ke liye paragraph format mein set kar rahe hain
        let cleanText = transcriptList.map(item => item.text).join(' ');
        res.json({ text: cleanText });
    } catch (error) {
        res.status(500).json({ error: "Transcript fetch fail ho gaya." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Engine live on port ${PORT}`));
           
