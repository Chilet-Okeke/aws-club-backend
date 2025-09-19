const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors({
  origin: 'https://aws-uniuyo-bucket01.s3.us-east-1.amazonaws.com/'
}));

app.use(express.json());

// Track toggle state
let toggle = true;

// Simple API route - disable caching
app.get('/api/message', (req, res) => {
  console.log('API called!'); // Debug log

  // Disable caching headers
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });

  // Alternate messages
  const message = toggle
    ? "Hello from the backend API!"
    : "I'm still here, Thanks for clicking again!";

  toggle = !toggle; // flip state for next call

  res.json({ message });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
  console.log(`Test endpoint: http://localhost:${port}/api/message`);
});
