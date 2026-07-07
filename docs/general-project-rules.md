# General Project Rules
Version: 1.1
Last Updated: April 2026

These rules apply to every project regardless of client, stack, or backend.
They define the standard way of building — the defaults that never change.

---

## CRITICAL — READ THIS FIRST

You are a senior development assistant working on a client portal built on Next.js.

**Read all project files before doing anything.**
**Read relevant existing files before touching any code.**
**Make the smallest possible change to achieve the goal.**
**Never push to main without testing on a preview URL first.**
**Never expose API credentials client-side under any circumstances.**

---

## Session Rules

1. **Destructive operations** → always confirm first before DROP, DELETE, TRUNCATE, or any bulk record deletion.
2. **Context awareness** → never second-guess the interface or environment the user stated they are working in.
3. **Scope** → do not add unrequested content or expand beyond what was asked.
4. **Updates and writes** → only act on clear directives, not during discussion or exploratory conversation.
5. **Chat limit** → warn the user when approaching ~80% of the context window so the session can wrap up cleanly before it freezes.

---

## Architecture — API Adapter Layer

**Always build an adapter layer between the frontend and the backend. No exceptions.**

The frontend never calls the backend directly. All data fetching goes through the adapter layer. This means:
- A future backend migration (e.g. SmartSuite → Supabase, Airtable → Xano) only requires updating the adapter internals — no component or page needs to change
- The frontend receives clean, typed, normalized data regardless of what backend is behind it

### Standard Structure
```
lib/
  adapters/
    [entity].ts     ← one file per data entity (contacts, deals, staff, etc.)
  [backend]/
    client.ts       ← base fetch wrapper for the backend (headers, base URL, auth)
    types.ts        ← raw response types from the backend
```

### Rules
- **Never call the backend directly from components or pages** — always go through the adapter
- **API routes call the adapter** — the adapter calls the backend
- **The adapter normalizes the response** — components receive clean typed data
- **New backend added?** — add a new `lib/[backend]/` folder and update adapters only

---

## Security Rules

- **Never hardcode credentials** — all secrets live in `.env.local` only, never committed to Git
- **Never expose API keys or secrets client-side** — all external API calls are server-side only
- **Never expose internal API structure to the client** — API routes return only what the frontend needs
- **Auth routes are protected files** — never modify `app/api/auth/` without explicit instruction
- **JWT secrets** live in `.env.local` as `JWT_SECRET`
- **Sessions** expire — never store sensitive data in localStorage or cookies without expiry
- **Environment variables** required for every project:
  ```
  [BACKEND]_API_KEY=
  [BACKEND]_ACCOUNT_ID=     ← if applicable
  JWT_SECRET=
  ```

---

## Git & Deployment

### Branch Strategy
- `main` → production (deploys to Vercel)
- `feature/xxx` → all development work
- Never commit directly to `main`
- Never push to `main` without testing on a preview URL first

### Workflow
1. Claude Code works on a `feature/xxx` branch
2. Auto-commits and pushes via Stop hook after each task
3. Vercel creates a preview URL automatically on push
4. Test on the preview URL
5. Satisfied → "Push all recent changes to main"

### Stop Hook
Located in `.claude/settings.local.json` — auto-commits after every task.
Must be configured at the start of every project. Do not remove or modify once set.

### Stable Files — Do Not Modify
Once created, these files are protected:
- `app/api/auth/` — authentication routes
- `app/layout.tsx` — root layout
- `.claude/settings.local.json` — Stop hook
- `.env.local` — environment variables

### Deployment Options
- **Preferred:** GitHub → Vercel auto-deploy on push to `main`
- **Fallback (GitHub not yet connected):** `vercel --prod` from local terminal

---

## Tech Stack Defaults

- **Framework:** Next.js (latest), App Router, TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Deployment:** Vercel
- **All API calls:** server-side only (never from client components)
- **All API routes must export:** `export const dynamic = 'force-dynamic'`

---

## Claude Code Conventions

### Every Prompt Must Start With:
```
## OPERATING INSTRUCTIONS

This is an existing, working Next.js application. Before touching anything:
- Read the relevant existing files first to understand the current implementation
- Do not refactor, rename, or restructure anything not in scope
- Do not modify auth, session, login, layout, or any unrelated files
- Make the smallest possible change to achieve the goal
- If something is already implemented, do not reimplement it
- Execute end to end without asking for confirmation
```

### Every Prompt Must End With:
```
### Branch
All work goes on the [branch-name] branch. Create it if it doesn't exist.
```

### Key Patterns

**Number formatting:**
```ts
value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
```

**Lazy loading tabs:** fetch data only when a tab is first activated. Use a `hasLoaded` ref.

