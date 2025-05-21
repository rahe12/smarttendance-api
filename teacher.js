const pool = require('./config/db');  // adjust path if needed
const bcrypt = require('bcrypt');
async function createTeacher(username, plainPassword) {
  try {

    const saltRounds = 10;
    
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    await pool.query(
      'INSERT INTO teachers (username, password) VALUES ($1, $2)',
      [username, hashedPassword]
    );

    console.log(`Teacher ${username} inserted successfully.`);
  } catch (err) {
    console.error('Error inserting teacher:', err);
  } finally {
    await pool.end(); // close DB connection
  }
}

// Change username and password here if you want
createTeacher('Claudine', '123');
