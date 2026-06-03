# BSD56 培訓網站 — 系統維護 Prompt

> 將此檔案整段貼入對話開頭，AI 即可立刻理解整個專案的架構、資料格式與維護規則，無需重新探索程式碼。

---

## 一、專案概述

**BSD56** 是針對「第56屆全國技能競賽 商務軟體設計（科目代碼 09）」競賽選手設計的純靜態培訓網站。

- **技術棧**：純 HTML + CSS + Vanilla JS（無框架、無 build step）
- **雲端服務**：Firebase Firestore（可選；未設定時網站仍完整運作）
- **部署方式**：GitHub Pages（`index.html` 為入口，直接推送即上線）
- **老師後台**：`teacher.html`（同網域，需密碼登入）

### 競賽背景

三大模組：
| 模組 | 技術 | 佔分 |
|------|------|------|
| SA&DB | SQL Server 2022、3NF、ER 圖、Use Case 圖 | 33% |
| Software | C# .NET 8、WinForms、ADO.NET / EF Core | 37% |
| App | Android Studio、Kotlin 2.1、Jetpack Compose | 30% |

試題來源：55分區（ZCharge Plan）、55全國（ZCharge+ZPlus）、56分區（LinkOne）

---

## 二、檔案結構

```
BSD56/
├── index.html              # 學生前台（單頁應用）
├── teacher.html            # 老師後台管理（密碼保護）
├── css/
│   └── style.css           # 全站樣式
├── js/
│   ├── firebase-config.js  # Firebase 設定 + ADMIN_PASSWORD
│   ├── data.js             # 課程資料（BSD56Data）
│   ├── homework-answers.js # 作業解答（BSD56HomeworkAnswers）
│   └── app.js              # 主要邏輯
├── images/
│   ├── logo.svg            # 導覽列品牌標誌（240×60）
│   └── logo-icon.svg       # Favicon（60×60 terminal 風格）
└── prompt.md               # 本檔案
```

### script 載入順序（index.html 底部）

```html
<script src="firebase-app-compat.js">       <!-- Firebase SDK -->
<script src="firebase-firestore-compat.js"> <!-- Firebase SDK -->
<script src="js/firebase-config.js">        <!-- FIREBASE_CONFIG, ADMIN_PASSWORD -->
<script src="js/data.js">                   <!-- BSD56Data -->
<script src="js/homework-answers.js">       <!-- BSD56HomeworkAnswers -->
<script src="js/app.js">                    <!-- 主邏輯（依賴上面全部） -->
```

> ⚠️ **順序不可改動**。`app.js` 依賴其餘三個全域變數。

---

## 三、data.js 資料格式

全域常數 `BSD56Data`，包含兩個頂層欄位：

### 3-1. `BSD56Data.scoringAnalysis`

```js
{
  modules: [
    {
      name: "SA&DB Design",      // 英文模組名（用於 CSS class 對應）
      label: "系統分析與資料庫設計", // 中文標題
      pct: 33,                   // 佔總分百分比
      cls: "db",                 // CSS class：db | sw | app
      tip: "...",                // 一句話策略
      topics: [
        {
          name: "使用案例圖",
          score: 5,              // 估計配分
          diff: 2,               // 難度 1-5
          badge: "easy",         // easy | medium | hard | expert
          strategy: "..."        // 得分策略說明
        }
      ]
    }
  ]
}
```

### 3-2. `BSD56Data.weeks`（陣列，共 12 週）

每個週次物件的完整格式：

