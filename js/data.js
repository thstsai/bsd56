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
      answersReleased: true,
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
      answersReleased: false,
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
      answersReleased: false,
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
        },
        {
          lang: "SQL", label: "SQL - 建立 View 封裝複雜查詢",
          code: `-- === SQL View：封裝JOIN與聚合，讓C#/Android直接查詢 ===

-- View 1：充電站可用性摘要（供App清單頁使用）
CREATE VIEW vw_StationAvailability AS
SELECT
    s.StationID,
    s.StationName,
    s.Address,
    s.Latitude,
    s.Longitude,
    COUNT(p.PileID)                                   AS TotalPiles,
    SUM(CASE WHEN p.Status = N'可用' THEN 1 ELSE 0 END) AS AvailablePiles
FROM ChargingStation s
LEFT JOIN ChargingPile p ON p.StationID = s.StationID
WHERE s.IsActive = 1
GROUP BY s.StationID, s.StationName, s.Address, s.Latitude, s.Longitude;

-- View 2：會員充電費用摘要（供C# 報表頁使用）
CREATE VIEW vw_MemberChargingSummary AS
SELECT
    m.MemberID,
    m.FullName,
    m.PlanID,
    COUNT(r.RecordID)          AS TotalSessions,
    SUM(r.EnergyKWh)           AS TotalKWh,
    SUM(r.Amount)              AS TotalAmount,
    MAX(r.StartTime)           AS LastChargeTime
FROM Member m
LEFT JOIN ChargingRecord r ON r.MemberID = m.MemberID
GROUP BY m.MemberID, m.FullName, m.PlanID;

-- === 使用方式 ===
-- C# 直接 SELECT，不用寫複雜 JOIN：
-- SELECT * FROM vw_StationAvailability WHERE AvailablePiles > 0

-- Android HttpURLConnection 呼叫回傳 View 的 API 端點：
-- GET /api/stations  → 後端 SELECT * FROM vw_StationAvailability`
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
      title: "Entity Framework Database-First + 可繼承表單架構",
      desc: "使用 EF Core Database-First 從現有資料庫自動產生 Model，搭配可繼承的 BaseDetailForm 與 CrudToolbar UserControl 快速建構管理介面",
      diff: 3, hours: 5,
      answersReleased: false,
      objectives: [
        "能安裝 EF Core NuGet 套件並執行 Scaffold-DbContext 產生 Model",
        "能建立 AppDb 靜態類別統一管理 DbContext",
        "理解 BaseDetailForm 繼承模式，子表單只覆寫必要方法",
        "能設計 CrudToolbar UserControl 供所有管理表單共用"
      ],
      topics: [
        "NuGet 套件：Microsoft.EntityFrameworkCore.SqlServer、Microsoft.EntityFrameworkCore.Tools",
        "Scaffold-DbContext 指令：從現有 SQL Server DB 反向產生 DbContext + Entity 類別",
        "AppDb 靜態類別：統一 DbContext 實體，避免重複建立連線",
        "DbContext.SaveChanges()：一次提交所有異動",
        "BaseDetailForm<T>：抽象基底表單，定義 LoadData / OnAdd / OnEdit / OnDelete 抽象方法",
        "CrudToolbar UserControl：包含「新增/修改/刪除/儲存/取消」按鈕，供所有子表單共用",
        "DataGridView 綁定 List<T> 或 BindingList<T>",
        "控制項命名規範：txt / btn / dgv / lbl / cbo 前綴"
      ],
      exercises: [
        {
          title: "練習一：EF Scaffold 與 AppDb 設定",
          questions: [
            {
              q: "在 Visual Studio 的「套件管理器主控台」中，輸入哪個指令可以從名為 ZChargePlan 的 SQL Server 資料庫反向產生所有 Model 類別？請寫出完整指令並說明各參數的用途",
              answer: `// 1. 先安裝 NuGet 套件（套件管理器主控台）
Install-Package Microsoft.EntityFrameworkCore.SqlServer
Install-Package Microsoft.EntityFrameworkCore.Tools

// 2. 執行 Scaffold 指令
Scaffold-DbContext \`
  "Server=localhost;Database=ZChargePlan;Integrated Security=True;TrustServerCertificate=True;" \`
  Microsoft.EntityFrameworkCore.SqlServer \`
  -OutputDir Models \`
  -ContextDir Data \`
  -Context ZChargeContext \`
  -Force

// 參數說明：
// "Server=..."  → 連接字串（指向現有 DB）
// -OutputDir    → Entity 類別放在 Models 資料夾
// -ContextDir   → DbContext 放在 Data 資料夾
// -Context      → 產生的 DbContext 類別名稱
// -Force        → 若已存在則覆蓋（重新產生時使用）

// 執行後自動產生：
// Data/ZChargeContext.cs   ← DbContext，包含所有 DbSet<T>
// Models/Supplier.cs       ← Supplier 資料表對應的 Entity
// Models/ChargingStation.cs
// Models/ChargingPile.cs   ... 等`
            },
            {
              q: "建立一個 AppDb 靜態類別，讓整個應用程式共用同一個 DbContext 實體。說明為何不直接在每個表單 new ZChargeContext()",
              answer: `// Data/AppDb.cs
public static class AppDb
{
    private static ZChargeContext? _ctx;

    public static ZChargeContext Context =>
        _ctx ??= new ZChargeContext();

    // 需要重新整理時呼叫（例如：其他程式改了DB）
    public static void Reset()
    {
        _ctx?.Dispose();
        _ctx = null;
    }
}

// 使用方式（任何表單或類別）：
// var suppliers = AppDb.Context.Suppliers.ToList();
// AppDb.Context.SaveChanges();

// ❌ 不推薦：每次都 new（競賽時間緊迫、連線資源浪費）
// using var ctx = new ZChargeContext();

// ✅ 靜態 AppDb 的優點：
// 1. 不需每個表單傳遞 context
// 2. EF 的 Change Tracking 跨表單生效
// 3. 程式碼更簡潔`
            }
          ]
        },
        {
          title: "練習二：BaseDetailForm 繼承架構",
          questions: [
            {
              q: "說明 BaseDetailForm<T> 的設計理念。子表單 FrmSupplierManagement 需要覆寫哪些方法？各方法負責什麼工作？",
              answer: `// BaseDetailForm.cs（抽象基底表單）
public abstract class BaseDetailForm<T> : Form where T : class, new()
{
    protected T? _current;   // 目前選取的 Entity
    protected bool _isNew;   // 是新增模式？

    // 子表單必須實作的抽象方法
    protected abstract void LoadData();          // 查詢並綁定 DataGridView
    protected abstract void FillForm(T entity);  // 將 Entity 填入 TextBox 等控制項
    protected abstract T ReadForm();             // 從控制項讀取回 Entity
    protected abstract bool Validate();          // 驗證必填欄位

    // CrudToolbar 事件：子表單可直接繼承使用
    protected virtual void OnAdd()    { _isNew = true;  _current = new T(); ClearForm(); }
    protected virtual void OnSave()
    {
        if (!Validate()) return;
        _current = ReadForm();
        if (_isNew) AppDb.Context.Set<T>().Add(_current!);
        AppDb.Context.SaveChanges();
        LoadData();
    }
    protected virtual void OnDelete()
    {
        if (_current == null) return;
        if (MessageBox.Show("確定刪除？", "確認", MessageBoxButtons.YesNo) != DialogResult.Yes) return;
        AppDb.Context.Set<T>().Remove(_current);
        AppDb.Context.SaveChanges();
        LoadData();
    }
}

// FrmSupplierManagement.cs（子表單，只需覆寫4個方法）
public partial class FrmSupplierManagement : BaseDetailForm<Supplier>
{
    protected override void LoadData()
    {
        var list = AppDb.Context.Suppliers
            .Where(s => s.IsActive == true)
            .OrderBy(s => s.SupplierName)
            .ToList();
        dgvSuppliers.DataSource = list;
    }

    protected override void FillForm(Supplier s)
    {
        txtSupplierName.Text = s.SupplierName;
        txtContact.Text      = s.ContactPerson ?? "";
        txtPhone.Text        = s.Phone ?? "";
    }

    protected override Supplier ReadForm()
    {
        _current!.SupplierName   = txtSupplierName.Text.Trim();
        _current.ContactPerson   = txtContact.Text.Trim();
        _current.Phone           = txtPhone.Text.Trim();
        return _current;
    }

    protected override bool Validate()
    {
        if (string.IsNullOrWhiteSpace(txtSupplierName.Text))
        {
            MessageBox.Show("請輸入供應商名稱");
            txtSupplierName.Focus();
            return false;
        }
        return true;
    }
}`
            }
          ]
        }
      ],
      codeExamples: [
        {
          lang: "csharp", label: "C# - CrudToolbar UserControl",
          code: `// CrudToolbar.cs（UserControl，拖曳到每個管理表單）
// 設計師：加入 5 個 Button：btnAdd, btnEdit, btnDelete, btnSave, btnCancel

public partial class CrudToolbar : UserControl
{
    // 事件：父表單訂閱
    public event EventHandler? AddClicked;
    public event EventHandler? EditClicked;
    public event EventHandler? DeleteClicked;
    public event EventHandler? SaveClicked;
    public event EventHandler? CancelClicked;

    public CrudToolbar() { InitializeComponent(); SetViewMode(); }

    // 兩種模式切換
    public void SetViewMode()   // 瀏覽模式：顯示新增/修改/刪除
    {
        btnAdd.Enabled    = true;
        btnEdit.Enabled   = true;
        btnDelete.Enabled = true;
        btnSave.Enabled   = false;
        btnCancel.Enabled = false;
    }

    public void SetEditMode()   // 編輯模式：顯示儲存/取消
    {
        btnAdd.Enabled    = false;
        btnEdit.Enabled   = false;
        btnDelete.Enabled = false;
        btnSave.Enabled   = true;
        btnCancel.Enabled = true;
    }

    private void btnAdd_Click(object s, EventArgs e)    => AddClicked?.Invoke(s, e);
    private void btnEdit_Click(object s, EventArgs e)   => EditClicked?.Invoke(s, e);
    private void btnDelete_Click(object s, EventArgs e) => DeleteClicked?.Invoke(s, e);
    private void btnSave_Click(object s, EventArgs e)   => SaveClicked?.Invoke(s, e);
    private void btnCancel_Click(object s, EventArgs e) => CancelClicked?.Invoke(s, e);
}

// 在子表單使用 CrudToolbar：
// crudToolbar1.AddClicked    += (s,e) => OnAdd();
// crudToolbar1.SaveClicked   += (s,e) => OnSave();
// crudToolbar1.DeleteClicked += (s,e) => OnDelete();`
        }
      ],
      testData: {
        desc: "EF Database-First vs ADO.NET 比較",
        table: {
          headers: ["比較項目", "ADO.NET（舊）", "EF Database-First（新）"],
          rows: [
            ["Model 來源", "手動建立類別", "Scaffold 自動產生"],
            ["查詢寫法", "SQL 字串 + SqlCommand", "LINQ：.Where().ToList()"],
            ["新增資料", "INSERT SQL + ExecuteNonQuery", "ctx.Add(obj); ctx.SaveChanges()"],
            ["關聯查詢", "手動 JOIN SQL", ".Include(x => x.Station)"],
            ["連線管理", "每次 new SqlConnection", "AppDb.Context 統一管理"],
            ["型別安全", "❌ 欄位名稱字串", "✅ 編譯期檢查"]
          ]
        }
      },
      homework: {
        title: "Week 4 作業：EF Scaffold + CrudToolbar + 供應商管理",
        requirements: [
          "執行 Scaffold-DbContext 從 ZChargePlan 資料庫產生所有 Entity 類別",
          "建立 AppDb 靜態類別管理 DbContext",
          "設計 CrudToolbar UserControl（含新增/修改/刪除/儲存/取消按鈕）",
          "建立 FrmSupplierManagement 繼承 BaseDetailForm<Supplier>，實作 4 個覆寫方法",
          "提交截圖：Scaffold 產生的 Models 資料夾 + 執行中的表單畫面"
        ]
      }
    },

    {
      id: 5, week: 5, mod: "sw", modName: "C# 軟體",
      title: "Entity Framework LINQ CRUD 完整操作",
      desc: "使用 EF Core LINQ 實作多條件查詢、新增、修改、刪除，搭配 View 查詢與關聯資料驗證",
      diff: 3, hours: 6,
      answersReleased: false,
      objectives: [
        "能使用 LINQ .Where() .OrderBy() .ToList() 實作多條件搜尋",
        "能用 AppDb.Context.Add() / Remove() + SaveChanges() 完成 CRUD",
        "能用 .Include() 載入關聯資料（避免 N+1 查詢）",
        "能在刪除前用 .Any() 檢查關聯資料，改為軟刪除（IsActive=false）"
      ],
      topics: [
        "LINQ 查詢：.Where() 多條件、.Contains() 模糊、.OrderBy()、.FirstOrDefault()",
        "EF 新增：ctx.Entity.Add(obj)、ctx.SaveChanges()",
        "EF 修改：先 .FirstOrDefault() 取得追蹤物件，再修改屬性，最後 SaveChanges()",
        "EF 刪除：ctx.Entity.Remove(obj) 或軟刪除 obj.IsActive = false",
        ".Include()：同時載入關聯資料（如 Station.Include(s => s.Piles)）",
        ".Any()：快速檢查是否存在關聯資料（比 Count() 快）",
        "DataGridView 綁定 List<T>：設定 AutoGenerateColumns = false，指定 DataPropertyName",
        "View 查詢：AppDb.Context.Database.SqlQuery<T>() 或建立 Keyless Entity"
      ],
      exercises: [
        {
          title: "練習一：LINQ 查詢與 DataGridView 綁定",
          questions: [
            {
              q: "使用 LINQ 實作供應商清單的多條件搜尋：支援名稱模糊查詢 + 啟用狀態篩選（全部/啟用/停用）。點擊搜尋按鈕時更新 DataGridView",
              answer: `private void LoadSuppliers()
{
    string keyword = txtKeyword.Text.Trim();
    // cboStatus.SelectedIndex: 0=全部, 1=啟用, 2=停用
    int statusIdx = cboStatus.SelectedIndex;

    var query = AppDb.Context.Suppliers.AsQueryable();

    if (!string.IsNullOrWhiteSpace(keyword))
        query = query.Where(s => s.SupplierName.Contains(keyword));

    if (statusIdx == 1)  query = query.Where(s => s.IsActive == true);
    if (statusIdx == 2)  query = query.Where(s => s.IsActive == false);

    dgvSuppliers.DataSource = query
        .OrderBy(s => s.SupplierName)
        .ToList();
}

// 搜尋按鈕事件
private void btnSearch_Click(object sender, EventArgs e) => LoadSuppliers();`
            },
            {
              q: "實作「查詢充電站＋其充電樁數量」，需用 .Include() 載入關聯的 ChargingPile 清單，並在 DataGridView 顯示「總樁數」欄位",
              answer: `// 建立 ViewModel 類別（不是 Entity，只用來顯示）
class StationView
{
    public int    StationID   { get; set; }
    public string StationName { get; set; } = "";
    public string Address     { get; set; } = "";
    public int    TotalPiles  { get; set; }
    public int    Available   { get; set; }
}

private void LoadStations()
{
    // .Include() 一次取出充電站 + 其所有充電樁
    var stations = AppDb.Context.ChargingStations
        .Include(s => s.ChargingPiles)
        .Where(s => s.IsActive == true)
        .ToList();

    // 轉換為 ViewModel（含計算欄位）
    var viewList = stations.Select(s => new StationView
    {
        StationID   = s.StationID,
        StationName = s.StationName,
        Address     = s.Address ?? "",
        TotalPiles  = s.ChargingPiles.Count,
        Available   = s.ChargingPiles.Count(p => p.Status == "可用")
    }).ToList();

    dgvStations.DataSource = viewList;
}

// 💡 也可直接查詢 SQL View（更簡單）：
// 在 ZChargeContext.cs 加入：
// public DbSet<StationAvailability> StationAvailabilities { get; set; }
// var list = AppDb.Context.StationAvailabilities.ToList();`
            }
          ]
        },
        {
          title: "練習二：新增、修改、刪除",
          questions: [
            {
              q: "實作「新增供應商」與「修改供應商」。新增時用 Add()，修改時需先 FirstOrDefault() 取得 EF 追蹤的物件再修改屬性",
              answer: `// 新增
private void OnAdd()
{
    if (!Validate()) return;

    var s = new Supplier
    {
        SupplierName   = txtSupplierName.Text.Trim(),
        ContactPerson  = txtContact.Text.Trim(),
        Phone          = txtPhone.Text.Trim(),
        IsActive       = true
    };
    AppDb.Context.Suppliers.Add(s);
    AppDb.Context.SaveChanges();

    MessageBox.Show("新增成功！");
    LoadSuppliers();
    ClearForm();
}

// 修改（_selectedID 在 DataGridView SelectionChanged 時記錄）
private void OnEdit()
{
    if (!Validate()) return;

    // 取得 EF 正在追蹤的物件（不能 new 一個新物件）
    var s = AppDb.Context.Suppliers
        .FirstOrDefault(x => x.SupplierID == _selectedID);
    if (s == null) return;

    // 直接修改屬性，EF 自動標記為 Modified
    s.SupplierName  = txtSupplierName.Text.Trim();
    s.ContactPerson = txtContact.Text.Trim();
    s.Phone         = txtPhone.Text.Trim();

    AppDb.Context.SaveChanges();
    MessageBox.Show("修改成功！");
    LoadSuppliers();
}`
            },
            {
              q: "實作「刪除供應商」。刪除前需確認，若有關聯的啟用充電站則改為停用（軟刪除）而非實際刪除",
              answer: `private void OnDelete()
{
    if (_selectedID <= 0) return;

    var confirm = MessageBox.Show("確定刪除此供應商？",
        "確認刪除", MessageBoxButtons.YesNo, MessageBoxIcon.Warning);
    if (confirm != DialogResult.Yes) return;

    var supplier = AppDb.Context.Suppliers
        .Include(s => s.ChargingStations)
        .FirstOrDefault(s => s.SupplierID == _selectedID);
    if (supplier == null) return;

    // 用 .Any() 檢查是否有啟用的充電站
    bool hasActiveStations = supplier.ChargingStations
        .Any(st => st.IsActive == true);

    if (hasActiveStations)
    {
        // 軟刪除：改為停用
        supplier.IsActive = false;
        AppDb.Context.SaveChanges();
        MessageBox.Show("供應商有關聯充電站，已改為停用狀態。");
    }
    else
    {
        // 無關聯 → 實際刪除
        AppDb.Context.Suppliers.Remove(supplier);
        AppDb.Context.SaveChanges();
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
          lang: "csharp", label: "C# - EF LINQ 常用語法速查",
          code: `// === EF LINQ 常用語法速查 ===

// 查詢全部
var list = AppDb.Context.Suppliers.ToList();

// 條件查詢（多條件）
var result = AppDb.Context.Suppliers
    .Where(s => s.IsActive == true && s.SupplierName.Contains("台"))
    .OrderBy(s => s.SupplierName)
    .ToList();

// 取單筆（找不到回傳 null）
var s = AppDb.Context.Suppliers
    .FirstOrDefault(x => x.SupplierID == id);

// 帶關聯（JOIN 效果）
var stations = AppDb.Context.ChargingStations
    .Include(st => st.Supplier)
    .Include(st => st.ChargingPiles)
    .ToList();

// 新增
AppDb.Context.Suppliers.Add(newSupplier);
AppDb.Context.SaveChanges();

// 修改（先查後改）
var s = AppDb.Context.Suppliers.FirstOrDefault(x => x.SupplierID == id);
if (s != null) {
    s.SupplierName = "新名稱";
    AppDb.Context.SaveChanges();
}

// 刪除
AppDb.Context.Suppliers.Remove(s!);
AppDb.Context.SaveChanges();

// 檢查是否存在關聯（比 Count 快）
bool hasChildren = AppDb.Context.ChargingStations
    .Any(st => st.SupplierID == id && st.IsActive == true);

// 查詢 SQL View（需先在 Context 註冊 Keyless Entity）
var summary = AppDb.Context.MemberChargingSummaries.ToList();`
        }
      ],
      testData: {
        desc: "LINQ vs SQL 語法對照",
        table: {
          headers: ["SQL", "LINQ 等效寫法"],
          rows: [
            ["SELECT * FROM T WHERE Name LIKE '%abc%'", ".Where(x => x.Name.Contains(\"abc\"))"],
            ["SELECT * FROM T WHERE IsActive = 1", ".Where(x => x.IsActive == true)"],
            ["ORDER BY Name ASC", ".OrderBy(x => x.Name)"],
            ["SELECT TOP 1 * WHERE ID=1", ".FirstOrDefault(x => x.ID == 1)"],
            ["SELECT COUNT(*) WHERE ...", ".Count(x => ...)"],
            ["SELECT EXISTS(...)", ".Any(x => ...)"],
            ["JOIN T2 ON ...", ".Include(x => x.RelatedEntity)"]
          ]
        }
      },
      homework: {
        title: "Week 5 作業：EF LINQ 完整 CRUD",
        requirements: [
          "使用 EF LINQ 實作充電站管理完整 CRUD（查詢/新增/修改/刪除）",
          "查詢支援名稱模糊 + 狀態篩選，使用 .Where().Contains()",
          "新增/修改用 Add() / 直接修改追蹤物件 + SaveChanges()",
          "刪除前用 .Any() 檢查關聯充電樁，有則改 IsActive=false",
          "至少一個查詢使用 .Include() 載入關聯資料並顯示於 DataGridView"
        ]
      }
    },

    {
      id: 6, week: 6, mod: "sw", modName: "C# 軟體",
      title: "C# 進階功能：EF 認證、計時器與角色控管",
      desc: "以 EF Core 實作登入認證、角色權限控制、閒置自動登出（2分鐘）及自動產生強密碼",
      diff: 4, hours: 6,
      answersReleased: false,
      objectives: [
        "能使用 EF LINQ 查詢驗證帳號密碼（SHA256 雜湊比對）",
        "能實作閒置2分鐘自動登出（含30秒倒數警告）",
        "能根據角色動態顯示/隱藏 MenuStrip 與 TabPage",
        "能實作符合規則的自動產生強密碼功能"
      ],
      topics: [
        "AppSession 靜態類別：儲存 UserID、UserName、Role、LastActivity",
        "SHA256 密碼雜湊：Convert.ToHexString(SHA256.HashData(...))",
        "EF LINQ 登入驗證：.FirstOrDefault(u => u.Email==e && u.PasswordHash==h)",
        "System.Windows.Forms.Timer：Interval=1000 每秒 Tick",
        "IMessageFilter：攔截滑鼠/鍵盤訊息，更新 LastActivity",
        "角色型存取控制(RBAC)：根據 Role 動態 Visible/Enabled",
        "密碼強度驗證：Regex（至少一大寫、一小寫、一數字、一特殊字元、8位以上）",
        "RandomNumberGenerator：加密安全亂數產生強密碼"
      ],
      exercises: [
        {
          title: "練習一：EF 登入系統",
          questions: [
            {
              q: "使用 EF LINQ 實作登入表單。需求：\n① 使用者輸入Email + 密碼\n② 密碼在DB中以SHA256雜湊儲存\n③ 失敗3次後顯示鎖定提示\n④ 登入成功後儲存Session並開啟主表單",
              answer: `// AppSession.cs - 靜態類別儲存登入資訊
public static class AppSession
{
    public static int    UserID       { get; set; }
    public static string UserName     { get; set; } = "";
    public static string Role         { get; set; } = ""; // Admin / Staff / Viewer
    public static DateTime LoginTime    { get; set; }
    public static DateTime LastActivity { get; set; }

    public static void Clear()
    {
        UserID = 0; UserName = ""; Role = "";
    }
}

// FrmLogin.cs - 登入邏輯（使用 EF LINQ）
private int _failCount = 0;

private void btnLogin_Click(object sender, EventArgs e)
{
    if (_failCount >= 3)
    {
        MessageBox.Show("帳號已鎖定，請15分鐘後再試");
        return;
    }

    // SHA256 雜湊密碼
    string pwHash = Convert.ToHexString(
        SHA256.HashData(Encoding.UTF8.GetBytes(txtPassword.Text)));

    // EF LINQ 查詢（取代 SqlCommand）
    var user = AppDb.Context.Users
        .FirstOrDefault(u =>
            u.Email == txtEmail.Text.Trim() &&
            u.PasswordHash == pwHash &&
            u.IsActive == true);

    if (user != null)
    {
        AppSession.UserID       = user.UserID;
        AppSession.UserName     = user.FullName;
        AppSession.Role         = user.Role;
        AppSession.LoginTime    = DateTime.Now;
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
              q: "實作2分鐘閒置自動登出。需求：剩30秒時在狀態列顯示橘色警告文字，時間到後強制登出並回到登入畫面",
              answer: `// FrmMain.cs - 閒置自動登出
private System.Windows.Forms.Timer _idleTimer = new();
private const int IDLE_SECONDS = 120;  // 2分鐘

private void FrmMain_Load(object sender, EventArgs e)
{
    // 根據角色設定可見功能
    SetupByRole();

    _idleTimer.Interval = 1000;  // 每秒 Tick
    _idleTimer.Tick += IdleTimer_Tick;
    _idleTimer.Start();

    // IMessageFilter 攔截所有滑鼠/鍵盤，更新 LastActivity
    Application.AddMessageFilter(new ActivityFilter());
}

private void IdleTimer_Tick(object sender, EventArgs e)
{
    int elapsed   = (int)(DateTime.Now - AppSession.LastActivity).TotalSeconds;
    int remaining = IDLE_SECONDS - elapsed;

    if (remaining <= 0)
    {
        _idleTimer.Stop();
        ForceLogout();
    }
    else if (remaining <= 30)
    {
        lblStatus.ForeColor = Color.OrangeRed;
        lblStatus.Text = $"⚠ 閒置將在 {remaining} 秒後自動登出";
    }
    else
    {
        lblStatus.ForeColor = Color.Gray;
        lblStatus.Text = $"歡迎 {AppSession.UserName} ({AppSession.Role})";
    }
}

private void ForceLogout()
{
    MessageBox.Show("閒置超過2分鐘，已自動登出", "自動登出");
    AppSession.Clear();
    new FrmLogin().Show();
    this.Close();
}

// 角色設定（根據 Role 隱藏功能）
private void SetupByRole()
{
    bool isAdmin = AppSession.Role == "Admin";
    menuSupplier.Visible    = isAdmin;  // 供應商管理僅Admin可見
    btnDeleteUser.Enabled   = isAdmin;
    tabPageReport.Visible   = isAdmin || AppSession.Role == "Staff";
}

// IMessageFilter：更新最後活動時間
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

    var bytes = new byte[length + 4];
    RandomNumberGenerator.Fill(bytes);

    var pwd      = new char[length];
    var allChars = upper + lower + digits + special;

    // 確保每類至少出現一個
    pwd[0] = upper  [bytes[0] % upper.Length];
    pwd[1] = lower  [bytes[1] % lower.Length];
    pwd[2] = digits [bytes[2] % digits.Length];
    pwd[3] = special[bytes[3] % special.Length];

    for (int i = 4; i < length; i++)
        pwd[i] = allChars[bytes[i] % allChars.Length];

    // 隨機打亂順序（避免前4碼固定）
    return new string(pwd.OrderBy(_ => RandomNumberGenerator.GetInt32(100)).ToArray());
}

// 驗證密碼強度
private bool IsPasswordStrong(string password) =>
    Regex.IsMatch(password,
        @"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%&*]).{8,}$");

// 使用（btnGeneratePwd_Click）
private void btnGeneratePwd_Click(object sender, EventArgs e)
{
    txtPassword.Text = GeneratePassword();
    lblStrength.Text = IsPasswordStrong(txtPassword.Text) ? "✅ 強" : "⚠ 弱";
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
        title: "Week 6 作業：EF 登入系統 + 自動登出",
        requirements: [
          "使用 EF LINQ 實作登入（.FirstOrDefault() 驗證 Email + SHA256 密碼）",
          "AppSession 靜態類別儲存登入資訊",
          "失敗3次顯示鎖定提示",
          "實作2分鐘閒置自動登出（30秒前橘色警告）",
          "依角色(Admin/Staff)動態顯示/隱藏至少2個功能"
        ]
      }
    },

    {
      id: 7, week: 7, mod: "app", modName: "Android",
      title: "Android/Kotlin Jetpack Compose UI 設計與導航",
      desc: "使用 Jetpack Compose 宣告式 UI 取代 XML 佈局，搭配 NavigationBar 實作底部導航，LazyColumn 顯示清單",
      diff: 3, hours: 5,
      answersReleased: false,
      objectives: [
        "能建立 Android Studio + Kotlin + Compose 專案",
        "能以 @Composable 函式組合 UI，取代 XML layout",
        "能用 LazyColumn 顯示清單，取代 RecyclerView",
        "能用 NavigationBar + NavHost 實作底部多頁切換"
      ],
      topics: [
        "Android Studio Ladybug + JDK 17 + Kotlin 2.1.10 環境設定",
        "Jetpack Compose：@Composable 函式、Preview、setContent",
        "基本 Compose 元件：Text、Button、Column、Row、Card、Spacer",
        "狀態管理：remember { mutableStateOf() }、StateFlow",
        "LazyColumn：顯示清單（取代 RecyclerView），items()、item()",
        "NavigationBar + NavigationBarItem：底部導航列",
        "NavHost + NavController + composable()：頁面路由",
        "Modifier：padding、fillMaxWidth、height、clickable、background"
      ],
      exercises: [
        {
          title: "練習一：Compose 充電站清單",
          questions: [
            {
              q: "使用 Jetpack Compose 實作充電站清單頁面。每個卡片需顯示：站名、地址、可用樁數/總樁數（可用時綠色，無樁紅色）。點擊卡片後觸發 onClick callback",
              answer: `// data class（不需要 adapter，直接傳進 Composable）
data class ChargingStation(
    val id: Int,
    val name: String,
    val address: String,
    val available: Int,
    val total: Int
)

// 單一卡片 Composable
@Composable
fun StationCard(station: ChargingStation, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 6.dp)
            .clickable { onClick() },
        elevation = CardDefaults.cardElevation(4.dp)
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(station.name,  style = MaterialTheme.typography.titleMedium)
                Text(station.address, style = MaterialTheme.typography.bodySmall,
                     color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
            Text(
                text  = "\${station.available}/\${station.total}",
                color = if (station.available > 0) Color(0xFF27AE60) else Color(0xFFE74C3C),
                style = MaterialTheme.typography.titleMedium
            )
        }
    }
}

// 清單頁 Composable（LazyColumn 取代 RecyclerView）
@Composable
fun StationListScreen(
    stations: List<ChargingStation>,
    onStationClick: (ChargingStation) -> Unit
) {
    LazyColumn(modifier = Modifier.fillMaxSize()) {
        items(stations) { station ->
            StationCard(station, onClick = { onStationClick(station) })
        }
    }
}`
            },
            {
              q: "實作 NavigationBar 底部導航，三個頁籤：首頁、充電站、我的帳戶。使用 NavHost 管理頁面切換，選取的頁籤要高亮顯示",
              answer: `// 路由常數
object Routes {
    const val HOME    = "home"
    const val STATION = "station"
    const val ACCOUNT = "account"
}

// MainActivity.kt
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ZChargeTheme {
                ZChargeApp()
            }
        }
    }
}

@Composable
fun ZChargeApp() {
    val navController = rememberNavController()
    val navBackStack  by navController.currentBackStackEntryAsState()
    val currentRoute  = navBackStack?.destination?.route

    val items = listOf(
        Triple(Routes.HOME,    Icons.Default.Home,        "首頁"),
        Triple(Routes.STATION, Icons.Default.EvStation,   "充電站"),
        Triple(Routes.ACCOUNT, Icons.Default.AccountCircle,"我的")
    )

    Scaffold(
        bottomBar = {
            NavigationBar {
                items.forEach { (route, icon, label) ->
                    NavigationBarItem(
                        selected = currentRoute == route,
                        onClick  = {
                            navController.navigate(route) {
                                popUpTo(navController.graph.startDestinationId) { saveState = true }
                                launchSingleTop = true
                                restoreState    = true
                            }
                        },
                        icon  = { Icon(icon, contentDescription = label) },
                        label = { Text(label) }
                    )
                }
            }
        }
    ) { padding ->
        NavHost(navController, startDestination = Routes.HOME,
                modifier = Modifier.padding(padding)) {
            composable(Routes.HOME)    { HomeScreen() }
            composable(Routes.STATION) { StationListScreen(mockStations) {} }
            composable(Routes.ACCOUNT) { AccountScreen() }
        }
    }
}`
            }
          ]
        }
      ],
      codeExamples: [
        {
          lang: "kotlin", label: "Kotlin - Compose 專案 build.gradle.kts",
          code: `// build.gradle.kts (app) - Compose 所需設定
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    compileSdk = 35
    defaultConfig {
        minSdk = 28
        targetSdk = 35
    }
    buildFeatures { compose = true }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.14"
    }
}

