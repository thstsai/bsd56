/* BSD56 Curriculum Data - 第56屆全國技能競賽 商務軟體設計 培訓課程資料 */

const BSD56Data = {

  scoringAnalysis: {
    modules: [
      {
        name: "SA&DB Design",
        label: "系統分析與資料庫設計",
        pct: 33,
        cls: "db",
        tip: "格式化工作佔多數，先求完整再求精確",
        topics: [
          { name: "使用案例圖 (Use Case Diagram)", score: 5, diff: 2, badge: "easy",
            strategy: "Actor與Use Case識別有固定方法，依需求文件逐條對應，繪圖格式正確即可滿分" },
          { name: "ER 圖與資料表設計", score: 15, diff: 4, badge: "hard",
            strategy: "最關鍵得分項，必須達到3NF，主外鍵關係正確，資料型別選擇合理" },
          { name: "資料字典 (Data Dictionary)", score: 8, diff: 2, badge: "easy",
            strategy: "格式固定，逐欄填寫欄位名稱、型別、長度、說明，耐心填完即可" },
          { name: "測試資料 (Test Data)", score: 5, diff: 2, badge: "easy",
            strategy: "每表至少100筆，使用SQL批次產生，確保外鍵關聯有效" },
          { name: "SQL 查詢/預存程序", score: 7, diff: 3, badge: "medium",
            strategy: "熟悉JOIN、GROUP BY、HAVING語法，先寫簡單查詢再加複雜條件" }
        ]
      },
      {
        name: "Software Design",
        label: "商務軟體設計 (C#)",
        pct: 37,
        cls: "sw",
        tip: "CRUD操作佔最多分，優先確保基礎功能完整",
        topics: [
          { name: "登入/身份驗證系統", score: 5, diff: 3, badge: "medium",
            strategy: "先做出可登入可登出的基礎系統，再加角色權限和自動登出" },
          { name: "基礎 CRUD 操作", score: 20, diff: 3, badge: "medium",
            strategy: "最重要！每個CRUD模組均需完整(查詢、新增、修改、刪除)，確保資料驗證" },
          { name: "進階查詢與報表", score: 8, diff: 3, badge: "medium",
            strategy: "多條件篩選、DataGridView顯示、匯出Excel功能" },
          { name: "特殊整合功能", score: 5, diff: 5, badge: "expert",
            strategy: "地圖整合、Webhook、多形態上傳等高難度功能，有時間再實作" },
          { name: "UI 品質與細節", score: 2, diff: 2, badge: "easy",
            strategy: "表單對齊整齊、錯誤提示明確、操作流暢即可" }
        ]
      },
      {
        name: "App Design",
        label: "行動應用程式設計 (Android)",
        pct: 30,
        cls: "app",
        tip: "先做好清單顯示，再逐步加入API整合",
        topics: [
          { name: "基礎 UI 與導航", score: 5, diff: 3, badge: "medium",
            strategy: "Activity/Fragment建立、BottomNavigation或Drawer、基礎Layout" },
          { name: "清單資料顯示", score: 8, diff: 3, badge: "medium",
            strategy: "RecyclerView + Adapter模式，點擊導航到詳情頁" },
          { name: "REST API 整合", score: 8, diff: 4, badge: "hard",
            strategy: "Retrofit + Coroutines，先能呼叫API顯示資料，再加入新增修改" },
          { name: "特殊功能實作", score: 4, diff: 5, badge: "expert",
            strategy: "設備授權Token、記憶體遊戲等，依剩餘時間決定是否實作" }
        ]
      }
    ]
  },

  weeks: [
    {
      id: 1, week: 1, mod: "db", modName: "SA&DB",
      title: "需求分析與使用案例圖",
      desc: "解讀競賽試題，識別系統Actor與Use Case，繪製標準UML圖",
      diff: 2, hours: 4,
      objectives: [
        "能從試題文件中識別所有系統使用者(Actor)",
        "能識別至少15個有意義的使用案例(Use Case)",
        "能正確繪製Use Case圖，包含關聯線與《include》《extend》關係",
        "了解55分區 ZCharge Plan 與 56分區 LinkOne 的系統範疇"
      ],
      topics: [
        "Use Case Diagram 基礎與繪圖工具 (Visio / draw.io)",
        "Actor識別方法：誰與系統互動？誰從系統獲取價值？",
        "Use Case命名原則：動詞+受詞，從使用者角度描述",
        "關聯關係：association、include（必定執行）、extend（選擇執行）",
        "ZCharge Plan 系統邊界分析：3個Actor × 15+ Use Cases",
        "LinkOne 系統邊界分析：4個Actor × 18+ Use Cases"
      ],
      exercises: [
        {
          title: "練習一：ZCharge Plan Actor 識別",
          questions: [
            {
              q: "閱讀以下ZCharge Plan系統描述，識別所有Actor：\n「ZCharge Plan是一個EV充電網路管理平台。車主可以查詢充電站位置、紀錄充電歷史、管理會員資料。充電站管理員可以新增/維護充電設備資訊。系統管理員負責管理供應商、設定收費方案、審核帳號申請。系統每天自動產生帳單報表。」",
              answer: "Actor共4個：\n① 車主 (Vehicle Owner) - 主要使用者\n② 充電站管理員 (Station Admin) - 設備管理\n③ 系統管理員 (System Admin) - 平台管理\n④ 自動排程系統 (Scheduler) - 非人類Actor，自動觸發報表\n\n注意：銀行支付閘道也可視為外部系統Actor"
            },
            {
              q: "為「車主」Actor列出至少8個Use Cases，並標明哪些有《include》或《extend》關係",
              answer: "車主的Use Cases：\n① 查詢充電站位置\n② 檢視充電站詳情（extend ← 查詢充電站位置）\n③ 查詢充電樁狀態\n④ 開始充電\n⑤ 停止充電\n⑥ 查詢充電紀錄\n⑦ 管理車輛資料\n⑧ 查詢帳單\n⑨ 線上付款（include ← 查詢帳單）\n⑩ 更新個人資料\n\n《include》：查詢帳單必定包含線上付款選項\n《extend》：查詢充電站詳情是查詢充電站的可選延伸"
            }
          ]
        },
        {
          title: "練習二：LinkOne Actor 與 Use Case 識別",
          questions: [
            {
              q: "56分區 LinkOne 是一個企業社交平台，包含：用戶發文/留言、二層留言系統、內容安全審核（AI初審+人工複審）、貼圖商城（創作者上架/用戶購買）。請識別Actor並為每個Actor列出主要Use Cases",
              answer: "Actor（4個）：\n① 一般用戶：發文、留言、回覆留言、購買貼圖、查看個人動態\n② 內容創作者：上架貼圖、管理貼圖商品、查看銷售報表\n③ 內容審核員：審核AI標記內容、批准/拒絕發布、查看審核隊列\n④ 平台管理員：管理用戶帳號、設定審核規則、查看系統統計\n\n特殊關係：\n- 發文 →《include》→ 觸發AI安全審核\n- AI審核 →《extend》→ 人工複審（僅當AI不確定時）"
            }
          ]
        }
      ],
      codeExamples: [
        {
          lang: "SQL", label: "SQL - 產生Use Case清單輔助查詢",
          code: `-- 建立Use Case管理輔助表（競賽準備用）
CREATE TABLE UseCaseList (
    ID       INT IDENTITY(1,1) PRIMARY KEY,
    Actor    NVARCHAR(50)  NOT NULL,   -- Actor名稱
    UseCase  NVARCHAR(100) NOT NULL,   -- Use Case名稱
    Relation NVARCHAR(50),             -- include / extend / association
    RelatedUC NVARCHAR(100)            -- 關聯的Use Case
);

-- 插入ZCharge Plan Use Cases
INSERT INTO UseCaseList (Actor, UseCase, Relation, RelatedUC) VALUES
('車主',       '查詢充電站位置',   'association', NULL),
('車主',       '檢視充電站詳情',   'extend',      '查詢充電站位置'),
('車主',       '開始充電',         'association', NULL),
('車主',       '線上付款',         'include',     '查詢帳單'),
('站管理員',   '新增充電設備',     'association', NULL),
('系統管理員', '管理供應商',       'association', NULL),
('排程系統',   '自動產生帳單',     'association', NULL);`
        }
      ],
      testData: {
        desc: "ZCharge Plan Actor/Use Case 對應表（參考答案）",
        table: {
          headers: ["Actor", "Use Case數量", "主要Use Cases"],
          rows: [
            ["車主", "10", "查詢充電站、開始/停止充電、查詢帳單、管理車輛"],
            ["充電站管理員", "6", "新增/維護充電設備、查看充電紀錄"],
            ["系統管理員", "8", "管理供應商、設定方案、審核帳號"],
            ["排程系統", "2", "自動產生帳單、推送通知"]
          ]
        }
      },
      homework: {
        title: "Week 1 作業：繪製Use Case圖",
        requirements: [
          "選擇 56分區 LinkOne 系統",
          "使用 Visio、draw.io 或 PlantUML 繪製完整Use Case圖",
          "至少包含4個Actor、18個Use Case",
          "正確標示至少3個《include》或《extend》關係",
          "匯出為 PNG 並上傳至作業系統"
        ]
      }
    },

    {
      id: 2, week: 2, mod: "db", modName: "SA&DB",
      title: "ER 圖設計與資料庫正規化",
      desc: "識別實體與關係，設計符合3NF的資料庫架構，繪製標準ER圖",
      diff: 4, hours: 5,
      objectives: [
        "能識別系統中的主要實體(Entity)及其屬性",
        "能正確定義主鍵(PK)、外鍵(FK)和候選鍵",
        "能驗證資料表是否符合第三正規形式(3NF)",
        "能繪製含基數(Cardinality)的ER圖"
      ],
      topics: [
        "實體(Entity)、屬性(Attribute)、關係(Relationship)定義",
        "主鍵(PK)選擇原則：穩定、簡短、唯一、非空",
        "正規化三步驟：1NF(消除重複值) → 2NF(完全函數相依) → 3NF(消除遞移相依)",
        "基數標記：一對一(1:1)、一對多(1:N)、多對多(M:N)",
        "多對多關係的橋接表設計（如：充電紀錄連接會員與充電樁）",
        "ZCharge Plan 6個實體設計分析",
        "LinkOne 8個實體設計分析（含New_前綴新增表）"
      ],
      exercises: [
        {
          title: "練習一：ZCharge Plan 3NF驗證",
          questions: [
            {
              q: "以下是一個未正規化的充電紀錄表，請指出違反哪個正規形式並改正：\nChargingRecord(記錄ID, 車牌號碼, 車主姓名, 車主電話, 充電樁ID, 充電樁位置, 充電樁型號, 開始時間, 結束時間, 電量(kWh), 費率(元/kWh), 費用)\n",
              answer: "違反多個正規形式：\n\n❌ 違反2NF：車主姓名、車主電話 僅相依於「車牌號碼」（非完整PK）\n❌ 違反2NF：充電樁位置、型號 僅相依於「充電樁ID」\n❌ 違反3NF：費用 = 電量 × 費率（遞移相依，可計算得出）\n\n✅ 改正後拆分為：\nVehicle(車牌號碼PK, 車主ID_FK, ...)\nMember(車主ID PK, 姓名, 電話, ...)\nChargingPile(充電樁ID PK, 位置, 型號, 費率, ...)\nChargingRecord(記錄ID PK, 車牌FK, 充電樁ID_FK, 開始時間, 結束時間, 電量)\n→ 費用在查詢時計算：費用 = 電量 × ChargingPile.費率"
            },
            {
              q: "設計 MembershipPlan（會員方案）資料表，需包含：方案名稱、月費、每次充電折扣%、免費充電時數/月、升等條件（累積消費額）。請寫出欄位名稱、資料型別和限制條件",
              answer: "CREATE TABLE MembershipPlan (\n    PlanID       INT           IDENTITY(1,1) PRIMARY KEY,\n    PlanCode     NVARCHAR(10)  NOT NULL UNIQUE,   -- 例如：BASIC/SILVER/GOLD\n    PlanName     NVARCHAR(50)  NOT NULL,\n    MonthlyFee   DECIMAL(8,2)  NOT NULL DEFAULT 0,\n    DiscountPct  DECIMAL(5,2)  NOT NULL DEFAULT 0   CHECK (DiscountPct BETWEEN 0 AND 100),\n    FreeHours    DECIMAL(5,1)  NOT NULL DEFAULT 0,\n    UpgradeThreshold DECIMAL(10,2) NULL,          -- NULL = 最高方案\n    IsActive     BIT           NOT NULL DEFAULT 1\n);"
            }
          ]
        },
        {
          title: "練習二：LinkOne 新增資料表設計",
          questions: [
            {
              q: "56分區要求設計「二層留言系統」(原系統只有一層)。需將原Comment表改造，支援「文章留言」和「留言的回覆」(最多二層)。請設計New_Comment資料表，需支援無限層次嵌套變平板結構。",
              answer: "-- 平板化二層留言設計（不使用遞迴，效能好）\nCREATE TABLE New_Comment (\n    CommentID    INT           IDENTITY(1,1) PRIMARY KEY,\n    PostID       INT           NOT NULL,     -- 所屬文章FK\n    ParentID     INT           NULL,         -- NULL=一層留言，有值=二層回覆FK→自參照\n    AuthorID     INT           NOT NULL,     -- 留言者FK\n    Content      NVARCHAR(2000) NOT NULL,\n    CreatedAt    DATETIME2     NOT NULL DEFAULT SYSDATETIME(),\n    IsDeleted    BIT           NOT NULL DEFAULT 0,\n    SafetyStatus TINYINT       NOT NULL DEFAULT 0, -- 0=待審 1=通過 2=拒絕\n    FOREIGN KEY (PostID)   REFERENCES Post(PostID),\n    FOREIGN KEY (ParentID) REFERENCES New_Comment(CommentID), -- 自參照\n    FOREIGN KEY (AuthorID) REFERENCES [User](UserID),\n    CHECK (ParentID IS NULL OR -- 限制最多二層：回覆的ParentID必須是一層留言\n           NOT EXISTS(SELECT 1 FROM New_Comment p WHERE p.CommentID=ParentID AND p.ParentID IS NOT NULL))\n);"
            }
          ]
        }
      ],
      codeExamples: [
        {
          lang: "SQL", label: "SQL - ZCharge Plan 完整資料表結構",
          code: `-- === ZCharge Plan 資料庫架構 ===

-- 1. 會員方案 (無外鍵相依，先建)
CREATE TABLE MembershipPlan (
    PlanID      INT          IDENTITY(1,1) PRIMARY KEY,
    PlanCode    NVARCHAR(10) NOT NULL UNIQUE,
    PlanName    NVARCHAR(50) NOT NULL,
    MonthlyFee  DECIMAL(8,2) NOT NULL DEFAULT 0,
    DiscountPct DECIMAL(5,2) NOT NULL DEFAULT 0
        CHECK (DiscountPct BETWEEN 0 AND 100),
    FreeHours   DECIMAL(5,1) NOT NULL DEFAULT 0,
    IsActive    BIT          NOT NULL DEFAULT 1
);

-- 2. 會員資料
CREATE TABLE Member (
    MemberID   INT           IDENTITY(1,1) PRIMARY KEY,
    MemberNo   NVARCHAR(10)  NOT NULL UNIQUE,
    FullName   NVARCHAR(50)  NOT NULL,
    Email      NVARCHAR(100) NOT NULL UNIQUE,
    Phone      NVARCHAR(20)  NOT NULL,
    PlanID     INT           NOT NULL DEFAULT 1,
    JoinDate   DATE          NOT NULL DEFAULT GETDATE(),
    TotalSpent DECIMAL(10,2) NOT NULL DEFAULT 0,
    FOREIGN KEY (PlanID) REFERENCES MembershipPlan(PlanID)
);

-- 3. 供應商
CREATE TABLE Supplier (
    SupplierID   INT          IDENTITY(1,1) PRIMARY KEY,
    SupplierName NVARCHAR(100) NOT NULL,
    ContactPerson NVARCHAR(50),
    Phone        NVARCHAR(20),
    Email        NVARCHAR(100),
    IsActive     BIT          NOT NULL DEFAULT 1
);

-- 4. 充電站
CREATE TABLE ChargingStation (
    StationID   INT           IDENTITY(1,1) PRIMARY KEY,
    StationName NVARCHAR(100) NOT NULL,
    Address     NVARCHAR(200) NOT NULL,
    Latitude    DECIMAL(9,6)  NOT NULL,
    Longitude   DECIMAL(9,6)  NOT NULL,
    SupplierID  INT           NOT NULL,
    IsActive    BIT           NOT NULL DEFAULT 1,
    FOREIGN KEY (SupplierID) REFERENCES Supplier(SupplierID)
);

-- 5. 充電樁 (屬於充電站)
CREATE TABLE ChargingPile (
    PileID    INT          IDENTITY(1,1) PRIMARY KEY,
    PileCode  NVARCHAR(20) NOT NULL UNIQUE,
    StationID INT          NOT NULL,
    PileType  NVARCHAR(10) NOT NULL CHECK (PileType IN ('AC慢充','DC快充')),
    PowerKW   DECIMAL(6,1) NOT NULL,
    RatePerKWh DECIMAL(6,2) NOT NULL,
    Status    NVARCHAR(10) NOT NULL DEFAULT '可用'
        CHECK (Status IN ('可用','使用中','故障','停用')),
    FOREIGN KEY (StationID) REFERENCES ChargingStation(StationID)
);

-- 6. 充電紀錄 (橋接 Member ↔ ChargingPile)
CREATE TABLE ChargingRecord (
    RecordID   INT           IDENTITY(1,1) PRIMARY KEY,
    MemberID   INT           NOT NULL,
    PileID     INT           NOT NULL,
    StartTime  DATETIME2     NOT NULL,
    EndTime    DATETIME2     NULL,
    EnergyKWh  DECIMAL(8,3)  NULL,
    Amount     AS (EnergyKWh * (SELECT RatePerKWh FROM ChargingPile WHERE PileID = ChargingRecord.PileID)),
    -- Amount 為計算欄，不儲存避免違反3NF
    FOREIGN KEY (MemberID) REFERENCES Member(MemberID),
    FOREIGN KEY (PileID)   REFERENCES ChargingPile(PileID)
);`
        }
      ],
      testData: {
        desc: "ZCharge Plan 主要實體與關係對照表",
        table: {
          headers: ["實體", "主鍵", "主要屬性數", "關係"],
          rows: [
            ["MembershipPlan", "PlanID", "6", "1:N → Member"],
            ["Member", "MemberID", "7", "N:1 → MembershipPlan, 1:N → ChargingRecord"],
            ["Supplier", "SupplierID", "5", "1:N → ChargingStation"],
            ["ChargingStation", "StationID", "7", "N:1 → Supplier, 1:N → ChargingPile"],
            ["ChargingPile", "PileID", "7", "N:1 → ChargingStation, 1:N → ChargingRecord"],
            ["ChargingRecord", "RecordID", "7", "N:1 → Member, N:1 → ChargingPile"]
          ]
        }
      },
      homework: {
        title: "Week 2 作業：設計56分區 LinkOne ER圖",
        requirements: [
          "設計 LinkOne 平台的完整資料庫ER圖（至少8個資料表）",
          "新增資料表須加 New_ 前綴，並在ER圖中區分標示",
          "每個資料表須標示PK、FK、NOT NULL欄位",
          "驗證所有資料表符合3NF",
          "提交 ER圖圖檔 + 資料表清單文件"
        ]
      }
    },

    {
      id: 3, week: 3, mod: "db", modName: "SA&DB",
      title: "T-SQL 語法與測試資料建立",
      desc: "熟練T-SQL建表語法、約束條件，並高效產生100筆以上測試資料",
      diff: 3, hours: 4,
      objectives: [
        "能正確撰寫帶有各種約束條件的 CREATE TABLE 語法",
        "能使用 SQL 批次插入100筆以上真實感測試資料",
        "能撰寫基礎 SELECT、JOIN、GROUP BY 查詢",
        "能建立簡單的 Stored Procedure 封裝業務邏輯"
      ],
      topics: [
        "CREATE TABLE：資料型別選擇（INT/NVARCHAR/DECIMAL/DATETIME2/BIT）",
        "約束條件：PRIMARY KEY、FOREIGN KEY、NOT NULL、UNIQUE、CHECK、DEFAULT",
        "IDENTITY(1,1) 自動遞增主鍵",
        "批次測試資料產生：ROW_NUMBER() + sys.all_objects 技巧",
        "格式化資料：RIGHT() + CAST() 產生有規律的編號",
        "JOIN查詢：INNER JOIN、LEFT JOIN",
        "彙總查詢：GROUP BY、COUNT、SUM、AVG、HAVING",
        "預存程序(Stored Procedure)：CREATE PROCEDURE、參數傳遞"
      ],
      exercises: [
        {
          title: "練習一：批次產生測試資料",
          questions: [
            {
              q: "請寫SQL語法，一次插入100筆 Member 測試資料。要求：\n- MemberNo 格式為 M0001~M0100\n- Email 格式為 member001@zcharge.com\n- PlanID 隨機分配 1~3\n- JoinDate 為最近365天內的隨機日期",
              answer: `INSERT INTO Member (MemberNo, FullName, Email, Phone, PlanID, JoinDate)
SELECT
    'M' + RIGHT('0000' + CAST(n AS VARCHAR), 4) AS MemberNo,
    N'測試用戶' + CAST(n AS NVARCHAR)           AS FullName,
    'member' + RIGHT('000' + CAST(n AS VARCHAR), 3) + '@zcharge.com' AS Email,
    '09' + RIGHT('00000000' + CAST(ABS(CHECKSUM(NEWID())) % 100000000 AS VARCHAR), 8) AS Phone,
    (n % 3) + 1     AS PlanID,
    DATEADD(DAY, -(ABS(CHECKSUM(NEWID())) % 365), GETDATE()) AS JoinDate
FROM (
    SELECT TOP 100 ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS n
    FROM sys.all_objects
) t;`
            },
            {
              q: "寫一個 Stored Procedure GetMemberCharging，接受 @MemberID INT 參數，回傳該會員的所有充電紀錄，包含：充電站名稱、充電樁代碼、開始時間、充電量(kWh)、費用(計算值)",
              answer: `CREATE PROCEDURE GetMemberCharging
    @MemberID INT
AS
BEGIN
    SELECT
        cs.StationName          AS 充電站,
        cp.PileCode             AS 充電樁,
        cr.StartTime            AS 開始時間,
        cr.EndTime              AS 結束時間,
        cr.EnergyKWh            AS 充電量kWh,
        CAST(cr.EnergyKWh * cp.RatePerKWh AS DECIMAL(8,2)) AS 費用
    FROM ChargingRecord cr
    INNER JOIN ChargingPile    cp ON cr.PileID    = cp.PileID
    INNER JOIN ChargingStation cs ON cp.StationID = cs.StationID
    WHERE cr.MemberID = @MemberID
    ORDER BY cr.StartTime DESC;
END;

-- 呼叫方式
EXEC GetMemberCharging @MemberID = 1;`
            }
          ]
        },
        {
          title: "練習二：LinkOne 資料遷移 SQL",
          questions: [
            {
              q: "56分區提供原有的 ChatRecord CSV資料，需要將舊的扁平聊天記錄轉換成新的 New_Comment 二層留言結構。假設原始資料有：MessageID, PostID, UserID, Content, ReplyToID, CreatedAt。請寫資料遷移SQL",
              answer: `-- 步驟1：先遷移一層留言(ReplyToID IS NULL)
INSERT INTO New_Comment (PostID, ParentID, AuthorID, Content, CreatedAt, SafetyStatus)
SELECT PostID, NULL, UserID, Content, CreatedAt, 1  -- 預設通過審核
FROM OldChatRecord
WHERE ReplyToID IS NULL;

-- 步驟2：遷移二層回覆(需對應到新的ParentID)
INSERT INTO New_Comment (PostID, ParentID, AuthorID, Content, CreatedAt, SafetyStatus)
SELECT
    old.PostID,
    nc.CommentID,    -- 對應新表的ParentID
    old.UserID,
    old.Content,
    old.CreatedAt,
    1
FROM OldChatRecord old
INNER JOIN OldChatRecord parent ON old.ReplyToID = parent.MessageID
INNER JOIN New_Comment nc ON nc.AuthorID = parent.UserID
    AND nc.PostID = parent.PostID
    AND nc.ParentID IS NULL  -- 確保是一層留言
WHERE old.ReplyToID IS NOT NULL;`
            }
          ]
        }
      ],
      codeExamples: [
        {
          lang: "SQL", label: "SQL - 批次測試資料產生模板",
          code: `-- === 通用批次資料產生模板 ===

-- 產生序號1~N的方法
SELECT TOP 100 ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS n
FROM sys.all_objects;

-- 格式化編號：S001, S002 ...
'S' + RIGHT('000' + CAST(n AS VARCHAR), 3)

-- 隨機日期（最近1年內）
DATEADD(DAY, -(ABS(CHECKSUM(NEWID())) % 365), GETDATE())

-- 隨機選擇外鍵值（假設1~5）
(ABS(CHECKSUM(NEWID())) % 5) + 1

-- 隨機金額 (100~9999)
CAST((ABS(CHECKSUM(NEWID())) % 9900) + 100 AS DECIMAL(8,2))

-- 隨機從清單選一：
CASE (ABS(CHECKSUM(NEWID())) % 3)
    WHEN 0 THEN N'AC慢充'
    WHEN 1 THEN N'DC快充'
    ELSE N'超快充'
END

-- === 範例：批次產生100筆充電樁 ===
INSERT INTO ChargingPile (PileCode, StationID, PileType, PowerKW, RatePerKWh, Status)
SELECT
    'P' + RIGHT('0000' + CAST(n AS VARCHAR), 4),
    (n % 10) + 1,    -- 分配到10個充電站
    CASE (n % 2) WHEN 0 THEN N'AC慢充' ELSE N'DC快充' END,
    CASE (n % 2) WHEN 0 THEN 7.4 ELSE 120.0 END,
    CASE (n % 3)
        WHEN 0 THEN 3.50
        WHEN 1 THEN 4.20
        ELSE 5.00
    END,
    N'可用'
FROM (
    SELECT TOP 100 ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS n
    FROM sys.all_objects
) t;`
        }
      ],
      testData: {
        desc: "常用 T-SQL 資料型別對照表",
        table: {
          headers: ["資料型別", "說明", "使用時機", "範例"],
          rows: [
            ["INT", "整數", "ID、數量、狀態碼", "MemberID, Quantity"],
            ["NVARCHAR(n)", "Unicode字串", "中文名稱、地址、Email", "FullName, Address"],
            ["DECIMAL(p,s)", "精確小數", "金額、座標、折扣", "Amount DECIMAL(10,2)"],
            ["DATETIME2", "精確日期時間", "交易時間、建立時間", "CreatedAt DATETIME2"],
            ["DATE", "僅日期", "生日、入會日", "BirthDate DATE"],
            ["BIT", "布林值(0/1)", "是否啟用、是否刪除", "IsActive BIT"],
            ["NVARCHAR(MAX)", "長文字", "貼文內容、留言", "Content NVARCHAR(MAX)"]
          ]
        }
      },
      homework: {
        title: "Week 3 作業：建立完整資料庫並填入測試資料",
        requirements: [
          "依Week 2設計的LinkOne ER圖建立所有資料表",
          "每個資料表建立100筆以上測試資料",
          "使用ROW_NUMBER()批次插入，不得手動輸入每筆",
          "撰寫3個Stored Procedure（查詢、新增、更新各1個）",
          "提交.sql腳本檔案，可直接執行無錯誤"
        ]
      }
    },

    {
      id: 4, week: 4, mod: "sw", modName: "C# 軟體",
      title: "C# WinForms 視窗程式基礎",
      desc: "建立Visual Studio開發環境，熟悉WinForms控制項與事件驅動程式設計",
      diff: 2, hours: 5,
      objectives: [
        "能建立 .NET 8 WinForms 專案並完成基礎設定",
        "熟悉常用控制項：TextBox、Button、DataGridView、TabControl、ComboBox",
        "理解事件驅動程式模型，能撰寫事件處理方法",
        "能設計符合競賽要求的表單佈局"
      ],
      topics: [
        "Visual Studio 2022 + .NET 8 WinForms 專案建立",
        "Form 屬性設定：大小、標題、Icon、StartPosition",
        "常用控制項：Label、TextBox、Button、Panel、GroupBox",
        "DataGridView：顯示表格資料、設定欄位、選取列",
        "TabControl：多頁籤介面設計",
        "MenuStrip / ToolStrip：主選單與工具列",
        "MessageBox：確認對話框",
        "事件：Click、TextChanged、SelectionChanged、Load",
        "appsettings.json 連接字串設定"
      ],
      exercises: [
        {
          title: "練習一：基礎表單設計",
          questions: [
            {
              q: "建立一個「供應商管理」表單，需包含：\n① 頂部搜尋區：TextBox(關鍵字) + Button(搜尋)\n② 中央DataGridView：顯示供應商清單(唯讀)\n③ 右側詳情面板：輸入各欄位的TextBox + 新增/修改/刪除按鈕\n請描述表單的控制項名稱命名規範",
              answer: "命名規範（匈牙利記法+語意）：\n控制項類型前綴：\n- TextBox → txt（如：txtKeyword、txtSupplierName）\n- Button → btn（如：btnSearch、btnAdd、btnEdit、btnDelete）\n- DataGridView → dgv（如：dgvSuppliers）\n- Label → lbl（如：lblSupplierName）\n- ComboBox → cbo（如：cboStatus）\n- Panel → pnl（如：pnlDetail）\n\n整體佈局建議：\n- 使用TableLayoutPanel或SplitContainer分割左右區域\n- DataGridView的AutoSizeColumnsMode = Fill\n- 按鈕區用FlowLayoutPanel排列"
            },
            {
              q: "在DataGridView中，如何讓使用者點擊某一列後，將該列資料自動填入右側詳情面板的TextBox中？寫出事件處理方法",
              answer: `// DataGridView的SelectionChanged事件
private void dgvSuppliers_SelectionChanged(object sender, EventArgs e)
{
    if (dgvSuppliers.SelectedRows.Count == 0) return;

    DataGridViewRow row = dgvSuppliers.SelectedRows[0];
    // 取得選取列的資料填入表單
    txtSupplierName.Text = row.Cells["SupplierName"].Value?.ToString() ?? "";
    txtContact.Text      = row.Cells["ContactPerson"].Value?.ToString() ?? "";
    txtPhone.Text        = row.Cells["Phone"].Value?.ToString() ?? "";
    txtEmail.Text        = row.Cells["Email"].Value?.ToString() ?? "";

    // 記錄選取的ID（隱藏欄位）
    _selectedSupplierID = Convert.ToInt32(row.Cells["SupplierID"].Value);

    // 切換按鈕狀態
    btnAdd.Enabled    = false;
    btnEdit.Enabled   = true;
    btnDelete.Enabled = true;
}`
            }
          ]
        }
      ],
      codeExamples: [
        {
          lang: "csharp", label: "C# - 表單基礎架構模板",
          code: `// Form1.cs - 供應商管理主表單
public partial class FrmSupplierManagement : Form
{
    private int _selectedSupplierID = -1;
    private readonly string _connStr =
        ConfigurationManager.ConnectionStrings["ZCharge"].ConnectionString;

    public FrmSupplierManagement()
    {
        InitializeComponent();
        SetupDataGridView();
    }

    private void FrmSupplierManagement_Load(object sender, EventArgs e)
    {
        LoadSuppliers();
        ClearForm();
    }

    // 設定DataGridView欄位
    private void SetupDataGridView()
    {
        dgvSuppliers.AutoGenerateColumns = false;
        dgvSuppliers.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
        dgvSuppliers.MultiSelect   = false;
        dgvSuppliers.ReadOnly      = true;
        dgvSuppliers.AllowUserToAddRows = false;

        // 定義欄位
        dgvSuppliers.Columns.AddRange(new DataGridViewColumn[]
        {
            new DataGridViewTextBoxColumn { Name="SupplierID",   HeaderText="ID",     DataPropertyName="SupplierID",   Visible=false },
            new DataGridViewTextBoxColumn { Name="SupplierName", HeaderText="供應商名稱", DataPropertyName="SupplierName", Width=200 },
            new DataGridViewTextBoxColumn { Name="ContactPerson",HeaderText="聯絡人",   DataPropertyName="ContactPerson",Width=100 },
            new DataGridViewTextBoxColumn { Name="Phone",        HeaderText="電話",     DataPropertyName="Phone",        Width=120 },
            new DataGridViewTextBoxColumn { Name="Email",        HeaderText="Email",    DataPropertyName="Email",        AutoSizeMode=DataGridViewAutoSizeColumnMode.Fill }
        });
    }

    // 清空表單輸入
    private void ClearForm()
    {
        _selectedSupplierID = -1;
        txtSupplierName.Text = "";
        txtContact.Text = "";
        txtPhone.Text = "";
        txtEmail.Text = "";
        btnAdd.Enabled    = true;
        btnEdit.Enabled   = false;
        btnDelete.Enabled = false;
        dgvSuppliers.ClearSelection();
    }
}`
        }
      ],
      testData: {
        desc: "WinForms 控制項快速參考",
        table: {
          headers: ["控制項", "常用屬性", "常用事件", "競賽用途"],
          rows: [
            ["TextBox", "Text, MaxLength, PasswordChar", "TextChanged, KeyPress", "輸入欄位、搜尋框"],
            ["Button", "Text, Enabled, FlatStyle", "Click", "確認、取消、搜尋"],
            ["DataGridView", "DataSource, ReadOnly, SelectionMode", "SelectionChanged, CellDoubleClick", "資料清單顯示"],
            ["ComboBox", "Items, SelectedValue, DataSource", "SelectedIndexChanged", "下拉選單"],
            ["DateTimePicker", "Value, Format, MinDate", "ValueChanged", "日期選擇"],
            ["TabControl", "TabPages, SelectedIndex", "SelectedIndexChanged", "多功能頁籤"],
            ["Label", "Text, ForeColor, Font", "-", "欄位說明、狀態顯示"]
          ]
        }
      },
      homework: {
        title: "Week 4 作業：建立充電站管理表單",
        requirements: [
          "建立一個 WinForms 應用程式（.NET 8）",
          "主表單包含：TabControl with 2個頁籤（充電站管理、充電樁管理）",
          "充電站頁籤：搜尋TextBox + DataGridView + 右側詳情面板",
          "所有控制項命名符合規範（txt/btn/dgv/lbl/cbo前綴）",
          "提交.sln專案資料夾（截圖也可）"
        ]
      }
    },

    {
      id: 5, week: 5, mod: "sw", modName: "C# 軟體",
      title: "C# 資料庫連接與 CRUD 操作",
      desc: "使用ADO.NET連接SQL Server，實作完整的查詢、新增、修改、刪除功能",
      diff: 3, hours: 6,
      objectives: [
        "能正確設定連接字串並管理 SqlConnection 生命週期",
        "能使用 SqlCommand 執行 SELECT/INSERT/UPDATE/DELETE",
        "能使用 SqlDataAdapter + DataTable 填充 DataGridView",
        "能實作資料驗證與錯誤處理"
      ],
      topics: [
        "ADO.NET 核心類別：SqlConnection、SqlCommand、SqlDataAdapter、DataTable",
        "連接字串設定（appsettings.json / app.config）",
        "參數化查詢防SQL Injection：@參數名稱",
        "using 語法確保資源釋放",
        "DataGridView 資料綁定：DataSource = DataTable",
        "ExecuteReader()：逐列讀取（適合單筆資料）",
        "ExecuteNonQuery()：INSERT/UPDATE/DELETE（回傳影響列數）",
        "ExecuteScalar()：取得單一值（如SELECT COUNT(*)）",
        "輸入驗證：string.IsNullOrWhiteSpace、正規表達式"
      ],
      exercises: [
        {
          title: "練習一：查詢功能",
          questions: [
            {
              q: "實作供應商清單的「多條件搜尋」功能。搜尋條件：供應商名稱（模糊）、狀態（啟用/停用/全部）。點擊搜尋時執行查詢並更新DataGridView",
              answer: `private void LoadSuppliers(string keyword = "", int status = -1)
{
    using SqlConnection conn = new(_connStr);

    // 動態組建WHERE條件
    string where = "WHERE 1=1";
    if (!string.IsNullOrWhiteSpace(keyword))
        where += " AND SupplierName LIKE @Keyword";
    if (status >= 0)
        where += " AND IsActive = @Status";

    string sql = $"SELECT * FROM Supplier {where} ORDER BY SupplierName";

    using SqlDataAdapter da = new(sql, conn);
    if (!string.IsNullOrWhiteSpace(keyword))
        da.SelectCommand.Parameters.AddWithValue("@Keyword", $"%{keyword}%");
    if (status >= 0)
        da.SelectCommand.Parameters.AddWithValue("@Status", status);

    DataTable dt = new();
    da.Fill(dt);
    dgvSuppliers.DataSource = dt;
}`
            },
            {
              q: "實作「新增供應商」功能，需包含：必填欄位驗證（名稱不得空白）、Email格式驗證、成功提示、失敗錯誤提示",
              answer: `private void btnAdd_Click(object sender, EventArgs e)
{
    // 驗證
    if (string.IsNullOrWhiteSpace(txtSupplierName.Text))
    {
        MessageBox.Show("請輸入供應商名稱", "必填欄位",
            MessageBoxButtons.OK, MessageBoxIcon.Warning);
        txtSupplierName.Focus();
        return;
    }
    if (!string.IsNullOrWhiteSpace(txtEmail.Text) &&
        !Regex.IsMatch(txtEmail.Text, @"^[^@]+@[^@]+\.[^@]+$"))
    {
        MessageBox.Show("Email格式不正確", "格式錯誤",
            MessageBoxButtons.OK, MessageBoxIcon.Warning);
        return;
    }

    try
    {
        using SqlConnection conn = new(_connStr);
        string sql = @"INSERT INTO Supplier
                       (SupplierName, ContactPerson, Phone, Email, IsActive)
                       VALUES (@Name, @Contact, @Phone, @Email, 1)";
        using SqlCommand cmd = new(sql, conn);
        cmd.Parameters.AddWithValue("@Name",    txtSupplierName.Text.Trim());
        cmd.Parameters.AddWithValue("@Contact", txtContact.Text.Trim());
        cmd.Parameters.AddWithValue("@Phone",   txtPhone.Text.Trim());
        cmd.Parameters.AddWithValue("@Email",   txtEmail.Text.Trim());
        conn.Open();
        cmd.ExecuteNonQuery();

        MessageBox.Show("新增成功！", "成功",
            MessageBoxButtons.OK, MessageBoxIcon.Information);
        LoadSuppliers();
        ClearForm();
    }
    catch (SqlException ex)
    {
        if (ex.Number == 2627) // Unique constraint violation
            MessageBox.Show("此供應商名稱已存在！", "錯誤",
                MessageBoxButtons.OK, MessageBoxIcon.Error);
        else
            MessageBox.Show($"資料庫錯誤：{ex.Message}", "錯誤",
                MessageBoxButtons.OK, MessageBoxIcon.Error);
    }
}`
            }
          ]
        },
        {
          title: "練習二：修改與刪除",
          questions: [
            {
              q: "實作「刪除供應商」功能。刪除前需確認對話框，並檢查是否有相關充電站資料（若有則不允許刪除，改為「停用」）",
              answer: `private void btnDelete_Click(object sender, EventArgs e)
{
    if (_selectedSupplierID < 0) return;

    var confirm = MessageBox.Show(
        "確定要刪除此供應商嗎？相關充電站將被停用。",
        "確認刪除", MessageBoxButtons.YesNo, MessageBoxIcon.Warning);
    if (confirm != DialogResult.Yes) return;

    using SqlConnection conn = new(_connStr);
    conn.Open();

    // 檢查是否有充電站
    using SqlCommand checkCmd = new(
        "SELECT COUNT(*) FROM ChargingStation WHERE SupplierID=@ID AND IsActive=1", conn);
    checkCmd.Parameters.AddWithValue("@ID", _selectedSupplierID);
    int stationCount = (int)checkCmd.ExecuteScalar();

    if (stationCount > 0)
    {
        // 有關聯資料 → 改為停用
        using SqlCommand disableCmd = new(
            "UPDATE Supplier SET IsActive=0 WHERE SupplierID=@ID", conn);
        disableCmd.Parameters.AddWithValue("@ID", _selectedSupplierID);
        disableCmd.ExecuteNonQuery();
        MessageBox.Show($"該供應商有{stationCount}個充電站，已改為停用狀態。", "提示");
    }
    else
    {
        // 無關聯 → 實際刪除
        using SqlCommand delCmd = new(
            "DELETE FROM Supplier WHERE SupplierID=@ID", conn);
        delCmd.Parameters.AddWithValue("@ID", _selectedSupplierID);
        delCmd.ExecuteNonQuery();
        MessageBox.Show("刪除成功！");
    }

    LoadSuppliers();
    ClearForm();
}`
            }
          ]
        }
      ],
      codeExamples: [
        {
          lang: "csharp", label: "C# - ADO.NET 連接字串設定",
          code: `// appsettings.json
{
  "ConnectionStrings": {
    "ZCharge": "Server=localhost;Database=ZChargePlan;Integrated Security=True;TrustServerCertificate=True;"
  }
}

// Program.cs - 讀取設定
using Microsoft.Extensions.Configuration;

var config = new ConfigurationBuilder()
    .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
    .AddJsonFile("appsettings.json")
    .Build();

string connStr = config.GetConnectionString("ZCharge")!;

// 或在Form中直接用 app.config (舊版方式)
// string connStr = ConfigurationManager.ConnectionStrings["ZCharge"].ConnectionString;

// === 完整CRUD封裝建議 ===
public class SupplierRepository
{
    private readonly string _connStr;

    public SupplierRepository(string connStr) => _connStr = connStr;

    public DataTable GetAll(string keyword = "", int status = -1)
    {
        // ... 查詢邏輯
    }

    public bool Insert(Supplier supplier)
    {
        try {
            using SqlConnection conn = new(_connStr);
            // ... INSERT邏輯
            return true;
        }
        catch { return false; }
    }

    // Update、Delete 方法 ...
}`
        }
      ],
      testData: {
        desc: "ADO.NET 方法選擇指南",
        table: {
          headers: ["方法", "回傳值", "使用時機"],
          rows: [
            ["ExecuteReader()", "SqlDataReader", "SELECT多列，逐列讀取"],
            ["ExecuteNonQuery()", "int（影響列數）", "INSERT / UPDATE / DELETE"],
            ["ExecuteScalar()", "object（第一欄第一列）", "SELECT COUNT(*) 等單值"],
            ["SqlDataAdapter.Fill()", "void（填DataTable）", "SELECT多列，需GridView顯示"]
          ]
        }
      },
      homework: {
        title: "Week 5 作業：完整的供應商CRUD",
        requirements: [
          "實作 ZCharge Plan 供應商管理完整CRUD（查/新增/修改/刪除）",
          "搜尋支援名稱模糊查詢 + 狀態篩選",
          "新增/修改需驗證必填欄位",
          "刪除前需確認對話框，有關聯資料時改停用",
          "所有SQL使用參數化查詢（@參數名）"
        ]
      }
    },

    {
      id: 6, week: 6, mod: "sw", modName: "C# 軟體",
      title: "C# 進階功能：認證、計時器與特殊整合",
      desc: "實作登入認證、角色權限、閒置自動登出(2分鐘)及進階業務功能",
      diff: 4, hours: 6,
      objectives: [
        "能實作多角色的登入/登出系統",
        "能實作閒置2分鐘自動登出（含30秒倒數警告）",
        "能根據角色動態顯示/隱藏功能選項",
        "能實作自動產生密碼功能（大小寫+數字+特殊字元）"
      ],
      topics: [
        "靜態類別儲存Session資訊（LoginUser、Role、LoginTime）",
        "密碼雜湊：SHA256/BCrypt 保護儲存",
        "System.Windows.Forms.Timer：每秒倒數計時",
        "閒置偵測：Application.Idle事件 + 最後操作時間",
        "角色型存取控制(RBAC)：根據Role決定可見功能",
        "密碼強度驗證：Regex（至少一大寫、一小寫、一數字、一特殊字元、8位以上）",
        "自動產生符合規則的隨機密碼"
      ],
      exercises: [
        {
          title: "練習一：登入系統",
          questions: [
            {
              q: "實作登入表單，需求：\n① 使用者輸入Email + 密碼\n② 密碼在DB中以SHA256雜湊儲存\n③ 失敗3次後鎖定帳號15分鐘\n④ 登入成功後儲存Session並開啟主表單",
              answer: `// Session管理類別
public static class AppSession
{
    public static int    UserID   { get; set; }
    public static string UserName { get; set; } = "";
    public static string Role     { get; set; } = ""; // Admin / Staff / Viewer
    public static DateTime LoginTime { get; set; }
    public static DateTime LastActivity { get; set; }

    public static void Clear()
    {
        UserID = 0; UserName = ""; Role = "";
    }
}

// 登入邏輯
private int _failCount = 0;
private void btnLogin_Click(object sender, EventArgs e)
{
    if (_failCount >= 3)
    {
        MessageBox.Show("帳號已鎖定，請15分鐘後再試");
        return;
    }

    string pwHash = Convert.ToHexString(
        SHA256.HashData(Encoding.UTF8.GetBytes(txtPassword.Text)));

    using SqlConnection conn = new(_connStr);
    using SqlCommand cmd = new(
        "SELECT UserID, FullName, Role FROM Users WHERE Email=@E AND PasswordHash=@P AND IsActive=1",
        conn);
    cmd.Parameters.AddWithValue("@E", txtEmail.Text.Trim());
    cmd.Parameters.AddWithValue("@P", pwHash);
    conn.Open();
    using SqlDataReader dr = cmd.ExecuteReader();

    if (dr.Read())
    {
        AppSession.UserID    = dr.GetInt32(0);
        AppSession.UserName  = dr.GetString(1);
        AppSession.Role      = dr.GetString(2);
        AppSession.LoginTime = DateTime.Now;
        AppSession.LastActivity = DateTime.Now;

        new FrmMain().Show();
        this.Hide();
    }
    else
    {
        _failCount++;
        lblError.Text = $"帳號或密碼錯誤（第{_failCount}/3次）";
        if (_failCount >= 3) MessageBox.Show("連續失敗3次，帳號已鎖定");
    }
}`
            },
            {
              q: "實作2分鐘閒置自動登出。需求：剩30秒時在狀態列顯示橘色警告文字，時間到後強制登出並回到登入畫面",
              answer: `// 在主表單 FrmMain.cs 中
private System.Windows.Forms.Timer _idleTimer = new();
private const int IDLE_SECONDS = 120;  // 2分鐘

private void FrmMain_Load(object sender, EventArgs e)
{
    _idleTimer.Interval = 1000;  // 每秒檢查
    _idleTimer.Tick += IdleTimer_Tick;
    _idleTimer.Start();

    // 所有滑鼠/鍵盤操作更新最後活動時間
    Application.AddMessageFilter(new ActivityFilter());
}

private void IdleTimer_Tick(object sender, EventArgs e)
{
    int elapsed = (int)(DateTime.Now - AppSession.LastActivity).TotalSeconds;
    int remaining = IDLE_SECONDS - elapsed;

    if (remaining <= 0)
    {
        _idleTimer.Stop();
        ForceLogout();
    }
    else if (remaining <= 30)
    {
        // 橘色警告
        lblStatus.ForeColor = Color.OrangeRed;
        lblStatus.Text = $"⚠ 閒置將在 {remaining} 秒後自動登出";
    }
    else
    {
        lblStatus.ForeColor = Color.Gray;
        lblStatus.Text = $"歡迎 {AppSession.UserName}";
    }
}

private void ForceLogout()
{
    MessageBox.Show("閒置超過2分鐘，已自動登出", "自動登出");
    AppSession.Clear();
    new FrmLogin().Show();
    this.Close();
}

// 活動過濾器：更新最後活動時間
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
        }
      ],
      codeExamples: [
        {
          lang: "csharp", label: "C# - 自動產生強密碼",
          code: `// 自動產生符合規則的密碼
// 規則：至少1大寫、1小寫、1數字、1特殊字元，共8~12位
private string GeneratePassword(int length = 10)
{
    const string upper   = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const string lower   = "abcdefghjkmnpqrstuvwxyz";
    const string digits  = "23456789";
    const string special = "!@#$%&*";

    var rng = RandomNumberGenerator.Create();
    var bytes = new byte[32];
    rng.GetBytes(bytes);

    var pwd = new char[length];
    var allChars = upper + lower + digits + special;

    // 確保每類至少一個
    pwd[0] = upper[bytes[0]   % upper.Length];
    pwd[1] = lower[bytes[1]   % lower.Length];
    pwd[2] = digits[bytes[2]  % digits.Length];
    pwd[3] = special[bytes[3] % special.Length];

    for (int i = 4; i < length; i++)
        pwd[i] = allChars[bytes[i] % allChars.Length];

    // 隨機打亂順序
    return new string(pwd.OrderBy(_ => RandomNumberGenerator.GetInt32(100)).ToArray());
}

// 驗證密碼強度
private bool IsPasswordStrong(string password)
{
    return Regex.IsMatch(password,
        @"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%&*]).{8,}$");
}`
        }
      ],
      testData: {
        desc: "競賽常見角色權限對照",
        table: {
          headers: ["功能", "系統管理員", "一般員工", "檢視者"],
          rows: [
            ["新增供應商", "✅", "❌", "❌"],
            ["修改充電站", "✅", "✅", "❌"],
            ["查詢充電紀錄", "✅", "✅", "✅"],
            ["刪除帳號", "✅", "❌", "❌"],
            ["匯出報表", "✅", "✅", "❌"]
          ]
        }
      },
      homework: {
        title: "Week 6 作業：登入系統 + 自動登出",
        requirements: [
          "實作登入表單（Email + 密碼，SHA256雜湊驗證）",
          "失敗3次鎖定提示",
          "實作2分鐘閒置自動登出（30秒前橘色警告）",
          "依角色(Admin/Staff)動態顯示/隱藏至少2個功能",
          "提供測試帳號資料（帳號/密碼/角色各一組）"
        ]
      }
    },

    {
      id: 7, week: 7, mod: "app", modName: "Android",
      title: "Android/Kotlin 基礎：UI 設計與導航",
      desc: "建立Android開發環境，熟悉Activity、Fragment、RecyclerView與底部導航",
      diff: 3, hours: 5,
      objectives: [
        "能建立 Android Studio Ladybug + Kotlin 專案",
        "能設計 ConstraintLayout 響應式佈局",
        "能實作 RecyclerView + ViewHolder 顯示清單",
        "能使用 BottomNavigationView 實作多頁切換"
      ],
      topics: [
        "Android Studio Ladybug + JDK 17 + Kotlin 2.1.10 環境設定",
        "Activity 生命週期：onCreate → onStart → onResume → onPause → onStop → onDestroy",
        "ConstraintLayout：constraint_top, constraint_start/end, bias",
        "RecyclerView + ListAdapter + DiffUtil（現代實作方式）",
        "ViewBinding：取代 findViewById，型別安全存取 View",
        "BottomNavigationView + NavGraph 導航元件",
        "Fragment + FragmentManager 管理頁面",
        "Material Design 3 元件：MaterialCardView、ExtendedFAB"
      ],
      exercises: [
        {
          title: "練習一：充電站清單頁面",
          questions: [
            {
              q: "實作一個 ChargingStationListFragment，使用 RecyclerView 顯示充電站清單。每個項目卡片需顯示：站名、地址、可用樁數/總樁數。點擊卡片後導航至詳情頁",
              answer: `// item_station.xml 佈局（關鍵部分）
// MaterialCardView > ConstraintLayout
//   TextView: tv_station_name (大字, 粗體)
//   TextView: tv_address (小字, 灰色)
//   TextView: tv_availability (右側, 綠/紅色)

// StationAdapter.kt
class StationAdapter(
    private val onClick: (ChargingStation) -> Unit
) : ListAdapter<ChargingStation, StationAdapter.ViewHolder>(DIFF_CB) {

    inner class ViewHolder(val binding: ItemStationBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(station: ChargingStation) {
            binding.tvStationName.text  = station.name
            binding.tvAddress.text      = station.address
            binding.tvAvailability.text = "\${station.available}/\${station.total} 可用"
            binding.tvAvailability.setTextColor(
                if (station.available > 0) Color.parseColor("#27AE60")
                else Color.parseColor("#E74C3C")
            )
            binding.root.setOnClickListener { onClick(station) }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) =
        ViewHolder(ItemStationBinding.inflate(
            LayoutInflater.from(parent.context), parent, false))

    override fun onBindViewHolder(holder: ViewHolder, pos: Int) =
        holder.bind(getItem(pos))

    companion object {
        val DIFF_CB = object : DiffUtil.ItemCallback<ChargingStation>() {
            override fun areItemsTheSame(a: ChargingStation, b: ChargingStation) = a.id == b.id
            override fun areContentsTheSame(a: ChargingStation, b: ChargingStation) = a == b
        }
    }
}`
            },
            {
              q: "實作 BottomNavigationView，三個頁籤：首頁(Home)、尋找充電站(Find)、我的帳戶(Account)。使用Navigation Component管理Fragment切換",
              answer: `// nav_graph.xml
// <navigation>
//   <fragment id="@+id/homeFragment" .../>
//   <fragment id="@+id/findFragment" .../>
//   <fragment id="@+id/accountFragment" .../>

// activity_main.xml 關鍵部分
// <FragmentContainerView app:navGraph="@navigation/nav_graph"/>
// <com.google.android.material.bottomnavigation.BottomNavigationView
//     app:menu="@menu/bottom_nav_menu"/>

// MainActivity.kt
class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val navController = (supportFragmentManager
            .findFragmentById(R.id.nav_host_fragment) as NavHostFragment)
            .navController

        binding.bottomNav.setupWithNavController(navController)
    }
}`
            }
          ]
        }
      ],
      codeExamples: [
        {
          lang: "kotlin", label: "Kotlin - RecyclerView 完整實作",
          code: `// build.gradle.kts (app) 依賴
dependencies {
    implementation("androidx.recyclerview:recyclerview:1.3.2")
    implementation("com.google.android.material:material:1.12.0")
    implementation("androidx.navigation:navigation-fragment-ktx:2.8.0")
    implementation("androidx.navigation:navigation-ui-ktx:2.8.0")
}

// ChargingStation data class
data class ChargingStation(
    val id: Int,
    val name: String,
    val address: String,
    val available: Int,
    val total: Int
)

// Fragment 中使用
class FindStationFragment : Fragment(R.layout.fragment_find_station) {
    private var _binding: FragmentFindStationBinding? = null
    private val binding get() = _binding!!

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        _binding = FragmentFindStationBinding.bind(view)

        val adapter = StationAdapter { station ->
            // 導航至詳情頁
            val action = FindStationFragmentDirections
                .actionFindToDetail(station.id)
            findNavController().navigate(action)
        }

        binding.recyclerView.adapter = adapter
        binding.recyclerView.layoutManager = LinearLayoutManager(requireContext())

        // 暫時使用假資料
        val mockData = listOf(
            ChargingStation(1, "台北車站充電站", "台北市中正區忠孝西路", 5, 8),
            ChargingStation(2, "信義威秀停車場", "台北市信義區松壽路", 0, 4)
        )
        adapter.submitList(mockData)
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}`
        }
      ],
      testData: {
        desc: "Android 開發環境規格",
        table: {
          headers: ["工具", "版本", "說明"],
          rows: [
            ["Android Studio", "Ladybug (2024.2)", "競賽指定IDE"],
            ["Kotlin", "2.1.10", "主要開發語言"],
            ["JDK", "17 (Temurin)", "Java開發套件"],
            ["minSdk", "API 28 (Android 9)", "最低支援版本"],
            ["targetSdk", "API 35 (Android 15)", "目標版本"],
            ["Material", "3.0 (Material3)", "UI元件庫"],
            ["Navigation", "2.8.0", "Fragment導航元件"]
          ]
        }
      },
      homework: {
        title: "Week 7 作業：ZCharge App 基礎頁面",
        requirements: [
          "建立 Android 專案（Kotlin + ViewBinding）",
          "實作 BottomNavigation（3個頁籤：首頁/充電站/我的）",
          "充電站頁籤使用RecyclerView顯示假資料清單（至少5筆）",
          "點擊清單項目可進入詳情頁（顯示站名/地址）",
          "提交APK截圖或錄影"
        ]
      }
    },

    {
      id: 8, week: 8, mod: "app", modName: "Android",
      title: "Android REST API 整合",
      desc: "使用Retrofit呼叫後端Web API，搭配Kotlin Coroutines處理非同步請求",
      diff: 4, hours: 6,
      objectives: [
        "能使用 Retrofit2 定義 API 介面並發送 GET/POST 請求",
        "能使用 Kotlin Coroutines 在背景執行網路請求",
        "能使用 Gson 解析 JSON 回應並對應 data class",
        "能處理網路錯誤並顯示適當訊息"
      ],
      topics: [
        "Retrofit2 + OkHttp + Gson 依賴設定",
        "API 介面定義：@GET、@POST、@PUT、@DELETE、@Path、@Body、@Header",
        "Singleton 模式建立 RetrofitClient",
        "Kotlin Coroutines：suspend 函式、CoroutineScope、lifecycleScope",
        "ViewModel + LiveData/StateFlow 資料流",
        "Result<T> 封裝成功/失敗回應",
        "AndroidManifest.xml 加入 INTERNET 權限",
        "設備授權Token：延遲3秒取得Token的競賽特殊需求"
      ],
      exercises: [
        {
          title: "練習一：Retrofit API 整合",
          questions: [
            {
              q: "建立一個 Retrofit Client，連接 ZCharge Plan Web API（baseUrl: http://10.0.2.2:5000/api/）。定義 API 介面，包含：取得充電站清單(GET)、取得單一充電站(GET by ID)、新增充電紀錄(POST)",
              answer: `// ApiService.kt - API介面定義
interface ApiService {
    @GET("stations")
    suspend fun getStations(): List<StationDto>

    @GET("stations/{id}")
    suspend fun getStation(@Path("id") id: Int): StationDto

    @POST("charging-records")
    suspend fun startCharging(@Body request: StartChargingRequest): ChargingRecordDto

    @GET("members/{id}/records")
    suspend fun getMemberRecords(
        @Path("id") memberId: Int,
        @Header("Authorization") token: String
    ): List<ChargingRecordDto>
}

// RetrofitClient.kt - Singleton
object RetrofitClient {
    private const val BASE_URL = "http://10.0.2.2:5000/api/"  // 模擬器用localhost

    val apiService: ApiService by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .client(OkHttpClient.Builder()
                .connectTimeout(30, TimeUnit.SECONDS)
                .readTimeout(30, TimeUnit.SECONDS)
                .build())
            .build()
            .create(ApiService::class.java)
    }
}

// 使用方式（在Fragment中）
lifecycleScope.launch {
    try {
        val stations = RetrofitClient.apiService.getStations()
        adapter.submitList(stations.map { it.toDomain() })
    } catch (e: IOException) {
        showError("網路連線失敗，請檢查網路設定")
    } catch (e: HttpException) {
        showError("伺服器錯誤：\${e.code()}")
    }
}`
            },
            {
              q: "競賽特殊需求：設備授權Token需要延遲3秒才能取得。實作一個Token管理類別，在App啟動時取得Token並快取，之後所有API請求自動帶入Authorization header",
              answer: `// DeviceTokenManager.kt
object DeviceTokenManager {
    private var _token: String? = null
    val token get() = _token

    suspend fun fetchToken(deviceId: String): String {
        delay(3000)  // 競賽要求：等待3秒

        // 呼叫取得Token的API
        val response = RetrofitClient.apiService.getDeviceToken(
            DeviceTokenRequest(deviceId = deviceId)
        )
        _token = response.token
        return response.token
    }

    fun clear() { _token = null }
}

// SplashActivity.kt - App啟動畫面
class SplashActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)

        lifecycleScope.launch {
            try {
                val deviceId = Settings.Secure.getString(
                    contentResolver, Settings.Secure.ANDROID_ID)
                DeviceTokenManager.fetchToken(deviceId)
                startActivity(Intent(this@SplashActivity, MainActivity::class.java))
                finish()
            } catch (e: Exception) {
                Toast.makeText(this@SplashActivity, "設備授權失敗", Toast.LENGTH_LONG).show()
            }
        }
    }
}`
            }
          ]
        }
      ],
      codeExamples: [
        {
          lang: "kotlin", label: "Kotlin - Retrofit build.gradle.kts 設定",
          code: `// build.gradle.kts (app)
dependencies {
    // Retrofit + Gson
    implementation("com.squareup.retrofit2:retrofit:2.11.0")
    implementation("com.squareup.retrofit2:converter-gson:2.11.0")
    implementation("com.squareup.okhttp3:okhttp:4.12.0")
    implementation("com.squareup.okhttp3:logging-interceptor:4.12.0")

    // Coroutines
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.8.1")

    // ViewModel
    implementation("androidx.lifecycle:lifecycle-viewmodel-ktx:2.8.7")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.7")
}

// AndroidManifest.xml 加入
// <uses-permission android:name="android.permission.INTERNET"/>
// <application android:usesCleartextTraffic="true" ...>  (開發時允許HTTP)

// DTO資料類別
data class StationDto(
    @SerializedName("stationId")    val id: Int,
    @SerializedName("stationName")  val name: String,
    @SerializedName("address")      val address: String,
    @SerializedName("availablePiles") val available: Int,
    @SerializedName("totalPiles")   val total: Int
) {
    fun toDomain() = ChargingStation(id, name, address, available, total)
}`
        }
      ],
      testData: {
        desc: "常用 HTTP 狀態碼對應處理",
        table: {
          headers: ["狀態碼", "說明", "App處理方式"],
          rows: [
            ["200 OK", "成功", "解析回應，更新UI"],
            ["201 Created", "新增成功", "顯示成功訊息"],
            ["400 Bad Request", "請求格式錯誤", "顯示「請求格式錯誤」"],
            ["401 Unauthorized", "未授權/Token過期", "導航至登入頁"],
            ["404 Not Found", "資源不存在", "顯示「找不到資料」"],
            ["500 Server Error", "伺服器錯誤", "顯示「伺服器異常，請稍後再試」"]
          ]
        }
      },
      homework: {
        title: "Week 8 作業：連接後端API顯示資料",
        requirements: [
          "建立 Retrofit Client 連接本地 ASP.NET Core API",
          "充電站清單從API取得（非假資料）",
          "實作下拉重新整理(SwipeRefreshLayout)",
          "網路失敗時顯示錯誤提示 + 重試按鈕",
          "加入Loading動畫（API呼叫期間顯示ProgressBar）"
        ]
      }
    },

    {
      id: 9, week: 9, mod: "all", modName: "整合練習",
      title: "55 分區模擬競賽 — ZCharge Plan",
      desc: "完整模擬55分區競賽流程，3模組輪流練習，評估現有能力並找出弱點",
      diff: 3, hours: 8,
      objectives: [
        "在限定時間內完成SA&DB模組（建議：2小時）",
        "在限定時間內完成Software模組（建議：3小時）",
        "在限定時間內完成App模組（建議：2.5小時）",
        "找出個人弱點並制定補強計畫"
      ],
      topics: [
        "時間管理策略：先做高分低難度項目",
        "SA&DB：Use Case圖 → ER圖 → 資料字典 → SQL腳本 → 測試資料",
        "Software：登入 → 最多分的CRUD模組 → 其他功能",
        "App：基礎UI → 清單顯示 → API整合 → 特殊功能",
        "常見失分點：外鍵設定遺漏、SQL注入防護、UI對齊問題",
        "競賽評分重點複習"
      ],
      exercises: [
        {
          title: "55分區模擬試題重點",
          questions: [
            {
              q: "SA&DB模組：ZCharge Plan 需要設計含充電定價的資料庫。充電定價分為「時段費率」（尖峰/離峰）和「會員折扣」。如何在3NF下設計這個計費系統？",
              answer: "設計方案（3NF）：\n\n① ChargingRate 費率主表\n   RateID PK, RateName(尖峰/離峰), StartHour, EndHour, BaseRateKWh\n\n② PlanDiscount 方案折扣表\n   PlanID FK, RateID FK → 複合PK, DiscountPct\n\n③ 計算邏輯（不儲存計算結果，在查詢或SP中計算）：\n   實際費用 = 充電量(kWh) × 費率(元/kWh) × (1 - 折扣%)\n\n❌ 錯誤作法：在ChargingRecord直接儲存「計費費率」欄位（違反3NF的遞移相依）\n✅ 正確：ChargingRecord只存時間+電量，費率從關聯表查詢計算"
            },
            {
              q: "Software模組：競賽要求C#程式實作「充電樁位置地圖標示」功能。如何在WinForms中嵌入地圖？提供至少2種實作方案",
              answer: "方案比較：\n\n① WebBrowser控制項 + Google Maps JS API（推薦）\n   - 在Form加入WebBrowser控件\n   - 建立一個HTML檔（包含Google Maps API）\n   - 使用WebBrowser.Navigate()載入，用InvokeScript傳入座標\n   - 優點：功能完整、較容易實作\n   - 缺點：需要網路、API KEY\n\n② GMap.NET 套件（NuGet: GMap.NET.WinForms）\n   - 直接拖曳GMapControl到Form\n   - 不需要API KEY，使用OpenStreetMap\n   - 程式碼：gmap.Position = new PointLatLng(lat, lng)\n   - 加標記：gmap.Overlays.Add(new GMapOverlay { Markers = { marker } })\n   - 優點：離線可用、開源免費"
            }
          ]
        }
      ],
      codeExamples: [
        {
          lang: "csharp", label: "C# - GMap.NET 地圖整合",
          code: `// NuGet: Install GMap.NET.WinForms

// Form 設計師：加入 GMapControl (gmap)

private void LoadStationsOnMap()
{
    gmap.MapProvider = GMap.NET.MapProviders.GoogleMapProvider.Instance;
    gmap.MinZoom = 5;
    gmap.MaxZoom = 20;
    gmap.Zoom = 14;
    gmap.Position = new PointLatLng(25.0478, 121.5319); // 台北市中心

    var overlay = new GMapOverlay("stations");

    // 從DB取得充電站座標
    foreach (var station in GetStationsFromDB())
    {
        var marker = new GMarkerGoogle(
            new PointLatLng(station.Latitude, station.Longitude),
            GMarkerGoogleType.green_dot)
        {
            ToolTipText = station.StationName
        };
        overlay.Markers.Add(marker);
    }

    gmap.Overlays.Add(overlay);
}

// 點擊標記顯示詳情
private void gmap_OnMarkerClick(GMapMarker item, MouseEventArgs e)
{
    MessageBox.Show($"充電站：{item.ToolTipText}");
}`
        }
      ],
      testData: {
        desc: "55分區競賽時間分配建議",
        table: {
          headers: ["模組", "建議時間", "得分優先順序"],
          rows: [
            ["SA&DB", "2小時", "ER圖(必做) > 資料字典 > SQL > Use Case > 測試資料"],
            ["軟體設計", "3小時", "登入 > 最多分CRUD > 其他CRUD > 進階功能"],
            ["App設計", "2.5小時", "基礎UI > 清單顯示 > API整合 > 特殊功能"]
          ]
        }
      },
      homework: {
        title: "Week 9 作業：55分區模擬考核",
        requirements: [
          "完整完成55分區SA&DB模組（限時2小時）",
          "完成Software模組至少3個CRUD功能（限時3小時）",
          "完成App模組清單顯示+API整合（限時2小時）",
          "提交自我評估表：各模組完成率、遭遇困難、改進計畫"
        ]
      }
    },

    {
      id: 10, week: 10, mod: "db", modName: "SA&DB",
      title: "56 分區 — LinkOne 資料庫設計",
      desc: "分析LinkOne平台需求，設計資料遷移方案、二層留言、內容安全系統",
      diff: 4, hours: 6,
      objectives: [
        "理解56分區 LinkOne 的業務需求與資料庫改造範疇",
        "能設計符合 New_ 前綴規範的新增資料表",
        "能撰寫CSV資料匯入與資料轉換SQL腳本",
        "能設計內容安全審核的狀態機資料結構"
      ],
      topics: [
        "56分區題目分析：LinkOne 平台4大新功能",
        "資料遷移策略：BULK INSERT匯入CSV → 轉換至目標表",
        "New_ 前綴命名規範：所有新建資料表與欄位必須加前綴",
        "二層留言系統：自參照(Self-Join)資料表設計",
        "內容安全狀態機：待審 → AI初審 → 人工複審 → 通過/拒絕",
        "貼圖商城：創作者上架、用戶購買、30天退款政策",
        "CSV匯入聊天記錄的ETL流程"
      ],
      exercises: [
        {
          title: "練習一：56分區 New_ 資料表設計",
          questions: [
            {
              q: "設計 New_StickerPack（貼圖包）和 New_StickerPurchase（貼圖購買紀錄）資料表。需求：\n- 創作者可上架貼圖包（設定名稱、描述、價格、預覽圖URL）\n- 用戶購買後30天內可退款（超過30天不退）\n- 需記錄退款狀態與退款日期",
              answer: `CREATE TABLE New_StickerPack (
    New_PackID       INT           IDENTITY(1,1) PRIMARY KEY,
    New_PackName     NVARCHAR(100) NOT NULL,
    New_Description  NVARCHAR(500),
    New_Price        DECIMAL(8,2)  NOT NULL CHECK (New_Price >= 0),
    New_PreviewURL   NVARCHAR(500),
    New_CreatorID    INT           NOT NULL,  -- FK → User(UserID)
    New_IsPublished  BIT           NOT NULL DEFAULT 0,
    New_PublishedAt  DATETIME2     NULL,
    New_CreatedAt    DATETIME2     NOT NULL DEFAULT SYSDATETIME(),
    FOREIGN KEY (New_CreatorID) REFERENCES [User](UserID)
);

CREATE TABLE New_StickerPurchase (
    New_PurchaseID   INT      IDENTITY(1,1) PRIMARY KEY,
    New_PackID       INT      NOT NULL,
    New_BuyerID      INT      NOT NULL,
    New_PurchasedAt  DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    New_Amount       DECIMAL(8,2) NOT NULL,
    New_RefundStatus TINYINT  NOT NULL DEFAULT 0, -- 0=正常 1=已退款
    New_RefundedAt   DATETIME2 NULL,
    -- 退款限制：30天內
    CONSTRAINT CHK_RefundWindow CHECK (
        New_RefundedAt IS NULL OR
        DATEDIFF(DAY, New_PurchasedAt, New_RefundedAt) <= 30
    ),
    FOREIGN KEY (New_PackID)  REFERENCES New_StickerPack(New_PackID),
    FOREIGN KEY (New_BuyerID) REFERENCES [User](UserID)
);`
            },
            {
              q: "設計內容安全審核系統 New_ContentReview。每篇貼文/留言發布時，AI先給出風險評分(0-100)和分類標籤，超過閾值的內容進入人工審核隊列。審核員可批准或拒絕，並附上原因",
              answer: `CREATE TABLE New_ContentReview (
    New_ReviewID     INT           IDENTITY(1,1) PRIMARY KEY,
    New_ContentType  NVARCHAR(20)  NOT NULL CHECK (New_ContentType IN ('Post','Comment')),
    New_ContentID    INT           NOT NULL,   -- Post.PostID 或 Comment.CommentID
    New_AIScore      DECIMAL(5,2)  NULL,       -- AI風險分數 0-100
    New_AITags       NVARCHAR(500) NULL,       -- AI分類標籤 (JSON格式)
    New_Status       TINYINT       NOT NULL DEFAULT 0,
        -- 0=AI待審 1=AI通過 2=轉人工審核 3=人工通過 4=人工拒絕
    New_ReviewerID   INT           NULL,       -- 人工審核員FK
    New_ReviewedAt   DATETIME2     NULL,
    New_RejectReason NVARCHAR(200) NULL,
    New_CreatedAt    DATETIME2     NOT NULL DEFAULT SYSDATETIME(),
    FOREIGN KEY (New_ReviewerID) REFERENCES [User](UserID)
);

-- AI審核閾值設定表
CREATE TABLE New_ReviewThreshold (
    New_Category  NVARCHAR(50)  PRIMARY KEY,  -- 政治/色情/廣告等
    New_Threshold DECIMAL(5,2)  NOT NULL,     -- 超過此分數轉人工
    New_AutoBlock DECIMAL(5,2)  NOT NULL      -- 超過此分數直接封鎖
);`
            }
          ]
        }
      ],
      codeExamples: [
        {
          lang: "SQL", label: "SQL - BULK INSERT 匯入ChatRecord CSV",
          code: `-- 步驟1：建立暫存表
CREATE TABLE #TempChatImport (
    MessageID   INT,
    PostID      INT,
    UserID      INT,
    Content     NVARCHAR(MAX),
    ReplyToID   INT NULL,
    CreatedAt   DATETIME2
);

-- 步驟2：BULK INSERT 匯入CSV
BULK INSERT #TempChatImport
FROM 'C:\CompData\chat_0001.csv'
WITH (
    FIELDTERMINATOR = ',',
    ROWTERMINATOR   = '\n',
    FIRSTROW        = 2,        -- 跳過標題列
    CODEPAGE        = '65001'   -- UTF-8
);

-- 步驟3：驗證資料
SELECT COUNT(*) AS ImportedRows FROM #TempChatImport;
SELECT TOP 5 * FROM #TempChatImport;

-- 步驟4：轉換至 New_Comment
INSERT INTO New_Comment (PostID, ParentID, AuthorID, Content, CreatedAt, SafetyStatus)
SELECT
    t.PostID,
    -- 一層留言：ParentID = NULL
    -- 二層回覆：對應新CommentID
    CASE
        WHEN t.ReplyToID IS NULL THEN NULL
        ELSE (SELECT CommentID FROM New_Comment nc
              WHERE nc.PostID = t.PostID
              AND nc.ParentID IS NULL
              AND nc.AuthorID = (SELECT UserID FROM #TempChatImport p WHERE p.MessageID = t.ReplyToID))
    END AS ParentID,
    t.UserID,
    t.Content,
    t.CreatedAt,
    1   -- SafetyStatus: 已通過
FROM #TempChatImport t
ORDER BY t.ReplyToID NULLS FIRST, t.MessageID;  -- 先插入一層再插入二層

DROP TABLE #TempChatImport;`
        }
      ],
      testData: {
        desc: "LinkOne 平台新功能需求對照表",
        table: {
          headers: ["新功能", "相關新資料表", "主要挑戰"],
          rows: [
            ["二層留言系統", "New_Comment(自參照)", "平板化設計+限制最多二層"],
            ["內容安全審核", "New_ContentReview, New_ReviewThreshold", "狀態機設計+AI/人工審核流程"],
            ["貼圖商城", "New_StickerPack, New_StickerPurchase", "30天退款限制+CHECK約束"],
            ["聊天記錄遷移", "使用現有表+CSV匯入", "BULK INSERT+資料清理+格式轉換"]
          ]
        }
      },
      homework: {
        title: "Week 10 作業：LinkOne 完整資料庫",
        requirements: [
          "完成 LinkOne 所有 New_ 前綴資料表（至少6個新表）",
          "撰寫CSV匯入腳本並執行成功",
          "每個新資料表有50筆以上測試資料",
          "撰寫至少3個查詢SP（會員動態、審核隊列、貼圖銷售統計）",
          "提交資料庫備份(.bak)檔案"
        ]
      }
    },

    {
      id: 11, week: 11, mod: "all", modName: "整合練習",
      title: "56 分區 — LinkOne 軟體與 App 整合",
      desc: "實作LinkOne的C#內容審核後台與Android社交功能App",
      diff: 4, hours: 8,
      objectives: [
        "能實作內容審核工作流程（AI評分顯示 + 人工批准/拒絕）",
        "能實作貼圖商城的瀏覽與購買流程",
        "能在Android App中顯示二層留言結構",
        "能整合所有模組完成56分區完整系統"
      ],
      topics: [
        "C# 內容審核後台：多狀態工作流程UI設計",
        "關鍵字過濾系統：從文字檔讀取違禁詞清單",
        "貼圖商城：圖片載入(PictureBox)、購買確認流程",
        "Android 二層留言UI：展開/收合式回覆列表",
        "Android 貼圖選擇器：GridView顯示已購貼圖",
        "退款驗證：C# DateDiff 30天計算"
      ],
      exercises: [
        {
          title: "練習一：C# 關鍵字過濾系統",
          questions: [
            {
              q: "56分區提供廣告詞/政治詞/色情詞等多個違禁詞文字檔。實作一個ContentFilter類別，可讀取多個詞庫檔案，提供CheckContent()方法回傳：是否違規、觸發的詞彙類別、風險分數(0-100)",
              answer: `public class ContentFilter
{
    private readonly Dictionary<string, HashSet<string>> _wordLists = new();

    public ContentFilter(string wordListDir)
    {
        // 讀取所有詞庫檔案
        foreach (var file in Directory.GetFiles(wordListDir, "*.txt"))
        {
            string category = Path.GetFileNameWithoutExtension(file);  // 例如：廣告、政治類
            var words = File.ReadAllLines(file, Encoding.UTF8)
                .Where(w => !string.IsNullOrWhiteSpace(w))
                .Select(w => w.Trim())
                .ToHashSet();
            _wordLists[category] = words;
        }
    }

    public ContentCheckResult Check(string content)
    {
        var triggers = new List<(string Category, string Word)>();

        foreach (var (category, words) in _wordLists)
            foreach (var word in words)
                if (content.Contains(word, StringComparison.OrdinalIgnoreCase))
                    triggers.Add((category, word));

        // 計算風險分數（每個觸發詞+20分，上限100）
        int score = Math.Min(triggers.Count * 20, 100);

        return new ContentCheckResult
        {
            IsViolation  = score >= 40,
            RiskScore    = score,
            Triggers     = triggers,
            NeedsReview  = score is >= 20 and < 80  // 灰色地帶需人工
        };
    }
}

public record ContentCheckResult(
    bool IsViolation, int RiskScore,
    List<(string Category, string Word)> Triggers,
    bool NeedsReview);`
            }
          ]
        },
        {
          title: "練習二：Android 二層留言UI",
          questions: [
            {
              q: "在 Android App 中，實作可展開/收合的二層留言列表。一層留言顯示回覆數量，點擊後展開二層回覆（縮排顯示）",
              answer: `// CommentAdapter.kt - 支援展開/收合的二層留言
sealed class CommentItem {
    data class ParentComment(val comment: Comment, var isExpanded: Boolean = false) : CommentItem()
    data class ChildComment(val comment: Comment, val parentId: Int) : CommentItem()
}

class CommentAdapter : RecyclerView.Adapter<RecyclerView.ViewHolder>() {
    private val items = mutableListOf<CommentItem>()

    companion object {
        const val TYPE_PARENT = 0
        const val TYPE_CHILD  = 1
    }

    override fun getItemViewType(pos: Int) = when (items[pos]) {
        is CommentItem.ParentComment -> TYPE_PARENT
        is CommentItem.ChildComment  -> TYPE_CHILD
    }

    fun toggleReplies(parentComment: CommentItem.ParentComment, replies: List<Comment>) {
        val idx = items.indexOf(parentComment)
        if (parentComment.isExpanded) {
            // 收合：移除該parent後的所有ChildComment
            val removeCount = items.drop(idx + 1)
                .takeWhile { it is CommentItem.ChildComment }
                .count()
            repeat(removeCount) { items.removeAt(idx + 1) }
            notifyItemRangeRemoved(idx + 1, removeCount)
        } else {
            // 展開：在parent後插入replies
            val childItems = replies.map { CommentItem.ChildComment(it, parentComment.comment.id) }
            items.addAll(idx + 1, childItems)
            notifyItemRangeInserted(idx + 1, childItems.size)
        }
        parentComment.isExpanded = !parentComment.isExpanded
        notifyItemChanged(idx)
    }
}`
            }
          ]
        }
      ],
      codeExamples: [
        {
          lang: "csharp", label: "C# - 貼圖商城退款驗證",
          code: `// 退款申請處理
private void btnRequestRefund_Click(object sender, EventArgs e)
{
    if (_selectedPurchaseID < 0)
    {
        MessageBox.Show("請先選取要退款的訂單");
        return;
    }

    using SqlConnection conn = new(_connStr);
    conn.Open();

    // 取得購買日期
    using SqlCommand getCmd = new(@"
        SELECT New_PurchasedAt, New_RefundStatus, New_PackID,
               sp.New_PackName, sp.New_Price
        FROM New_StickerPurchase p
        JOIN New_StickerPack sp ON p.New_PackID = sp.New_PackID
        WHERE New_PurchaseID = @ID", conn);
    getCmd.Parameters.AddWithValue("@ID", _selectedPurchaseID);

    using var dr = getCmd.ExecuteReader();
    if (!dr.Read()) return;

    DateTime purchasedAt = dr.GetDateTime(0);
    int refundStatus     = dr.GetByte(1);
    string packName      = dr.GetString(3);
    decimal price        = dr.GetDecimal(4);

    // 驗證退款資格
    if (refundStatus == 1)
    {
        MessageBox.Show("此訂單已退款過");
        return;
    }
    int daysSince = (DateTime.Today - purchasedAt.Date).Days;
    if (daysSince > 30)
    {
        MessageBox.Show($"購買已超過30天（共{daysSince}天），無法退款");
        return;
    }

    var confirm = MessageBox.Show(
        $"確定退款「{packName}」？\n金額：{price:F2}\n購買日：{purchasedAt:yyyy/MM/dd}",
        "確認退款", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
    if (confirm != DialogResult.Yes) return;

    // 執行退款
    dr.Close();
    using SqlCommand refundCmd = new(@"
        UPDATE New_StickerPurchase
        SET New_RefundStatus=1, New_RefundedAt=SYSDATETIME()
        WHERE New_PurchaseID=@ID", conn);
    refundCmd.Parameters.AddWithValue("@ID", _selectedPurchaseID);
    refundCmd.ExecuteNonQuery();

    MessageBox.Show("退款成功！");
    LoadPurchases();
}`
        }
      ],
      testData: {
        desc: "LinkOne 內容審核狀態流程",
        table: {
          headers: ["狀態值", "狀態名稱", "觸發條件", "下一步"],
          rows: [
            ["0", "AI待審", "內容發布時自動建立", "AI分析後更新"],
            ["1", "AI通過", "AI分數 < 40", "直接發布"],
            ["2", "轉人工審核", "AI分數 40-79", "等待審核員處理"],
            ["3", "人工通過", "審核員批准", "發布內容"],
            ["4", "人工拒絕", "審核員拒絕（需附原因）", "隱藏內容+通知作者"]
          ]
        }
      },
      homework: {
        title: "Week 11 作業：LinkOne 完整功能實作",
        requirements: [
          "C# 後台：內容審核工作流程（含AI評分顯示、批准/拒絕功能）",
          "C# 後台：關鍵字過濾功能（讀取詞庫檔案）",
          "Android：二層留言展開/收合功能",
          "Android：貼圖商城頁面（顯示貼圖包清單）",
          "整合測試：前後端API連通，資料正確顯示"
        ]
      }
    },

    {
      id: 12, week: 12, mod: "all", modName: "全國賽準備",
      title: "全國賽模擬 — 系統整合與競賽策略",
      desc: "完整模擬全國賽流程，練習簡報技巧，評估並優化所有模組表現",
      diff: 5, hours: 10,
      objectives: [
        "能在全國賽時間限制內完成所有模組的核心功能",
        "能在1.5-3分鐘內清晰說明系統設計決策",
        "能識別並避免常見扣分錯誤",
        "建立個人化的競賽當日執行清單"
      ],
      topics: [
        "全國賽 vs 分區賽的差異：模組數量、複雜度、簡報",
        "英文數據輸入加速技巧（55全國有英文資料輸入）",
        "競賽當日環境確認清單：軟體版本、設定、捷徑",
        "簡報技巧：1.5分鐘說明ER圖設計決策 + 3分鐘Demo軟體",
        "常見扣分點：主外鍵遺漏、硬編碼連接字串、UI對齊不整齊",
        "壓力管理與時間分配緊急策略（功能來不及做怎麼辦）",
        "備份與提交：確認所有檔案格式、命名、位置正確"
      ],
      exercises: [
        {
          title: "練習一：簡報練習",
          questions: [
            {
              q: "準備一個1.5分鐘的ER圖說明。需要解釋：你設計了哪些資料表、為什麼這樣設計、如何確保3NF、關鍵的業務規則如何在資料庫層面實現。請寫出說明稿",
              answer: "說明稿範本（1.5分鐘）：\n\n「本系統共設計了8個資料表，以ZCharge Plan的核心業務為主軸。\n\n首先是使用者相關的3個表：Member（會員）、MembershipPlan（會員方案）和Vehicle（車輛）。Member透過外鍵連接MembershipPlan，實現一個方案對應多位會員的設計。\n\n充電設施方面有Supplier（供應商）、ChargingStation（充電站）和ChargingPile（充電樁）三個層次，符合實際業務的管理架構。\n\n最後，ChargingRecord是核心橋接表，連接Member和ChargingPile記錄每次充電行為。費用欄位採用計算欄位而非儲存，確保符合3NF，避免遞移相依。\n\n所有資料表均通過3NF驗證，主外鍵設計確保資料完整性，每表有100筆以上測試資料。謝謝。」"
            },
            {
              q: "競賽緊急應對：距比賽結束還有30分鐘，你的C# App中有3個功能還沒做完：(A) 地圖標示充電站、(B) 修改充電樁狀態、(C) 圖表顯示充電統計。應該先做哪個？為什麼？",
              answer: "優先順序：(B) 修改充電樁狀態 > (C) 圖表顯示統計 > (A) 地圖標示\n\n理由：\n① (B) 修改充電樁狀態是基礎CRUD，得分最穩定且時間成本低（~10分鐘），幾乎確定能完成且得分\n② (C) 圖表顯示是進階功能，但用Chart控制項的基礎柱狀圖相對簡單（~15分鐘），若有時間可快速實作\n③ (A) 地圖整合最複雜，需要NuGet套件、初始化、API等，30分鐘很難完成，風險高\n\n緊急策略：先把(B)做完並測試，再看剩餘時間決定做(C)基礎版還是放棄。\n永遠不要讓任何功能只做一半，完整的簡單功能比不完整的複雜功能得分更高。"
            }
          ]
        }
      ],
      codeExamples: [
        {
          lang: "SQL", label: "SQL - 競賽當日快速設定腳本",
          code: `-- === 競賽快速啟動腳本 ===
-- 執行前確認 SQL Server 2022 已啟動

-- 1. 建立資料庫
CREATE DATABASE LinkOnePlatform;
GO
USE LinkOnePlatform;
GO

-- 2. 確認預設排序規則（中文相容）
SELECT SERVERPROPERTY('Collation');
-- 預期：Chinese_Taiwan_Stroke_CI_AS 或 SQL_Latin1_General_CP1_CI_AS

-- 3. 快速建立測試用管理員帳號
-- (在建立User表後執行)
-- INSERT INTO [User] (Email, PasswordHash, Role, IsActive)
-- VALUES ('admin@test.com',
--         CONVERT(NVARCHAR(256), HASHBYTES('SHA2_256', 'Admin@123'), 2),
--         'Admin', 1);

-- 4. 確認BULK INSERT路徑存取
-- EXEC sp_configure 'show advanced options', 1;
-- RECONFIGURE;
-- EXEC sp_configure 'Ad Hoc Distributed Queries', 1;
-- RECONFIGURE;

PRINT '資料庫設定完成，可以開始建立資料表';`
        }
      ],
      testData: {
        desc: "競賽當日檢查清單",
        table: {
          headers: ["項目", "確認方式", "備註"],
          rows: [
            ["SQL Server 2022", "開啟SSMS連接測試", "使用Windows驗證"],
            ["Visual Studio 2022", "開啟建立新專案", ".NET 8 WinForms"],
            ["Android Studio Ladybug", "開啟建立新Kotlin專案", "含Emulator"],
            ["JDK 17", "cmd: java --version", "確認是Temurin 17"],
            ["Visio/draw.io", "開啟測試圖形繪製", "draw.io可離線使用"],
            ["appsettings.json範本", "預先準備連接字串範本", "改DB名稱即可用"],
            ["SQL批次資料產生腳本", "預先準備通用版本", "改表名快速產生資料"]
          ]
        }
      },
      homework: {
        title: "Week 12 作業：完整模擬競賽",
        requirements: [
          "完整模擬一次全國賽（SA&DB + Software + App，全天）",
          "錄製3分鐘軟體Demo影片（模擬裁判觀看）",
          "整理個人「競賽速查手冊」（SQL模板、C#片段、Kotlin片段）",
          "填寫最終自評表：強項、弱項、賽前最後衝刺計畫",
          "準備競賽當日帶入的「快速啟動」腳本"
        ]
      }
    }
  ]
};
