require('dotenv').config();
const express = require('express');
const { handleCallWebhook, processSpeech } = require('./aiAgent');
const localtunnel = require('localtunnel');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ✅ Twilio Webhook — when call starts
app.post('/voice', handleCallWebhook);

// ✅ Twilio callback — after speech transcription
app.post('/process-speech', processSpeech);

// ✅ Optional: Test route
app.get('/', (req, res) => res.send('Voice AI Agent is live ✅'));

const PORT = 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  const tunnel = await localtunnel({ port: PORT, subdomain: 'ammar-voice' });
  console.log(`🌍 Public URL: ${tunnel.url}`);
});
