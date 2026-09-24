// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// === Starfield ===
(function createStarfield() {
  const field = document.getElementById('starfield');
  if (!field) return;

  // Cover ~3 viewport heights so stars are visible while scrolling
  const heightVh = 300;
  field.style.height = heightVh + 'vh';

  const layers = [
    { count: 180, sizeMin: 0.5, sizeMax: 1.2, opMin: 0.25, opMax: 0.6, twinkle: 0.05 },
    { count: 70,  sizeMin: 1.0, sizeMax: 1.8, opMin: 0.5,  opMax: 0.9, twinkle: 0.15 },
    { count: 18,  sizeMin: 1.8, sizeMax: 2.6, opMin: 0.8,  opMax: 1.0, twinkle: 0.4  },
  ];

  const frag = document.createDocumentFragment();

  for (const layer of layers) {
    for (let i = 0; i < layer.count; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const size = layer.sizeMin + Math.random() * (layer.sizeMax - layer.sizeMin);
      s.style.width = s.style.height = size.toFixed(2) + 'px';
      s.style.left = (Math.random() * 100).toFixed(2) + '%';
      s.style.top = (Math.random() * 100).toFixed(2) + '%';
      const opacity = layer.opMin + Math.random() * (layer.opMax - layer.opMin);
      s.style.opacity = opacity.toFixed(2);
      if (size >= 1.6) {
        s.style.boxShadow = `0 0 ${(size * 2).toFixed(1)}px rgba(255,255,255,0.5)`;
      }
      if (Math.random() < layer.twinkle) {
        s.classList.add('twinkle');
        s.style.setProperty('--dur', (2 + Math.random() * 3).toFixed(2) + 's');
        s.style.animationDelay = (Math.random() * 3).toFixed(2) + 's';
      }
      frag.appendChild(s);
    }
  }

  field.appendChild(frag);
})();

