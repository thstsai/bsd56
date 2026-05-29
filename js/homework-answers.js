// BSD56 每週作業解答（老師開放後顯示）
// 格式：sections 陣列，每個 section 有 type: 'text' | 'mermaid' | 'code'

const BSD56HomeworkAnswers = {

  // ── Week 1：需求分析與 Use Case 圖 ────────────────────────
  1: {
    summary: '本週重點是閱讀 56分區 LinkOne 試題需求，繪製 Use Case 圖，並整理資料字典。',
    sections: [
      {
        type: 'text',
        title: '解題思路',
        content: `依評分表，Use Case 圖須達到以下標準：
• Actor（4個）：Employee（一般員工）、Admin（管理員）、Auditor（內容審核員）、System（自動系統）
• Use Case（≥18個）：依功能分群：身份驗證 / 動態牆 / 留言 / 貼圖商城 / 管理 / 審核 / 系統自動化
• include：「發佈貼文」、「購買貼圖」都 include「登入」；「審核待審貼文」include「查看動態牆」
• extend：「回覆留言」extend「新增留言」；「使用貼圖」extend「發佈貼文」`
      },
      {
        type: 'mermaid',
        title: 'LinkOne Use Case 圖（4 Actor、20 Use Case、5 include/extend）',
        content: `flowchart LR
  empActor(["👤 Employee\\n一般員工"])
  adminActor(["👤 Admin\\n管理員"])
  audActor(["👤 Auditor\\n內容審核員"])
  sysActor(["⚙ System\\n自動系統"])

  subgraph sys["LinkOne System"]
    subgraph auth["身份驗證"]
      uc1("登入")
      uc2("登出")
      uc3("修改密碼")
    end
    subgraph feed["動態牆"]
      uc4("查看動態牆")
      uc5("發佈貼文")
      uc6("編輯貼文")
      uc7("刪除貼文")
      uc8("喜歡貼文")
      uc9("舉報不當內容")
    end
    subgraph cmt["留言系統"]
      uc10("新增留言")
      uc11("回覆留言")
      uc12("刪除留言")
    end
    subgraph stk["貼圖商城"]
      uc13("查看貼圖商城")
      uc14("購買貼圖")
      uc15("使用貼圖")
    end
    subgraph adm["管理功能"]
      uc16("管理使用者帳號")
      uc17("設定角色與權限")
      uc18("查看統計報表")
    end
    subgraph aud["審核功能"]
      uc19("審核待審貼文")
      uc20("處理舉報案件")
      uc21("設定敏感詞庫")
    end
    subgraph auto["自動化"]
      uc22("自動過濾敏感詞")
    end
  end

  empActor --> uc1 & uc2 & uc3
  empActor --> uc4 & uc5 & uc6 & uc7 & uc8 & uc9
  empActor --> uc10 & uc11 & uc12
  empActor --> uc13 & uc14 & uc15
  adminActor --> uc1 & uc16 & uc17 & uc18
  audActor --> uc1 & uc19 & uc20 & uc21
  sysActor --> uc22

  %% include：基本動作必須先完成
  uc5  -.->|"«include»"| uc1
  uc14 -.->|"«include»"| uc1
  uc19 -.->|"«include»"| uc4

  %% extend：選擇性附加行為
  uc11 -.->|"«extend»"| uc10
  uc15 -.->|"«extend»"| uc5

  style sys fill:#f0f4ff,stroke:#1a3a6c
  style auth fill:#e8f5e9,stroke:#27ae60
  style feed fill:#e3f2fd,stroke:#2980b9
  style cmt fill:#fce4ec,stroke:#e74c3c
  style stk fill:#fff8e1,stroke:#f39c12
  style adm fill:#f3e5f5,stroke:#8e44ad
  style aud fill:#ffebee,stroke:#c0392b
  style auto fill:#e0f2f1,stroke:#27ae60`
      },
      {
        type: 'text',
        title: 'include vs extend 判斷原則',
        content: `《include》— 必定執行，缺少則流程不完整：
  ✅ 發佈貼文 《include》 登入   → 未登入無法發文
  ✅ 購買貼圖 《include》 登入   → 未登入無法購買
  ✅ 審核貼文 《include》 查看動態牆 → 審核前須先看到貼文

《extend》— 選擇性、條件性才發生：
  ✅ 回覆留言 《extend》 新增留言 → 留言可以只有一層，回覆是附加功能
  ✅ 使用貼圖 《extend》 發佈貼文 → 發文不一定要用貼圖`
      },
      {
        type: 'text',
        title: '資料字典重點',
        content: `依試題評分表，資料字典需包含每個欄位的：欄位名稱、資料型別、長度/精度、說明、PK / FK / NN / Default 等限制。

主要實體與最少欄位數（評分基準）：
• Employee：EmployeeID(PK)、Name、Email、PasswordHash、RoleID(FK)、IsActive、CreatedAt
• Post：PostID(PK)、EmployeeID(FK)、Content、CreatedAt、IsApproved、ApprovedByID(FK)
• Comment：CommentID(PK)、PostID(FK)、ParentID(FK自參照)、AuthorID(FK)、Content、IsDeleted
• Sticker：StickerID(PK)、Name、ImageURL、Price、CategoryID(FK)、IsActive
• Purchase：PurchaseID(PK)、EmployeeID(FK)、StickerID(FK)、PurchasedAt、Amount`
      }
    ]
  },

  // ── Week 2：ER 圖設計與資料庫正規化 ──────────────────────
  2: {
    summary: '設計 LinkOne 系統的 ER 圖，達到 3NF 正規化，並確認關聯完整性。',
    sections: [
      {
        type: 'mermaid',
        title: 'LinkOne ER 圖（3NF）',
        content: `erDiagram
  EMPLOYEE {
    int EmployeeID PK
    nvarchar(50) Name
    nvarchar(100) Email
    nvarchar(256) PasswordHash
    datetime2 CreatedAt
    bit IsActive
  }
  POST {
    int PostID PK
    int EmployeeID FK
    nvarchar(500) Content
    datetime2 CreatedAt
    bit IsApproved
    int ApprovedByID FK
  }
  COMMENT {
    int CommentID PK
    int PostID FK
    int EmployeeID FK
    int ParentCommentID FK
    nvarchar(300) Content
    datetime2 CreatedAt
  }
  STICKER {
    int StickerID PK
    nvarchar(50) Name
    nvarchar(200) ImagePath
    decimal Price
    nvarchar(30) Category
    bit IsActive
  }
  PURCHASE {
    int PurchaseID PK
    int EmployeeID FK
    int StickerID FK
    datetime2 PurchasedAt
    decimal PaidAmount
  }
  EMPLOYEE_STICKER {
    int EmployeeID FK
    int StickerID FK
  }

  EMPLOYEE ||--o{ POST : "writes"
  EMPLOYEE ||--o{ COMMENT : "comments"
  EMPLOYEE ||--o{ PURCHASE : "buys"
  EMPLOYEE ||--o{ EMPLOYEE_STICKER : "owns"
  POST ||--o{ COMMENT : "has"
  COMMENT o|--o{ COMMENT : "replies to"
  STICKER ||--o{ PURCHASE : "sold in"
  STICKER ||--o{ EMPLOYEE_STICKER : "owned via"`
      },
      {
        type: 'text',
        title: '正規化說明',
        content: '1NF：每欄只存單一值，貼圖擁有記錄獨立為 EMPLOYEE_STICKER 表。2NF：PURCHASE 的 PaidAmount 只依賴 PurchaseID。3NF：移除傳遞相依，如 Category 描述不存在 STICKER 外，獨立查表若有需要。Comment 的 ParentCommentID 實現二層留言結構（自我參照）。'
      }
    ]
  },

  // ── Week 3：T-SQL 語法與測試資料建立 ─────────────────────
  3: {
    summary: '建立 LinkOne 完整資料庫：CREATE TABLE 含完整約束、ROW_NUMBER() 批次產生 100 筆測試資料、3 個 Stored Procedure，以及 2 個 SQL View 封裝常用查詢。',
    sections: [
      {
        type: 'code',
        lang: 'SQL',
        title: 'CREATE TABLE — Employee + Post（含所有約束）',
        content: `-- Employee 資料表
CREATE TABLE Employee (
    EmployeeID   INT           IDENTITY(1,1) PRIMARY KEY,
    Name         NVARCHAR(50)  NOT NULL,
    Email        NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(256) NOT NULL,
    Role         NVARCHAR(20)  NOT NULL DEFAULT N'Staff',  -- Admin / Staff
    CreatedAt    DATETIME2     NOT NULL DEFAULT GETDATE(),
    IsActive     BIT           NOT NULL DEFAULT 1
);

-- Post 資料表（自我參照：ApprovedByID 指向 Employee）
CREATE TABLE Post (
    PostID       INT           IDENTITY(1,1) PRIMARY KEY,
    EmployeeID   INT           NOT NULL REFERENCES Employee(EmployeeID),
    Content      NVARCHAR(500) NOT NULL,
    CreatedAt    DATETIME2     NOT NULL DEFAULT GETDATE(),
    IsApproved   BIT           NOT NULL DEFAULT 0,
    ApprovedByID INT           NULL     REFERENCES Employee(EmployeeID)
);`
      },
      {
        type: 'code',
        lang: 'SQL',
        title: 'ROW_NUMBER() 批次產生 100 筆測試資料',
        content: `-- 批次產生 100 筆 Employee 測試資料（ROW_NUMBER 產生序號）
INSERT INTO Employee (Name, Email, PasswordHash, Role, IsActive)
SELECT
    N'員工' + RIGHT('000' + CAST(n AS VARCHAR), 3),
    'emp' + CAST(n AS VARCHAR) + '@linkone.com',
    -- SHA256('password') 的固定值（測試用）
    'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f',
    CASE (n % 5) WHEN 0 THEN N'Admin' ELSE N'Staff' END,
    1
FROM (
    SELECT TOP 100 ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS n
    FROM sys.all_objects
) t;

-- 批次產生 200 筆 Post 測試資料
INSERT INTO Post (EmployeeID, Content, CreatedAt, IsApproved)
SELECT
    (ABS(CHECKSUM(NEWID())) % 100) + 1,   -- 隨機 EmployeeID 1~100
    N'測試貼文內容 #' + CAST(n AS VARCHAR) + N'，分享今天的工作心得。',
    DATEADD(DAY, -(ABS(CHECKSUM(NEWID())) % 90), GETDATE()),  -- 最近90天
    CASE (n % 3) WHEN 0 THEN 0 ELSE 1 END  -- 1/3 未審核
FROM (
    SELECT TOP 200 ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS n
    FROM sys.all_objects
) t;`
      },
      {
        type: 'code',
        lang: 'SQL',
        title: 'Stored Procedure — 查詢 / 新增 / 更新各1個',
        content: `-- SP 1：查詢員工貼文清單（含留言數）
CREATE PROCEDURE sp_GetEmployeePosts
    @EmployeeID INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT p.PostID, p.Content, p.CreatedAt, p.IsApproved,
           COUNT(c.CommentID) AS CommentCount
    FROM Post p
    LEFT JOIN Comment c ON c.PostID = p.PostID
    WHERE p.EmployeeID = @EmployeeID
    GROUP BY p.PostID, p.Content, p.CreatedAt, p.IsApproved
    ORDER BY p.CreatedAt DESC;
END;

-- SP 2：新增貼文
CREATE PROCEDURE sp_AddPost
    @EmployeeID INT,
    @Content    NVARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Post (EmployeeID, Content, CreatedAt, IsApproved)
    VALUES (@EmployeeID, @Content, GETDATE(), 0);
    SELECT SCOPE_IDENTITY() AS NewPostID;
END;

-- SP 3：審核通過貼文（更新）
CREATE PROCEDURE sp_ApprovePost
    @PostID     INT,
    @ApproverID INT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Post
    SET IsApproved   = 1,
        ApprovedByID = @ApproverID
    WHERE PostID = @PostID;
END;`
      },
      {
        type: 'code',
        lang: 'SQL',
        title: 'SQL View — 封裝常用查詢供 C# / Android 直接使用',
        content: `-- View 1：員工貼文統計（C# 報表頁直接 SELECT）
CREATE VIEW vw_EmployeePostSummary AS
SELECT
    e.EmployeeID,
    e.Name,
    e.Email,
    e.Role,
    COUNT(p.PostID)                                     AS TotalPosts,
    SUM(CASE WHEN p.IsApproved = 1 THEN 1 ELSE 0 END)  AS ApprovedPosts,
    MAX(p.CreatedAt)                                    AS LastPostTime
FROM Employee e
LEFT JOIN Post p ON p.EmployeeID = e.EmployeeID
WHERE e.IsActive = 1
GROUP BY e.EmployeeID, e.Name, e.Email, e.Role;

-- View 2：待審核貼文清單（管理員審核頁使用）
-- ⚠ SQL Server 的 View 不允許直接寫 ORDER BY（無 TOP/OFFSET），排序應在查詢時指定
CREATE VIEW vw_PendingPosts AS
SELECT
    p.PostID,
    p.Content,
    p.CreatedAt,
    e.Name    AS AuthorName,
    e.Email   AS AuthorEmail
FROM Post p
INNER JOIN Employee e ON e.EmployeeID = p.EmployeeID
WHERE p.IsApproved = 0;
-- 使用時加排序：SELECT * FROM vw_PendingPosts ORDER BY CreatedAt DESC

-- === 使用方式 ===
-- C# EF：在 ZChargeContext 加入 Keyless Entity 後直接 LINQ 查詢
-- AppDb.Context.EmployeePostSummaries.ToList()
--
-- SQL 直接查詢：
-- SELECT * FROM vw_EmployeePostSummary WHERE Role = 'Admin'
-- SELECT * FROM vw_PendingPosts`
      }
    ]
  },

  // ── Week 4：EF Database-First + CrudToolbar + BaseDetailForm ──
  4: {
    summary: '使用 EF Core Scaffold 從現有資料庫反向產生 Model，建立 AppDb 靜態類別，以及可繼承的 BaseDetailForm<T> 與 CrudToolbar UserControl。',
    sections: [
      {
        type: 'mermaid',
        title: 'WinForms 表單繼承架構',
        content: `flowchart TD
  Login["FrmLogin\\n登入表單"]
  Main["FrmMain\\n主表單（TabControl）"]
  Base["BaseDetailForm&lt;T&gt;\\n抽象基底表單"]
  Employee["FrmEmployee\\n員工管理\\n繼承 BaseDetailForm"]
  Station["FrmStation\\n充電站管理\\n繼承 BaseDetailForm"]
  Sticker["FrmSticker\\n貼圖管理\\n繼承 BaseDetailForm"]
  Toolbar["CrudToolbar\\nUserControl\\n（新增/修改/刪除/儲存/取消）"]

  Login -->|登入成功| Main
  Main --> Employee
  Main --> Station
  Main --> Sticker
  Base -.->|繼承| Employee
  Base -.->|繼承| Station
  Base -.->|繼承| Sticker
  Toolbar -.->|拖曳加入| Employee
  Toolbar -.->|拖曳加入| Station

  style Login fill:#2980b9,color:#fff
  style Main fill:#1a3a6c,color:#fff
  style Base fill:#8e44ad,color:#fff
  style Toolbar fill:#e67e22,color:#fff
  style Employee fill:#27ae60,color:#fff
  style Station fill:#27ae60,color:#fff
  style Sticker fill:#27ae60,color:#fff`
      },
      {
        type: 'code',
        lang: 'PowerShell',
        title: 'Scaffold-DbContext 指令（套件管理器主控台）',
        content: `# 步驟 1：安裝 NuGet 套件
Install-Package Microsoft.EntityFrameworkCore.SqlServer
Install-Package Microsoft.EntityFrameworkCore.Tools

# 步驟 2：從現有 DB 反向產生 Model
Scaffold-DbContext \`
  "Server=localhost;Database=LinkOne;Integrated Security=True;TrustServerCertificate=True;" \`
  Microsoft.EntityFrameworkCore.SqlServer \`
  -OutputDir Models \`
  -ContextDir Data \`
  -Context LinkOneContext \`
  -Force

# 執行後自動產生：
# Data/LinkOneContext.cs  ← DbContext + OnModelCreating
# Models/Employee.cs
# Models/Post.cs
# Models/Comment.cs
# Models/Sticker.cs  ... 等`
      },
      {
        type: 'code',
        lang: 'C#',
        title: 'AppDb 靜態類別 + BaseDetailForm<T>',
        content: `// Data/AppDb.cs
public static class AppDb
{
    private static LinkOneContext? _ctx;
    public static LinkOneContext Context =>
        _ctx ??= new LinkOneContext();
    public static void Reset() { _ctx?.Dispose(); _ctx = null; }
}

// BaseDetailForm.cs（抽象基底）
public abstract class BaseDetailForm<T> : Form where T : class, new()
{
    protected T?   _current;
    protected bool _isNew;

    protected abstract void LoadData();
    protected abstract void FillForm(T entity);
    protected abstract T   ReadForm();
    protected abstract bool Validate();

    protected virtual void OnAdd()
    {
        _isNew = true; _current = new T();
        ClearInputs(); crudToolbar1.SetEditMode();
    }
    protected virtual void OnSave()
    {
        if (!Validate()) return;
        _current = ReadForm();
        if (_isNew) AppDb.Context.Set<T>().Add(_current!);
        AppDb.Context.SaveChanges();
        MessageBox.Show(_isNew ? "新增成功！" : "修改成功！");
        LoadData(); crudToolbar1.SetViewMode();
    }
    protected virtual void OnDelete()
    {
        if (_current == null) return;
        if (MessageBox.Show("確定刪除？", "確認",
            MessageBoxButtons.YesNo) != DialogResult.Yes) return;
        AppDb.Context.Set<T>().Remove(_current);
        AppDb.Context.SaveChanges();
        LoadData();
    }
    protected virtual void ClearInputs() { }
}`
      }
    ]
  },

  // ── Week 5：EF LINQ CRUD 完整操作 ───────────────────────
  5: {
    summary: '使用 EF LINQ 實作 Employee 完整 CRUD，搭配 BaseDetailForm<T> 繼承架構，刪除前用 .Any() 檢查關聯 Post。',
    sections: [
      {
        type: 'code',
        lang: 'C#',
        title: 'FrmEmployee — 繼承 BaseDetailForm，覆寫4個方法',
        content: `public partial class FrmEmployee : BaseDetailForm<Employee>
{
    public FrmEmployee() { InitializeComponent(); }

    private void FrmEmployee_Load(object s, EventArgs e) => LoadData();

    // 覆寫 LoadData：LINQ 多條件搜尋
    protected override void LoadData()
    {
        string keyword = txtKeyword.Text.Trim();

        var query = AppDb.Context.Employees.AsQueryable();
        if (!string.IsNullOrWhiteSpace(keyword))
            query = query.Where(emp => emp.Name.Contains(keyword) ||
                                       emp.Email.Contains(keyword));

        dgvEmployees.DataSource = query
            .OrderBy(emp => emp.Name)
            .ToList();
    }

    // 覆寫 FillForm：Entity → TextBox
    protected override void FillForm(Employee emp)
    {
        txtName.Text  = emp.Name;
        txtEmail.Text = emp.Email;
        chkActive.Checked = emp.IsActive ?? true;
    }

    // 覆寫 ReadForm：TextBox → Entity
    protected override Employee ReadForm()
    {
        _current!.Name     = txtName.Text.Trim();
        _current.Email     = txtEmail.Text.Trim();
        _current.IsActive  = chkActive.Checked;
        return _current;
    }

    // 覆寫 Validate：必填欄位檢查
    protected override bool Validate()
    {
        if (string.IsNullOrWhiteSpace(txtName.Text))
        { MessageBox.Show("請輸入姓名"); txtName.Focus(); return false; }
        if (string.IsNullOrWhiteSpace(txtEmail.Text))
        { MessageBox.Show("請輸入 Email"); txtEmail.Focus(); return false; }
        return true;
    }

    // DataGridView 列選取 → 填入表單
    private void dgvEmployees_SelectionChanged(object s, EventArgs e)
    {
        if (dgvEmployees.CurrentRow?.DataBoundItem is Employee emp)
        {
            _current = emp; _isNew = false;
            FillForm(emp);
            crudToolbar1.SetViewMode();
        }
    }
}`
      },
      {
        type: 'code',
        lang: 'C#',
        title: 'OnDelete 覆寫 — .Any() 關聯檢查後軟刪除',
        content: `// 覆寫基底的 OnDelete，加入關聯檢查
protected override void OnDelete()
{
    if (_current == null) return;

    if (MessageBox.Show("確定刪除此員工？", "確認",
        MessageBoxButtons.YesNo, MessageBoxIcon.Warning) != DialogResult.Yes) return;

    // 用 .Any() 檢查是否有 Post（比 Count() 快）
    bool hasPosts = AppDb.Context.Posts
        .Any(p => p.EmployeeID == _current.EmployeeID);

    if (hasPosts)
    {
        // 有關聯 → 軟刪除（停用）
        _current.IsActive = false;
        AppDb.Context.SaveChanges();
        MessageBox.Show("該員工有關聯貼文，已改為停用狀態。");
    }
    else
    {
        // 無關聯 → 實際刪除
        AppDb.Context.Employees.Remove(_current);
        AppDb.Context.SaveChanges();
        MessageBox.Show("刪除成功！");
    }

    LoadData();
    _current = null;
}`
      }
    ]
  },

  // ── Week 6：EF 認證、計時器與角色控管 ───────────────────
  6: {
    summary: '以 EF LINQ 實作 SHA-256 密碼登入驗證、AppSession 靜態類別、2分鐘閒置自動登出，以及依角色動態顯示功能。',
    sections: [
      {
        type: 'code',
        lang: 'C#',
        title: 'AppSession + EF LINQ 登入驗證',
        content: `// AppSession.cs
public static class AppSession
{
    public static int    UserID       { get; set; }
    public static string UserName     { get; set; } = "";
    public static string Role         { get; set; } = ""; // Admin / Staff
    public static DateTime LastActivity { get; set; }

    public static void Clear() { UserID = 0; UserName = ""; Role = ""; }
}

// FrmLogin.cs — EF LINQ 登入（取代 SqlCommand）
private int _failCount = 0;

private void btnLogin_Click(object sender, EventArgs e)
{
    if (_failCount >= 3)
    { MessageBox.Show("帳號已鎖定，請稍後再試"); return; }

    string pwHash = Convert.ToHexString(
        SHA256.HashData(Encoding.UTF8.GetBytes(txtPassword.Text)));

    var user = AppDb.Context.Employees
        .FirstOrDefault(u =>
            u.Email        == txtEmail.Text.Trim() &&
            u.PasswordHash == pwHash &&
            u.IsActive     == true);

    if (user != null)
    {
        AppSession.UserID       = user.EmployeeID;
        AppSession.UserName     = user.Name;
        AppSession.Role         = user.Role ?? "Staff";
        AppSession.LastActivity = DateTime.Now;

        new FrmMain().Show();
        this.Hide();
    }
    else
    {
        _failCount++;
        lblError.Text = $"帳號或密碼錯誤（第{_failCount}/3次）";
        if (_failCount >= 3)
            MessageBox.Show("連續失敗3次，帳號已鎖定");
    }
}`
      },
      {
        type: 'code',
        lang: 'C#',
        title: '2分鐘閒置自動登出 + 角色權限控管',
        content: `// FrmMain.cs
private System.Windows.Forms.Timer _idleTimer = new();
private const int IDLE_SECONDS = 120; // 2分鐘

private void FrmMain_Load(object s, EventArgs e)
{
    // 角色控管：Admin 才能看供應商管理
    bool isAdmin = AppSession.Role == "Admin";
    menuItemEmployee.Visible  = isAdmin;
    btnManageUsers.Enabled    = isAdmin;
    tabPageReport.Visible     = isAdmin || AppSession.Role == "Staff";

    // 顯示歡迎訊息
    lblStatus.Text = $"歡迎 {AppSession.UserName} ({AppSession.Role})";

    // 啟動閒置計時器
    _idleTimer.Interval = 1000;
    _idleTimer.Tick     += IdleTimer_Tick;
    _idleTimer.Start();
    Application.AddMessageFilter(new ActivityFilter());
}

private void IdleTimer_Tick(object s, EventArgs e)
{
    int remaining = IDLE_SECONDS -
        (int)(DateTime.Now - AppSession.LastActivity).TotalSeconds;

    if (remaining <= 0)
    { _idleTimer.Stop(); ForceLogout(); }
    else if (remaining <= 30)
    { lblStatus.ForeColor = Color.OrangeRed;
      lblStatus.Text = $"⚠ 閒置將在 {remaining} 秒後自動登出"; }
    else
    { lblStatus.ForeColor = Color.Gray;
      lblStatus.Text = $"歡迎 {AppSession.UserName}"; }
}

private void ForceLogout()
{
    MessageBox.Show("閒置超過2分鐘，已自動登出", "自動登出");
    AppSession.Clear();
    new FrmLogin().Show();
    this.Close();
}

// IMessageFilter：任何滑鼠/鍵盤動作更新 LastActivity
class ActivityFilter : IMessageFilter
{
    const int WM_MOUSEMOVE = 0x0200, WM_KEYDOWN = 0x0100;
    public bool PreFilterMessage(ref Message m)
    {
        if (m.Msg == WM_MOUSEMOVE || m.Msg == WM_KEYDOWN)
            AppSession.LastActivity = DateTime.Now;
        return false;
    }
}`
      }
    ]
  },

  // ── Week 7：Android Jetpack Compose UI 設計 ──────────────
  7: {
    summary: '使用 Jetpack Compose 建立 LinkOne Android App，以 LazyColumn 顯示動態牆清單，NavigationBar 實作底部三頁切換，完全不使用 XML layout。',
    sections: [
      {
        type: 'mermaid',
        title: 'Compose App 架構圖',
        content: `flowchart TD
  MainActivity["MainActivity\\nsetContent { LinkOneApp() }"]
  AppRoot["LinkOneApp()\\nScaffold + NavHost"]
  NavBar["NavigationBar\\n首頁 / 動態牆 / 商城"]
  HomeScreen["HomeScreen()\\n@Composable"]
  FeedScreen["FeedScreen()\\nLazyColumn + PostCard"]
  StoreScreen["StoreScreen()\\n貼圖商城清單"]
  PostCard["PostCard()\\n@Composable\\n單一貼文卡片"]
  DetailScreen["PostDetailScreen()\\n貼文詳情 + 留言"]

  MainActivity --> AppRoot
  AppRoot --> NavBar
  AppRoot --> HomeScreen
  AppRoot --> FeedScreen
  AppRoot --> StoreScreen
  FeedScreen --> PostCard
  PostCard -->|點擊導航| DetailScreen

  style MainActivity fill:#1a3a6c,color:#fff
  style NavBar fill:#e67e22,color:#fff
  style FeedScreen fill:#27ae60,color:#fff
  style PostCard fill:#27ae60,color:#fff`
      },
      {
        type: 'code',
        lang: 'Kotlin',
        title: 'PostCard + FeedScreen — Compose 清單',
        content: `// data class（Compose 直接使用，不需 Adapter）
data class Post(
    val id: Int,
    val content: String,
    val authorName: String,
    val createdAt: String
)

// 單一貼文卡片
@Composable
fun PostCard(post: Post, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 6.dp)
            .clickable { onClick() },
        elevation = CardDefaults.cardElevation(3.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(post.authorName,
                 style    = MaterialTheme.typography.labelMedium,
                 color    = MaterialTheme.colorScheme.primary)
            Spacer(Modifier.height(4.dp))
            Text(post.content,
                 style    = MaterialTheme.typography.bodyMedium,
                 maxLines = 3)
            Spacer(Modifier.height(8.dp))
            Text(post.createdAt,
                 style = MaterialTheme.typography.labelSmall,
                 color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
    }
}

// 動態牆清單頁（LazyColumn 取代 RecyclerView）
@Composable
fun FeedScreen(navController: NavController) {
    val posts = remember {
        listOf(
            Post(1, "今天天氣真好，適合出去充電！", "王小明", "2024-01-15"),
            Post(2, "新的充電站開幕了，推薦大家去試試", "李美華", "2024-01-14"),
            Post(3, "電動車真的很省油錢", "張大同", "2024-01-13")
        )
    }

    LazyColumn(modifier = Modifier.fillMaxSize()) {
        item {
            Text("動態牆",
                 style    = MaterialTheme.typography.headlineSmall,
                 modifier = Modifier.padding(16.dp))
        }
        items(posts, key = { it.id }) { post ->
            PostCard(post, onClick = {
                navController.navigate("detail/\${post.id}")
            })
        }
    }
}`
      },
      {
        type: 'code',
        lang: 'Kotlin',
        title: 'LinkOneApp — NavigationBar + NavHost',
        content: `@Composable
fun LinkOneApp() {
    val navController = rememberNavController()
    val backStack by navController.currentBackStackEntryAsState()
    val current   = backStack?.destination?.route

    // ⚠ DynamicFeed / Store 屬於 material-icons-extended，需加依賴：
    // implementation("androidx.compose.material:material-icons-extended")
    // 或改用 Default 內建圖示（不需額外套件）：
    val tabs = listOf(
        Triple("home",  Icons.Default.Home,        "首頁"),
        Triple("feed",  Icons.Default.List,        "動態牆"),
        Triple("store", Icons.Default.Favorite,    "商城")
    )

    Scaffold(
        bottomBar = {
            NavigationBar {
                tabs.forEach { (route, icon, label) ->
                    NavigationBarItem(
                        selected = current == route,
                        onClick  = {
                            navController.navigate(route) {
                                popUpTo("home") { saveState = true }
                                launchSingleTop = true; restoreState = true
                            }
                        },
                        icon  = { Icon(icon, label) },
                        label = { Text(label) }
                    )
                }
            }
        }
    ) { padding ->
        NavHost(navController, "home", Modifier.padding(padding)) {
            composable("home")           { HomeScreen() }
            composable("feed")           { FeedScreen(navController) }
            composable("store")          { StoreScreen() }
            composable("detail/{postId}") { backStack ->
                val id = backStack.arguments?.getString("postId")?.toInt() ?: 0
                PostDetailScreen(id)
            }
        }
    }
}`
      }
    ]
  },

  // ── Week 8：Android REST API 整合（內建函式庫）────────────
  8: {
    summary: '使用 HttpURLConnection + org.json 呼叫後端 API，建立 ApiClient singleton，搭配 Coroutines + Compose produceState 管理非同步資料流，完全不使用 Retrofit/Gson。',
    sections: [
      {
        type: 'mermaid',
        title: 'HttpURLConnection 架構流程',
        content: `flowchart LR
  Compose["FeedScreen()\\n@Composable\\n（produceState 觀察）"]
  ApiClient["ApiClient\\nobject Singleton\\n（封裝 HTTP 呼叫）"]
  HTTP["HttpURLConnection\\nAndroid 內建"]
  JSON["org.json\\nJSONArray / JSONObject\\nAndroid 內建"]
  Server["後端 API Server\\nASP.NET Core"]

  Compose -->|"withContext(IO)"| ApiClient
  ApiClient --> HTTP
  HTTP -->|"GET /api/posts"| Server
  Server -->|"JSON Array"| HTTP
  HTTP --> JSON
  JSON -->|"List&lt;Post&gt;"| ApiClient
  ApiClient -->|Result.Success| Compose

  style Server fill:#e67e22,color:#fff
  style Compose fill:#1a3a6c,color:#fff
  style ApiClient fill:#8e44ad,color:#fff`
      },
      {
        type: 'code',
        lang: 'Kotlin',
        title: 'ApiClient — HttpURLConnection + org.json',
        content: `// ApiClient.kt（零外部套件）
object ApiClient {
    private const val BASE_URL = "http://10.0.2.2:5000/api"
    var token: String = ""

    private fun httpGet(path: String): String {
        val conn = (java.net.URL("$BASE_URL$path").openConnection()
            as java.net.HttpURLConnection).apply {
            requestMethod = "GET"
            setRequestProperty("Accept",        "application/json")
            setRequestProperty("Authorization", token)
            connectTimeout = 10_000
            readTimeout    = 10_000
        }
        return try {
            if (conn.responseCode == 200)
                conn.inputStream.bufferedReader().readText()
            else throw Exception("HTTP \${conn.responseCode}")
        } finally { conn.disconnect() }
    }

    private fun httpPost(path: String, body: String): String {
        val conn = (java.net.URL("$BASE_URL$path").openConnection()
            as java.net.HttpURLConnection).apply {
            requestMethod = "POST"
            doOutput      = true
            setRequestProperty("Content-Type",  "application/json")
            setRequestProperty("Authorization", token)
        }
        conn.outputStream.bufferedWriter().use { it.write(body) }
        return try { conn.inputStream.bufferedReader().readText() }
        finally { conn.disconnect() }
    }

    // 取得動態牆貼文清單
    suspend fun getPosts(): List<Post> = withContext(Dispatchers.IO) {
        val arr = org.json.JSONArray(httpGet("/posts"))
        List(arr.length()) { i ->
            val o = arr.getJSONObject(i)
            Post(o.getInt("postId"), o.getString("content"),
                 o.getString("authorName"), o.getString("createdAt"))
        }
    }

    // 設備授權Token（競賽要求延遲3秒）
    suspend fun fetchToken(deviceId: String) = withContext(Dispatchers.IO) {
        delay(3_000)
        val resp = httpPost("/auth/device-token", """{"deviceId":"$deviceId"}""")
        token = org.json.JSONObject(resp).getString("token")
    }
}`
      },
      {
        type: 'code',
        lang: 'Kotlin',
        title: 'FeedScreen — produceState 驅動 Compose UI',
        content: `// 簡易 Result 封裝
sealed class UiState<out T> {
    object Loading : UiState<Nothing>()
    data class Success<T>(val data: T) : UiState<T>()
    data class Error(val msg: String) : UiState<Nothing>()
}

@Composable
fun FeedScreen(navController: NavController) {
    val state = produceState<UiState<List<Post>>>(UiState.Loading) {
        value = try {
            UiState.Success(ApiClient.getPosts())
        } catch (e: Exception) {
            UiState.Error(e.message ?: "網路錯誤")
        }
    }

    when (val s = state.value) {
        is UiState.Loading -> Box(Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center) {
            CircularProgressIndicator()
        }
        is UiState.Success -> LazyColumn {
            items(s.data, key = { it.id }) { post ->
                PostCard(post) { navController.navigate("detail/\${post.id}") }
            }
        }
        is UiState.Error -> Column(
            Modifier.fillMaxSize().padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text("載入失敗：\${s.msg}", color = MaterialTheme.colorScheme.error)
            Spacer(Modifier.height(16.dp))
            Button(onClick = { /* TODO: 重試 */ }) { Text("重試") }
        }
    }
}`
      }
    ]
  },

  // ── Week 9：55分區模擬競賽 ────────────────────────────────
  9: {
    summary: '55分區模擬競賽反省與得分策略整理。重點在時間分配與「完整但簡單」原則。',
    sections: [
      {
        type: 'mermaid',
        title: '競賽時間分配建議（以3.5小時為例）',
        content: `gantt
  title 三模組競賽時間分配
  dateFormat  HH:mm
  axisFormat  %H:%M

  section SA and DB（60min）
  Use Case 圖          :sadb1, 09:00, 15m
  資料字典             :sadb2, after sadb1, 10m
  ER 圖                :sadb3, after sadb2, 35m

  section Software（90min）
  登入 + 主選單        :sw1, 10:00, 20m
  主資料 CRUD          :sw2, after sw1, 50m
  報表 / 特殊功能      :sw3, after sw2, 20m

  section App（60min）
  專案建置             :app1, 11:30, 10m
  清單頁顯示           :app2, after app1, 25m
  API 整合             :app3, after app2, 25m`
      },
      {
        type: 'text',
        title: '55分區模擬重點檢討',
        content: '(1) SA&DB：Use Case 圖先畫完整再精修 ER，時間不夠就省略次要關係。(2) Software：登入必須先完成，再做 CRUD；特殊功能（地圖、Webhook）放最後。(3) App：先讓清單頁顯示靜態假資料，確認 UI 後再接 API。(4) 通用原則：寧可一個功能 100% 完整，也不要三個功能各完成 30%。'
      }
    ]
  },

  // ── Week 10：56分區 LinkOne 資料庫設計 ───────────────────
  10: {
    summary: '56分區試題特殊要求：既有資料庫（SHLife）遷移至 LinkOne，所有新增資料表加 New_ 前綴。',
    sections: [
      {
        type: 'mermaid',
        title: 'LinkOne 完整 ER 圖（含 New_ 前綴資料表）',
        content: `erDiagram
  Employee {
    int EmployeeID PK
    nvarchar Name
    nvarchar Email
    nvarchar PasswordHash
    datetime2 CreatedAt
    bit IsActive
  }
  New_Post {
    int PostID PK
    int EmployeeID FK
    nvarchar Content
    datetime2 CreatedAt
    bit IsApproved
  }
  New_Comment {
    int CommentID PK
    int PostID FK
    int EmployeeID FK
    int ParentCommentID FK
    nvarchar Content
    datetime2 CreatedAt
  }
  New_Sticker {
    int StickerID PK
    nvarchar Name
    nvarchar ImagePath
    decimal Price
    nvarchar Category
  }
  New_Purchase {
    int PurchaseID PK
    int EmployeeID FK
    int StickerID FK
    datetime2 PurchasedAt
  }
  New_EmployeeSticker {
    int EmployeeID FK
    int StickerID FK
  }
  New_Report {
    int ReportID PK
    int PostID FK
    int ReporterID FK
    nvarchar Reason
    datetime2 ReportedAt
    bit IsResolved
  }

  Employee ||--o{ New_Post : "writes"
  Employee ||--o{ New_Comment : "comments"
  Employee ||--o{ New_Purchase : "buys"
  Employee ||--o{ New_EmployeeSticker : "owns"
  Employee ||--o{ New_Report : "reports"
  New_Post ||--o{ New_Comment : "has"
  New_Comment o|--o{ New_Comment : "replies"
  New_Sticker ||--o{ New_Purchase : "sold"
  New_Sticker ||--o{ New_EmployeeSticker : "owned"
  New_Post ||--o{ New_Report : "reported"`
      },
      {
        type: 'code',
        lang: 'SQL',
        title: '資料遷移 — 從 SHLife 現有資料表轉移至 New_ 資料表',
        content: `-- 56分區情境：SHLife 已有 Employee、SHPost、SHComment、SHSticker 等資料表
-- 目標：在同一資料庫內建立 New_ 前綴資料表並遷移資料

-- ① 建立 New_Post（含完整約束）
CREATE TABLE New_Post (
    PostID       INT           IDENTITY(1,1) PRIMARY KEY,
    EmployeeID   INT           NOT NULL REFERENCES Employee(EmployeeID),
    Content      NVARCHAR(500) NOT NULL,
    CreatedAt    DATETIME2     NOT NULL DEFAULT GETDATE(),
    IsApproved   BIT           NOT NULL DEFAULT 0,
    SafetyStatus TINYINT       NOT NULL DEFAULT 0  -- 0=待審 1=通過 2=拒絕
);

-- ② INSERT INTO...SELECT：從 SHPost 遷移舊資料
--    SHPost 欄位假設：PostID, UserID(=EmployeeID), Body, PostedAt, IsVisible
INSERT INTO New_Post (EmployeeID, Content, CreatedAt, IsApproved)
SELECT
    sp.UserID,
    sp.Body,
    sp.PostedAt,
    CASE WHEN sp.IsVisible = 1 THEN 1 ELSE 0 END
FROM SHPost sp
WHERE sp.UserID IN (SELECT EmployeeID FROM Employee)  -- 只匯入有對應員工的貼文
  AND sp.IsDeleted = 0;

-- ③ 驗證筆數
SELECT
    (SELECT COUNT(*) FROM SHPost WHERE IsDeleted=0)  AS 原始筆數,
    (SELECT COUNT(*) FROM New_Post)                  AS 遷移後筆數;

-- ④ 遷移 SHComment → New_Comment（含二層結構）
INSERT INTO New_Comment (PostID, EmployeeID, ParentCommentID, Content, CreatedAt)
SELECT
    sc.PostID,
    sc.UserID,
    sc.ParentID,   -- NULL=一層留言、有值=回覆
    sc.Body,
    sc.CommentedAt
FROM SHComment sc
WHERE sc.UserID IN (SELECT EmployeeID FROM Employee)
  AND sc.IsDeleted = 0;`
      }
    ]
  },

  // ── Week 11：56分區 LinkOne 軟體與 App ───────────────────
  11: {
    summary: '實作 LinkOne 的內容審核（C# 關鍵字過濾）與 Android 二層留言顯示。',
    sections: [
      {
        type: 'mermaid',
        title: '內容審核流程',
        content: `flowchart TD
  Submit["使用者提交貼文"]
  Filter["關鍵字過濾\\n（讀取詞庫 .txt）"]
  Pass{"通過？"}
  Flag["標記為待審核\\nIsApproved = 0"]
  Approve["Admin 審核"]
  Publish["發佈\\nIsApproved = 1"]
  Reject["拒絕發佈"]

  Submit --> Filter
  Filter --> Pass
  Pass -->|是| Publish
  Pass -->|否| Flag
  Flag --> Approve
  Approve --> Publish
  Approve --> Reject

  style Publish fill:#27ae60,color:#fff
  style Reject fill:#e74c3c,color:#fff
  style Flag fill:#f39c12,color:#fff`
      },
      {
        type: 'code',
        lang: 'C#',
        title: '關鍵字過濾器',
        content: `public class ContentFilter
{
    private readonly HashSet<string> _keywords;

    public ContentFilter(string[] wordFiles)
    {
        _keywords = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        foreach (var file in wordFiles)
        {
            if (File.Exists(file))
                foreach (var line in File.ReadAllLines(file, Encoding.UTF8))
                    if (!string.IsNullOrWhiteSpace(line))
                        _keywords.Add(line.Trim());
        }
    }

    public bool ContainsBannedWord(string content)
    {
        return _keywords.Any(kw =>
            content.Contains(kw, StringComparison.OrdinalIgnoreCase));
    }

    public string GetMatchedWord(string content)
    {
        return _keywords.FirstOrDefault(kw =>
            content.Contains(kw, StringComparison.OrdinalIgnoreCase)) ?? "";
    }
}`
      },
      {
        type: 'code',
        lang: 'Kotlin',
        title: 'Compose 二層留言 — 遞迴 CommentItem（取代 RecyclerView）',
        content: `// 資料結構：Comment 含子留言清單（與 W7/W8 架構一致）
data class Comment(
    val id: Int,
    val content: String,
    val author: String,
    val createdAt: String,
    val replies: List<Comment> = emptyList()
)

// 單一留言（遞迴渲染子留言，最多二層）
@Composable
fun CommentItem(comment: Comment, level: Int = 0) {
    val startPad = (level * 20).dp
    Column(modifier = Modifier
        .fillMaxWidth()
        .padding(start = startPad, top = 4.dp, bottom = 2.dp)) {

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = if (level == 0)
                    MaterialTheme.colorScheme.surfaceVariant
                else
                    MaterialTheme.colorScheme.surface
            ),
            border = if (level == 1)
                BorderStroke(1.dp, MaterialTheme.colorScheme.outlineVariant)
            else null
        ) {
            Column(modifier = Modifier.padding(10.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    if (level == 1) Text("↳ ", color = MaterialTheme.colorScheme.primary)
                    Text(comment.author,
                         style = MaterialTheme.typography.labelMedium,
                         color = MaterialTheme.colorScheme.primary,
                         fontWeight = FontWeight.Bold)
                    Spacer(Modifier.weight(1f))
                    Text(comment.createdAt,
                         style = MaterialTheme.typography.labelSmall,
                         color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
                Spacer(Modifier.height(4.dp))
                Text(comment.content, style = MaterialTheme.typography.bodySmall)
            }
        }

        // 遞迴渲染子留言（二層結構：level=1 不再往下）
        if (level == 0) {
            comment.replies.forEach { reply ->
                CommentItem(reply, level = 1)
            }
        }
    }
}

// 留言區塊（放在 PostDetailScreen 內）
@Composable
fun CommentSection(comments: List<Comment>) {
    Column {
        Text("留言 (${comments.size})",
             style    = MaterialTheme.typography.titleSmall,
             modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp))
        LazyColumn(modifier = Modifier.fillMaxWidth()) {
            items(comments, key = { it.id }) { comment ->
                CommentItem(comment)
            }
        }
    }
}`
      }
    ]
  },

  // ── Week 12：全國賽模擬與競賽策略 ────────────────────────
  12: {
    summary: '全國賽最終衝刺：時間管理、各模組優先順序、常見失分點整理。',
    sections: [
      {
        type: 'mermaid',
        title: '全國賽當天時間分配（4小時制）',
        content: `gantt
  title 全國賽當天建議時間分配
  dateFormat HH:mm
  axisFormat %H:%M

  section SA and DB（70min）
  閱讀題目 + Use Case    :sadb1, 09:00, 20m
  資料字典 + ER圖        :sadb2, after sadb1, 50m

  section Software（100min）
  登入系統               :sw1, 10:10, 15m
  Employee CRUD          :sw2, after sw1, 30m
  Post and Comment CRUD  :sw3, after sw2, 30m
  審核功能               :sw4, after sw3, 25m

  section App（60min）
  專案建置 + 登入        :app1, 11:50, 15m
  清單頁 + LazyColumn    :app2, after app1, 25m
  REST API 整合          :app3, after app2, 20m

  section 緩衝 + 收尾（10min）
  測試 + 提交            :buf, 12:50, 10m`
      },
      {
        type: 'text',
        title: '最常見失分點',
        content: `(1) SA&DB：
• ER 圖關聯方向錯誤（箭頭方向代表 FK 指向 PK）
• 漏掉複合主鍵（如 EmployeeSticker 應是 EmployeeID+StickerID 複合 PK）
• 正規化未到 3NF（Category 應獨立成表，不存在 Sticker 表內）
• View 定義內直接寫 ORDER BY（SQL Server 不允許，應在查詢時排序）

(2) Software（C# WinForms）：
• DataGridView 未綁定正確欄位（AutoGenerateColumns 忘記關閉）
• 刪除前未做 .Any() 關聯檢查，導致 FK 違反錯誤
• 密碼未雜湊（SHA256）直接明文比對

(3) App（Jetpack Compose）：
• HttpURLConnection 忘記在 withContext(Dispatchers.IO) 內執行
• BASE_URL 用 localhost 而非 10.0.2.2（模擬器無法連到 Host）
• produceState / StateFlow 未正確收集，UI 不更新
• Compose recomposition 問題：key 未設定導致清單項目錯位`
      },
      {
        type: 'text',
        title: '競賽加分策略',
        content: `(1) SA&DB：
• Use Case 圖標注 «include»/«extend» 關係 → 加分
• ER 圖加上資料型別與長度（評審易給分）
• 為 View 加說明註解（用途、對應 C# 呼叫方式）

(2) Software（C# WinForms）：
• 狀態列顯示登入者名稱與角色
• 閒置倒數計時顯示（倒數30秒變紅警告）
• 搜尋欄支援多關鍵字（Name + Email 同時比對）

(3) App（Jetpack Compose）：
• 實作 Pull-to-Refresh（Compose 用 pullRefreshState）：
  val refreshState = rememberPullRefreshState(isRefreshing, ::reload)
  Box(Modifier.pullRefresh(refreshState)) { ... PullRefreshIndicator(...) }
• LazyColumn 加 key = { item.id } 避免動畫跳動
• 網路錯誤時顯示「重試」按鈕（UiState.Error 分支）

(4) 通用原則：確保能執行不 crash — 不完整功能比 crash 的功能分數高`
      }
    ]
  }
};
