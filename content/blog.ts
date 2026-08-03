// Blog content source. For now posts live in-repo as structured data so the
// design can be built and reviewed; the data layer is intentionally isolated
// (posts / getPost / getAllSlugs) so it can later be swapped for MDX files or a
// SmartSuite-backed adapter without touching the page components.
//
// `bodyHtml` is trusted, hand-authored markup rendered inside `.blog-prose`.
// A future SmartSuite adapter would supply the same shape (rich-text HTML).

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string; // display label, e.g. "SmartSuite · Xano"
  tags: string[]; // filter chips
  date: string; // ISO, for datePublished
  dateLabel: string; // human display, e.g. "July 2026"
  readMinutes: number;
  featured?: boolean;
  gradient?: 1 | 2 | 3; // cover gradient variant (fallback behind the cover image)
  cover?: string; // on-brand cover graphic in /public/blog; falls back to the gradient
  author?: string; // key into AUTHORS; defaults to DEFAULT_AUTHOR
  draft?: boolean; // hidden from listings, sitemap, and static generation (not published)
  bodyHtml: string;
};

export type Author = {
  name: string;
  byline: string; // short credential shown in the article byline
  role: string; // full role shown in the author bio box
  bio: string;
  initials: string;
  photo?: string;
};

export const AUTHORS: Record<string, Author> = {
  vasken: {
    name: "Vasken Bakalian",
    byline: "SmartSuite Certified Consultant",
    role: "Founder, Process Maestro · SmartSuite Certified Consultant · Make.com Certified Partner",
    bio: "17 years in tech. I help operations teams pick the right tools - and I'll tell you when the one you have isn't enough.",
    initials: "VB",
    photo: "/founder_vasken.jpg", // same headshot as the homepage founder section
  },
  araks: {
    name: "Araks Yeprikyan",
    byline: "Process Automation Expert (Make.com Partner)",
    role: "Process Automation Expert, Process Maestro · Make.com Partner",
    bio: "I help businesses automate the repetitive work that eats their time - designing Make.com scenarios and connected systems that run in the background.",
    initials: "AY",
    photo: "/araks-yeprikyan.jpg",
  },
};

export const DEFAULT_AUTHOR = "vasken";