```js
{
  id: 1,                    // 週次 ID（整數，1-12）
  week: 1,                  // 顯示週次（同 id）
  mod: "db",               // 模組類型：db | sw | app | all
  modName: "SA&DB",        // 模組顯示名稱
  title: "需求分析與使用案例圖", // 週次標題
  desc: "...",              // 簡短描述（週次卡片顯示）
  diff: 2,                  // 難度 1-5
  hours: 4,                 // 建議學習時數
  answersReleased: false,   // 靜態開放旗標（Firestore 未設時的 fallback）

  objectives: ["...", ...], // 學習目標（3-5 條）

  topics: ["...", ...],     // 技術重點（3-6 條）

  exercises: [              // 練習題（1-3 題組）
    {
      title: "練習一：...",
      questions: [
        {
          q: "問題內容",
          answer: "參考答案（學生端可直接查看，不受 Firestore 控制）"
        }
      ]
    }
  ],

  codeExamples: [           // 程式範例（1-3 個）
    {
      lang: "SQL",          // SQL | C# | Kotlin | XML
      label: "範例說明",
      code: `...`           // 多行程式碼（注意 ${} 的跳脫，見 §七）
    }
  ],

  testData: {               // 測試資料區塊
    desc: "說明文字",
    table: {                // 可為 null（無表格時）
      headers: ["欄1", "欄2"],
      rows: [["值1", "值2"], ...]
    }
  },

  homework: {               // 本週作業
    title: "Week N 作業：...",
    requirements: ["...", ...] // 作業項目清單（3-5 條）
  }
}
```

**模組顏色對應**：
- `db` → 紫色 `#8e44ad`
- `sw` → 藍色 `#2980b9`
- `app` → 綠色 `#27ae60`
- `all` → 橙色 `#e67e22`

---

## 四、homework-answers.js 格式

全域常數 `BSD56HomeworkAnswers`，key 為週次 ID（整數）：

```js
const BSD56HomeworkAnswers = {
  1: {
    summary: "本週重點摘要（一段話）",
    sections: [
      // ── 文字段落 ──
      {
        type: "text",
        title: "段落標題",
        content: `多行文字內容，可用 • 列點`
      },
      // ── Mermaid 圖形 ──
      {
        type: "mermaid",
        title: "圖形標題",
        content: `flowchart LR
  A --> B`          // Mermaid 語法，勿用 HTML 跳脫
      },
      // ── 程式碼區塊 ──
      {
        type: "code",
        lang: "SQL",   // SQL | C# | Kotlin | XML
        title: "程式碼說明",
        content: `SELECT * FROM Table`  // 注意 ${} 跳脫（見 §七）
      }
    ]
  },
  2: { ... },
  // ...12 個週次
}
```

**顯示規則**：
- `exercises`（練習題解答）：**學生端永遠可見**，不受老師控制
- `BSD56HomeworkAnswers`（作業解答）：需老師在 teacher.html 開放後才顯示

---

## 五、Firebase Firestore 資料模型

### Collection: `students`

每個選手一個文件，doc ID = `nameToDocId(name)`：

```
nameToDocId(name) = name.trim().replace(/\//g,'_').slice(0,100) || 'unknown'
```

文件格式：
```json
{
  "name": "THS",
  "progress": { "1": true, "2": false, ... },
  "lastUpdated": Timestamp
}
```

### Collection: `settings` / Document: `answers`

老師控制作業解答開放狀態：
```json
{
  "week1": true,
  "week2": false,
  "week3": true,
  ...
}
```

### `isAnswerReleased(weekId)` 優先順序

1. 若 Firestore `settings/answers` 文件存在且有任何 key → 使用 Firestore 值
2. 否則 fallback → 使用 `data.js` 中該週的 `answersReleased: true/false`

> 所以 Week 1 在 `data.js` 設了 `answersReleased: true`，即使 Firestore 未設定也會顯示解答。

### Firestore 安全規則

測試模式規則每 30 天到期（靜默失敗，看不到選手資料）。到期時需至 Firebase Console → Firestore → 規則，手動更新：

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

---

## 六、app.js 主要函式說明

### 初始化（DOMContentLoaded）

