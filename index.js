const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./UserSchema');

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect('mongodb+srv://testing:root@testing.hj77rpl.mongodb.net/easyhaionline?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('mongodb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

// Create user API endpoint
app.post('/api/users', async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    const user = await User.create({ name });
    res.status(200).json({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create user.',
    });
  }
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});