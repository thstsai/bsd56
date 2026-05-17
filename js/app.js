/* BSD56 App Logic */

// ── Firebase Sync ─────────────────────────────────────────
let _db = null;

function initFirebase() {
  if (typeof FIREBASE_CONFIG === 'undefined') return;
  if (FIREBASE_CONFIG.apiKey === 'YOUR_API_KEY') return;
  try {
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    _db = firebase.firestore();
  } catch(e) { /* continue without cloud sync */ }
}

function getStudentId() {
  let id = localStorage.getItem('bsd56_student_id');
  if (!id) {
    id = 'stu_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
    localStorage.setItem('bsd56_student_id', id);
  }
  return id;
}

function getStudentName() {
  return localStorage.getItem('bsd56_student_name') || '';
}

function syncToFirebase() {
  if (!_db) return;
  const name = getStudentName();
  if (!name) return;
  _db.collection('students').doc(getStudentId()).set({
    name,
    progress: getProgress(),
    lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
  }, { merge: true }).catch(() => {});
}

// ── Student Name Modal ────────────────────────────────────
function initStudentName() {
  if (!getStudentName()) {
    const modal = document.getElementById('name-modal');
    if (modal) { modal.style.display = 'flex'; document.getElementById('name-input').focus(); }
  } else {
    prefillNameFields();
  }
}

function submitStudentName() {
  const input = document.getElementById('name-input');
  const name = (input?.value || '').trim();
  if (!name) { input?.focus(); return; }
  localStorage.setItem('bsd56_student_name', name);
  document.getElementById('name-modal').style.display = 'none';
  prefillNameFields();
  syncToFirebase();
}

function prefillNameFields() {
  const name = getStudentName();
  const el = document.getElementById('inp-name');
  if (el && !el.value) el.value = name;
}

// ── Navigation ───────────────────────────────────────────
const NAV_LINKS    = document.querySelectorAll('.nav-links a[data-section]');
const SECTIONS     = document.querySelectorAll('.section');
const HOME_SECTION = document.getElementById('section-home');

function showSection(id) {
  // BUG FIX: home section must be hidden when showing other sections
  HOME_SECTION.style.display = (id === 'home') ? '' : 'none';
  SECTIONS.forEach(s => s.classList.toggle('active', s.id === 'section-' + id));
  NAV_LINKS.forEach(a => a.classList.toggle('active', a.dataset.section === id));
  if (id !== 'home') window.scrollTo(0, 0);
}

NAV_LINKS.forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  showSection(a.dataset.section);
}));

// ── Progress (localStorage) ───────────────────────────────
function getProgress() {
  try { return JSON.parse(localStorage.getItem('bsd56_progress') || '{}'); }
  catch { return {}; }
}
function saveProgress(p) { localStorage.setItem('bsd56_progress', JSON.stringify(p)); }
function getCompletedCount() { return Object.values(getProgress()).filter(Boolean).length; }
function updateProgressBadge() {
  const el = document.getElementById('progress-badge');
  if (el) el.textContent = `進度 ${getCompletedCount()}/12`;
}

// ── Toggle week done (no btn param — uses DOM id) ─────────
function toggleWeekDone(id) {
  const prog = getProgress();
  prog[id] = !prog[id];
  saveProgress(prog);
  updateProgressBadge();
  syncToFirebase();
  // update the button inside an open modal
  const btn = document.getElementById('done-btn-' + id);
  if (btn) {
    btn.className = `btn ${prog[id] ? 'btn-success' : 'btn-outline'}`;
    btn.textContent = prog[id] ? '✅ 已標記完成' : '○ 標記為完成';
  }
  renderCurriculum();
  renderProgress();
  renderHome();
}

