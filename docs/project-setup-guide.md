# Project Setup Guide
Version: 1.1
Last Updated: April 2026

---

## HOW TO USE THIS GUIDE

This guide walks through setting up a new client portal project from zero to first deploy.
It is designed to be followed with Claude — paste it into a new Claude Project and Claude will guide you through each step, checking what's already done and skipping what isn't needed.

**You do not need to follow every step if setup is partially done.**
Tell Claude where you are and it will pick up from there.

---

## FOR CLAUDE — HOW TO USE THIS GUIDE

When a user starts a session with this guide uploaded:

1. **Ask one question first:** "Where are you in the setup? Tell me what's already done, or say 'nothing' to start from the beginning."
2. **Listen to their answer** — do not walk through steps they've already completed
3. **Identify the next missing step** and guide them through it
4. **Never present this as a checklist to click through** — have a conversation, check status naturally
5. **When all setup steps are complete**, tell the user: "Setup is complete. You're ready to start building. Open a new chat for the build phase and upload all three project files."
6. **At the end of setup**, generate the project-specific instructions file (see Step 9)

---

## PREREQUISITES — What the user needs before starting

- GitHub account
- Vercel account (vercel.com — free tier is fine)
- Node.js installed (`node -v` to check)
- Git installed (`git -v` to check)
- Claude Desktop with relevant MCPs connected (SmartSuite, Supabase, etc.)
- Claude Code installed

---

## STEP 1 — GitHub Repository

**Goal:** A GitHub repo exists for this project.

**Options:**
- You create it yourself: github.com → New Repository → name it → create
- Your client creates it and invites you as admin collaborator

**If client owns the repo:**
- You need admin access — ask them to invite you
- For Vercel connection later, the client needs to install the Vercel GitHub App on their account (you cannot do this for them — see Step 5)

**Done when:** Repo URL exists (e.g. `https://github.com/[org]/[project-name]`)

---

## STEP 2 — Local Folder

**Goal:** A local folder on your machine linked to the GitHub repo.

