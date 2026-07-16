// ===== SLIP METADATA =====
const SLIPS_META = {
  1: {
    q1: { title: "Employee File Handling – CRUD Operations (Create, Read, Delete, Update)", tags: ["File Handling", "CRUD"] },
    q2: { title: "Student CRUD Operations using MySQL JDBC with Prepared Statements", tags: ["JDBC", "MySQL"] }
  },
  2: {
    q1: { title: "Employee Hierarchy – Employee → Manager → Sales Manager (Inheritance)", tags: ["Inheritance", "OOP"] },
    q2: { title: "Asynchronous Task Processing in Spring Boot Application", tags: ["Spring Boot", "Async"] }
  },
  3: {
    q1: { title: "Employee Payroll System – Full-Time & Part-Time using OOP", tags: ["OOP", "Inheritance"] },
    q2: { title: "MCA Admission Enquiry Form using Java Swing", tags: ["Swing", "GUI"] }
  },
  4: {
    q1: { title: "Student Management System – Registration, Grades & Display", tags: ["OOP", "CRUD"] },
    q2: { title: "Student CRUD Operations using MySQL JDBC with Prepared Statements", tags: ["JDBC", "MySQL"] }
  },
  5: {
    q1: { title: "Custom Exception – MarksOutOfBound for Marks Validation", tags: ["Exception Handling"] },
    q2: { title: "Library Management System using OOP (Add, Issue, Return Books)", tags: ["OOP", "Inheritance"] }
  },
  6: {
    q1: { title: "Academic Institution Hierarchy – Staff → Professor → HOD", tags: ["Inheritance", "OOP"] },
    q2: { title: "Servlet GET & POST Methods Simulation", tags: ["Servlet", "Networking"] }
  },
  7: {
    q1: { title: "Multithreading – Bank Account Deposit & Withdraw with Synchronization", tags: ["Multithreading", "Sync"] },
    q2: { title: "Asynchronous Task Processing in Spring Boot Application", tags: ["Spring Boot", "Async"] }
  },
  8: {
    q1: { title: "Bank Management System – Account, Deposit, Withdraw using OOP", tags: ["OOP", "Inheritance"] },
    q2: { title: "Asynchronous Task Processing in Spring Boot Application", tags: ["Spring Boot", "Async"] }
  },
  9: {
    q1: { title: "Library Management with Exception Handling (Issue & Return Books)", tags: ["OOP", "Exception"] },
    q2: { title: "TCP Socket Client-Server Echo Program", tags: ["Socket", "Networking"] }
  },
  10: {
    q1: { title: "Retail Staff Management – Worker → Supervisor → Store Manager", tags: ["Inheritance", "OOP"] },
    q2: { title: "TCP Socket Client-Server Echo Program", tags: ["Socket", "Networking"] }
  },
  11: {
    q1: { title: "Calculator Application using AWT (Add, Sub, Mul, Div)", tags: ["AWT", "GUI"] },
    q2: { title: "Student Information File Operations – CRUD", tags: ["File Handling", "CRUD"] }
  },
  12: {
    q1: { title: "Custom Exception – MarksOutOfBound for Marks Validation", tags: ["Exception Handling"] },
    q2: { title: "Employee JDBC CRUD with MySQL (Add, View, Update, Delete)", tags: ["JDBC", "MySQL"] }
  },
  13: {
    q1: { title: "Library Management with Exception Handling (Issue & Return Books)", tags: ["OOP", "Exception"] },
    q2: { title: "MCA Admission Enquiry Form using Java Swing", tags: ["Swing", "GUI"] }
  },
  14: {
    q1: { title: "Word Counter Application using AWT & Swing", tags: ["AWT", "Swing"] },
    q2: { title: "TCP Socket Client-Server Echo Program", tags: ["Socket", "Networking"] }
  },
  15: {
    q1: { title: "Multithreading – Bank Account Deposit & Withdraw with Synchronization", tags: ["Multithreading", "Sync"] },
    q2: { title: "Asynchronous Task Processing in Spring Boot Application", tags: ["Spring Boot", "Async"] }
  },
  16: {
    q1: { title: "Employee Hierarchy – Employee → Manager → Sales Manager (Inheritance)", tags: ["Inheritance", "OOP"] },
    q2: { title: "Patient Information File Operations – CRUD", tags: ["File Handling", "CRUD"] }
  },
  17: {
    q1: { title: "Digital Clock using AWT, Swing & Date Class", tags: ["AWT", "Swing"] },
    q2: { title: "MCA Admission Enquiry Form using Java Swing", tags: ["Swing", "GUI"] }
  },
  18: {
    q1: { title: "Library Management with Exception Handling (Issue & Return Books)", tags: ["OOP", "Exception"] },
    q2: { title: "Asynchronous Task Processing in Spring Boot Application", tags: ["Spring Boot", "Async"] }
  },
  19: {
    q1: { title: "Custom Exception – MarksOutOfBound for Marks Validation", tags: ["Exception Handling"] },
    q2: { title: "Employee JDBC CRUD with MySQL (Add, View, Update, Delete)", tags: ["JDBC", "MySQL"] }
  },
  20: {
    q1: { title: "Bank Management System – Account, Deposit, Withdraw using OOP", tags: ["OOP", "Inheritance"] },
    q2: { title: "Servlet GET & POST Methods Simulation", tags: ["Servlet", "Networking"] }
  }
};

