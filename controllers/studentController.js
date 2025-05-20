const pool = require('../config/db');

exports.addStudent = async (req, res) => {
  const { name, reg_no, className } = req.body;
  await pool.query(
    'INSERT INTO students (name, reg_no, class) VALUES ($1, $2, $3)',
    [name, reg_no, className]
  );
  res.json({ message: 'Student added' });
};

exports.getStudents = async (req, res) => {
  const result = await pool.query('SELECT * FROM students');
  res.json(result.rows);
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, reg_no, className } = req.body;
  await pool.query(
    'UPDATE students SET name=$1, reg_no=$2, class=$3 WHERE id=$4',
    [name, reg_no, className, id]
  );
  res.json({ message: 'Student updated' });
};

exports.deleteStudent = async (req, res) => {
  await pool.query('DELETE FROM students WHERE id=$1', [req.params.id]);
  res.json({ message: 'Student deleted' });
};
