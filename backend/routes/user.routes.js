const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../config/mysql');

// REGISTER
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'All fields required' });

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({ message: 'User registered successfully' });
    }
  );
});

// LOGIN
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (err, results) => {
      if (!results.length)
        return res.status(401).json({ message: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, results[0].password);
      if (!isMatch)
        return res.status(401).json({ message: 'Invalid credentials' });

      res.json({ message: 'Login successful', userId: results[0].id });
    }
  );
});

module.exports = router;