// ── Scoring Analysis ──────────────────────────────────────
function renderScoring() {
  const container = document.getElementById('scoring-container');
  if (!container) return;

  const overviewHtml = BSD56Data.scoringAnalysis.modules.map(m => `
    <div class="score-module-card ${m.cls}">
      <div class="score-pct">${m.pct}%</div>
      <div class="score-name">${m.name}</div>
      <div class="score-tip">${m.tip}</div>
    </div>`).join('');

  const tablesHtml = BSD56Data.scoringAnalysis.modules.map(m => `
    <div class="card" style="margin-bottom:1rem;">
      <div class="card-header">
        <span class="badge-module badge-${m.cls}">${m.name}</span>
        ${m.label}（佔總分約 ${m.pct}%）
      </div>
      <div class="card-body" style="padding:0;">
        <table class="score-table">
          <thead><tr><th>評分項目</th><th>估計分數</th><th>難易度</th><th>入門選手取分策略</th></tr></thead>
          <tbody>${m.topics.map(t => `
            <tr>
              <td>${t.name}</td>
              <td><strong>${t.score}分</strong></td>
              <td><div class="difficulty-bar">${Array.from({length:5},(_,i)=>`<div class="diff-dot ${i<t.diff?'filled':'empty'}"></div>`).join('')}</div></td>
              <td><span class="badge badge-${t.badge}">${{easy:'容易',medium:'中等',hard:'困難',expert:'挑戰'}[t.badge]}</span> ${t.strategy}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`).join('');

  container.innerHTML = `
    <div class="scoring-overview">${overviewHtml}</div>
    <div class="strategy-box">
      <h4>⚡ 入門選手最佳得分策略</h4>
      <ul>
        <li><strong>SA&amp;DB：</strong>先完成 Use Case 圖 + 資料字典（格式化工作，穩定得分），再精雕 ER 圖正規化</li>
        <li><strong>軟體設計：</strong>登入系統 + 基礎 CRUD 必須完整，特殊功能（地圖/Webhook）有時間才做</li>
        <li><strong>App 設計：</strong>先讓清單頁面顯示資料，再接 API，時間夠才做特殊功能</li>
        <li><strong>通用原則：</strong>完整的簡單功能 &gt; 不完整的複雜功能；任何功能都不要只做一半</li>
      </ul>
    </div>
    ${tablesHtml}`;
}

// ── Curriculum Grid ───────────────────────────────────────
function renderCurriculum() {
  const grid = document.getElementById('curriculum-grid');
  if (!grid) return;
  const prog = getProgress();
  const modCls = { db:'mod-db', sw:'mod-sw', app:'mod-app', all:'mod-all' };

  grid.innerHTML = BSD56Data.weeks.map(w => {
    const done = prog[w.id];
    const stars = Array.from({length:5},(_,i)=>
      `<span class="${i<w.diff?'star-filled':'star-empty'}">★</span>`).join('');
    const answerBadge = w.answersReleased
      ? `<span class="answer-released-badge">💡 解答已開放</span>` : '';
    return `
      <div class="week-card ${modCls[w.mod]} ${done?'completed':''}"
           data-week="${w.id}" onclick="openWeekDetail(${w.id})">
        <div class="check-icon">✓</div>
        <div class="week-num">第 ${w.week} 週 · <span class="badge-module badge-${w.mod}">${w.modName}</span>${answerBadge}</div>
        <div class="week-title">${w.title}</div>
        <div class="week-desc">${w.desc}</div>
        <div class="week-meta">
          <div class="difficulty">${stars}</div>
          <small style="color:var(--text-muted)">⏱ ${w.hours}小時</small>
        </div>
      </div>`;
  }).join('');
}

// ── Week Detail Modal ─────────────────────────────────────
let _currentWeekId = null;

function openWeekDetail(id) {
  _currentWeekId = id;
  const week = BSD56Data.weeks.find(w => w.id === id);
  if (!week) return;
  const modal = document.getElementById('week-modal');
  const modCls = { db:'mod-db', sw:'mod-sw', app:'mod-app', all:'mod-all' };

  // Objectives + Topics tab
  const objHtml = `
    <h4 style="margin-bottom:.75rem;">🎯 本週學習目標</h4>
    <ul class="objectives-list">
      ${week.objectives.map(o=>`<li><span class="obj-icon">✓</span>${o}</li>`).join('')}
    </ul>
    <h4 style="margin:1rem 0 .75rem;">📚 技術重點</h4>
    <ul class="topics-list">${week.topics.map(t=>`<li>▸ ${t}</li>`).join('')}</ul>`;

  // Exercises tab
  const answerBlock = week.answersReleased
    ? (q) => `
          <div class="answer-toggle">
            <button class="btn-show-answer" onclick="toggleAnswer(this)">💡 顯示解答</button>
            <div class="answer-content">
              <strong style="color:var(--success)">✅ 解答：</strong>
              <pre style="white-space:pre-wrap;font-family:inherit;margin:.4rem 0 0;font-size:.8rem;">${escHtml(q.answer)}</pre>
            </div>
          </div>`
    : () => `<div class="answer-locked">🔒 解答尚未開放 — 老師批改作業後將於每週五線上討論時公布</div>`;

  const exHtml = week.exercises.map((ex,ei) => `
    <div class="exercise-item">
      <div class="exercise-header" onclick="toggleExercise(this)">
        <span>📝 ${ex.title}</span><span class="toggle-icon">▼</span>
      </div>
      <div class="exercise-body">
        ${ex.questions.map((q,qi) => `
          <div class="exercise-q">
            <strong>問題 ${qi+1}</strong>
            <pre style="white-space:pre-wrap;font-family:inherit;margin:.4rem 0 0;font-size:.82rem;">${escHtml(q.q)}</pre>
          </div>
          ${answerBlock(q)}
          ${qi < ex.questions.length-1 ? '<hr style="margin:.75rem 0;border-color:var(--border);">' : ''}`).join('')}
      </div>
    </div>`).join('');

  // Code examples tab
  const codeHtml = week.codeExamples.map(ex => `
    <div class="code-block">
      <div class="code-header">
        <span class="lang">${ex.lang}</span>
        <span style="flex:1;margin:0 .5rem;">${ex.label}</span>
        <button class="btn-copy" onclick="copyCode(this)">複製</button>
      </div>
      <pre><code class="hlcode" data-lang="${ex.lang.toLowerCase()}">${escHtml(ex.code)}</code></pre>
    </div>`).join('');

  // Test data tab
  const tbl = week.testData.table;
  const dataHtml = `
    <p style="font-size:.875rem;color:var(--text-muted);margin-bottom:.75rem;">${week.testData.desc}</p>
    ${tbl ? `<table class="data-table">
      <thead><tr>${tbl.headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${tbl.rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>` : ''}`;

  // Homework tab
  const prog = getProgress();
  const done = prog[id];
  const issueTitle = encodeURIComponent(`Week ${id} 作業繳交 [請填入姓名]`);
  const issueBody  = encodeURIComponent(
    `**Week ${id}：${week.title}**\n\n學員姓名：\nGitHub Repo：\n說明：\n\n---\n作業項目：\n` +
    week.homework.requirements.map(r=>'- '+r).join('\n'));
  const hwHtml = `
    <div class="alert alert-info">📋 <strong>${week.homework.title}</strong></div>
    <ul class="objectives-list">
      ${week.homework.requirements.map(r=>`<li><span class="obj-icon">📌</span>${r}</li>`).join('')}
    </ul>
    <div style="margin-top:1.25rem;display:flex;gap:.75rem;flex-wrap:wrap;align-items:center;">
      <button class="btn ${done?'btn-success':'btn-outline'}" id="done-btn-${id}" onclick="toggleWeekDone(${id})">
        ${done?'✅ 已標記完成':'○ 標記為完成'}
      </button>
      <a href="https://github.com/thstsai/BSD56/issues/new?title=${issueTitle}&body=${issueBody}"
         target="_blank" class="btn btn-accent">📤 繳交作業（GitHub Issues）</a>
    </div>`;

  // Prev / Next navigation
  const hasPrev = id > 1, hasNext = id < BSD56Data.weeks.length;
  const navHtml = `
    <div class="week-nav">
      <button class="btn btn-outline btn-sm" onclick="navigateWeek(-1)" ${hasPrev?'':'disabled'}>
        ← 上一週
      </button>
      <span style="color:rgba(255,255,255,.7);font-size:.8rem;">${id} / ${BSD56Data.weeks.length}</span>
      <button class="btn btn-outline btn-sm" onclick="navigateWeek(1)" ${hasNext?'':'disabled'}>
        下一週 →
      </button>
    </div>`;

  // Inject into modal
  modal.querySelector('.week-detail-header').className = `week-detail-header ${modCls[week.mod]}`;
  modal.querySelector('.week-detail-title').textContent = `第 ${week.week} 週：${week.title}`;
  modal.querySelector('.week-detail-sub').innerHTML = `
    <span class="badge-module badge-${week.mod}" style="background:rgba(255,255,255,.25);">${week.modName}</span>
    &nbsp;難度：${'★'.repeat(week.diff)}${'☆'.repeat(5-week.diff)}&nbsp;⏱ ${week.hours}小時`;
  modal.querySelector('.week-nav-wrapper').innerHTML = navHtml;

  modal.querySelector('#tab-objectives').innerHTML = objHtml;
  modal.querySelector('#tab-exercises').innerHTML  = exHtml;
  modal.querySelector('#tab-code').innerHTML       = codeHtml;
  modal.querySelector('#tab-data').innerHTML       = dataHtml;
  modal.querySelector('#tab-homework').innerHTML   = hwHtml;

  switchTab(modal.querySelector('.detail-tab[data-tab="tab-objectives"]'));
  applyHighlighting(modal);

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function navigateWeek(delta) {
  const next = _currentWeekId + delta;
  if (next >= 1 && next <= BSD56Data.weeks.length) openWeekDetail(next);
}

function closeWeekDetail() {
  document.getElementById('week-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function switchTab(el) {
  const modal = document.getElementById('week-modal');
  modal.querySelectorAll('.detail-tab').forEach(t => t.classList.remove('active'));
  modal.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  modal.querySelector('#' + el.dataset.tab).classList.add('active');
}

function toggleExercise(header) {
  const body = header.nextElementSibling;
  const icon = header.querySelector('.toggle-icon');
  body.classList.toggle('open');
  icon.textContent = body.classList.contains('open') ? '▲' : '▼';
}

function toggleAnswer(btn) {
  const content = btn.nextElementSibling;
  content.classList.toggle('show');
  btn.textContent = content.classList.contains('show') ? '🙈 隱藏解答' : '💡 顯示解答';
}

function copyCode(btn) {
  const pre = btn.closest('.code-block').querySelector('pre');
  navigator.clipboard.writeText(pre.textContent).then(() => {
    btn.textContent = '✓ 已複製';
    setTimeout(() => btn.textContent = '複製', 2000);
  }).catch(() => {
    btn.textContent = '複製失敗';
    setTimeout(() => btn.textContent = '複製', 2000);
  });
}

// ── Simple Syntax Highlighting ────────────────────────────
const HL_RULES = {
  sql: [
    [/--[^\n]*/g, 'cm'],
    [/'[^']*'/g, 'str'],
    [/\b(SELECT|FROM|WHERE|JOIN|INNER|LEFT|ON|AND|OR|NOT|IN|AS|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|DROP|ALTER|PROCEDURE|IF|ELSE|BEGIN|END|DECLARE|EXEC|GO|USE|WITH|CASE|WHEN|THEN|ORDER|BY|GROUP|HAVING|DISTINCT|TOP|NULL|PRIMARY|KEY|FOREIGN|REFERENCES|CONSTRAINT|DEFAULT|IDENTITY|UNIQUE|CHECK|NVARCHAR|INT|DECIMAL|DATETIME2|DATE|BIT|VARCHAR)\b/gi, 'kw'],
    [/\b\d+(\.\d+)?\b/g, 'num'],
  ],
  csharp: [
    [/\/\/[^\n]*/g, 'cm'],
    [/"(?:[^"\\]|\\.)*"/g, 'str'],
    [/\b(using|namespace|class|public|private|protected|static|void|int|string|bool|var|new|return|if|else|for|foreach|while|try|catch|finally|throw|null|true|false|async|await|override|abstract|interface|readonly|const|this|base|out|ref|is|as|typeof|default)\b/g, 'kw'],
    [/\b(SqlConnection|SqlCommand|SqlDataAdapter|DataTable|MessageBox|Form|Button|TextBox|DataGridView|Timer|List|Dictionary|DateTime|Task|SHA256|Encoding|Regex)\b/g, 'tp'],
  ],
  kotlin: [
    [/\/\/[^\n]*/g, 'cm'],
    [/"(?:[^"\\]|\\.)*"/g, 'str'],
    [/\b(fun|val|var|class|object|interface|when|if|else|for|while|return|null|true|false|override|private|public|companion|data|sealed|suspend|by|in|is|as|try|catch|import|init|get|set|inner)\b/g, 'kw'],
    [/\b(Activity|Fragment|RecyclerView|Adapter|ViewHolder|ViewModel|Retrofit|Context|Intent|Bundle|View|TextView|Button|ImageView|NavController|LifecycleScope|Coroutine|Flow)\b/g, 'tp'],
  ],
};
HL_RULES['c#'] = HL_RULES.csharp;

function applyHighlighting(root) {
  root.querySelectorAll('.hlcode').forEach(el => {
    const lang = (el.dataset.lang || '').toLowerCase().replace(/c#/, 'csharp');
    const rules = HL_RULES[lang];
    if (!rules) return;
    let html = el.innerHTML; // already HTML-escaped
    // Apply rules sequentially — use placeholder trick to avoid re-matching
    const placeholders = [];
    rules.forEach(([re, cls]) => {
      html = html.replace(re, m => {
        const ph = `\x00${placeholders.length}\x00`;
        placeholders.push(`<span class="${cls}">${m}</span>`);
        return ph;
      });
    });
    // Restore placeholders
    html = html.replace(/\x00(\d+)\x00/g, (_, i) => placeholders[+i]);
    el.innerHTML = html;
  });
}

// ── Progress Section ──────────────────────────────────────
function renderProgress() {
  const container = document.getElementById('progress-container');
  if (!container) return;
  const prog  = getProgress();
  const total = BSD56Data.weeks.length;
  const done  = Object.values(prog).filter(Boolean).length;
  const pct   = Math.round(done / total * 100);
  const modColors = { db:'var(--module-db)', sw:'var(--module-sw)', app:'var(--module-app)', all:'var(--module-all)' };

  container.innerHTML = `
    <div class="progress-overview">
      <div class="prog-stat"><div class="prog-stat-num">${done}</div><div class="prog-stat-label">已完成週次</div></div>
      <div class="prog-stat"><div class="prog-stat-num">${total-done}</div><div class="prog-stat-label">待完成週次</div></div>
      <div class="prog-stat"><div class="prog-stat-num">${pct}%</div><div class="prog-stat-label">完成率</div></div>
    </div>
    <div class="week-progress-bar" style="height:12px;margin-bottom:1.5rem;">
      <div class="week-progress-fill" style="width:${pct}%"></div>
    </div>
    <div class="card">
      <div class="card-header">📋 週次進度追蹤（勾選即儲存）</div>
      <div class="card-body" style="padding:.75rem;">
        ${BSD56Data.weeks.map(w => `
          <div class="progress-week-row" onclick="openWeekDetail(${w.id}); showSection('curriculum');">
            <input type="checkbox" ${prog[w.id]?'checked':''}
              onclick="event.stopPropagation(); toggleWeekDone(${w.id})"
              style="accent-color:${modColors[w.mod]}">
            <span class="progress-week-label"><strong>W${w.week}</strong> ${w.title}</span>
            <span class="badge-module badge-${w.mod} progress-week-badge">${w.modName}</span>
            <small style="color:var(--text-muted);white-space:nowrap;">⏱${w.hours}h</small>
          </div>`).join('')}
      </div>
    </div>`;
}

// ── Resources Section ─────────────────────────────────────
const REPO_RAW = 'https://github.com/thstsai/BSD56/raw/main/';

const RESOURCES = [
  {
    group: '55分區賽試題', badge: 'db', color: 'mod-db',
    desc: 'ZCharge Plan — EV充電網路管理系統',
    items: [
      { name: 'SA&DB 試題 & 評分表', path: '55分區賽試題/01 SA&DB Design/SA&DB Design Request Form&Marking Sheet.pdf', icon: '📄' },
      { name: 'Software 試題 & 評分表', path: '55分區賽試題/02 Software Design/Software Design Request Form&Marking Sheet.pdf', icon: '📄' },
      { name: 'App 試題 & 評分表', path: '55分區賽試題/03 App Design/App Design Request Form&Marking Sheet.pdf', icon: '📄' },
      { name: 'ZCharge Plan 資料 (Excel)', path: '55分區賽試題/01 SA&DB Design/Data/ZCharge Plan.xlsx', icon: '📊' },
      { name: 'Sensor 範本 (JSON)', path: '55分區賽試題/01 SA&DB Design/Data/sensor_template.json', icon: '📋' },
      { name: 'Zyberion Style Guide', path: '55分區賽試題/02 Software Design/Data/Zyberion Style Guide.pdf', icon: '🎨' },
    ]
  },
  {
    group: '55全國賽試題', badge: 'sw', color: 'mod-sw',
    desc: 'ZCharge + ZPlus Plan — 整合系統（7個模組）',
    items: [
      { name: '全國賽完整試題 (PDF)', path: '55全國賽試題/55全國賽_09商務軟體設計試題.pdf', icon: '📄' },
    ]
  },
  {
    group: '56分區賽試題', badge: 'app', color: 'mod-app',
    desc: 'LinkOne — 企業社交平台（含內容審核與貼圖商城）',
    items: [
      { name: 'SA&DB 試題 & 評分表', path: '56分區賽試題/01 SA&DB Design/SA&DB Design Request Form&Marking Sheet.pdf', icon: '📄' },
      { name: 'Software 試題 & 評分表', path: '56分區賽試題/02 Software Design/Software Design Request Form&Marking Sheet.pdf', icon: '📄' },
      { name: 'App 試題 & 評分表', path: '56分區賽試題/03 App Design/App Design Request Form&Marking Sheet.pdf', icon: '📄' },
      { name: '聊天紀錄 chat_0001.csv', path: '56分區賽試題/01 SA&DB Design/Data/ChatRecord/chat_0001.csv', icon: '💬' },
      { name: '聊天紀錄 chat_0002.csv', path: '56分區賽試題/01 SA&DB Design/Data/ChatRecord/chat_0002.csv', icon: '💬' },
      { name: '聊天紀錄 chat_0003~0009 (其餘)', path: '56分區賽試題/01 SA&DB Design/Data/ChatRecord/', icon: '💬' },
      { name: '廣告詞庫', path: '56分區賽試題/02 Software Design/Data/Words/广告.txt', icon: '🚫' },
      { name: '政治類詞庫', path: '56分區賽試題/02 Software Design/Data/Words/政治类.txt', icon: '🚫' },
      { name: '色情類詞庫', path: '56分區賽試題/02 Software Design/Data/Words/色情类.txt', icon: '🚫' },
      { name: '涉槍涉爆詞庫', path: '56分區賽試題/02 Software Design/Data/Words/涉枪涉爆.txt', icon: '🚫' },
      { name: 'SHLife Style Guide', path: '56分區賽試題/02 Software Design/Data/SHLife Style Guide.pdf', icon: '🎨' },
    ]
  },
  {
    group: '開發工具', badge: 'all', color: 'mod-all',
    desc: '競賽指定工具與學習資源連結',
    items: [
      { name: 'SQL Server 2022 Developer', path: 'https://www.microsoft.com/en-us/sql-server/sql-server-downloads', icon: '🗄', external: true },
      { name: 'Visual Studio 2022 Community', path: 'https://visualstudio.microsoft.com/downloads/', icon: '💻', external: true },
      { name: 'Android Studio Ladybug', path: 'https://developer.android.com/studio', icon: '📱', external: true },
      { name: 'draw.io (ER圖/Use Case圖)', path: 'https://app.diagrams.net/', icon: '📐', external: true },
      { name: 'GMap.NET (地圖套件 NuGet)', path: 'https://www.nuget.org/packages/GMap.NET.WinForms', icon: '🗺', external: true },
    ]
  }
];

function renderResources() {
  const container = document.getElementById('resources-container');
  if (!container) return;

  container.innerHTML = `
    <div class="alert alert-warning">
      ⚠ 資料庫備份檔 (.bak) 因超過 GitHub 100MB 限制未包含在此，請向指導老師索取
      （55分區：Zyberion_ANM.bak 45MB、56分區：SHLife_ANM.bak 91MB、LinkOne.bak 157MB）
    </div>
    ${RESOURCES.map(g => `
      <div class="card" style="margin-bottom:1.25rem;">
        <div class="card-header">
          <span class="badge-module badge-${g.badge}">${g.group}</span>
          <span style="color:var(--text-muted);font-weight:400;margin-left:.5rem;">${g.desc}</span>
        </div>
        <div class="card-body" style="padding:.5rem .75rem;">
          ${g.items.map(item => {
            const href = item.external ? item.path
              : REPO_RAW + item.path.split('/').map(s => encodeURIComponent(s)).join('/');
            return `
              <a href="${href}" target="_blank" class="resource-link" rel="noopener">
                <span>${item.icon}</span>
                <span class="resource-name">${item.name}</span>
                <span class="resource-arrow">${item.external ? '↗' : '⬇'}</span>
              </a>`;
          }).join('')}
        </div>
      </div>`).join('')}`;
}

// ── Home Section ──────────────────────────────────────────
function renderHome() {
  const el = document.getElementById('home-week-cards');
  if (!el) return;
  const prog     = getProgress();
  const modCls   = { db:'mod-db', sw:'mod-sw', app:'mod-app', all:'mod-all' };
  const upcoming = BSD56Data.weeks.filter(w => !prog[w.id]).slice(0, 3);

  el.innerHTML = upcoming.length
    ? upcoming.map(w => {
        const answerBadge = w.answersReleased
          ? `<span class="answer-released-badge">💡 解答已開放</span>` : '';
        return `
        <div class="week-card ${modCls[w.mod]}" style="cursor:pointer;"
             onclick="showSection('curriculum'); setTimeout(()=>openWeekDetail(${w.id}),80)">
          <div class="week-num">第 ${w.week} 週 · <span class="badge-module badge-${w.mod}">${w.modName}</span>${answerBadge}</div>
          <div class="week-title">${w.title}</div>
          <div class="week-desc">${w.desc}</div>
        </div>`;
      }).join('')
    : '<div class="alert alert-success" style="margin:0;">🎉 恭喜！所有週次已完成，準備好迎接競賽了！</div>';
}

// ── Upload Form ───────────────────────────────────────────
function initUpload() {
  const form = document.getElementById('upload-form');
  if (!form) return;
  prefillNameFields();
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('inp-name').value.trim();
    const week = document.getElementById('inp-week').value;
    const url  = document.getElementById('inp-url').value.trim();
    const note = document.getElementById('inp-note').value.trim();
    if (!name || !week) { alert('請填寫姓名和週次'); return; }
    // Save name for future sessions and sync to Firebase
    if (name !== getStudentName()) {
      localStorage.setItem('bsd56_student_name', name);
      syncToFirebase();
    }
    const weekData = BSD56Data.weeks.find(w => w.week == week);
    const title = encodeURIComponent(`Week ${week} 作業繳交 [${name}]`);
    const body  = encodeURIComponent(
      `**學員姓名：** ${name}\n**Week ${week}：** ${weekData?.title || ''}\n\n**GitHub 連結：** ${url || '（未填）'}\n\n**備註：**\n${note || '（無）'}`);
    window.open(`https://github.com/thstsai/BSD56/issues/new?title=${title}&body=${body}`, '_blank');
  });
}

// ── Utils ─────────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initFirebase();
  initStudentName();
  updateProgressBadge();
  renderScoring();
  renderCurriculum();
  renderProgress();
  renderResources();
  renderHome();
  initUpload();

  // Close modal on backdrop click
  document.getElementById('week-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeWeekDetail();
  });

  // Escape key closes modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeWeekDetail();
  });
});
