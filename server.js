const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.disable('x-powered-by');
app.use(express.json({ limit: '30kb' }));
app.use(express.static(path.join(__dirname, 'frontend')));

function adminOnly(req, res, next) {
  const expected = process.env.ADMIN_TOKEN;
  const auth = req.headers.authorization || '';
  if (!expected || auth !== `Bearer ${expected}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch {
    res.status(503).json({ status: 'degraded', database: 'unavailable' });
  }
});

app.post('/api/requests', async (req, res) => {
  const { name, email = '', phone, service, budget = '', message } = req.body || {};
  const clean = (v, max) => typeof v === 'string' ? v.trim().slice(0, max) : '';
  const data = {
    name: clean(name, 120),
    email: clean(email, 254),
    phone: clean(phone, 40),
    service: clean(service, 80),
    budget: clean(budget, 80),
    message: clean(message, 4000)
  };
  if (!data.name || !data.phone || !data.service || !data.message) {
    return res.status(400).json({ error: 'الاسم ورقم الهاتف والخدمة والرسالة حقول مطلوبة.' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO project_requests (name,email,phone,service,budget,message)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING id, created_at`,
      [data.name, data.email || null, data.phone, data.service, data.budget || null, data.message]
    );
    res.status(201).json({ message: 'تم استلام طلبك بنجاح.', request: result.rows[0] });
  } catch (error) {
    console.error('Request save failed:', error.message);
    res.status(500).json({ error: 'تعذر حفظ الطلب الآن. حاول مرة أخرى لاحقاً.' });
  }
});

app.get('/api/admin/requests', adminOnly, async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 300);
  try {
    const result = await pool.query(
      'SELECT * FROM project_requests ORDER BY created_at DESC LIMIT $1', [limit]
    );
    res.json({ requests: result.rows });
  } catch {
    res.status(500).json({ error: 'تعذر جلب الطلبات.' });
  }
});

app.patch('/api/admin/requests/:id', adminOnly, async (req, res) => {
  const allowed = ['new','contacted','in_progress','completed','cancelled'];
  const status = req.body?.status;
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1 || !allowed.includes(status)) {
    return res.status(400).json({ error: 'معرّف أو حالة غير صحيحة.' });
  }
  try {
    const result = await pool.query(
      'UPDATE project_requests SET status=$1 WHERE id=$2 RETURNING *', [status, id]
    );
    if (!result.rowCount) return res.status(404).json({ error: 'الطلب غير موجود.' });
    res.json({ request: result.rows[0] });
  } catch {
    res.status(500).json({ error: 'تعذر تحديث الطلب.' });
  }
});

app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'frontend', 'index.html')));

app.listen(PORT, () => console.log(`Logix running on port ${PORT}`));