dependencies {
    val composeBom = platform("androidx.compose:compose-bom:2024.09.00")
    implementation(composeBom)
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.activity:activity-compose:1.9.3")
    implementation("androidx.navigation:navigation-compose:2.8.3")

    // ViewModel + StateFlow
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.7")
    implementation("androidx.lifecycle:lifecycle-runtime-compose:2.8.7")
}

// ChargingStation data class
data class ChargingStation(
    val id: Int,
    val name: String,
    val address: String,
    val available: Int,
    val total: Int
)

// 假資料（後續 Week 8 換成 API 資料）
val mockStations = listOf(
    ChargingStation(1, "台北車站充電站", "台北市中正區忠孝西路", 5, 8),
    ChargingStation(2, "信義威秀停車場", "台北市信義區松壽路",   0, 4),
    ChargingStation(3, "內湖科技園區站", "台北市內湖區基湖路",   3, 6)
)`
        }
      ],
      testData: {
        desc: "Compose vs XML / RecyclerView 對照",
        table: {
          headers: ["XML + View 傳統方式", "Jetpack Compose 新方式"],
          rows: [
            ["activity_main.xml + setContentView", "setContent { ZChargeApp() }"],
            ["TextView.text = \"abc\"", "Text(\"abc\")"],
            ["RecyclerView + Adapter + ViewHolder", "LazyColumn { items(list) { Card(...) } }"],
            ["BottomNavigationView + NavGraph XML", "NavigationBar + NavHost + composable()"],
            ["ConstraintLayout XML", "Column / Row / Box + Modifier"],
            ["findViewById / ViewBinding", "直接在 @Composable 函式內使用狀態"],
            ["DiffUtil 計算差異", "State 變化自動 Recompose"]
          ]
        }
      },
      homework: {
        title: "Week 7 作業：ZCharge App Compose UI",
        requirements: [
          "建立 Android 專案（Kotlin + Jetpack Compose）",
          "實作 NavigationBar 底部導航（3個頁籤：首頁/充電站/我的）",
          "充電站頁籤使用 LazyColumn + Card 顯示假資料清單（至少5筆）",
          "卡片顯示站名、地址、可用樁數（顏色區分）",
          "提交 App 截圖或錄影（可看到底部導航與清單）"
        ]
      }
    },

    {
      id: 8, week: 8, mod: "app", modName: "Android",
      title: "Android REST API 整合（內建函式庫）",
      desc: "使用 Android 內建的 HttpURLConnection + org.json 呼叫後端 Web API，搭配 Coroutines 處理非同步，不依賴外部套件",
      diff: 4, hours: 6,
      answersReleased: false,
      objectives: [
        "能使用 HttpURLConnection 發送 GET / POST 請求",
        "能使用 org.json.JSONArray / JSONObject 解析 JSON 回應",
        "能建立 ApiClient singleton 統一管理 HTTP 請求",
        "能在 Coroutines withContext(Dispatchers.IO) 執行網路操作"
      ],
      topics: [
        "HttpURLConnection：Android 內建 HTTP 用戶端，不需額外套件",
        "org.json.JSONObject / JSONArray：Android 內建 JSON 解析",
        "ApiClient object：Singleton 封裝所有 API 呼叫",
        "Kotlin Coroutines：withContext(Dispatchers.IO) 在背景執行網路請求",
        "LaunchedEffect / produceState：Compose 中啟動 Coroutine",
        "AndroidManifest.xml：INTERNET 權限、usesCleartextTraffic=true（允許HTTP）",
        "設備授權Token：delay(3000) 延遲3秒取得Token的競賽特殊需求",
        "錯誤處理：try/catch IOException、HTTP 狀態碼判斷"
      ],
      exercises: [
        {
          title: "練習一：HttpURLConnection GET 請求",
          questions: [
            {
              q: "建立 ApiClient 物件（singleton），封裝 HTTP GET 請求。實作 getStations() 函式，呼叫 GET /api/stations 並回傳 List<ChargingStation>",
              answer: `// ApiClient.kt - 全部使用內建函式庫，不需 Retrofit/Gson
