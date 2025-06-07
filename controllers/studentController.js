const pool = require('../config/db');

// Student CRUD operations
exports.addStudent = async (req, res) => {
  try {
    const { name, reg_no, className } = req.body;
    await pool.query(
      'INSERT INTO students (name, reg_no, class) VALUES ($1, $2, $3)',
      [name, reg_no, className]
    );
    res.json({ message: 'Student added successfully' });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Failed to add student' });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, reg_no, className } = req.body;
    await pool.query(
      'UPDATE students SET name=$1, reg_no=$2, class=$3 WHERE id=$4',
      [name, reg_no, className, id]
    );
    res.json({ message: 'Student updated successfully' });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Failed to update student' });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await pool.query('DELETE FROM students WHERE id=$1', [req.params.id]);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Failed to delete student' });
  }
};

// People Registration functionality
exports.addPerson = async (req, res) => {
  try {
    const { fullname, email, phone_number, card_id } = req.body;

    // Validation
    if (!fullname || !email || !phone_number || !card_id) {
      return res.status(400).json({ 
        error: 'Full name, email, phone number, and card ID are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Please provide a valid email address' 
      });
    }

    // Check if person already exists (by email or card_id)
    const existingPerson = await pool.query(
      'SELECT id FROM people WHERE email = $1 OR card_id = $2',
      [email, card_id]
    );

    if (existingPerson.rows.length > 0) {
      return res.status(409).json({ 
        error: 'Person with this email or card ID already exists' 
      });
    }

    // Insert new person
    const result = await pool.query(
      'INSERT INTO people (fullname, email, phone_number, card_id, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [fullname, email, phone_number, card_id]
    );

    const newPerson = result.rows[0];
    
    res.status(201).json({
      message: 'Person registered successfully',
      person: newPerson
    });

  } catch (error) {
    console.error('Error registering person:', error);
    res.status(500).json({ error: 'Failed to register person' });
  }
};

exports.getPeople = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM people ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching people:', error);
    res.status(500).json({ error: 'Failed to fetch people' });
  }
};

exports.updatePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email, phone_number, card_id } = req.body;

    // Validation
    if (!fullname || !email || !phone_number || !card_id) {
      return res.status(400).json({ 
        error: 'Full name, email, phone number, and card ID are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Please provide a valid email address' 
      });
    }

    // Check if another person has the same email or card_id
    const existingPerson = await pool.query(
      'SELECT id FROM people WHERE (email = $1 OR card_id = $2) AND id != $3',
      [email, card_id, id]
    );

    if (existingPerson.rows.length > 0) {
      return res.status(409).json({ 
        error: 'Another person with this email or card ID already exists' 
      });
    }

    const result = await pool.query(
      'UPDATE people SET fullname=$1, email=$2, phone_number=$3, card_id=$4 WHERE id=$5 RETURNING *',
      [fullname, email, phone_number, card_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.json({
      message: 'Person updated successfully',
      person: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating person:', error);
    res.status(500).json({ error: 'Failed to update person' });
  }
};

exports.deletePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM people WHERE id=$1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.json({ 
      message: 'Person deleted successfully',
      deleted_person: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting person:', error);
    res.status(500).json({ error: 'Failed to delete person' });
  }
};

exports.getPersonById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM people WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching person:', error);
    res.status(500).json({ error: 'Failed to fetch person' });
  }
};
