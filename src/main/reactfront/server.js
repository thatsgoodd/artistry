// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Dummy database
let posts = [
  { id: 1, likes: 0, bookmarks: 0 },
  { id: 2, likes: 0, bookmarks: 0 },
];
// 기본 경로에 대한 응답
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Get post details
app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send('Post not found');
  res.json(post);
});

// Update post likes and bookmarks
app.post('/posts/:id/update', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send('Post not found');

  post.likes = req.body.likes || post.likes;
  post.bookmarks = req.body.bookmarks || post.bookmarks;

  res.json(post);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
