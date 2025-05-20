const pool = require('../config/db');

exports.markAttendance = async (req, res) => {
  const { student_id, date, status } = req.body;
  await pool.query(
    'INSERT INTO attendance (student_id, date, status) VALUES ($1, $2, $3)',
    [student_id, date, status]
  );
  res.json({ message: 'Attendance marked' });
};

exports.getAttendance = async (req, res) => {
  const { student_id, date } = req.query;
  let query = 'SELECT * FROM attendance WHERE 1=1';
  const values = [];

  if (student_id) {
    values.push(student_id);
    query += ` AND student_id = $${values.length}`;
  }
  if (date) {
    values.push(date);
    query += ` AND date = $${values.length}`;
  }

  const result = await pool.query(query, values);
  res.json(result.rows);
};
