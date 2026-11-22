import express from 'express';

const PORT = Number(process.env.PORT) || 3000;
const app = express();

app.get('/', (req, res) => {
  res.send(`<h1>Hello from the PortKill demo</h1><p>Running on port ${PORT} (PID ${process.pid}).</p>`);
});

app.get('/health', (req, res) => res.json({ ok: true, pid: process.pid }));

app
  .listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
  .on('error', (error) => {
    console.error(`Could not start server: ${error.message}`);
    process.exit(1);
  });
