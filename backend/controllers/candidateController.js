import db from '../config/db.js';

export const getCandidates = (req, res) => {
  const { search = '', gender, experience, skills = '', page = 1, limit = 10 } = req.query;

  let query = 'SELECT * FROM candidates WHERE 1=1';
  const params = [];

  if (search) {
    query += ' AND (name LIKE ? OR phone LIKE ? OR email LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (gender) {
    query += ' AND gender = ?';
    params.push(gender);
  }

  if (experience) {
    query += ' AND experience = ?';
    params.push(experience);
  }

  if (skills) {
    const skillList = skills.split(',');
    skillList.forEach(skill => {
      query += ' AND skills LIKE ?';
      params.push(`%${skill.trim()}%`);
    });
  }

  query += ' LIMIT ? OFFSET ?';
  params.push(Number(limit), (Number(page) - 1) * Number(limit));

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

export const addCandidate = (req, res) => {
  const { name, phone, email, gender, experience, skills } = req.body;

  const query = 'INSERT INTO candidates (name, phone, email, gender, experience, skills) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [name, phone, email, gender, experience, skills.join(', ')], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Candidate added successfully' });
  });
};
