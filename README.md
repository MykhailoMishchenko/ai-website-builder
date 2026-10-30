# AI Website Builder

> Work in progress. A learning project for agent orchestration, background jobs and sandboxed code execution.

A prompt-to-website builder: you describe a site, a code agent builds it in an isolated cloud sandbox, and you get back a live preview URL.

## How it works

```
Next.js UI ──tRPC mutation──▶ Inngest event "backend/job"
                                   │
                                   ▼
                         Inngest function (durable steps)
                           1. create E2B sandbox from the
                              custom Next.js + shadcn/ui template
                           2. run the code agent (Inngest AgentKit)
                           3. return the sandbox preview URL
```

- **Durable jobs.** Every stage runs as an Inngest step, so a long generation survives retries and restarts instead of living inside one HTTP request.
- **Isolated execution.** Generated code never runs on the app server. It runs in an [E2B](https://e2b.dev) sandbox built from `sandbox-templates/nextjs`: Next.js 15 with every shadcn/ui component preinstalled and a dev server that is already warm when the sandbox starts.
- **End-to-end types.** The UI talks to the backend through tRPC with TanStack Query, so the job input is typed from the form to the event.

## Status

| Done | Next |
|---|---|
| tRPC → Inngest event pipeline | Agent tools for reading and writing files and running terminal commands inside the sandbox |
| Custom E2B sandbox template (Next.js 15 + shadcn/ui) | Agent loop with a "done" check and a step budget |
| Sandbox creation and preview URL as job steps | Saving projects and messages with Prisma (PostgreSQL) |
| First code agent wired through Inngest AgentKit | Chat UI with a live preview and code view |

## Stack

Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui, tRPC, TanStack Query, Inngest + AgentKit, E2B, Prisma, PostgreSQL.

## Run locally

```bash
npm install
cp .env.example .env    # OPENAI_API_KEY, E2B_API_KEY, DATABASE_URL
npx inngest-cli@latest dev   # Inngest dev server
npm run dev
```

Build the sandbox template once with the E2B CLI:

```bash
cd sandbox-templates/nextjs
e2b template build --name ai-website-builder-docker --cmd "/compile_page.sh"
```