**React StrictMode guard** (use when creating records to prevent double-submit):
```ts
const savingRef = useRef(false);
if (savingRef.current) return;
savingRef.current = true;
try { /* create record */ } finally { savingRef.current = false; }
```

**No triple-backtick code fences** inside Claude Code prompts.

**Error handling:** all external calls must be wrapped in try/catch with meaningful error messages.

---

## UI Conventions

- **Dark theme** throughout
- **shadcn/ui + Tailwind only** — no additional component libraries
- **No modals for inline actions** — use inline expand/collapse
  - Exceptions: detail popups, create modals — all 2/3 screen centered
- **Skeleton loading states** (not spinners)
- **Inline error banners** inside modals on submit failure
- **Empty states** with friendly centered message
- **Desktop only** (unless specified otherwise)
- **Custom scrollbar** on all scrollable containers (thin, `rgba(255,255,255,0.15)` thumb)
- **All interactions work without page reload**
- **Currency numbers** always formatted with comma separators and 2 decimal places
- **Do not use HTML `<form>` tags** — use `onClick`/`onChange` handlers only

### Searchable Dropdown (Combobox)
Use shadcn Combobox for any filter or form field with long lists. Always show "All [Entity]" or blank as default.

---

## SmartSuite-Specific Rules
> These rules apply only when SmartSuite is the data backend.
> Skip this section if the project uses a different backend (Supabase, Airtable, Xano, etc.)

### Base URL
```
https://app.smartsuite.com/api/v1
```

### Required Headers (record endpoints)
```
Authorization: Bearer {SMARTSUITE_API_KEY}
ACCOUNT-ID: {SMARTSUITE_ACCOUNT_ID}
Content-Type: application/json
```

### Required Headers (file download endpoint)
```
Authorization: Token {SMARTSUITE_API_KEY}
ACCOUNT-ID: {SMARTSUITE_ACCOUNT_ID}
```
> Note: file endpoint uses `Token` not `Bearer`.

### File Download Endpoint
```
GET https://app.smartsuite.com/api/v1/shared-files/{handle}/get_url/
```

### Critical API Rules
1. **Linked record filtering:** use `has_any_of` — NOT `contains`
2. **Formula fields return objects** — always extract defensively:
   ```ts
   const raw = record[slug];
   const value = typeof raw === 'object' && raw !== null && 'value' in raw
     ? Number(raw.value)
     : typeof raw === 'string' ? parseFloat(raw) : Number(raw) || 0;
   ```
3. **Always include limit and offset:** `{ "limit": 500, "offset": 0 }`
4. **Never write to formula fields, rollup fields, or lookup fields** — they are computed
5. **All API calls server-side only** — never call SmartSuite from client components
6. **Schema changes are manual** — MCP supports record-level operations only
7. **Currency:** prefer lookup fields returning plain text over mapping single-select UUIDs
8. **Amount fields often return strings** — always `parseFloat()` before arithmetic
9. **Rich text fields** always use `.preview` for plain text display
10. **Single/multi select writes:** use the internal `value` UUID, not the human-readable `label`
11. **System fields** (`first_created`, `last_updated`, `autonumber`, `followed_by`, `comments_count`) are read-only

### MCP vs Direct API
- MCP (`smartsuite-[project]`) → preferred for record reads during planning sessions
- Direct REST API → used in application code, always via the adapter layer
- MCP has no delete capability — deletions must be done manually in SmartSuite UI

---

## Supabase Migration Reference
> Applies when planning or executing a migration from SmartSuite (or another backend) to Supabase.
> Skip if not relevant to the current project phase.

| SmartSuite | Supabase Equivalent |
|---|---|
| Formula field (same-row math) | Postgres generated column (`GENERATED ALWAYS AS ... STORED`) |
| Formula field (cross-table aggregation) | Postgres view |
| Automation (triggered side effect) | Postgres trigger function |
| Complex external logic | Edge Function (use sparingly) |
| Linked record field | Foreign key |
| Lookup field | SQL JOIN |
| Rollup field | SQL aggregate function or materialized view |
| Single/Multi select choices | `text` column with CHECK constraint, or reference table |
| `first_created` | `created_at TIMESTAMPTZ DEFAULT now()` |
| `last_updated` | `updated_at` managed by trigger |
| File field | Store URL in `text`; actual file in Supabase Storage |
| User field | Foreign key to a `members` table |

### Migration Phases
1. **Build** — current backend continues; Supabase schema built in parallel; no sync yet
2. **Shadow/Beta** — full one-time import; nightly sync running; Supabase live behind feature flag
3. **Cutover** — final sync; flip write source; old backend read-only for 30 days as fallback
