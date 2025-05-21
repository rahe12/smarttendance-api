const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const result = await pool.query('SELECT * FROM teachers WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      console.log('No user found for username:', username);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const teacher = result.rows[0];
    console.log('User found:', teacher.username);
    console.log('Stored hash:', teacher.password);

    const match = await bcrypt.compare(password, teacher.password);
    console.log('Password match:', match);

    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: teacher.id, username: teacher.username }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
