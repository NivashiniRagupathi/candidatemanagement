import express from 'express';
import db from '../config/db.js';
import {
  getCandidates,
  addCandidate
} from '../controllers/candidateController.js';

const router = express.Router();

router.get('/', getCandidates);
router.post('/', addCandidate);
router.delete('/:id', (req, res) => {
    const candidateId = req.params.id;
    const sql = 'DELETE FROM candidates WHERE id = ?';
  
    db.query(sql, [candidateId], (err, result) => {
      if (err) {
        console.error('Error deleting candidate:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Candidate not found' });
      }
  
      res.json({ message: 'Candidate deleted successfully' });
    });
  });

export default router;