// === Project case studies ===
const projects = {
  roofing: {
    tag: 'Case Study · AI · Two-Tier Pricing',
    title: 'Roofing Quote Bot',
    sub: "The estimating assistant that knows when <em>not</em> to spend your money.",
    body: `
      <h3>The Problem</h3>
      <p>
        Roofing companies need to quote fast — but the gold-standard measurement service
        (EagleView) costs around <strong>$10 per report</strong>. Run that on every cold lead
        and the marketing spend bleeds out before a single deal closes. Owners are stuck
        choosing between slow quotes and burned margins.
      </p>

      <h3>The Solution</h3>
      <p>
        A two-tier estimating bot that protects the operator's wallet by gating the paid
        step behind real lead qualification. The workflow looks like this:
      </p>
      <ul>
        <li>
          <strong>Tier 1 — Free pre-quote (always runs).</strong> The owner drops in an
          address and job basics. The bot pulls a free Google Solar measurement, infers
          roof area and pitch, runs them through a pricing engine, and returns a
          <strong>price range</strong> (±15%) — not a fake-precise number.
        </li>
        <li>
          <strong>The Qualification Gate.</strong> Before spending a dollar, the bot
          conducts a short qualifying conversation: timeline, budget range, decision-maker
          present. Wishy-washy answers ("they seem interested") <em>do not</em> pass —
          only an explicit, qualified confirmation unlocks the next tier.
        </li>
        <li>
          <strong>Tier 2 — Contract-grade quote (only on confirmed leads).</strong> A real
          EagleView report is pulled, the estimate is re-priced on verified measurements,
          and a defensible contract number is saved to history.
        </li>
      </ul>

      <h3>How It Works Under the Hood</h3>
      <p>
        A FastAPI backend orchestrates the flow: a measurement layer (Google Solar →
        EagleView), a pricing engine that computes labor + materials + a transparent
        margin, an LLM-driven qualification module that interprets free-text answers
        without letting vague replies through, and a SQLite history of every quote with
        its tier and confirmation state.
      </p>

      <h3>The Value It Creates</h3>
      <ul>
        <li><strong>Protected margin:</strong> $10 is only spent on qualified, confirmed jobs — not on tire-kickers.</li>
        <li><strong>Faster lead response:</strong> every prospect gets a defensible pre-quote in seconds.</li>
        <li><strong>Better calibration:</strong> the contract step regularly <em>corrects</em> the estimate (one demo run went 2,350 → 2,180 sqft, 3:12 → 7:12 pitch), proving the second tier earns its cost.</li>
        <li><strong>Operator trust:</strong> the bot never quietly spends money — every paid call has explicit consent behind it.</li>
      </ul>

      <h3>Stack</h3>
      <div class="stack">
        <span>Python</span><span>FastAPI</span><span>SQLite</span>
        <span>Google Solar API</span><span>EagleView</span><span>LLM Qualification Layer</span>
        <span>Vanilla JS Demo UI</span>
      </div>
    `,
  },
  tutor: {
    tag: 'Case Study · AI · EdTech',
    title: 'Tutor Co-Pilot',
    sub: 'A planning tool for independent tutors — from idea to session plan in seconds.',
    body: `
      <h3>The Problem</h3>
      <p>
        Independent tutors spend hours every week on the unglamorous half of the job:
        planning sessions, adapting material to each student's level and interests, and
        keeping track of what they tried last time. It's the part that doesn't scale —
        and the part that quietly determines whether the student keeps coming back.
      </p>

      <h3>The Solution</h3>
      <p>
        Tutor Co-Pilot turns a <strong>student profile</strong> plus a <strong>one-line
        idea</strong> ("introduce derivatives via a velocity problem") into a structured,
        four-section session plan ready to teach — in seconds, not an hour.
      </p>
      <ul>
        <li>
          <strong>Roster &amp; profiles.</strong> Each student has a profile: level,
          goals, interests, learning style notes. New students added with a focused form.
        </li>
        <li>
          <strong>Idea Spark.</strong> The tutor types a quick prompt for the session.
          The app combines that with the profile and asks Claude to produce a plan
          tailored to <em>this</em> student — not a generic template.
        </li>
        <li>
          <strong>Draft view.</strong> A four-section session plan: warm-up, core
          concept, guided practice, independent challenge — formatted so the tutor can
          walk into the lesson and teach from it.
        </li>
      </ul>

      <h3>How It Works Under the Hood</h3>
      <p>
        React 18 + Vite frontend with a clean component split (Roster, Profile, Idea
        Spark, Draft views). The browser <em>never</em> talks to the Anthropic API
        directly — instead it hits <code>/api/anthropic/v1/messages</code>, a Vite dev
        proxy that injects the API key server-side. This keeps the key out of the
        client bundle entirely (the key lives in <code>.env.local</code>, gitignored)
        and lets the same client work locally and in production behind a real proxy.
      </p>
      <p>
        Prompt design is a focused module: the student profile is rendered into a
        structured system prompt that anchors Claude's output to the right level,
        interests, and prior context. The current model is <strong>Claude Sonnet 4.6</strong> —
        chosen for the balance of reasoning quality and latency on a real-time planning loop.
      </p>

      <h3>The Value It Creates</h3>
      <ul>
        <li><strong>Hours back per week.</strong> The planning step that used to cost 30–60 minutes per student becomes a 30-second loop.</li>
        <li><strong>Personalization at scale.</strong> Every plan is grounded in the actual student — not a recycled worksheet.</li>
        <li><strong>Lower mental load.</strong> The tutor brings the judgment; the tool brings the structure.</li>
        <li><strong>Foundation for more.</strong> Architected for a Phase 2 roadmap (Material Tweaker, Live Session nudges, Post-Session Notes, Progress Log) — same backbone, more leverage.</li>
      </ul>

      <h3>Stack</h3>
      <div class="stack">
        <span>React 18</span><span>Vite</span><span>Anthropic API</span>
        <span>Claude Sonnet 4.6</span><span>Secure Server-Side Proxy</span><span>Plain CSS</span>
      </div>
    `,
  },
  tempus: {
    tag: 'Case Study · Web · Custom Build',
    title: 'Tempus LLC Website',
    sub: 'A production-ready website for a general contracting business — designed, built, and shipped end-to-end.',
    body: `
      <p>
        <a href="https://www.tempusnow.net/" target="_blank" rel="noopener" class="case-link">
          Visit the live site → tempusnow.net
        </a>
      </p>

      <h3>The Problem</h3>
      <p>
        A general contracting business needed a real web presence — one that does the
        work of a salesperson when the owner is on a roof or in a basement. Template
        builders make the site look generic and slow; off-the-shelf options bury the
        actual craft behind stock photography and copy that could belong to any
        contractor in the country. The goal was a custom, fast, trustworthy site that
        turns visitors into qualified phone calls.
      </p>

      <h3>The Solution</h3>
      <p>
        A fully custom, multi-page Next.js site built from scratch — designed around
        the way clients actually evaluate a contractor: <em>what do you do, can I see
        proof, and how do I reach you?</em>
      </p>
      <ul>
        <li>
          <strong>Homepage</strong> with a strong hero, the company's process, and a
          curated preview of recent work that pulls visitors deeper into the site.
        </li>
        <li>
          <strong>Services</strong> page covering kitchens, bathrooms, tile &amp; stone,
          and carpentry/trim — each with a deep-link anchor so the homepage can route
          visitors straight to the work they need.
        </li>
        <li>
          <strong>Project gallery</strong> with individual case pages for completed
          jobs (e.g., backyard renovation, exterior remodel, restaurant patio build),
          each with before/after imagery and the story of the build.
        </li>
        <li>
          <strong>Contact page</strong> with direct email and click-to-call wired up,
          so a lead from a phone can become a phone call in one tap.
        </li>
        <li>
          <strong>About</strong> page that puts a face and a story on the business —
          the part templated sites can't fake.
        </li>
      </ul>

      <h3>How It Works Under the Hood</h3>
      <p>
        Built on <strong>Next.js + TypeScript</strong> with Tailwind for styling and
        Next's built-in image optimization for fast loads on real-world mobile
        connections (where most contractor leads actually browse). Every project in
        the gallery is its own route — meaning each completed job has a shareable URL
        that the owner can drop directly into a text message or quote follow-up. The
        site is statically optimized for speed and indexed cleanly for local SEO.
      </p>

      <h3>The Value It Creates</h3>
      <ul>
        <li><strong>Credibility on first impression.</strong> A custom-built site signals a custom-built business — clients pick up on it immediately.</li>
        <li><strong>Proof, not promises.</strong> The project gallery does the selling: real jobs, real outcomes, browsable in 30 seconds.</li>
        <li><strong>Lead-ready contact.</strong> Click-to-call and direct email mean no friction between "interested" and "in touch."</li>
        <li><strong>Owned, not rented.</strong> No template subscription, no platform lock-in — the codebase belongs to the business and can evolve with it.</li>
      </ul>

      <h3>Stack</h3>
      <div class="stack">
        <span>Next.js</span><span>TypeScript</span><span>Tailwind CSS</span>
        <span>Next/Image Optimization</span><span>Static Routing</span><span>Custom Design</span>
      </div>
    `,
  },
};

// === Modal logic ===
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');

function openModal(key) {
  const p = projects[key];
  if (!p) return;
  modalContent.innerHTML = `
    <span class="case-tag">${p.tag}</span>
    <h2 id="modal-title">${p.title}</h2>
    <p class="case-sub">${p.sub}</p>
    ${p.body}
  `;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal-panel').scrollTop = 0;
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('click', () => openModal(card.dataset.project));
});

modal.querySelectorAll('[data-close]').forEach((el) => {
  el.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});