```
initFirebase()        → 設定 _db
loadAnswerConfig()    → 訂閱 Firestore settings/answers（onSnapshot）
initStudentName()     → 首次訪問顯示姓名 Modal；回訪者直接 syncToFirebase()
renderScoring()       → 得分分析頁
renderCurriculum()    → 課程週次網格
renderProgress()      → 進度追蹤頁
renderResources()     → 競賽資源頁
renderHome()          → 首頁（建議週次）
initUpload()          → 作業繳交頁
```

### 頁面導航

```
showSection(id)       → 顯示指定 section（home/scoring/curriculum/progress/upload/resources）
```

- `#section-home` **沒有** `.section` class，用 `display` inline style 控制
- 其他 section 用 `.section.active` CSS class 控制顯示

### 週次 Modal

```
openWeekDetail(id)    → 建立並顯示週次詳細 Modal（5個 Tab）
closeWeekDetail()     → 關閉 Modal
switchTab(el)         → 切換 Tab，同時觸發 Mermaid 渲染
navigateWeek(delta)   → Modal 內上/下週導覽
refreshHomeworkTab()  → Firestore onSnapshot 回調時，即時更新已開啟 Modal 的作業 Tab
```

### 作業解答

```
buildHomeworkAnswerHtml(id)  → 當解答未開放回傳「🔒 鎖定」區塊；開放後回傳完整解答 HTML
renderMermaid(root)          → async，處理 root 內所有 .mermaid:not([data-processed])
applyHighlighting(root)      → 自製 syntax highlighting（SQL/C#/Kotlin）
```

### Firebase 同步

```
syncToFirebase()      → 寫入 students/{docId}，merge: true
loadAnswerConfig()    → 讀取 settings/answers，onSnapshot 即時更新
```

---

## 七、⚠️ 重要已知陷阱

### 7-1. `${...}` 跳脫問題（最常見 Bug）

`data.js` 和 `homework-answers.js` 的程式碼內容都用反引號（backtick）字串儲存。若程式碼內含 Kotlin / C# 的字串插值 `${variable}`，**必須加反斜線跳脫**：

```js
// ❌ 錯誤 — JavaScript 會嘗試展開 ${variable}
content: `Text("留言 (${comments.size})")`

// ✅ 正確 — 反斜線告知 JS 這不是插值
content: `Text("留言 (\${comments.size})")`
```

**症狀**：`homework-answers.js` 載入時拋出 `ReferenceError: xxx is not defined`，導致 `BSD56HomeworkAnswers` 完全未定義，所有開放解答的週次點擊後 Modal 無法開啟（onclick 觸發但 `openWeekDetail` 靜默失敗）。

**已發現的跳脫實例**（均已修正）：
- Week 7: `\${post.id}` (navController.navigate)
- Week 8: `\${conn.responseCode}`, `\${s.msg}`
- Week 11: `\${comments.size}` (CommentSection)

**新增程式碼時**：所有 `${` 凡非 JS 插值皆須加 `\`。

---

### 7-2. SQL VIEW 不可有 ORDER BY

```sql
-- ❌ SQL Server 不允許 VIEW 內有 ORDER BY（無 TOP）
CREATE VIEW vw_PendingPosts AS
  SELECT * FROM Post ORDER BY CreatedAt DESC  -- 語法錯誤

-- ✅ 在 VIEW 外加排序
SELECT * FROM vw_PendingPosts ORDER BY CreatedAt DESC
```

---

### 7-3. Mermaid 渲染非同步

`renderMermaid` 是 `async` 函式。Mermaid 圖形在 Tab **切換時**才渲染（`switchTab` → `renderMermaid(tabEl)`）。Modal 開啟時只渲染「學習目標」Tab，Mermaid 在其他 Tab 點開後才處理。

`data-processed` 屬性防止重複渲染。

---

### 7-4. Jetpack Compose Icons

`Icons.Default.DynamicFeed`、`Icons.Default.Store` 需要 `material-icons-extended` 依賴，預設不包含。範例程式碼中改用：
- `Icons.Default.List`（動態牆）
- `Icons.Default.Favorite`（商城）

---

### 7-5. 窄螢幕（<400px）版型

Preview 工具的 Viewport 僅 154px 寬。已加入 `@media (max-width: 400px)` 修正：

```css
@media (max-width: 400px) {
  .curriculum-legend { display: none !important; }
  .section-title { font-size: 1.2rem; margin-bottom: 0.25rem; }
  .section-subtitle { font-size: 0.8rem; margin-bottom: 0.75rem; }
  .week-grid { grid-template-columns: 1fr !important; }
}
```

---

### 7-6. `#section-home` 特殊行為