object ApiClient {
    private const val BASE_URL = "http://10.0.2.2:5000/api"
    var token: String = ""  // 設備授權Token，fetchToken後設定

    // 通用 GET 方法
    private fun httpGet(path: String): String {
        val url = java.net.URL("$BASE_URL$path")
        val conn = url.openConnection() as java.net.HttpURLConnection
        conn.requestMethod = "GET"
        conn.setRequestProperty("Accept",        "application/json")
        conn.setRequestProperty("Authorization", token)
        conn.connectTimeout = 10_000
        conn.readTimeout    = 10_000

        return try {
            if (conn.responseCode == 200)
                conn.inputStream.bufferedReader().readText()
            else
                throw Exception("HTTP \${conn.responseCode}")
        } finally {
            conn.disconnect()
        }
    }

    // 取得充電站清單
    suspend fun getStations(): List<ChargingStation> =
        withContext(Dispatchers.IO) {
            val json   = httpGet("/stations")
            val array  = org.json.JSONArray(json)
            List(array.length()) { i ->
                val obj = array.getJSONObject(i)
                ChargingStation(
                    id        = obj.getInt("stationId"),
                    name      = obj.getString("stationName"),
                    address   = obj.getString("address"),
                    available = obj.getInt("availablePiles"),
                    total     = obj.getInt("totalPiles")
                )
            }
        }

