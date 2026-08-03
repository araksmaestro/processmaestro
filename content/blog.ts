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
  bodyHtml: string;
};

export const AUTHOR = {
  name: "Vasken Bakalian",
  role: "Founder, Process Maestro · SmartSuite Certified Consultant · Make.com Certified Partner",
  bio: "17 years in tech. I help operations teams pick the right tools - and I'll tell you when the one you have isn't enough.",
  initials: "VB",
} as const;

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
<h2>The hard limit nobody mentions upfront</h2>
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
<p>AI writes a lot of code, and not all of it earns its place. We prune it: remove duplication, consolidate logic, and keep things readable so the next change is easy and safe. Unreviewed AI output quietly accumulates into a mess that slows everything down.</p>
<h3>Built to scale</h3>
<p>A data model and architecture that work for a demo can buckle under real volume and real users. We design the structure to hold up as you grow - sensible naming, modular pieces, and boundaries that let parts change without breaking the whole.</p>
<h3>Review and testing</h3>
<p>Every meaningful change gets human eyes, and the flows that matter get tested. "It worked when I clicked it" is not the same as "it works."</p>
<blockquote>Vibe-coding a demo is easy. Shipping software a business can rely on is a discipline - and that discipline is the whole point.</blockquote>
<h2>Why this matters to you</h2>
<p>The gap between a demo that impresses in a meeting and software that quietly does its job for years is exactly this discipline. Fast is only valuable if what you're left with is solid, secure, and yours to grow. The worst outcome isn't a slow build - it's inheriting a fast one that nobody can safely change.</p>
<p>That's why we pair AI speed with expert oversight on every build. The tools changed; the standards didn't.</p>
`.trim(),
  },
  {
    slug: "connect-smartsuite-to-quickbooks",
    cover: "/blog/connect-smartsuite-to-quickbooks.png",
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
<h2>The gotcha nobody warns you about</h2>
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
<p>Re-keying the same information into two or three systems quietly burns hundreds of hours a year per person, and it's where a large share of operational errors come from. The cost isn't just time - it's the bad decisions made on data that was mistyped somewhere upstream.</p>
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
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}

/** All posts, featured first, then newest by date. */
export function getPostsSorted(): BlogPost[] {
  return [...posts].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (b.featured && !a.featured) return 1;
    return a.date < b.date ? 1 : -1;
  });
}