// ===== APP STATE =====
let currentView = 'home';
let currentSlip = null;
let searchQuery = '';

// ===== HELPERS =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderSidebar();
  renderHome();
  bindEvents();
});

// ===== THEME INIT =====
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  // Default to dark mode if no preference is saved yet
  const isDark = savedTheme === null ? true : savedTheme === 'dark';
  
  const toggle = $('#theme-toggle');
  if (isDark) {
    document.body.classList.add('dark');
    if (toggle) toggle.textContent = '☀️';
  } else {
    document.body.classList.remove('dark');
    if (toggle) toggle.textContent = '🌙';
  }
}

// ===== RENDER SIDEBAR =====
function renderSidebar() {
  const list = $('.slip-list');
  let html = '';
  for (let i = 1; i <= 20; i++) {
    html += `<li class="slip-item" data-slip="${i}">
      <div class="slip-num">${String(i).padStart(2, '0')}</div>
      <div class="slip-label">Slip ${i}</div>
    </li>`;
  }
  if (typeof EXTRAS_RAW !== 'undefined' && EXTRAS_RAW.length > 0) {
    html += `<div class="sidebar-title" style="margin-top: 15px;">Extras</div>`;
    EXTRAS_RAW.forEach((extra, i) => {
      html += `<li class="slip-item extra-item" data-extra="${i}">
        <div class="slip-num">💡</div>
        <div class="slip-label" style="font-size:0.85rem;" title="${extra.fileName}">${extra.fileName}</div>
      </li>`;
    });
  }
  list.innerHTML = html;
}

// ===== RENDER HOME =====
function renderHome() {
  currentView = 'home';
  currentSlip = null;
  updateSidebarActive();
  const main = $('#main-area');

  const filtered = getFilteredSlips();
  if (filtered.length === 0) {
    main.innerHTML = `<div class="no-results">
      <div class="emoji">🔍</div>
      <h3>No slips found</h3>
      <p>Try a different search term</p>
    </div>`;
    return;
  }

  let cardsHtml = '';
  filtered.forEach(slip => {
    const meta = SLIPS_META[slip.id];
    cardsHtml += `<div class="slip-grid-card" data-slip="${slip.id}">
      <div class="grid-card-num">#${String(slip.id).padStart(2, '0')}</div>
      <div class="grid-card-title">${escapeHtml(meta.q1.title)}</div>
      <div class="grid-card-subtitle">OR: ${escapeHtml(meta.q2.title)}</div>
      <div class="grid-card-footer">
        <div class="dot"></div>
        <span>2 Programs · Ready to use</span>
      </div>
    </div>`;
  });

  main.innerHTML = `
    <div class="hero">
      <h1>Java Slips Solutions</h1>
      <p>All 20 practical slips with complete, ready-to-run Java programs. Just copy, paste, and execute.</p>
      <div class="hero-stats">
        <div class="hero-stat"><div class="stat-num">20</div><div class="stat-label">Slips</div></div>
        <div class="hero-stat"><div class="stat-num">40</div><div class="stat-label">Programs</div></div>
        <div class="hero-stat"><div class="stat-num">12+</div><div class="stat-label">Topics</div></div>
      </div>
    </div>
    <div class="slips-grid">${cardsHtml}</div>`;
}