    // 取得單一充電站
    suspend fun getStation(id: Int): ChargingStation =
        withContext(Dispatchers.IO) {
            val obj = org.json.JSONObject(httpGet("/stations/$id"))
            ChargingStation(
                id        = obj.getInt("stationId"),
                name      = obj.getString("stationName"),
                address   = obj.getString("address"),
                available = obj.getInt("availablePiles"),
                total     = obj.getInt("totalPiles")
            )
        }
}`
            },
            {
              q: "競賽特殊需求：設備授權 Token 需延遲3秒取得。實作 fetchToken() 函式（POST 請求），並在 SplashActivity 啟動時呼叫，完成後進入主畫面",
              answer: `// ApiClient.kt 新增 POST + fetchToken
object ApiClient {
    // ...（延續上題）

    // 通用 POST 方法
    private fun httpPost(path: String, body: String): String {
        val url  = java.net.URL("$BASE_URL$path")
        val conn = url.openConnection() as java.net.HttpURLConnection
        conn.requestMethod = "POST"
        conn.doOutput      = true
        conn.setRequestProperty("Content-Type",  "application/json")
        conn.setRequestProperty("Accept",        "application/json")
        conn.setRequestProperty("Authorization", token)

        conn.outputStream.bufferedWriter().use { it.write(body) }

        return try {
            conn.inputStream.bufferedReader().readText()
        } finally {
            conn.disconnect()
        }
    }

