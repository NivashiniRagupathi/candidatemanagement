import express from 'express';
import cors from 'cors';
import candidateRoutes from './routes/candidateRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/candidates', candidateRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