// ===== RENDER EXTRA FILE =====
function renderExtra(extraIndex) {
  currentView = 'extra';
  currentSlip = null;
  updateSidebarActive();

  $$('.extra-item').forEach((el) => {
    el.classList.toggle('active', parseInt(el.dataset.extra) === extraIndex);
  });

  const main = $('#main-area');
  const extra = EXTRAS_RAW[extraIndex];
  
  if (window.innerWidth <= 768) {
    $('.sidebar')?.classList.remove('open');
    $('.sidebar-overlay')?.classList.remove('open');
  }
  window.scrollTo(0, 0);

  main.innerHTML = `
    <div class="slip-header">
      <div class="slip-header-title">
        <span class="slip-badge">Extra</span>
        <h2>${extra.fileName}</h2>
      </div>
    </div>
    
    <div class="question-card">
      <div class="question-card-header">
        <div class="question-label">
          <span class="q-badge" style="background:#8b5cf6;">Code</span>
          <span class="question-title">Included file</span>
        </div>
        <div class="question-actions">
          <button class="btn btn-copy" data-target="extra-code">📋 Copy Code</button>
          <button class="btn btn-download" data-filename="${extra.fileName}" data-target="extra-code">↓ Download</button>
        </div>
      </div>
      <div class="code-wrapper">
        <pre class="code-block" id="extra-code">${highlightJava(escapeHtml(extra.content))}</pre>
      </div>
    </div>
  `;
}

// ===== RENDER SLIP DETAIL =====
function renderSlip(slipId) {
  currentView = 'slip';
  currentSlip = slipId;
  updateSidebarActive();

  const main = $('#main-area');
  const slip = SLIPS_RAW.find(s => s.id === slipId);
  const meta = SLIPS_META[slipId];
  if (!slip || !meta) return;

  // Clean the code: keep the code exactly as-is
  const q1Code = slip.q1;
  const q2Code = slip.q2;

  const makeTagsHtml = (tags) => tags.map(t => `<span class="tag-chip">${escapeHtml(t)}</span>`).join('');

  main.innerHTML = `
    <div class="slip-view">
      <button class="back-btn" id="back-home">← All Slips</button>

      <div class="slip-header">
        <div class="slip-badge">Slip ${String(slipId).padStart(2, '0')}</div>
        <h2>Slip No. ${slipId}</h2>
      </div>

      <!-- QUESTION 1 -->
      <div class="question-card">
        <div class="question-card-header">
          <div class="question-label">
            <span class="q-badge q1">Q1</span>
            <span class="question-title">${escapeHtml(meta.q1.title)}</span>
          </div>
          <div class="question-actions">
            <button class="btn btn-copy" data-target="q1-code">📋 Copy Code</button>
            <button class="btn btn-download" data-filename="Slip${slipId}_Q1.java" data-target="q1-code">↓ Download</button>
          </div>
        </div>
        <div class="tag-chips">${makeTagsHtml(meta.q1.tags)}</div>
        <div class="code-wrapper">
          <pre class="code-block" id="q1-code">${highlightJava(escapeHtml(q1Code))}</pre>
        </div>
      </div>

      <!-- QUESTION 2 -->
      <div class="question-card">
        <div class="question-card-header">
          <div class="question-label">
            <span class="q-badge q2">Q2 (OR)</span>
            <span class="question-title">${escapeHtml(meta.q2.title)}</span>
          </div>
          <div class="question-actions">
            <button class="btn btn-copy" data-target="q2-code">📋 Copy Code</button>
            <button class="btn btn-download" data-filename="Slip${slipId}_Q2.java" data-target="q2-code">↓ Download</button>
          </div>
        </div>
        <div class="tag-chips">${makeTagsHtml(meta.q2.tags)}</div>
        <div class="code-wrapper">
          <pre class="code-block" id="q2-code">${highlightJava(escapeHtml(q2Code))}</pre>
        </div>
      </div>

      <!-- NAVIGATION -->
      <div class="nav-btns">
        ${slipId > 1 ? `<button class="btn" id="prev-slip">← Slip ${slipId - 1}</button>` : '<div></div>'}
        ${slipId < 20 ? `<button class="btn" id="next-slip">Slip ${slipId + 1} →</button>` : '<div></div>'}
      </div>
    </div>`;

  // Bind events
  $('#back-home')?.addEventListener('click', renderHome);
  $('#prev-slip')?.addEventListener('click', () => renderSlip(slipId - 1));
  $('#next-slip')?.addEventListener('click', () => renderSlip(slipId + 1));
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Close mobile sidebar
  $('.sidebar')?.classList.remove('open');
  $('.sidebar-overlay')?.classList.remove('open');
}

