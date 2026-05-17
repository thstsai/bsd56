/* BSD56 App Logic */

// ── Navigation ──────────────────────────────────────────
const NAV_LINKS = document.querySelectorAll('.nav-links a[data-section]');
const SECTIONS  = document.querySelectorAll('.section');

function showSection(id) {
  SECTIONS.forEach(s => s.classList.toggle('active', s.id === 'section-' + id));
  NAV_LINKS.forEach(a => a.classList.toggle('active', a.dataset.section === id));
  if (id !== 'home') window.scrollTo(0, 0);
}

NAV_LINKS.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    showSection(a.dataset.section);
  });
});

// ── Progress (localStorage) ──────────────────────────────
function getProgress() {
  try { return JSON.parse(localStorage.getItem('bsd56_progress') || '{}'); }
  catch { return {}; }
}
function saveProgress(prog) {
  localStorage.setItem('bsd56_progress', JSON.stringify(prog));
}
function getCompletedCount() {
  return Object.values(getProgress()).filter(Boolean).length;
}
function updateProgressBadge() {
  const el = document.getElementById('progress-badge');
  if (el) el.textContent = `進度 ${getCompletedCount()}/12`;
}

// ── Scoring Analysis ─────────────────────────────────────
function renderScoring() {
  const container = document.getElementById('scoring-container');
  if (!container) return;

  // Module overview cards
  const overviewHtml = BSD56Data.scoringAnalysis.modules.map(m => `
    <div class="score-module-card ${m.cls}">
      <div class="score-pct">${m.pct}%</div>
      <div class="score-name">${m.name}</div>
      <div class="score-tip">${m.tip}</div>
    </div>
  `).join('');

  // Detail tables per module
  const tablesHtml = BSD56Data.scoringAnalysis.modules.map(m => `
    <div class="card" style="margin-bottom:1rem;">
      <div class="card-header">
        <span class="badge-module badge-${m.cls}">${m.name}</span>
        ${m.label}（佔總分約 ${m.pct}%）
      </div>
      <div class="card-body" style="padding:0;">
        <table class="score-table">
          <thead>
            <tr>
              <th>評分項目</th>
              <th>估計分數</th>
              <th>難易度</th>
              <th>入門等級取分策略</th>
            </tr>
          </thead>
          <tbody>
            ${m.topics.map(t => `
            <tr>
              <td>${t.name}</td>
              <td><strong>${t.score}分</strong></td>
              <td>
                <div class="difficulty-bar">
                  ${Array.from({length:5}, (_,i) => `<div class="diff-dot ${i<t.diff?'filled':'empty'}"></div>`).join('')}
                </div>
              </td>
              <td><span class="badge badge-${t.badge}">${{easy:'容易',medium:'中等',hard:'困難',expert:'挑戰'}[t.badge]}</span> ${t.strategy}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="scoring-overview">${overviewHtml}</div>

    <div class="strategy-box">
      <h4>⚡ 入門選手最佳得分策略</h4>
      <ul>
        <li><strong>SA&DB：</strong>先完成Use Case圖 + 資料字典（格式化工作，穩定得分），再精雕ER圖的正規化</li>
        <li><strong>軟體設計：</strong>登入系統 + 基礎CRUD必須完整，特殊功能（地圖/Webhook）有時間才做</li>
        <li><strong>App設計：</strong>先讓清單頁面顯示資料，再接API，時間夠才做特殊功能</li>
        <li><strong>通用原則：</strong>完整的簡單功能 > 不完整的複雜功能；任何功能都不要只做一半</li>
      </ul>
    </div>

    ${tablesHtml}
  `;
}

// ── Curriculum Grid ───────────────────────────────────────
function renderCurriculum() {
  const grid = document.getElementById('curriculum-grid');
  if (!grid) return;
  const prog = getProgress();

  grid.innerHTML = BSD56Data.weeks.map(w => {
    const done = prog[w.id];
    const stars = Array.from({length:5}, (_,i) =>
      `<span class="${i < w.diff ? 'star-filled' : 'star-empty'}">★</span>`).join('');
    const modColors = {db:'mod-db', sw:'mod-sw', app:'mod-app', all:'mod-all'};
    return `
      <div class="week-card ${modColors[w.mod]} ${done ? 'completed' : ''}"
           data-week="${w.id}" onclick="openWeekDetail(${w.id})">
        <div class="check-icon">✓</div>
        <div class="week-num">第 ${w.week} 週 · <span class="badge-module badge-${w.mod}">${w.modName}</span></div>
        <div class="week-title">${w.title}</div>
        <div class="week-desc">${w.desc}</div>
        <div class="week-meta">
          <div class="difficulty">${stars}</div>
          <small style="color:var(--text-muted)">⏱ ${w.hours}小時</small>
        </div>
      </div>
    `;
  }).join('');
}

// ── Week Detail Modal ─────────────────────────────────────
function openWeekDetail(id) {
  const week = BSD56Data.weeks.find(w => w.id === id);
  if (!week) return;
  const modal = document.getElementById('week-modal');
  const modColors = {db:'mod-db', sw:'mod-sw', app:'mod-app', all:'mod-all'};

  // Build exercises HTML
  const exercisesHtml = week.exercises.map((ex, ei) => `
    <div class="exercise-item">
      <div class="exercise-header" onclick="toggleExercise(this)">
        <span>📝 ${ex.title}</span>
        <span class="toggle-icon">▼</span>
      </div>
      <div class="exercise-body">
        ${ex.questions.map((q, qi) => `
          <div class="exercise-q">
            <strong>問題 ${qi + 1}</strong>
            <pre style="white-space:pre-wrap;font-family:inherit;margin:0.4rem 0 0;font-size:0.85rem;">${q.q}</pre>
          </div>
          <div class="answer-toggle">
            <button class="btn-show-answer" onclick="toggleAnswer(this)">💡 顯示解答</button>
            <div class="answer-content">
              <strong style="color:var(--success)">✅ 解答：</strong>
              <pre style="white-space:pre-wrap;font-family:inherit;margin:0.4rem 0 0;font-size:0.82rem;">${q.answer}</pre>
            </div>
          </div>
        `).join('<hr style="margin:0.75rem 0;border-color:var(--border);">')}
      </div>
    </div>
  `).join('');

  // Build code examples HTML
  const codeHtml = week.codeExamples.map(ex => `
    <div class="code-block">
      <div class="code-header">
        <span class="lang">${ex.lang}</span>
        <span>${ex.label}</span>
        <button class="btn-copy" onclick="copyCode(this)">複製</button>
      </div>
      <pre><code>${escapeHtml(ex.code)}</code></pre>
    </div>
  `).join('');

  // Build test data HTML
  let testDataHtml = `<p style="font-size:0.875rem;color:var(--text-muted);margin-bottom:0.75rem;">${week.testData.desc}</p>`;
  if (week.testData.table) {
    const tbl = week.testData.table;
    testDataHtml += `
      <table class="data-table">
        <thead><tr>${tbl.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>${tbl.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>
    `;
  }

  // Build homework HTML
  const prog = getProgress();
  const isDone = prog[id];
  const hwHtml = `
    <div class="alert alert-info">📋 <strong>${week.homework.title}</strong></div>
    <ul class="objectives-list">
      ${week.homework.requirements.map(r => `
        <li><span class="obj-icon">📌</span>${r}</li>
      `).join('')}
    </ul>
    <div style="margin-top:1.25rem;display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;">
      <button class="btn ${isDone ? 'btn-success' : 'btn-outline'}" onclick="toggleWeekDone(${id}, this)">
        ${isDone ? '✅ 已標記完成' : '○ 標記為完成'}
      </button>
      <a href="https://github.com/thstsai/BSD56/issues/new?title=Week+${id}+作業+%5B請填入姓名%5D&body=**Week+${id}+${encodeURIComponent(week.title)}**%0A%0A學員姓名：%0AGitHub+Repo+連結：%0A說明：%0A%0A----%0A作業項目：%0A${week.homework.requirements.map(r => '- ' + encodeURIComponent(r)).join('%0A')}"
         target="_blank" class="btn btn-accent">📤 繳交作業（GitHub Issues）</a>
    </div>
  `;

  modal.querySelector('.week-detail-header').className = `week-detail-header ${modColors[week.mod]}`;
  modal.querySelector('.week-detail-title').textContent = `第 ${week.week} 週：${week.title}`;
  modal.querySelector('.week-detail-sub').innerHTML = `
    <span class="badge-module badge-${week.mod}" style="background:rgba(255,255,255,0.25);">${week.modName}</span>
    &nbsp;難度：${'★'.repeat(week.diff)}${'☆'.repeat(5-week.diff)}&nbsp;&nbsp;⏱ ${week.hours}小時
  `;

  // Tab contents
  modal.querySelector('#tab-objectives').innerHTML = `
    <h4 style="margin-bottom:0.75rem;">🎯 本週學習目標</h4>
    <ul class="objectives-list">
      ${week.objectives.map(o => `<li><span class="obj-icon">✓</span>${o}</li>`).join('')}
    </ul>
    <h4 style="margin:1rem 0 0.75rem;">📚 技術重點</h4>
    <ul class="topics-list">
      ${week.topics.map(t => `<li>▸ ${t}</li>`).join('')}
    </ul>
  `;
  modal.querySelector('#tab-exercises').innerHTML = exercisesHtml;
  modal.querySelector('#tab-code').innerHTML = codeHtml;
  modal.querySelector('#tab-data').innerHTML = testDataHtml;
  modal.querySelector('#tab-homework').innerHTML = hwHtml;

  // Switch to first tab
  switchTab(modal.querySelector('.detail-tab'));

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
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
  const target = el.dataset.tab;
  modal.querySelector('#' + target).classList.add('active');
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
  });
}

function toggleWeekDone(id, btn) {
  const prog = getProgress();
  prog[id] = !prog[id];
  saveProgress(prog);
  btn.className = prog[id] ? 'btn btn-success' : 'btn btn-outline';
  btn.textContent = prog[id] ? '✅ 已標記完成' : '○ 標記為完成';
  updateProgressBadge();
  renderCurriculum();
  renderProgress();
}

// ── Progress Section ──────────────────────────────────────
function renderProgress() {
  const container = document.getElementById('progress-container');
  if (!container) return;
  const prog = getProgress();
  const total = BSD56Data.weeks.length;
  const done = Object.values(prog).filter(Boolean).length;
  const pct = Math.round(done / total * 100);

  container.innerHTML = `
    <div class="progress-overview">
      <div class="prog-stat"><div class="prog-stat-num">${done}</div><div class="prog-stat-label">已完成週次</div></div>
      <div class="prog-stat"><div class="prog-stat-num">${total - done}</div><div class="prog-stat-label">待完成週次</div></div>
      <div class="prog-stat"><div class="prog-stat-num">${pct}%</div><div class="prog-stat-label">完成率</div></div>
    </div>
    <div class="week-progress-bar" style="height:12px;margin-bottom:1.5rem;">
      <div class="week-progress-fill" style="width:${pct}%"></div>
    </div>
    <div class="card">
      <div class="card-header">📋 週次進度追蹤</div>
      <div class="card-body" style="padding:0.75rem;">
        ${BSD56Data.weeks.map(w => {
          const modColors = {db:'var(--module-db)', sw:'var(--module-sw)', app:'var(--module-app)', all:'var(--module-all)'};
          return `
            <div class="progress-week-row" onclick="openWeekDetail(${w.id})">
              <input type="checkbox" ${prog[w.id] ? 'checked' : ''}
                onclick="event.stopPropagation(); toggleWeekDone(${w.id}, document.querySelector('.week-card[data-week=\\'${w.id}\\'] .check-icon'))"
                style="accent-color:${modColors[w.mod]}">
              <span class="progress-week-label"><strong>W${w.week}</strong> ${w.title}</span>
              <span class="badge-module badge-${w.mod} progress-week-badge">${w.modName}</span>
              <span style="font-size:0.75rem;color:var(--text-muted)">⏱${w.hours}h</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// ── Upload / Submit ───────────────────────────────────────
function renderUpload() {
  // Already in HTML, just wire up the form
  const form = document.getElementById('upload-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('#inp-name').value.trim();
    const week = form.querySelector('#inp-week').value;
    const url  = form.querySelector('#inp-url').value.trim();
    const note = form.querySelector('#inp-note').value.trim();

    if (!name || !week) { alert('請填寫姓名和週次'); return; }

    // Build GitHub issue URL
    const title = encodeURIComponent(`Week ${week} 作業繳交 [${name}]`);
    const body  = encodeURIComponent(
      `**學員姓名：** ${name}\n` +
      `**Week ${week}：** ${BSD56Data.weeks.find(w=>w.week==week)?.title||''}\n\n` +
      `**GitHub/連結：** ${url}\n\n` +
      `**備註：**\n${note || '（無）'}`
    );
    window.open(`https://github.com/thstsai/BSD56/issues/new?title=${title}&body=${body}`, '_blank');
  });
}

// ── Home ──────────────────────────────────────────────────
function renderHome() {
  const el = document.getElementById('home-week-cards');
  if (!el) return;
  const prog = getProgress();
  const done = getCompletedCount();

  // Next 3 upcoming weeks
  const upcoming = BSD56Data.weeks.filter(w => !prog[w.id]).slice(0, 3);
  const modColors = {db:'mod-db', sw:'mod-sw', app:'mod-app', all:'mod-all'};

  el.innerHTML = upcoming.map(w => `
    <div class="week-card ${modColors[w.mod]}" onclick="showSection('curriculum'); setTimeout(()=>openWeekDetail(${w.id}),50)" style="cursor:pointer;">
      <div class="week-num">第 ${w.week} 週 · <span class="badge-module badge-${w.mod}">${w.modName}</span></div>
      <div class="week-title">${w.title}</div>
      <div class="week-desc">${w.desc}</div>
    </div>
  `).join('') || '<p style="color:var(--text-muted)">🎉 所有週次已完成！</p>';
}

// ── Utils ─────────────────────────────────────────────────
function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateProgressBadge();
  renderScoring();
  renderCurriculum();
  renderProgress();
  renderHome();
  renderUpload();

  // Close modal on backdrop click
  document.getElementById('week-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeWeekDetail();
  });
});