export const posts: BlogPost[] = [
  {
    slug: "when-to-move-off-smartsuite-to-xano",
    cover: "/blog/when-to-move-off-smartsuite-to-xano.png",
    title: "When to Move Off SmartSuite to Xano (and When to Stay)",
    excerpt:
      "SmartSuite caps out at 125,000 records per table - even on its top tier. Here's how to know if you've actually hit the ceiling, and what to do about it.",
    category: "SmartSuite · Xano",
    tags: ["SmartSuite", "Xano"],
    date: "2026-07-15",
    dateLabel: "July 2026",
    readMinutes: 8,
    featured: true,
    gradient: 1,
    bodyHtml: `
<p class="lede">If your SmartSuite base is starting to feel slow, or a table just stopped letting you add records, you haven't done anything wrong. You've hit a real, documented limit - and the fix isn't to fight it.</p>
<p>SmartSuite is our go-to for operations data and workflows. We're certified consultants and we build on it every week. But part of being honest with clients is telling them where a tool stops - and SmartSuite has one hard stop that catches growing businesses off guard.</p>
<h2>The hard limit worth knowing about</h2>
<p>SmartSuite caps the number of records you can store, and the ceiling doesn't lift no matter how much you pay. Straight from their own documentation:</p>
<div class="blog-callout">
  <div class="k">The ceiling</div>
  <div class="big">125,000 records / table</div>
  <p>Per table on the top Enterprise and Signature tiers (400,000 per solution). It's the same cap whether you're on the highest plan or a mid one - paying more doesn't raise it.</p>
</div>
<p>For most teams that's plenty. But if you're logging transactions, sensor readings, e-commerce orders, or anything that grows by thousands of rows a week, you can reach it faster than you'd think - and when you do, no amount of cleanup buys you real headroom.</p>
<h2>Five signs you've actually outgrown it</h2>
<ul>
  <li>A table is pushing past ~100,000 records and still growing weekly</li>
  <li>Views and reports have gotten visibly slower to load</li>
  <li>You're archiving or deleting data you'd rather keep, just to stay under the cap</li>
  <li>You need real relational depth - complex joins, server-side logic, an API other apps build on</li>
  <li>You're bolting a "real" database onto the side because SmartSuite can't hold it all</li>
</ul>
<blockquote>The tool isn't the answer. The right architecture is - and sometimes that means moving the heavy data somewhere built for it.</blockquote>
<h2>It's not only about data - it's about the experience</h2>
<p>There's a second reason teams move off SmartSuite, and it has nothing to do with record counts. SmartSuite's interface is quick to set up, but it's a template - you work inside the dashboards and views it hands you. If you want a genuinely custom experience - a client portal or internal app that looks and behaves exactly the way you picture it, with your own layouts, interactions, and branding - you'll eventually hit the edges of what a no-code interface allows.</p>
<p>This is where the pairing shines. Move the data to Xano and put a custom front end on top - one we build with Claude Code - and you get the best of both: Xano handles the scale and the logic, while the custom interface delivers the exact look, feel, and workflow you want, with no template ceiling.</p>
<h2>When to stay on SmartSuite</h2>
<p>Migrating is real work, so don't do it prematurely. If your largest table is comfortably under the cap, your team is happy working in SmartSuite's ready-made views, and your reporting is fast enough - stay. Its interface, permissions, and no-code workflows are genuinely great for standard operational needs, and there's no reason to add complexity you don't need.</p>
<h3>Where Xano fits</h3>
<p>Xano is a scalable no-code backend built for exactly the jobs SmartSuite isn't: large datasets, custom APIs, and application logic. On its own it's the engine; paired with a custom front end we build in Claude Code, it becomes a full application with a bespoke interface you'd never get from an off-the-shelf tool. A common pattern we build is a hybrid - keep the everyday team workflows in SmartSuite, move the high-volume data and any custom-UI experience to Xano plus a custom front end, and connect it all so nobody notices the seam.</p>
<p>The right call depends on your data, not your loyalty to a tool. If you're not sure which side of the line you're on, that's exactly the kind of thing a short conversation can settle.</p>
`.trim(),
  },
  {
    slug: "where-to-start-automating-your-operations",
    cover: "/blog/where-to-start-automating-your-operations.png",
    author: "araks",
    title: "Where to Start with Automating Your Operations",
    excerpt:
      "New tools and AI are arriving faster than anyone can keep up with. You don't need to overhaul everything - here's the calm, step-by-step way to structure and automate your operations, starting from zero.",
    category: "Operations",
    tags: ["Operations", "Automation"],
    date: "2026-07-28",
    dateLabel: "July 2026",
    readMinutes: 7,
    gradient: 1,
    bodyHtml: `
<p class="lede">New tools and AI are arriving faster than anyone can keep up with, and it's easy to feel like you're already behind. You're not. You don't need to overhaul everything or master every new tool - you need a clear order to work in. Here's where to start.</p>
<p>Almost every business we meet is sitting on the same pile of scattered spreadsheets, disconnected apps, and manual work. The good news: getting out of it follows a predictable path. Take it in order and it's genuinely manageable.</p>
<h2>Start with questions, not tools</h2>
<p>The single biggest mistake is buying software before you understand the problem. Before you look at a single tool, answer a few plain questions:</p>
<ul>
  <li>Where does your team actually lose the most time?</li>
  <li>What gets missed, dropped, or done wrong most often?</li>
  <li>Which tasks get repeated over and over?</li>
  <li>What would "noticeably better" look like six months from now?</li>
</ul>
<p>You're not looking for a product yet. You're looking for a clear answer to "what is slowing us down, and what's worth fixing first?"</p>
<h2>Map how the work really flows</h2>
<p>You can't automate what you can't see. Before changing anything, map your actual process - the real steps from start to finish, not the tidy version in your head. We usually draw this as a simple process map (a technique called BPMN), but it's really just: "here is exactly how this happens today."</p>
<div class="blog-callout">
  <div class="k">The rule</div>
  <div class="big">You can't automate what you can't see</div>
  <p>A clear map of how the work happens instantly shows the bottlenecks, the handoffs that get dropped, and the steps a computer could take over.</p>
</div>
<h2>Get the foundation right: your data</h2>
<p>Underneath every good system is a clean data structure - where your information lives, how it connects, and one place that counts as the source of truth. Skip this and you build fast on sand: every report, every automation, and every new hire gets harder. We start projects with a simple data model for the same reason you'd pour a foundation before framing a house.</p>
<h2>Automate slowly - one important thing at a time</h2>
<p>Here's what most people get wrong: they try to change everything at once. Big-bang automation projects are where budgets and trust go to die. Do the opposite.</p>
<ul>
  <li>Pick the single task that's both the most painful and the most frequent.</li>
  <li>Automate just that one thing.</li>
  <li>Watch what happens, measure it, and adjust.</li>
  <li>Only then move to the next one.</li>
</ul>
<p>Every automation should earn its place before you add the next. Small, compounding wins beat one giant rollout every time.</p>
<h2>Change at the speed your team can absorb</h2>
<p>The real bottleneck is almost never the technology - it's adoption. People need time to trust a new way of working, and a change your team doesn't actually adopt is worse than no change at all. When one automation saves someone two hours a week, the next one is welcomed instead of resisted.</p>
<blockquote>You don't need the perfect system. You need the next right step - and a team that's ready to take it.</blockquote>
<h2>Choose tools (and help) for the problem, not the hype</h2>
<p>The tool landscape shifts every month, and AI adds a new "must-have" every week. You can't chase all of it, and you shouldn't try. The right tool is the one that fits your problem, your budget, and your team's comfort - not the loudest one. Sometimes that's a no-code platform like SmartSuite; sometimes an automation engine like Make.com; sometimes a scalable backend or a custom build. Usually it's a sensible mix. What matters is that the tool follows the problem, never a trend.</p>
<p>And if you're spending more time evaluating tools than running your business - or you've already been burned by a "solution" that didn't fit - that's the moment to bring in a guide who is tool-agnostic and will tell you honestly what you actually need.</p>
<h2>The fundamentals don't change, even when everything else does</h2>
<p>Tools will keep changing. AI will keep raising the bar. But the path stays the same: understand the work, structure the data, automate the important things slowly, and bring your team along. Master that order and you'll never be at the mercy of the next shiny thing.</p>
<p>If you're not sure where your own starting point is, that's exactly the kind of thing a short conversation can settle.</p>
`.trim(),
  },
  {
    slug: "what-structured-data-means",
    cover: "/blog/what-structured-data-means.png",
    title: "What Structured Data Really Means (and Why Messy Data Costs You)",
    excerpt:
      "Most 'we need better software' problems are really 'our data is a mess' problems. Here's what structured data means in plain terms - and why it's the foundation of everything.",
    category: "Operations",
    tags: ["Operations", "Data"],
    date: "2026-07-30",
    dateLabel: "July 2026",
    readMinutes: 6,
    gradient: 2,
    bodyHtml: `
<p class="lede">Most problems that feel like "we need better software" are really "our data is a mess." Structured data is the foundation that makes everything - reporting, automation, growth - either easy or painful. Here's what it means, in plain terms.</p>
<h2>What "structured data" actually means</h2>
<p>It simply means your information is organized consistently: every customer, order, or project is stored the same way, in the same place, with clear fields - instead of scattered across spreadsheets, inboxes, and people's heads. Structured data is data a computer (and a new hire) can find and trust. Unstructured data is data only the person who created it can navigate.</p>
<h2>What messy data costs you</h2>
<p>When data isn't structured, the symptoms are always the same:</p>
<ul>
  <li>Duplicates - three slightly different versions of the same customer</li>
  <li>Inconsistency - "N/A", blank, and "none" all meaning the same thing</li>
  <li>No single source of truth - two systems disagree and nobody knows which is right</li>
  <li>Reports you can't fully trust, and hours lost reconciling them</li>
</ul>
<div class="blog-callout">
  <div class="k">The default, not the exception</div>
  <div class="big">88-94%</div>
  <p>of business spreadsheets contain errors, according to decades of research. Messy data isn't a rare accident - it's what you get by default when structure is an afterthought.</p>
</div>
<h2>What good structure looks like</h2>
<ul>
  <li><strong>One record per real thing.</strong> One customer is one record - everywhere - not a new row every time they come up.</li>
  <li><strong>Consistent fields and formats.</strong> Dates, statuses, and categories follow the same rules every time.</li>
  <li><strong>Relationships instead of duplication.</strong> Link records together rather than copying the same information into ten places.</li>
  <li><strong>One source of truth.</strong> Every piece of data has one home that everything else points to.</li>
</ul>
<h3>Why this is what makes automation possible</h3>
<p>You can't automate on top of a mess. Automation needs data it can rely on - clean, consistent, and connected. Get the structure right and automation becomes almost easy; skip it and every automation you build simply inherits the chaos underneath.</p>
<blockquote>You don't have a software problem. You have a data-structure problem wearing a software costume.</blockquote>
<p>Structuring your data isn't glamorous work, but it's the highest-leverage thing most businesses can do - and everything else gets easier once it's done. It's usually where we start, and it's rarely where clients expect the real fix to be.</p>
`.trim(),
  },
  {
    slug: "what-does-it-mean-to-automate-a-process",
    cover: "/blog/what-does-it-mean-to-automate-a-process.png",
    author: "araks",
    title: "What Does It Mean to Automate a Process?",
    excerpt:
      "If 'automation' sounds like something only big tech companies do, this is for you. At its heart it's simple: let software do the repetitive work you're doing by hand. Here's what that really looks like.",
    category: "Automation",
    tags: ["Automation"],
    date: "2026-07-29",
    dateLabel: "July 2026",
    readMinutes: 6,
    gradient: 3,
    bodyHtml: `
<p class="lede">If "automation" sounds like something only big tech companies with engineering teams do, this is for you. At its heart, automation is simple: let software do the repetitive work a person is currently doing by hand. Here's what that really looks like.</p>
<h2>What automating a process actually means</h2>
<p>A "process" is just a series of steps to get something done - onboarding a client, sending an invoice, updating a record after a call. Automating it means software does those steps for you whenever a trigger happens, so no one has to remember or do them manually.</p>
<p>A simple example: a new client fills out a form. Instantly, the system creates their record, sends a welcome email, and notifies your team - the whole chain, done by itself, in seconds. Nobody copied anything or forgot a step.</p>
<h2>The everyday things you can automate</h2>
<ul>
  <li>Moving data between your apps, so you stop copy-pasting</li>
  <li>Sending follow-ups, reminders, and notifications</li>
  <li>Creating records automatically from forms or emails</li>
  <li>Generating and sending reports on a schedule</li>
  <li>Routing approvals and updates to the right people</li>
</ul>
<h2>What you actually get out of it</h2>
<p>The payoff is bigger than "saving a bit of time":</p>
<ul>
  <li><strong>Hours back</strong> every week, for you and your team</li>
  <li><strong>Fewer errors</strong>, because no one is retyping things by hand</li>
  <li><strong>Consistency</strong> - it happens the same way every single time</li>
  <li><strong>Room to grow</strong> without hiring a person for every new repetitive task</li>
</ul>
<div class="blog-callout">
  <div class="k">The appeal, in one line</div>
  <div class="big">One task, automated, runs 24/7</div>
  <p>It never forgets, never makes a typo, and doesn't need a salary. That's the whole reason automation is worth it.</p>
</div>
<h2>You don't need to automate everything</h2>
<p>The goal isn't a fully robotic business. It's removing the specific, repetitive, low-value tasks that drain your team - starting with one. Automate the worst offender, feel the difference, then move to the next.</p>
<h3>The tools that make it possible</h3>
<p>Platforms like Make.com and n8n connect your apps and run these automations without custom code. Which one fits depends on your needs, but the barrier to entry is far lower than most people assume - you don't need to be technical to benefit, you just need to know which repetitive task to point it at first.</p>
<blockquote>Automation isn't about replacing people. It's about not wasting them on work a computer should be doing.</blockquote>
<p>Here's the simple test: if you can describe a repetitive task step by step, it can almost certainly be automated. The hardest part is usually just deciding which one to start with.</p>
`.trim(),
  },
  {
    slug: "how-we-build-custom-apps-design-led",
    cover: "/blog/how-we-build-custom-apps-design-led.png",
    title: "From Design to Working Software in Days: How We Build Custom Apps",
    excerpt:
      "Custom CRMs, portals, and web apps used to mean slow. A design-led, AI-accelerated process gives you bespoke software - shaped with you - in a fraction of the time.",
    category: "Custom Development",
    tags: ["Custom Development", "Claude Code"],
    date: "2026-07-24",
    dateLabel: "July 2026",
    readMinutes: 5,
    gradient: 2,
    bodyHtml: `
<p class="lede">For years, custom software meant a hard trade-off: fast and templated, or bespoke and slow. A design-led, AI-accelerated process finally breaks that - you get software built exactly for you, in a fraction of the usual time.</p>
<p>Here's how we actually build a custom CRM, client portal, internal tool, or web app - and why the order of operations is the whole trick.</p>
<h2>Design first - and it moves at the speed of a conversation</h2>
<p>Most custom projects go wrong because building starts before anyone agrees on what the thing should look and feel like. We flip that. Before a line of application logic is written, we design the interface - the screens, the flows, the way it should feel to use - and we iterate it with you directly.</p>
<p>Because the design is generated and refined with AI, a round of changes takes hours, not another week and another invoice. You see your actual product taking shape, react to it, and shape it - fast. By the time we move on, you've approved something real, not a slide-deck promise.</p>
<div class="blog-callout">
  <div class="k">Why it matters</div>
  <div class="big">You approve the experience before we build the engine</div>
  <p>No expensive surprises halfway through. The look, feel, and flow are locked in with you first - so the build has a clear, agreed target instead of a moving one.</p>
</div>
<h2>Then the design hands off to the build</h2>
<p>Once the interface is right, it moves to the build side - where a working application actually comes together: the data model, the business logic, the automations, and the integrations with the tools you already run (SmartSuite, Make.com, Xano, your CRM). The clean, approved interface becomes the foundation everything is built on, instead of something bolted on at the end.</p>
<p>This is the part that separates a nice mockup from software you can run your business on - and it's where experience, not just speed, does the heavy lifting.</p>
<h2>What you end up with</h2>
<ul>
  <li>A custom CRM, portal, or internal tool that fits your process - not a template you bend your business around</li>
  <li>An interface that looks and behaves exactly how you wanted, because you shaped it</li>
  <li>Real logic and automation underneath, connected to your existing stack</li>
  <li>Software you own, delivered in days and weeks instead of months</li>
</ul>
<blockquote>Design-led, expertly built. The AI makes it fast; the judgment - what to build, how to structure it, what to protect - is human.</blockquote>
<p>Fast doesn't mean cutting corners, though. Building this quickly only works if you're disciplined about the things that bite you later - setup, security, architecture, and code quality. That's a topic on its own, and it's exactly what our next piece is about.</p>
`.trim(),
  },
  {
    slug: "building-custom-software-with-ai-done-right",
    cover: "/blog/building-custom-software-with-ai-done-right.png",
    title: "Building Custom Software with AI: What to Get Right",
    excerpt:
      "AI can produce a working prototype fast. Turning it into software a business can trust - secure, well-structured, built to scale - is where the real discipline lives.",
    category: "Custom Development",
    tags: ["Custom Development", "Claude Code"],
    date: "2026-07-22",
    dateLabel: "July 2026",
    readMinutes: 6,
    gradient: 3,
    bodyHtml: `
<p class="lede">AI can produce a working prototype astonishingly fast. Turning that prototype into software a business can actually rely on is a different job - and it's where the real risk hides. Speed is only an advantage if you're disciplined about what comes after the demo.</p>
<p>We build custom software with AI-accelerated tools every week. Here's what we refuse to cut corners on - and what you should ask any team about before they build something you'll depend on.</p>
<div class="blog-callout">
  <div class="k">The reality</div>
  <div class="big">The prototype is the easy 70%</div>
  <p>AI gets you to something that runs quickly. The rest - edge cases, error handling, security, and hardening - is human judgment, and it's most of the actual work.</p>
</div>
<h2>The things that bite you later</h2>
<h3>Project setup and architecture</h3>
<p>A clean structure from day one is the difference between software that grows with you and a codebase that has to be rebuilt in a year. We set clear conventions and a sane architecture up front, and we don't let AI sprawl into a tangle of one-off files. Structure is a decision, not an accident.</p>
<h3>Security</h3>
<p>This is the one you can't get wrong. Authentication, permissions, how data is stored and handled, secrets kept out of the code, every input validated. AI-generated code is never shipped without a careful security review - the convenient default is often the insecure one.</p>
<h3>Refactoring and code quality</h3>
<p>AI writes a lot of code, and not all of it earns its place. We prune it: remove duplication, consolidate logic, and keep things readable so the next change is easy and safe. Unreviewed AI output accumulates into a mess that slows everything down.</p>
<h3>Built to scale</h3>
<p>A data model and architecture that work for a demo can buckle under real volume and real users. We design the structure to hold up as you grow - sensible naming, modular pieces, and boundaries that let parts change without breaking the whole.</p>
<h3>Review and testing</h3>
<p>Every meaningful change gets human eyes, and the flows that matter get tested. "It worked when I clicked it" is not the same as "it works."</p>
<blockquote>Vibe-coding a demo is easy. Shipping software a business can rely on is a discipline - and that discipline is the whole point.</blockquote>
<h2>Why this matters to you</h2>
<p>The gap between a demo that impresses in a meeting and software that does its job for years is exactly this discipline. Fast is only valuable if what you're left with is solid, secure, and yours to grow. The worst outcome isn't a slow build - it's inheriting a fast one that nobody can safely change.</p>
<p>That's why we pair AI speed with expert oversight on every build. The tools changed; the standards didn't.</p>
`.trim(),
  },
  {
    slug: "connect-smartsuite-to-quickbooks",
    cover: "/blog/connect-smartsuite-to-quickbooks.png",
    draft: true, // hidden for now
    title: "How to Connect SmartSuite to QuickBooks (Without Losing Your Mind)",
    excerpt:
      "The step-by-step for syncing invoices and payments between SmartSuite and QuickBooks - and the one gotcha that trips everyone up.",
    category: "SmartSuite",
    tags: ["SmartSuite", "Automation"],
    date: "2026-07-08",
    dateLabel: "July 2026",
    readMinutes: 6,
    gradient: 2,
    bodyHtml: `
<p class="lede">SmartSuite runs your operations; QuickBooks runs your books. Keeping them in sync by hand is exactly the kind of manual work you brought SmartSuite in to kill. Here's how to connect them properly.</p>
<h2>The two ways to connect them</h2>
<p>SmartSuite has no native QuickBooks integration - and that's fine, because there's a cleaner path. You bridge the two with an automation platform:</p>
<ul>
  <li><strong>Make.com</strong> - our default. Visual, affordable, and it handles the branching logic real invoicing needs.</li>
  <li><strong>n8n</strong> - when you need self-hosting or high volume.</li>
</ul>
<p>The pattern is the same: when a record changes in SmartSuite (an invoice is marked "Ready"), the scenario creates or updates the matching invoice in QuickBooks, then writes the QuickBooks ID back to SmartSuite so the two stay linked.</p>
<h2>The gotcha to watch for</h2>
<p>The mistake we see most often: syncing on every edit instead of on a clear status change. You end up with duplicate invoices and a reconciliation headache. Trigger on a single, deliberate signal - a status field flipping to "Approved" - and write the external ID straight back, so the automation always knows what it has already sent.</p>
<h2>Do it once, do it right</h2>
<p>A well-built sync is boring in the best way: invoices appear in QuickBooks the moment they're approved, payments flow back to SmartSuite, and nobody re-types anything. That's the whole point.</p>
`.trim(),
  },
  {
    slug: "make-com-vs-n8n-for-business",
    cover: "/blog/make-com-vs-n8n-for-business.png",
    title: "Make.com vs n8n for Business: Which Engine, and When",
    excerpt:
      "An automation consultant's honest take on Make.com vs n8n - not a sales pitch for either one.",
    category: "Automation",
    tags: ["Make.com", "Automation"],
    date: "2026-06-30",
    dateLabel: "June 2026",
    readMinutes: 7,
    gradient: 3,
    bodyHtml: `
<p class="lede">Make.com and n8n both connect your tools and automate the busywork. We're certified Make.com partners and we still reach for n8n on the right project. Here's how we actually decide.</p>
<h2>The short answer</h2>
<p>For most businesses, Make.com is the better starting point: it's fully hosted, visual, and quick to build in. n8n earns its place when you need self-hosting, data sovereignty, or very high volume where hosting your own runner saves real money.</p>
<h2>Choose Make.com if...</h2>
<ul>
  <li>You want zero infrastructure to manage - it's fully hosted</li>
  <li>Your team wants to see and understand the automations visually</li>
  <li>You value a huge library of ready-made app connectors</li>
</ul>
<h2>Choose n8n if...</h2>
<ul>
  <li>Data can't leave your own servers (compliance, sensitivity)</li>
  <li>You're running very high volumes and want to control hosting cost</li>
  <li>You need custom code steps and developer-grade control</li>
</ul>
<blockquote>The right engine depends on your constraints, not the logo. A good consultant tells you which fits - even when it isn't the one they're certified in.</blockquote>
<p>In practice we often run both: Make.com for the business-facing automations, n8n where the volume or the compliance rules demand it.</p>
`.trim(),
  },
  {
    slug: "reduce-manual-data-entry",
    cover: "/blog/reduce-manual-data-entry.png",
    author: "araks",
    title: "Reduce Manual Data Entry: The Real Cost and 5 Ways to Kill It",
    excerpt:
      "Teams lose roughly 240 hours a year to re-keying data. Here's where it hides and how to end it for good.",
    category: "Operations",
    tags: ["Operations", "Automation"],
    date: "2026-06-18",
    dateLabel: "June 2026",
    readMinutes: 5,
    gradient: 1,
    bodyHtml: `
<p class="lede">Manual data entry feels like a small, unavoidable tax. It isn't. It's one of the most expensive habits a growing operation keeps - and one of the easiest to remove.</p>
<h2>What it's really costing you</h2>
<p>Re-keying the same information into two or three systems burns hundreds of hours a year per person, and it's where a large share of operational errors come from. The cost isn't just time - it's the bad decisions made on data that was mistyped somewhere upstream.</p>
<h2>Where it hides</h2>
<ul>
  <li>Copying leads from a form or inbox into your CRM</li>
  <li>Re-typing invoice details between your ops tool and your accounting software</li>
  <li>Rebuilding the same report by hand every week</li>
  <li>Updating a status in three places because the tools don't talk</li>
</ul>
<h2>Five ways to kill it</h2>
<ul>
  <li>Capture data once, at the source (a form that writes straight to your system)</li>
  <li>Connect your tools so records sync automatically instead of by hand</li>
  <li>Automate the repetitive updates - status changes, follow-ups, notifications</li>
  <li>Generate reports on a schedule instead of rebuilding them</li>
  <li>Give every piece of data one home - a single source of truth</li>
</ul>
<p>None of this requires a big platform migration. It requires looking honestly at where your team re-types things, and closing those gaps one automation at a time.</p>
`.trim(),
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug && !p.draft);
}

export function getAllSlugs(): string[] {
  return posts.filter((p) => !p.draft).map((p) => p.slug);
}

/** All published posts, featured first, then newest by date. */
export function getPostsSorted(): BlogPost[] {
  return [...posts]
    .filter((p) => !p.draft)
    .sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (b.featured && !a.featured) return 1;
    return a.date < b.date ? 1 : -1;
  });
}
