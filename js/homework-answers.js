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
        content: '先從試題找出所有角色（Actor）：Employee（員工）、Admin（管理員）；再列出每個角色能執行的功能（Use Case）；最後用 include / extend 關係連接共用功能。'
      },
      {
        type: 'mermaid',
        title: 'LinkOne Use Case 圖',
        content: `flowchart LR
  empActor([👤 Employee])
  adminActor([👤 Admin])

  subgraph sys["LinkOne System"]
    uc1("登入 / 註冊")
    uc2("查看動態牆")
    uc3("發佈貼文")
    uc4("回覆留言")
    uc5("購買貼圖")
    uc6("查看貼圖商城")
    uc7("管理使用者")
    uc8("內容審核")
    uc9("查看舉報")
  end

  empActor --> uc1
  empActor --> uc2
  empActor --> uc3
  empActor --> uc4
  empActor --> uc6
  empActor --> uc5
  adminActor --> uc1
  adminActor --> uc7
  adminActor --> uc8
  adminActor --> uc9

  style sys fill:#f0f4ff,stroke:#1a3a6c`
      },
      {
        type: 'text',
        title: '資料字典重點',
        content: '依試題評分表，資料字典需包含：欄位名稱、資料型別、長度、說明、PK/FK/NN/Default 等屬性。每個主要實體（Employee、Post、Comment、Sticker、Purchase）至少列出5個欄位。'
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
    summary: '建立 LinkOne 資料庫結構與基本測試資料，包含 CREATE TABLE、BULK INSERT 及 Stored Procedure。',
    sections: [
      {
        type: 'code',
        lang: 'SQL',
        title: 'CREATE TABLE 範本（Employee + Post）',
        content: `-- 建立 Employee 資料表
CREATE TABLE Employee (
    EmployeeID   INT           IDENTITY(1,1) PRIMARY KEY,
    Name         NVARCHAR(50)  NOT NULL,
    Email        NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(256) NOT NULL,
    CreatedAt    DATETIME2     NOT NULL DEFAULT GETDATE(),
    IsActive     BIT           NOT NULL DEFAULT 1
);

-- 建立 Post 資料表
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
        title: 'BULK INSERT 測試資料',
        content: `-- 從 CSV 匯入 Employee 資料
BULK INSERT Employee
FROM 'C:\\Data\\employees.csv'
WITH (
    FIELDTERMINATOR = ',',
    ROWTERMINATOR   = '\\n',
    FIRSTROW        = 2,       -- 跳過標題行
    CODEPAGE        = '65001'  -- UTF-8
);`
      },
      {
        type: 'code',
        lang: 'SQL',
        title: 'Stored Procedure：取得員工貼文清單',
        content: `CREATE PROCEDURE sp_GetEmployeePosts
    @EmployeeID INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT
        p.PostID,
        p.Content,
        p.CreatedAt,
        p.IsApproved,
        COUNT(c.CommentID) AS CommentCount
    FROM Post p
    LEFT JOIN Comment c ON c.PostID = p.PostID
    WHERE p.EmployeeID = @EmployeeID
    GROUP BY p.PostID, p.Content, p.CreatedAt, p.IsApproved
    ORDER BY p.CreatedAt DESC;
END;`
      }
    ]
  },

  // ── Week 4：C# WinForms 視窗程式基礎 ─────────────────────
  4: {
    summary: '建立 LinkOne WinForms 專案架構，完成主表單與登入表單，並套用命名規範。',
    sections: [
      {
        type: 'mermaid',
        title: 'WinForms 表單架構',
        content: `flowchart TD
  Login["frmLogin\\n登入表單"]
  Main["frmMain\\n主表單（MDI Parent）"]
  Employee["frmEmployee\\n員工管理 CRUD"]
  Post["frmPost\\n貼文管理"]
  Sticker["frmSticker\\n貼圖管理"]
  Moderation["frmModeration\\n內容審核"]

  Login -->|登入成功| Main
  Main --> Employee
  Main --> Post
  Main --> Sticker
  Main --> Moderation

  style Login fill:#2980b9,color:#fff
  style Main fill:#1a3a6c,color:#fff
  style Employee fill:#27ae60,color:#fff
  style Post fill:#27ae60,color:#fff
  style Sticker fill:#27ae60,color:#fff
  style Moderation fill:#e67e22,color:#fff`
      },
      {
        type: 'text',
        title: 'C# 命名規範',
        content: '控制項命名：btn（Button）、txt（TextBox）、lbl（Label）、dgv（DataGridView）、cmb（ComboBox）、chk（CheckBox）、dtpk（DateTimePicker）。表單命名：frm 前綴（如 frmLogin）。方法命名：動詞開頭（LoadData、SaveRecord、DeleteSelected）。'
      },
      {
        type: 'code',
        lang: 'C#',
        title: 'frmMain MDI 啟動子表單',
        content: `private void OpenChildForm(Form childForm)
{
    childForm.MdiParent = this;
    childForm.WindowState = FormWindowState.Maximized;
    childForm.Show();
}

private void btnEmployee_Click(object sender, EventArgs e)
{
    OpenChildForm(new frmEmployee());
}`
      }
    ]
  },

  // ── Week 5：C# 資料庫連接與 CRUD 操作 ────────────────────
  5: {
    summary: '實作 Employee 資料的完整 CRUD，包含 DataGridView 顯示、新增、修改、刪除，並加入關聯性檢查。',
    sections: [
      {
        type: 'code',
        lang: 'C#',
        title: 'LoadEmployees — 讀取並顯示資料',
        content: `private void LoadEmployees()
{
    using var conn = new SqlConnection(ConnectionString);
    var adapter = new SqlDataAdapter(
        "SELECT EmployeeID, Name, Email, IsActive FROM Employee ORDER BY Name",
        conn);
    var dt = new DataTable();
    adapter.Fill(dt);
    dgvEmployees.DataSource = dt;
    dgvEmployees.Columns["EmployeeID"].Visible = false;
}`
      },
      {
        type: 'code',
        lang: 'C#',
        title: 'btnDelete — 刪除前關聯檢查',
        content: `private void btnDelete_Click(object sender, EventArgs e)
{
    if (dgvEmployees.CurrentRow == null) return;
    var id = (int)dgvEmployees.CurrentRow.Cells["EmployeeID"].Value;

    using var conn = new SqlConnection(ConnectionString);
    conn.Open();

    // 檢查是否有關聯 Post
    var cmd = new SqlCommand(
        "SELECT COUNT(*) FROM Post WHERE EmployeeID = @ID", conn);
    cmd.Parameters.AddWithValue("@ID", id);
    int postCount = (int)cmd.ExecuteScalar();

    if (postCount > 0)
    {
        MessageBox.Show($"此員工有 {postCount} 筆貼文，無法刪除。",
            "刪除失敗", MessageBoxButtons.OK, MessageBoxIcon.Warning);
        return;
    }

    if (MessageBox.Show("確定要刪除？", "確認",
        MessageBoxButtons.YesNo) == DialogResult.Yes)
    {
        var del = new SqlCommand(
            "DELETE FROM Employee WHERE EmployeeID = @ID", conn);
        del.Parameters.AddWithValue("@ID", id);
        del.ExecuteNonQuery();
        LoadEmployees();
    }
}`
      }
    ]
  },

  // ── Week 6：C# 進階功能：認證、計時器 ───────────────────
  6: {
    summary: '實作 SHA-256 密碼雜湊登入驗證，以及自動登出計時器功能。',
    sections: [
      {
        type: 'code',
        lang: 'C#',
        title: 'SHA-256 密碼雜湊',
        content: `using System.Security.Cryptography;
using System.Text;

public static string HashPassword(string password)
{
    using var sha = SHA256.Create();
    byte[] bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password));
    return Convert.ToHexString(bytes).ToLower();
}

// 登入驗證
private void btnLogin_Click(object sender, EventArgs e)
{
    string hash = HashPassword(txtPassword.Text);
    using var conn = new SqlConnection(ConnectionString);
    var cmd = new SqlCommand(
        @"SELECT EmployeeID, Name FROM Employee
          WHERE Email = @Email AND PasswordHash = @Hash AND IsActive = 1",
        conn);
    cmd.Parameters.AddWithValue("@Email", txtEmail.Text.Trim());
    cmd.Parameters.AddWithValue("@Hash", hash);
    conn.Open();
    using var reader = cmd.ExecuteReader();
    if (reader.Read())
    {
        Program.CurrentUser = reader["Name"].ToString();
        new frmMain().Show();
        this.Hide();
    }
    else
    {
        MessageBox.Show("帳號或密碼錯誤", "登入失敗",
            MessageBoxButtons.OK, MessageBoxIcon.Error);
    }
}`
      },
      {
        type: 'code',
        lang: 'C#',
        title: 'Timer 自動登出（閒置 5 分鐘）',
        content: `private System.Windows.Forms.Timer _idleTimer;
private int _idleSeconds = 0;
private const int MAX_IDLE = 300; // 5 分鐘

private void InitIdleTimer()
{
    _idleTimer = new System.Windows.Forms.Timer();
    _idleTimer.Interval = 1000; // 每秒觸發
    _idleTimer.Tick += (s, e) => {
        _idleSeconds++;
        lblIdle.Text = $"閒置：{_idleSeconds}s / {MAX_IDLE}s";
        if (_idleSeconds >= MAX_IDLE)
        {
            _idleTimer.Stop();
            MessageBox.Show("已超過閒置時間，自動登出。");
            Application.Restart();
        }
    };
    _idleTimer.Start();
}

// 任何滑鼠或鍵盤操作重置計時
protected override void OnMouseMove(MouseEventArgs e)
{
    base.OnMouseMove(e);
    _idleSeconds = 0;
}`
      }
    ]
  },

  // ── Week 7：Android/Kotlin 基礎：UI 設計 ─────────────────
  7: {
    summary: '建立 LinkOne Android App 架構，完成員工清單的 RecyclerView 顯示。',
    sections: [
      {
        type: 'mermaid',
        title: 'Android App 架構圖',
        content: `flowchart TD
  MainActivity["MainActivity\\n（主頁 / 底部導覽）"]
  FeedFrag["FeedFragment\\n動態牆清單"]
  ProfileFrag["ProfileFragment\\n個人頁"]
  ShopFrag["StoreFragment\\n貼圖商城"]
  DetailAct["PostDetailActivity\\n貼文詳情"]
  CommentAdapter["CommentAdapter\\nRecyclerView"]

  MainActivity --> FeedFrag
  MainActivity --> ProfileFrag
  MainActivity --> ShopFrag
  FeedFrag -->|點擊貼文| DetailAct
  DetailAct --> CommentAdapter

  style MainActivity fill:#1a3a6c,color:#fff
  style FeedFrag fill:#27ae60,color:#fff
  style ProfileFrag fill:#27ae60,color:#fff
  style ShopFrag fill:#27ae60,color:#fff`
      },
      {
        type: 'code',
        lang: 'Kotlin',
        title: 'PostAdapter — RecyclerView Adapter',
        content: `data class Post(val id: Int, val content: String, val authorName: String)

class PostAdapter(
    private val posts: List<Post>,
    private val onClick: (Post) -> Unit
) : RecyclerView.Adapter<PostAdapter.ViewHolder>() {

    inner class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val tvContent: TextView = view.findViewById(R.id.tvContent)
        val tvAuthor: TextView  = view.findViewById(R.id.tvAuthor)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val v = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_post, parent, false)
        return ViewHolder(v)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val post = posts[position]
        holder.tvContent.text = post.content
        holder.tvAuthor.text  = post.authorName
        holder.itemView.setOnClickListener { onClick(post) }
    }

    override fun getItemCount() = posts.size
}`
      }
    ]
  },

  // ── Week 8：Android REST API 整合 ────────────────────────
  8: {
    summary: '整合 Retrofit 呼叫後端 API，使用 ViewModel + LiveData 管理非同步資料流。',
    sections: [
      {
        type: 'mermaid',
        title: 'Retrofit 架構流程',
        content: `flowchart LR
  UI["Fragment / Activity\\n（觀察 LiveData）"]
  VM["ViewModel\\n（呼叫 Repository）"]
  Repo["Repository\\n（整合 API / DB）"]
  API["ApiService\\n（Retrofit Interface）"]
  Server["後端 API Server"]

  UI -->|observe| VM
  VM --> Repo
  Repo --> API
  API -->|HTTP GET/POST| Server
  Server -->|JSON Response| API
  API --> Repo
  Repo -->|LiveData.postValue| VM
  VM -->|LiveData| UI

  style Server fill:#e67e22,color:#fff
  style UI fill:#1a3a6c,color:#fff`
      },
      {
        type: 'code',
        lang: 'Kotlin',
        title: 'RetrofitClient + ApiService',
        content: `// ApiService 介面
interface ApiService {
    @GET("api/posts")
    suspend fun getPosts(): List<Post>

    @POST("api/posts")
    suspend fun createPost(@Body body: CreatePostRequest): Post

    @GET("api/stickers")
    suspend fun getStickers(): List<Sticker>
}

// RetrofitClient 單例
object RetrofitClient {
    private const val BASE_URL = "http://10.0.2.2:5000/"

    val instance: ApiService by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(ApiService::class.java)
    }
}`
      },
      {
        type: 'code',
        lang: 'Kotlin',
        title: 'FeedViewModel',
        content: `class FeedViewModel : ViewModel() {
    private val _posts = MutableLiveData<List<Post>>()
    val posts: LiveData<List<Post>> = _posts

    private val _error = MutableLiveData<String>()
    val error: LiveData<String> = _error

    fun loadPosts() {
        viewModelScope.launch {
            try {
                val result = RetrofitClient.instance.getPosts()
                _posts.postValue(result)
            } catch (e: Exception) {
                _error.postValue("載入失敗：\${e.message}")
            }
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
        title: '資料遷移 — 從 SHLife 匯入至 New_ 資料表',
        content: `-- 步驟1：建立 New_Post 資料表
CREATE TABLE New_Post (
    PostID       INT           IDENTITY(1,1) PRIMARY KEY,
    EmployeeID   INT           NOT NULL REFERENCES Employee(EmployeeID),
    Content      NVARCHAR(500) NOT NULL,
    CreatedAt    DATETIME2     NOT NULL DEFAULT GETDATE(),
    IsApproved   BIT           NOT NULL DEFAULT 0
);

-- 步驟2：從聊天紀錄 CSV 匯入（BULK INSERT）
BULK INSERT ChatStaging
FROM 'C:\\Data\\chat_0001.csv'
WITH (FIELDTERMINATOR=',', ROWTERMINATOR='\\n', FIRSTROW=2, CODEPAGE='65001');

-- 步驟3：轉移至 New_Post
INSERT INTO New_Post (EmployeeID, Content, CreatedAt)
SELECT s.EmployeeID, s.Message, s.SentAt
FROM ChatStaging s
WHERE s.EmployeeID IN (SELECT EmployeeID FROM Employee);`
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
        title: 'Android 二層留言 RecyclerView',
        content: `// 資料結構：Comment 含子留言清單
data class Comment(
    val id: Int,
    val content: String,
    val author: String,
    val replies: List<Comment> = emptyList()
)

class CommentAdapter(private val comments: List<Comment>)
    : RecyclerView.Adapter<CommentAdapter.ViewHolder>() {

    inner class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val tvContent: TextView = view.findViewById(R.id.tvContent)
        val tvAuthor: TextView  = view.findViewById(R.id.tvAuthor)
        val rvReplies: RecyclerView = view.findViewById(R.id.rvReplies)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) =
        ViewHolder(LayoutInflater.from(parent.context)
            .inflate(R.layout.item_comment, parent, false))

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val comment = comments[position]
        holder.tvContent.text = comment.content
        holder.tvAuthor.text  = comment.author
        // 嵌套 RecyclerView 顯示子留言
        if (comment.replies.isNotEmpty()) {
            holder.rvReplies.visibility = View.VISIBLE
            holder.rvReplies.layoutManager = LinearLayoutManager(holder.itemView.context)
            holder.rvReplies.adapter = CommentAdapter(comment.replies)
        } else {
            holder.rvReplies.visibility = View.GONE
        }
    }

    override fun getItemCount() = comments.size
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
  清單頁 + RecyclerView  :app2, after app1, 25m
  REST API 整合          :app3, after app2, 20m

  section 緩衝 + 收尾（10min）
  測試 + 提交            :buf, 12:50, 10m`
      },
      {
        type: 'text',
        title: '最常見失分點',
        content: '(1) SA&DB：ER 圖關聯方向錯誤、漏掉複合主鍵、正規化未到 3NF。(2) Software：DataGridView 未綁定正確欄位、刪除前未做關聯檢查、密碼未雜湊。(3) App：Retrofit Base URL 忘記用 10.0.2.2（模擬器）、LiveData 未在主執行緒更新 UI、RecyclerView notifyDataSetChanged 漏呼叫。'
      },
      {
        type: 'text',
        title: '競賽加分策略',
        content: '(1) Use Case 圖：標注 include/extend 關係，加分。(2) ER 圖：加上資料型別與長度，評審易給分。(3) Software：加上狀態列顯示登入者名稱。(4) App：實作 Pull-to-Refresh（SwipeRefreshLayout）可額外加分。(5) 所有模組：確保能執行不 crash，不完整功能比 crash 的功能分數高。'
      }
    ]
  }
};