**Decide where to put it** (e.g. `C:\Users\[name]\Projects\` on Windows, `~/Projects/` on Mac)

> **OneDrive warning:** Do not put the project inside an OneDrive-synced folder. OneDrive tries to sync `node_modules` (thousands of small files) and causes slowness and errors. Use a local path outside OneDrive.

**Then run in terminal:**
```bash
# Navigate to your projects folder
cd "C:\Users\[name]\Projects"          # Windows
cd ~/Projects                           # Mac

# Clone the repo (creates the folder automatically)
git clone https://github.com/[org]/[project-name].git
cd [project-name]
```

**If the repo is empty** (no main branch yet), skip the clone and do this instead:
```bash
mkdir [project-name]
cd [project-name]
git init
git remote add origin https://github.com/[org]/[project-name].git
```

**Done when:** You have a local folder and terminal shows you're inside it.

---

## STEP 3 — Next.js Scaffold

**Goal:** Next.js project files exist in the local folder.

**Run in terminal (from inside the project folder):**
```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

Hit Enter to accept all defaults when prompted.

**Then push to GitHub:**
```bash
git add .
git commit -m "init: Next.js scaffold"
git branch -M main
git push origin main
```

> If you get "remote origin already exists" — ignore it, continue.
> If you get "src refspec main does not match" — run `git branch -M main` first, then push.

**Done when:** Files appear in the GitHub repo (refresh the repo page to confirm).

---

## STEP 4 — Vercel Project

**Goal:** Project is deployed and accessible at a live URL.

**Option A — Via Vercel CLI (works immediately, no GitHub connection needed):**
```bash
npm install -g vercel
vercel
```
Follow the prompts:
- Log in when browser opens
- Set up and deploy: Y
- Scope: select your account
- Link to existing project: N
- Project name: accept default
- Directory: ./
- Modify settings: N

You'll get a live URL like `https://[project-name].vercel.app`

**To redeploy after changes (until GitHub is connected):**
```bash
vercel --prod
```

> **Important:** Always run `vercel --prod` from inside the project folder. If your terminal is in the wrong directory, Vercel will try to deploy your home directory and prompt a warning. Navigate to the project folder first.

**Option B — Via Vercel Dashboard (requires GitHub connection first):**
vercel.com → New Project → Import Git Repository → select repo → Deploy

> Note: If the repo belongs to a client's GitHub account, they need to install the Vercel GitHub App first (see Step 5). You cannot do this for them.

**Done when:** You can visit the live URL and see the default Next.js page.

---

## STEP 5 — Connect GitHub to Vercel (Auto-deploy)

**Goal:** Every `git push` to `main` automatically triggers a Vercel deployment.

**If you own the GitHub repo:**
- vercel.com → Project Settings → Git → Connect Repository → select repo → done

**If the client owns the GitHub repo:**
Ask the client to do this (2 minutes, no Vercel account needed):
1. Go to: `https://github.com/apps/vercel`
2. Click Install
3. Select their GitHub account/org
4. Choose "Only select repositories" → select the project repo
5. Confirm

Once done, go to your Vercel project → Settings → Git → Connect Repository.

**Done when:** A `git push` to `main` triggers an automatic deployment visible in Vercel dashboard.

> This step can be skipped temporarily — use `vercel --prod` from terminal until it's ready.
> Note: When deploying via CLI, the branch label shown in Vercel may show the feature branch name — this is cosmetic only. The deployed code is whatever is in your local working directory.

---

## STEP 6 — Claude Code Setup

**Goal:** Claude Code is pointed at the local project folder and ready to work.

1. Open Claude Code
2. Point it at the local project folder
3. Configure the Stop hook in `.claude/settings.local.json`:

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "cd /path/to/project && git add . && git commit -m 'auto: claude code changes' && git push origin [branch-name]"
          }
        ]
      }
    ]
  }
}
```

Replace `/path/to/project` and `[branch-name]` with actual values.

**Done when:** Claude Code opens the project folder and the Stop hook file exists.

---

## STEP 7 — Environment Variables

**Goal:** API credentials are set in Vercel AND available locally. Both are required.

### Part A — Set in Vercel

1. Go to vercel.com → your project → **Settings → Environment Variables**
2. Add each variable:
   ```
   SMARTSUITE_API_KEY=your_key_here
   SMARTSUITE_ACCOUNT_ID=your_account_id_here
   JWT_SECRET=generate_a_random_string_here
   ```
3. For each variable, confirm **all three environments are checked:**
   - ✅ Production
   - ✅ Preview
   - ✅ Development
4. No quotes around values, no extra spaces

**To generate a JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Part B — Pull to local

After setting variables in Vercel, pull them to your local machine:
```bash
cd [your-project-folder]
vercel env pull .env.local
```

This creates a `.env.local` file in your project root with all the Vercel environment variables. Confirm the file exists before running `npm run dev`.

> `.env.local` is gitignored by default in Next.js — never commit it.
> If you skip this step, API calls will fail locally with undefined credentials.

**Done when:** `.env.local` exists locally, is gitignored, and `npm run dev` can reach the backend API.

---

## STEP 8 — MCP Connections (Claude Desktop)

**Goal:** The relevant MCPs are connected in Claude Desktop for this project's data source.

**Common MCPs:**
- SmartSuite → `smartsuite-[project-name]` connector
- Supabase → Supabase MCP
- Google Drive, Gmail, etc. → as needed

To verify: open Claude Desktop settings → connected apps/MCPs → confirm the right ones are listed.

**Done when:** You can query the backend data source from Claude Desktop using MCP tools.

---

## STEP 9 — Create Project-Specific Instructions

**Goal:** A `[project-name]-project-instructions.md` file exists with all project-specific configuration.

At the end of setup, Claude will generate this file for you based on your answers to these questions:

1. What is the project name and client name?
2. What is the backend? (SmartSuite / Supabase / Airtable / other)
3. If SmartSuite — which solutions and tables are in scope?
4. What are the environment variable names for this project?
5. Are there any project-specific UI decisions or constraints?
6. What is the GitHub repo URL?

**The generated file will contain:**
- Project name and context
- Tech stack specifics
- Backend tool and adapter structure
- Environment variable names
- Schema reference (table IDs, field slugs if SmartSuite)
- Any project-specific rules or decisions

**Upload this file to the Claude Project along with `general-project-rules.md`.**

---

## STEP 10 — Claude Project Instructions

**Goal:** The Claude Project "instructions" box has the correct system prompt.

Paste the following into the Claude Project instructions (Settings → Instructions):

```
You are a senior development and product assistant for the [PROJECT NAME] portal.

