// Simulates a forgotten server that is still holding the port,
// e.g. an old `npm run dev` left running in another terminal.
import { createServer } from 'node:http';

const PORT = Number(process.env.PORT) || 3000;

createServer((req, res) => res.end('I am an old server hogging this port.\n')).listen(PORT, () => {
  console.log(`Blocker is holding port ${PORT} (PID ${process.pid}). Leave this running.`);
});