`#section-home` **沒有** `.section` class（`SECTIONS` querySelectorAll 抓不到它），改用 inline `style.display` 控制。其餘所有 section 用 `.section.active` 控制。

---

### 7-7. 重複選手記錄

同一選手在不同裝置/瀏覽器登入時，若名稱輸入不一致（如空格差異），會產生多筆 Firestore 文件。

**解決**：teacher.html「🧹 清理重複紀錄」按鈕 → `cleanupDuplicates()`，依 `nameToDocId()` 合併進度後刪除孤兒文件。

---

## 八、teacher.html 功能

URL：`teacher.html`（需輸入 `ADMIN_PASSWORD`）

### 功能模組

| 功能 | 說明 |
|------|------|
| 選手進度一覽表 | 即時顯示所有選手 W1-W12 完成狀態 |
| 🧹 清理重複紀錄 | `cleanupDuplicates()`：合併同名選手、刪除孤兒文件 |
| 🗑 刪除選手 | `deleteStudent(docId, name)`：刪除指定選手所有 Firestore 資料 |
| 🔓 每週解答開放 | toggle 開放/關閉各週作業解答（寫入 Firestore settings/answers） |
| 👁 預覽解答內容 | `previewAnswer(n)`：在 Modal 內預覽 homework-answers.js 的解答內容 |
| 全部開放/關閉 | `setAllAnswers(true/false)`：批次設定所有週次 |

### teacher.html 載入的 Scripts

```html
<script src="js/firebase-config.js">
<script src="js/data.js">
<script src="js/homework-answers.js">   <!-- 供 previewAnswer() 使用 -->
```

---

## 九、CSS 系統

### CSS 自訂變數（`:root`）

```css
--primary: #1a3a6c       /* 深藍（主色） */
--primary-light: #2456a4  /* 中藍 */
--accent: #e67e22         /* 橙色（強調） */
--success: #27ae60        /* 綠色 */
--danger: #e74c3c         /* 紅色 */
--module-db: #8e44ad      /* SA&DB 紫 */
--module-sw: #2980b9      /* Software 藍 */
--module-app: #27ae60     /* App 綠 */
--module-all: #e67e22     /* 整合 橙 */
```

### 重要 CSS class

| Class | 用途 |
|-------|------|
| `.section` | 所有頁面區塊（預設 `display:none`） |
| `.section.active` | 顯示該區塊 |
| `.week-card` | 週次卡片（`cursor:pointer; overflow:hidden`） |
| `.week-card.completed` | 顯示完成勾選圓圈 |
| `.answer-released-badge` | 週次卡片上的「💡 解答已開放」標籤 |
| `.hw-answer-wrapper` | 作業解答容器（released 或 locked） |
| `.hw-answer-wrapper.locked` | 未開放狀態（🔒 提示） |
| `.mermaid` | Mermaid 圖形容器（`data-processed` 防重複渲染） |
| `.curriculum-legend` | 課程頁模組圖例（窄螢幕隱藏） |

---

## 十、常見維護任務

### 10-1. 新增/修改週次內容（data.js）

1. 找到 `BSD56Data.weeks` 陣列中對應週次物件
2. 修改 `objectives`、`topics`、`exercises`、`codeExamples`、`testData`、`homework`
3. 若程式碼含 `${variable}` → 加 `\$` 跳脫
4. 不需重新部署後台，GitHub push 即生效

