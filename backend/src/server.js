import express from 'express';
import cors from 'cors';
import { convert, getUnitCatalog } from './converter.js';

const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => response.json({ status: 'ok' }));
app.get('/api/units', (_request, response) => response.json(getUnitCatalog()));
app.post('/api/convert', (request, response) => {
  const { category, from, to, value } = request.body;
  const numericValue = typeof value === 'number' ? value : Number(value);
  try {
    const result = convert({ category, from, to, value: numericValue });
    response.json({ result, from, to, category });
  } catch {
    response.status(400).json({ error: 'Please provide a valid conversion.' });
  }
});

app.listen(port, () => console.log(`Unit converter API running at http://localhost:${port}`));
