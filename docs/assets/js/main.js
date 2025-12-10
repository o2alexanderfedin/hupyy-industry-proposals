// Hupyy Industry Reports - Main JavaScript

// Industry data with metadata
const industriesData = [
  {
    id: 'financial-services',
    name: 'Financial Services',
    market: '$5-10B',
    tier: 'tier1',
    tags: ['regulated', 'tier1'],
    summary: 'The $33.8T global financial services market faces critical challenges: 91% struggle with knowledge management, compliance costs at 10% of revenue, and $4.6B in regulatory penalties (2024). Hupyy delivers mathematical certainty for transaction verification and automated compliance proofs.',
    differentiator: 'Formal verification of transaction correctness and regulatory compliance with mathematical proofs, reducing compliance costs by 35-40% while eliminating entire classes of financial errors.'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    market: '$4-8B',
    tier: 'tier1',
    tags: ['regulated', 'safety-critical', 'tier1'],
    summary: 'Healthcare faces a $33.45B EHR market plagued by interoperability failures, 125K preventable deaths annually from drug interactions, and HIPAA 2025 compliance mandates. Hupyy provides formally verified clinical decision support and FDA-compliant medical device software.',
    differentiator: 'Mathematically proven drug interaction detection and formally verified medical protocol correctness, moving from statistical probability to 100% certainty in clinical decision support.'
  },
  {
    id: 'enterprise-security',
    name: 'Enterprise Security',
    market: '$8-15B',
    tier: 'tier1',
    tags: ['tier1', 'safety-critical'],
    summary: 'The $218.98B cybersecurity market struggles with 4.8M unfilled roles, 280-day breach response times, and 48% AI-generated code vulnerabilities. Hupyy offers formal verification of security protocols, zero-trust policies, and provably secure code generation.',
    differentiator: 'Mathematical proof of security protocol correctness and formally verified zero-trust configurations, providing provably-secure systems instead of probabilistic detection.'
  },
  {
    id: 'legal-services',
    name: 'Legal Services',
    market: '$0.5-1B',
    tier: 'tier2',
    tags: ['regulated', 'tier2'],
    summary: 'The $1.05T legal services market suffers from 17-33% LLM hallucination rates in legal research, 47% citation fraud, and $4.6B regulatory penalties. Hupyy delivers verified legal search with 0% hallucinations and mathematical proof of contract validity.',
    differentiator: 'Formal verification eliminates legal research hallucinations entirely, providing mathematical proofs of contract validity and legal reasoning chains with cryptographic certainty.'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    market: '$15-25B',
    tier: 'tier2',
    tags: ['regulated', 'safety-critical', 'tier2'],
    summary: 'Manufacturing faces exponential software complexity (200M+ lines of code per vehicle), ISO 26262 and DO-178C certification mandates, and 70% manual SOP management. Hupyy automates safety-critical verification, reducing certification costs 35-40%.',
    differentiator: 'Formal verification for ASIL-D automotive and DO-178C aerospace systems, with C++ to C transpilation enabling automated verification of safety-critical embedded systems.'
  },
  {
    id: 'government-defense',
    name: 'Government & Defense',
    market: '$6-11B',
    tier: 'tier1',
    tags: ['regulated', 'safety-critical', 'tier1'],
    summary: 'Government and defense require FedRAMP High authorization, CMMC Level 3 certification, and EAL7 Common Criteria compliance. Hupyy provides classified document search, formal verification for weapons systems, and autonomous SE for mission-critical software.',
    differentiator: 'Only platform offering EAL7 certification pathway with formal verification of classified systems, weapons software, and cryptographic implementations—capabilities no commercial competitor possesses.'
  },
  {
    id: 'education-research',
    name: 'Education & Research',
    market: '$1.8-4.2B',
    tier: 'tier3',
    tags: ['tier3'],
    summary: 'Academia faces a 70% research reproducibility crisis, fragmented knowledge across 50+ LMS platforms, and FERPA compliance complexity. Hupyy integrates with Canvas (50% market share) and provides verified RAG for research discovery with mathematical reproducibility proofs.',
    differentiator: 'Formal verification for research reproducibility and theorem proving, transforming academic software quality from best-effort to mathematically proven correctness.'
  },
  {
    id: 'ai-ml-operations',
    name: 'AI/ML Operations',
    market: '$10-20B',
    tier: 'tier1',
    tags: ['tier1'],
    summary: 'MLOps market explodes from $3B to $89B (39.7% CAGR) but faces 0.7-30% LLM hallucination rates, 75% legal query errors, and no correctness guarantees. Hupyy\'s Verified RAG provides 0% hallucinations with SMT solver-based mathematical proofs.',
    differentiator: 'Only platform delivering mathematical certainty instead of statistical probability for RAG systems, eliminating hallucinations entirely through formal verification with SMT solvers.'
  },
  {
    id: 'software-development',
    name: 'Software Development',
    market: '$16.2B',
    tier: 'tier2',
    tags: ['tier2'],
    summary: 'DevOps market grows 19.7% CAGR to $81B but 61% face environmental instability, 29.6% AI-generated fixes introduce bugs, and only 25% practice TDD. Hupyy\'s Autonomous SE platform provides formally verified code generation across the entire SDLC.',
    differentiator: 'Full SDLC formal verification from requirements through deployment, with C++ formal verifier (50% complete) and autonomous SE requiring zero human review for verified correctness.'
  },
  {
    id: 'energy-utilities',
    name: 'Energy & Utilities',
    market: '$3-6B',
    tier: 'tier3',
    tags: ['regulated', 'safety-critical', 'tier3'],
    summary: 'Energy sector faces $230B digital utilities market, 70% increase in cyber attacks, 20-30 year SCADA legacy systems, and NERC CIP compliance for 1,636 entities. Hupyy delivers formal verification for SCADA control logic and grid stability guarantees.',
    differentiator: 'Mathematical proof of SCADA command correctness and grid stability, enabling formally verified control systems for critical infrastructure with provable security properties.'
  }
];

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeSearch();
  initializeFilters();
  renderIndustries(industriesData);
});

