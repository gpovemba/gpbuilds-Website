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
    tag: 'Case Study · AI · RAG · Estimating',
    title: 'Roofing Quote Bot',
    sub: "An estimating tool that quotes with the contractor's real numbers and real terms.",
    body: `
      <p>
        <a href="https://github.com/gpovemba/roofing-quote-bot" target="_blank" rel="noopener" class="case-link">
          View the code on GitHub →
        </a>
      </p>

      <figure class="case-shot">
        <a href="images/roofing-quote.webp" target="_blank" rel="noopener">
          <img src="images/roofing-quote.webp" width="1600" height="1000" loading="lazy"
               alt="A generated roofing quote with line items, and a private panel showing cost, profit, and margin" />
        </a>
        <figcaption>A generated quote. The customer sees the branded estimate; cost, profit, and margin stay in the private side panel.</figcaption>
      </figure>
      <div class="case-gallery">
        <figure><a href="images/roofing-builder.webp" target="_blank" rel="noopener"><img src="images/roofing-builder.webp" width="1600" height="1000" loading="lazy" alt="Quote builder step two: roofing material cards and scope checklist" /></a>
          <figcaption>Materials and scope, from the contractor's own products.</figcaption></figure>
        <figure><a href="images/roofing-dashboard.webp" target="_blank" rel="noopener"><img src="images/roofing-dashboard.webp" width="1600" height="1000" loading="lazy" alt="Dashboard with pipeline value, win rate, and recent quotes" /></a>
          <figcaption>Dashboard with pipeline and win rate.</figcaption></figure>
        <figure><a href="images/roofing-docs.webp" target="_blank" rel="noopener"><img src="images/roofing-docs.webp" width="1600" height="1000" loading="lazy" alt="Document search returning the decking replacement policy for a customer question" /></a>
          <figcaption>Document search the AI reads before writing notes.</figcaption></figure>
      </div>
      <p class="case-note">Screens show sample data. Click any image to view it full size.</p>

      <h3>The Problem</h3>
      <p>
        Roofing contractors lose evenings to estimates. Each one means measuring the roof,
        working out bundles, underlayment, drip edge, and ridge cap, adding labor, tear-off,
        dumpsters, and permits, then writing it up for the homeowner. Generic estimating
        tools don't help much: they price with industry averages instead of what this
        contractor actually pays, and they can't answer the questions homeowners ask next,
        like what the warranty covers or what happens if the decking is rotted.
      </p>

      <h3>The Solution</h3>
      <p>
        A guided, three-step quote builder backed by the contractor's own data:
      </p>
      <ul>
        <li>
          <strong>Project details.</strong> Enter the customer and address, then one click
          pulls roof measurements (area, pitch, facets, and edge lengths) from EagleView.
        </li>
        <li>
          <strong>Materials &amp; scope.</strong> Pick the roofing system and grade from the
          contractor's own product list, toggle scope items, and add optional work like
          gutters, skylight flashing, or decking replacement.
        </li>
        <li>
          <strong>Review &amp; generate.</strong> The tool builds a line-item quote and Claude
          writes the project overview and customer notes, drawing only on the company's
          uploaded documents.
        </li>
      </ul>
      <p>
        From there the contractor can edit any line, adjust margins for the job, track the
        quote as draft, sent, won, or lost, and send it as a branded PDF. An AI assistant
        can also build quotes and answer policy questions in plain conversation.
      </p>

      <h3>How It Works Under the Hood</h3>
      <p>
        <strong>Pricing from a business profile.</strong> Each contractor enters their
        suppliers, product costs, crew rates, pitch add-ons, local dumpster and permit costs,
        overhead, and markup once. The calculator turns measurements into a real material
        order: shingles by the bundle, drip edge from eave and rake length, ridge cap from
        ridge length, dumpsters from tear-off volume. When a measurement source doesn't
        return edge lengths, they're estimated from roof area and the affected lines are
        flagged. The customer sees marked-up unit prices that add up exactly to the total,
        while costs and margin stay private.
      </p>
      <p>
        <strong>Retrieval-augmented notes.</strong> Warranties, price policies, and supplier
        sheets (PDF, Word, or text) are split into section-aware passages. Search combines
        BM25 keyword ranking with optional Voyage AI embeddings, merged with reciprocal rank
        fusion. For each quote, the tool retrieves passages about the relevant warranty,
        inclusions, and likely extras, and Claude writes notes from those passages only. If
        the documents don't cover something, it says nothing rather than inventing terms.
      </p>
      <p>
        <strong>Design choice:</strong> prices never come from retrieval. Exact numbers live
        in structured data the calculator reads directly; retrieval handles the messy text
        around them. A search that picks the wrong line in a price sheet would ruin a quote,
        so the two are kept separate.
      </p>

      <h3>The Value It Creates</h3>
      <ul>
        <li><strong>Quotes in minutes:</strong> address to a priced, sendable estimate without a spreadsheet.</li>
        <li><strong>The contractor's real margins:</strong> every price comes from their own costs and markup, not industry averages.</li>
        <li><strong>Grounded customer notes:</strong> warranty and policy language comes from the company's documents, so the AI can't promise terms the business doesn't offer.</li>
        <li><strong>Professional output:</strong> itemized, branded quotes that match what homeowners expect from an established contractor.</li>
      </ul>

      <h3>Stack</h3>
      <div class="stack">
        <span>Python</span><span>FastAPI</span><span>SQLite</span>
        <span>Claude (tool use)</span><span>RAG · BM25 + Voyage embeddings</span>
        <span>EagleView</span><span>Vanilla JS</span>
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

      <figure class="case-shot">
        <a href="https://www.tempusnow.net/" target="_blank" rel="noopener">
          <img src="images/tempus-home.webp" width="1600" height="1103" loading="lazy"
               alt="Tempus LLC homepage: headline, owner and direct phone number, estimate buttons, and a featured backyard project" />
        </a>
        <figcaption>The homepage: a clear promise, the owner's name and direct line up front, and a featured project as proof.</figcaption>
      </figure>

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