This chat is used for:
- Planning and designing new features
- Crafting precise prompts to paste into Claude Code for execution
- Debugging and interpreting Claude Code output
- Maintaining product and technical documentation

The following files are attached to this project and must be read at the start of every session:
- general-project-rules.md — coding standards, architecture rules, security, UI conventions
- [project-name]-project-instructions.md — project-specific schema, table IDs, environment setup

Read both files before responding to anything.

When crafting Claude Code prompts, always prepend the OPERATING INSTRUCTIONS block defined in general-project-rules.md.

When asked to "update the docs", produce an updated versioned copy of the relevant md file, incrementing the version number and updating the Last Updated date.
```

**Done when:** Instructions are saved in the Claude Project settings.

---

## SETUP COMPLETE

When all steps above are done, the project is ready to build.

**Open a new chat** in the Claude Project for the build phase.
This setup chat can remain open for infrastructure questions, documentation updates, and Vercel/GitHub issues.

---

## QUICK REFERENCE — Common Terminal Commands

```bash
# Navigate to project folder
cd "C:\Users\[name]\Projects\[project-name]"    # Windows
cd ~/Projects/[project-name]                     # Mac

# Start local dev server (see changes at localhost:3000)
npm run dev

# Pull environment variables from Vercel to local
vercel env pull .env.local

# Deploy to Vercel manually (when GitHub not connected)
vercel --prod

# Push code to GitHub
git add .
git commit -m "your message here"
git push origin [branch-name]

# Create and switch to a new feature branch
git checkout -b feature/[feature-name]

# Switch to an existing branch
git checkout [branch-name]

# Merge feature branch into main and push
git checkout main
git merge feature/[feature-name]
git push origin main
git checkout feature/[feature-name]   # switch back to keep working

# Check current branch
git branch

# Check Git status
git status
```

---

## TROUBLESHOOTING

**"The system cannot find the path specified"**
Your path is wrong. Run `echo %USERPROFILE%` (Windows) or `echo $HOME` (Mac) to find your actual username, then rebuild the path.

**"remote origin already exists"**
Ignore it. The remote is already set. Continue to next command.

**"src refspec main does not match any"**
Run `git branch -M main` first, then push again.

**"fatal: couldn't find remote ref main"**
The repo is empty and has no main branch yet. Skip the pull and go straight to scaffolding.

**Vercel not showing client's GitHub repo**
The client needs to install the Vercel GitHub App on their account (Step 5). You cannot do this for them.

**OneDrive sync issues with node_modules**
OneDrive tries to sync thousands of small files inside `node_modules`. If you experience slowness or errors, move the project folder outside OneDrive and re-clone from GitHub.

**"You are deploying your home directory"**
Your terminal is not inside the project folder. Navigate there first:
```bash
cd [full path to your project folder]
vercel --prod
```

**SmartSuite returns 403 Forbidden**
Two possible causes:

1. **No `.env.local` file** — environment variables are set in Vercel but were never pulled locally. Fix:
   ```bash
   vercel env pull .env.local
   ```
   Then restart your dev server.

2. **Wrong Authorization header format** — SmartSuite requires `Token` not `Bearer`. Check `lib/smartsuite/client.ts` and confirm the header reads:
   ```ts
   'Authorization': `Token ${process.env.SMARTSUITE_API_KEY}`
   ```
   Not `Bearer`. This applies to all record endpoints. The file download endpoint uses the same `Token` format.
