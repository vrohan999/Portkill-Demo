# PortKill demo

A small Express app that uses [`@vrohan999/portkill`](https://www.npmjs.com/package/@vrohan999/portkill) to free its port before starting, so you never see:

```
Error: listen EADDRINUSE: address already in use :::3000
```

## Setup

Requires Node.js 18 or newer.

```bash
git clone <this repo's URL>
cd portkill-demo
npm install
```

PortKill is installed as a dev dependency, so the npm scripts can call `portkill` directly. No global install is needed.

## Try it

**1. Simulate a forgotten server.** In one terminal, start something that holds port 3000:

```bash
npm run block
```

**2. See the usual problem.** In a second terminal:

```bash
npm start
```
```
Could not start server: listen EADDRINUSE: address already in use :::3000
```

**3. Let PortKill fix it:**

```bash
npm run dev
```
```
Port 3000 is currently occupied.

Process: node
PID:     38675
Command: node blocker.js

Successfully terminated process 38675.
Port 3000 is now available.
Server running at http://localhost:3000
```

Open http://localhost:3000. The blocker in the first terminal has been stopped.

## Scripts

| Script | What it does |
| --- | --- |
| `npm start` | Starts the server (fails if port 3000 is taken). |
| `npm run dev` | Runs `portkill 3000 --yes`, then starts the server. |
| `npm run block` | Starts a dummy server on port 3000 to create a conflict. |
| `npm run ports` | Lists occupied ports (`portkill --list`). |
| `npm run free` | Frees port 3000, asking for confirmation first (`portkill 3000`). |

## How it works

The `dev` script in `package.json` is:

```json
"dev": "portkill 3000 --yes && node server.js"
```

- `--yes` skips the confirmation prompt, which suits an npm script.
- `&&` starts the server only if PortKill succeeds, meaning the port is free. If the port can't be freed (for example because a protected or other user's process holds it), PortKill exits with an error and the server isn't started.

`--yes` stops whatever holds port 3000 without asking. Only use it on ports you know belong to your own dev servers. `npm run free` asks first.

To use a port other than 3000, set `PORT` when starting the server and change the number in the `dev` and `free` scripts to match.

