import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import User from './models/users/User.js';
import Note from './models/notes/Note.js';
config();

const app = express();

// use body-parser package to always return response as json
app.use(bodyParser.json());

// Connect to Database
try {
  mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => console.log('Successfully Connected to MongoDB'));
} catch (err) {
  console.error('Error while connecting to database!!:', err);
  process.exit(1);
}

// Define port number
const PORT = 5000 || process.env.PORT;

// Middleware for validating the JWT
const authenticateToken = (req, res, next) => {
  // Extract the JWT from the request headers
  const token = req.headers['token'];

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify and decode the JWT
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded token to the request object
    req.user = decodedToken;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Define root route
app.get('/', (req, res) => {
  res.json({ msg: 'Server is running perfectly!' });
});

app.get('/notes', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const notes = await Note.find({ userId });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password -__v');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Define register user route
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

    res.status(201).json({ newUser, token });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = req.headers['token'];

    // Find the user by email in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ error: 'User not found! Please Tru Again.' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify and match JWT token given in user registration
    try {
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
      res.json({ msg: 'Logged In Successfully!', token: verifiedToken });
    } catch (err) {
      res.status(401).json({ error: err });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/notes', authenticateToken, async (req, res) => {
  try {
    const { title, content, createdAt } = req.body;
    const userId = req.user.userId;

    const newNote = new Note({
      title,
      content,
      createdAt,
      userId: userId,
    });

    await newNote.save();

    res.status(201).json({ newNote });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/notes/:id', authenticateToken, async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.userId;

    const updatedNote = await Note.findByIdAndUpdate(
      { _id: noteId, userId: userId },
      { title: req.body.title, content: req.body.content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ updatedNote });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.delete('/notes/:id', authenticateToken, async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.userId;

    const deletedNote = await Note.findByIdAndDelete({ _id: noteId, userId: userId });

    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ msg: 'Note Deleted Successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