// ===== EVENTS =====
function bindEvents() {
  const themeToggle = $('#theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      themeToggle.textContent = isDark ? '☀️' : '🌙';
    });
  }

  document.addEventListener('click', (e) => {
    const slipItem = e.target.closest('.slip-item:not(.extra-item)');
    if (slipItem) { renderSlip(parseInt(slipItem.dataset.slip)); return; }

    const extraItem = e.target.closest('.extra-item');
    if (extraItem) { renderExtra(parseInt(extraItem.dataset.extra)); return; }

    const gridCard = e.target.closest('.slip-grid-card');
    if (gridCard) { renderSlip(parseInt(gridCard.dataset.slip)); return; }

    const copyBtn = e.target.closest('.btn-copy[data-target]');
    if (copyBtn) { handleCopy(copyBtn); return; }

    const dlBtn = e.target.closest('.btn-download[data-target]');
    if (dlBtn) { handleDownload(dlBtn); return; }
  });

  const searchInput = $('#search-input');
  searchInput?.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    if (currentView === 'home') renderHome();
  });

  $('.menu-toggle')?.addEventListener('click', () => {
    $('.sidebar')?.classList.toggle('open');
    $('.sidebar-overlay')?.classList.toggle('open');
  });

  $('.sidebar-overlay')?.addEventListener('click', () => {
    $('.sidebar')?.classList.remove('open');
    $('.sidebar-overlay')?.classList.remove('open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
      e.preventDefault();
      searchInput?.focus();
    }
    if (e.key === 'Escape' && currentView === 'slip') renderHome();
  });
}

// ===== COPY — returns clean plain text =====
function handleCopy(btn) {
  const target = document.getElementById(btn.dataset.target);
  if (!target) return;

  // textContent strips all HTML tags — gives clean code
  const text = target.textContent;

  navigator.clipboard.writeText(text).then(() => {
    showCopied(btn);
  }).catch(() => {
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showCopied(btn);
  });
}

function showCopied(btn) {
  btn.classList.add('copied');
  const orig = btn.innerHTML;
  btn.innerHTML = '✓ Copied!';
  showToast('Code copied to clipboard!');
  setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = orig; }, 2000);
}

// ===== DOWNLOAD =====
function handleDownload(btn) {
  const target = document.getElementById(btn.dataset.target);
  if (!target) return;
  const text = target.textContent;
  const filename = btn.dataset.filename || 'code.java';
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Downloaded ' + filename);
}

// ===== TOAST =====
function showToast(msg) {
  const toast = $('#toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

// ===== FILTER =====
function getFilteredSlips() {
  if (!searchQuery) return SLIPS_RAW;
  return SLIPS_RAW.filter(s => {
    const meta = SLIPS_META[s.id];
    const text = [
      'slip ' + s.id, meta.q1.title, meta.q2.title,
      ...meta.q1.tags, ...meta.q2.tags
    ].join(' ').toLowerCase();
    return text.includes(searchQuery);
  });
}

// ===== SIDEBAR ACTIVE =====
function updateSidebarActive() {
  $$('.slip-item:not(.extra-item)').forEach(el => {
    el.classList.toggle('active', currentSlip === parseInt(el.dataset.slip));
  });
  if (currentView !== 'extra') {
    $$('.extra-item').forEach(el => el.classList.remove('active'));
  }
}

// ===== ESCAPE HTML =====
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ===== SAFE JAVA SYNTAX HIGHLIGHTING =====
// Applied AFTER HTML escaping so it never corrupts the source code.
// The copy function uses textContent which strips all tags cleanly.
function highlightJava(escapedCode) {
  let code = escapedCode;

  // Step 1: Highlight multi-line comments /* ... */
  code = code.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="cmt">$1</span>');

  // Step 2: Highlight single-line comments //...
  code = code.replace(/(\/\/[^\n]*)/g, '<span class="cmt">$1</span>');

  // Step 3: Highlight string literals "..."
  code = code.replace(/(&quot;[^&]*?&quot;)/g, '<span class="str">$1</span>');

  // Step 4: Highlight annotations @Word
  code = code.replace(/(@\w+)/g, '<span class="ann">$1</span>');

  // Step 5: Highlight keywords (word-boundary safe)
  const kws = [
    'abstract','assert','boolean','break','byte','case','catch','char',
    'class','continue','default','do','double','else','enum','extends',
    'final','finally','float','for','if','implements','import','instanceof',
    'int','interface','long','new','package','private','protected','public',
    'return','short','static','super','switch','synchronized','this',
    'throw','throws','try','void','volatile','while','true','false','null'
  ].join('|');
  code = code.replace(new RegExp('\\b(' + kws + ')\\b(?![^<]*>)', 'g'), '<span class="kw">$1</span>');

  return code;
}