    // 取得設備授權Token（競賽要求延遲3秒）
    suspend fun fetchToken(deviceId: String) {
        withContext(Dispatchers.IO) {
            delay(3_000)  // 競賽規定：等待3秒
            val body = """{"deviceId":"$deviceId"}"""
            val resp = httpPost("/auth/device-token", body)
            token = org.json.JSONObject(resp).getString("token")
        }
    }
}

// SplashActivity.kt（Compose 版本）
class SplashActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            var ready by remember { mutableStateOf(false) }
            var error by remember { mutableStateOf("") }

            LaunchedEffect(Unit) {
                try {
                    val deviceId = android.provider.Settings.Secure.getString(
                        contentResolver,
                        android.provider.Settings.Secure.ANDROID_ID
                    )
                    ApiClient.fetchToken(deviceId)
                    ready = true
                } catch (e: Exception) {
                    error = "設備授權失敗：\${e.message}"
                }
            }

            when {
                error.isNotEmpty() -> Text(error, color = Color.Red)
                ready -> {
                    startActivity(Intent(this@SplashActivity, MainActivity::class.java))
                    finish()
                }
                else -> CircularProgressIndicator()
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
          lang: "kotlin", label: "Kotlin - Compose 中呼叫 API 並顯示清單",
          code: `// AndroidManifest.xml（只需加這兩行，不需其他套件）
// <uses-permission android:name="android.permission.INTERNET"/>
// <application android:usesCleartextTraffic="true" ...>

// StationListScreen.kt - Compose UI + API 呼叫
@Composable
fun StationListScreen() {
    // produceState：在 Coroutine 中載入資料，結果驅動 UI
    val stationsState = produceState<Result<List<ChargingStation>>>(
        initialValue = Result.Loading
    ) {
        value = try {
            Result.Success(ApiClient.getStations())
        } catch (e: Exception) {
            Result.Error(e.message ?: "未知錯誤")
        }
    }

    when (val state = stationsState.value) {
        is Result.Loading -> {
            Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                CircularProgressIndicator()
            }
        }
        is Result.Success -> {
            LazyColumn {
                items(state.data) { station ->
                    StationCard(station, onClick = { /* 導航至詳情 */ })
                }
            }
        }
        is Result.Error -> {
            Column(Modifier.fillMaxSize(), horizontalAlignment = Alignment.CenterHorizontally) {
                Text("載入失敗：\${state.message}", color = Color.Red)
                Button(onClick = { /* TODO: 重試 */ }) { Text("重試") }
            }
        }
    }
}

// 簡易 Result 封裝
sealed class Result<out T> {
    object Loading : Result<Nothing>()
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String) : Result<Nothing>()
}`
        }
      ],
      testData: {
        desc: "HttpURLConnection vs Retrofit 比較",
        table: {
          headers: ["比較項目", "HttpURLConnection（內建）", "Retrofit（外部套件）"],
          rows: [
            ["依賴套件", "✅ 零套件，內建", "需加入 retrofit2、gson、okhttp"],
            ["JSON 解析", "org.json（內建）", "@SerializedName + data class"],
            ["程式碼量", "略多（手動解析）", "略少（自動對應）"],
            ["競賽適用", "✅ 無套件下載問題", "需要網路/離線快取"],
            ["錯誤處理", "try/catch + responseCode", "catch HttpException"],
            ["非同步", "withContext(IO)", "suspend 函式（自動）"]
          ]
        }
      },
      homework: {
        title: "Week 8 作業：HttpURLConnection 連接後端 API",
        requirements: [
          "建立 ApiClient singleton，以 HttpURLConnection 實作 GET /api/stations",
          "充電站清單從 API 取得後顯示於 LazyColumn（非假資料）",
          "實作 fetchToken（POST + delay 3秒），在 Splash 畫面取得後進入主畫面",
          "載入中顯示 CircularProgressIndicator，失敗顯示錯誤訊息 + 重試按鈕",
          "提交截圖：App 顯示來自 API 的真實資料"
        ]
      }
    },

    {
      id: 9, week: 9, mod: "all", modName: "整合練習",
      title: "55 分區模擬競賽 — ZCharge Plan",
      desc: "完整模擬55分區競賽流程，3模組輪流練習，評估現有能力並找出弱點",
      diff: 3, hours: 8,
      answersReleased: false,
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
      answersReleased: false,
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
      answersReleased: false,
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
      answersReleased: false,
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