// Search functionality
function initializeSearch() {
  const searchBox = document.getElementById('searchBox');
  if (!searchBox) return;

  searchBox.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    filterIndustries(query);
  });
}

// Filter functionality
function initializeFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Get filter value
      const filter = this.dataset.filter;

      // Apply filter
      applyFilter(filter);
    });
  });
}

// Apply filter to industries
function applyFilter(filter) {
  const cards = document.querySelectorAll('.industry-card');

  cards.forEach(card => {
    if (filter === 'all') {
      card.style.display = 'flex';
    } else {
      const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];
      if (tags.includes(filter)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    }
  });
}

// Filter industries by search query
function filterIndustries(query) {
  const cards = document.querySelectorAll('.industry-card');

  cards.forEach(card => {
    const name = card.querySelector('h3').textContent.toLowerCase();
    const summary = card.querySelector('.summary').textContent.toLowerCase();

    if (name.includes(query) || summary.includes(query)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Render industries
function renderIndustries(industries) {
  const grid = document.getElementById('industriesGrid');
  if (!grid) return;

  grid.innerHTML = industries.map(industry => createIndustryCard(industry)).join('');
}

// Create industry card HTML
function createIndustryCard(industry) {
  const tags = industry.tags.join(',');

  return `
    <div class="industry-card" data-tags="${tags}">
      <div class="card-header">
        <img src="assets/images/${industry.id}-icon.svg" alt="${industry.name}" class="industry-icon" onerror="this.src='assets/images/default-icon.svg'">
        <h3>${industry.name}</h3>
        <span class="market-badge">${industry.market} SAM</span>
      </div>
      <div class="card-body">
        <p class="summary">${industry.summary}</p>
        <div class="key-benefit">
          <strong>Key Differentiator:</strong> ${industry.differentiator}
        </div>
      </div>
      <div class="card-actions">
        <a href="reports/${industry.id}.html" class="btn btn-primary">View Report</a>
        <a href="pdfs/${industry.id}.pdf" class="btn btn-secondary" download>Download PDF</a>
        <a href="markdown/${industry.id}-proposal.md" class="btn btn-tertiary" download>Download MD</a>
      </div>
    </div>
  `;
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Print report functionality
function printReport() {
  window.print();
}

// Export to PDF (browser print to PDF)
function exportToPDF() {
  window.print();
}
