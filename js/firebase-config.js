// BSD56 Firebase 設定
// ────────────────────────────────────────────────
// 設定步驟：
//   1. 前往 https://console.firebase.google.com/
//   2. 建立新專案（例如 bsd56-training）
//   3. 新增網頁應用程式，複製 firebaseConfig 物件貼入下方
//   4. 在 Firestore Database 啟用（選「測試模式」）
//   5. 儲存此檔案後執行 git add / commit / push
// ────────────────────────────────────────────────

const FIREBASE_CONFIG = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

// 老師後台登入密碼（請自行修改，勿使用預設值）
const ADMIN_PASSWORD = "BSD56teacher2025";
