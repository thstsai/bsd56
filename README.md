# BSD56 第56屆全國技能競賽 商務軟體設計培訓平台

🌐 **網站：** https://thstsai.github.io/BSD56

## 簡介

本平台為參加**第56屆全國技能競賽 09商務軟體設計**選手設計的12週培訓課程網站。課程架構融合 55分區、55全國、56分區 三套試題的重點技術，幫助入門等級選手建立競賽能力。

## 功能

| 功能 | 說明 |
|------|------|
| 📊 得分分析 | 各模組配分比例、難易度及取分策略 |
| 📅 12週培訓課程 | 每週含主題、練習題、程式範例及解答 |
| ✅ 進度追蹤 | 勾選完成週次，自動儲存至瀏覽器 |
| 📤 作業繳交 | 填表後自動產生 GitHub Issues 連結 |

## 培訓課程架構

```
Week 1–3   SA&DB Design    需求分析、ER圖設計、T-SQL語法
Week 4–6   Software Design  C# WinForms、ADO.NET CRUD、認證系統
Week 7–8   App Design       Android/Kotlin、Retrofit API整合
Week 9     整合練習         55分區 ZCharge Plan 模擬競賽
Week 10–11 56分區練習       LinkOne 資料庫+軟體+App
Week 12    全國賽準備        模擬競賽、簡報技巧、競賽策略
```

## 技術棧

- **SA&DB：** SQL Server 2022, Visio/draw.io
- **Software：** C# .NET 8, Windows Forms, ADO.NET
- **App：** Android Studio Ladybug, Kotlin 2.1.10, Retrofit2

## 競賽試題材料

```
55分區賽試題/   ZCharge Plan EV充電網路系統
55全國賽試題/   ZCharge + ZPlus 整合系統（PDF）
56分區賽試題/   LinkOne 企業社交平台
```

> **注意：** `.bak` 資料庫備份檔（46–160 MB）已透過 `.gitignore` 排除，請向指導老師取得。

## 作業繳交

1. 建立 GitHub Repository，命名 `BSD56_Homework`
2. 每週建立資料夾（如 `Week01/`）放置作業檔案
3. 至網站「作業繳交」頁面填寫 Repository 連結

## GitHub Pages 設定

Settings → Pages → Branch: `main` / Folder: `/ (root)` → Save
