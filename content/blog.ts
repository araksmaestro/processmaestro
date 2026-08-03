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
  gradient?: 1 | 2 | 3; // placeholder cover gradient variant
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
    slug: "connect-smartsuite-to-quickbooks",
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