### 10-2. 新增/修改作業解答（homework-answers.js）

格式：
```js
BSD56HomeworkAnswers[weekId] = {
  summary: "...",
  sections: [
    { type: "text",   title: "...", content: `...` },
    { type: "mermaid", title: "...", content: `flowchart LR\n  A-->B` },
    { type: "code",   lang: "SQL", title: "...", content: `SELECT...` }
  ]
}
```

**驗證**：加完後用瀏覽器開啟 index.html，F12 Console 確認無 `ReferenceError`，再開老師後台開放該週解答，點週次 Modal → 作業 Tab 確認顯示正常。

### 10-3. 開放/關閉作業解答

- **老師後台**：`teacher.html` → 「🔓 每週作業解答開放管理」→ 點擊週次的 toggle 按鈕
- **靜態 fallback**（無 Firebase 時）：修改 `data.js` 對應週次的 `answersReleased: true`

### 10-4. 更新 Firestore 安全規則

Firebase Console → Firestore Database → 規則 → 修改到期時間（或改為永久規則，見 §五）。

### 10-5. 修改老師密碼

`js/firebase-config.js` → `const ADMIN_PASSWORD = "新密碼";`

### 10-6. 新增競賽資源連結

`js/app.js` → `function renderResources()` → 修改 HTML 字串。

---

## 十一、Logo / 品牌識別

- **Favicon**：`images/logo-icon.svg`（60×60，深藍終端機視窗，三色圓點，BSD/56 文字）
- **導覽列**：內嵌 SVG（36×36）+ `.brand-bsd`（白色）+ `.brand-56`（橙色）+ `.brand-sub`（商務軟體設計培訓）
- **顏色**：品牌底色 `#1a3a6c`（深藍），強調 `#e67e22`（橙）

---

## 十二、GitHub / 部署

- **Repo**：`https://github.com/thstsai/BSD56`
- **Issues**：用作作業繳交入口（學生點「繳交作業」→ 開新 Issue）
- **Pages**：push 到 `main` 自動部署
- **作業連結格式**：`https://github.com/thstsai/BSD56/issues/new?title=Week+N...&body=...`

---

## 十三、本次開發過程修復的 Bug 清單

| Bug | 原因 | 修復 |
|-----|------|------|
| 週次卡片點擊無反應（開放解答後） | `homework-answers.js` 中 `${comments.size}` 未跳脫，造成整個檔案執行失敗 | 改為 `\${comments.size}` |
| Week 1 在窄 Viewport 不可點 | Preview 154px 寬時，legend flex-wrap 佔 259px，將 week-grid 推至 viewport 外 | `@media(max-width:400px)` 隱藏 legend |
| 返回選手資料看不到 | `initStudentName()` 回訪者未呼叫 `syncToFirebase()` | 加入 `syncToFirebase()` 呼叫 |
| Firestore 靜默拒絕 | 測試模式安全規則 30 天到期 | 手動更新 Firebase Console 規則 |
| SQL VIEW 含 ORDER BY | SQL Server VIEW 內不允許 ORDER BY（無 TOP） | 移至 VIEW 外查詢時加排序 |
| Compose Icons 缺失 | `Icons.Default.DynamicFeed/Store` 需 extended 依賴 | 改用 `List` / `Favorite` |
| Week 10 資料遷移錯誤 | 用 BULK INSERT 而非 INSERT...SELECT | 改用 INSERT INTO ... SELECT FROM SHPost |
| Week 11 架構衝突 | RecyclerView.Adapter 與 Compose 架構矛盾 | 改為 recursive `@Composable CommentItem` |
| Week 12 API 過時 | SwipeRefreshLayout/LiveData 屬 View 系統 | 改為 `rememberPullRefreshState` / StateFlow |
