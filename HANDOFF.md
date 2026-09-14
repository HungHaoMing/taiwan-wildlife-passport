# 專案交接

更新日期：2026-09-14（Asia/Taipei）

## 專案定位

這是「2026TIE台灣創新技術博覽會－暨大與暨大附中」使用的手機電子集點卡。參加者不需登入，以同一支手機掃描七站 QR Code；本機保存集章進度，收集 5～7 枚後可把完成明信片投稿到總關伺服器列印。

- GitHub：[HungHaoMing/taiwan-wildlife-passport](https://github.com/HungHaoMing/taiwan-wildlife-passport)
- 正式網站：[GitHub Pages](https://hunghaoming.github.io/taiwan-wildlife-passport/)
- 預設分支：`main`
- 開發分支慣例：`agent/<內容>`
- Node.js：20.19+ 或 22.12+；CI 使用 Node.js 22

## 接手順序

1. 閱讀 `AGENTS.md`，遵守素材、設定集中化、測試和發佈規則。
2. 執行 `git status -sb`；若不是乾淨狀態，先判斷變更來源，不要覆蓋。
3. 執行 `npm ci`、`npm test`、`npm run build`。
4. 修改前先看 `src/config/eventConfig.js`；活動內容與座標應從這裡調整。
5. 版面或素材變動後，以窄螢幕檢查一般卡片及完成卡片。

## 目前完成的功能

- 英文、日本語、繁體中文介面切換。
- 暱稱建立及修改，20 字元限制與安全輸出。
- 七組不同 ID + token 的 QR 領章網址，可亂序、阻擋重複及錯誤 token。
- 網頁內相機掃碼，以及用手機內建相機開啟網址的替代流程。
- 七枚印章依百分比座標疊在新版集點卡的七個白色格子，進度使用 `localStorage` 保存。
- 五枚以上可開啟完成流程，第七枚會自動進入；手寫支援高 DPI、觸控、復原、清除、重寫及重載復原。
- 100 字元鍵盤留言、高解析 PNG、Web Share 與 iPhone 長按保存替代流程；完成日期目前保留資料但未顯示。
- PIN 門檻的工作人員模式及 QR 管理／列印頁。
- JSON 進度匯出、匯入及二次確認重置。
- 完成頁可產生 3600 × 2400 的橫式 4×6 滿版列印圖，並開啟系統列印確認視窗。
- 完成頁可將 1800 × 1200 JPEG 投稿至 `https://stamp-api.bbqhung.org/api/v1/submissions`，保存並顯示兌換碼；包含穩定隨機參與者 ID、冪等鍵及狀態錯誤處理。
- Service Worker 短暫離線快取與 GitHub Pages Actions 部署。

## 卡片版面與七站

- 新版來源底卡為 `public/assets/event/2026-tie/point-card-source.png`，尺寸 1748 × 1240。
- 高解析輸出為 3496 × 2480，亦即來源底卡的 2 倍尺寸。
- 七枚 RGBA 印章原檔保存在同一資料夾，顯示時順時鐘旋轉 14.9° 並以七個白格的中心點定位。
- 畫面預覽與 Canvas PNG 都讀取 `src/config/eventConfig.js` 的同一組百分比座標。
- 姓名位於左上 NAME 區域；手寫／繪圖／鍵盤文字區位於左下。座標仍待專案擁有者確認。
- 七個作品的正式名稱、內容與順序尚待專案擁有者提供；目前介面只顯示「作品 1」至「作品 7」，不可依圖片猜測主題或名稱。
- 內部 ID `animal01` 至 `animal06` 暫時保留以兼容既有瀏覽器資料，另新增 `animal07`；這些 ID 不代表新版活動主題。

## 重要設定與限制

- 唯一活動設定檔：`src/config/eventConfig.js`
- 工作人員 PIN 預設：`2468`
- QR 管理入口：`?view=qr`，仍須輸入 PIN
- 工作人員入口：`?staff=1`
- 一般參加者畫面不顯示本機工作人員入口；PIN 仍只是防誤觸，總關權限由獨立 server 管理。
- PIN 與 token 都存在公開前端程式中，只能防止誤入。
- 修改 token 後，所有舊 QR Code 立即失效，必須重新下載、列印、實掃。
- 參加者換瀏覽器、清除網站資料或換手機都不會自動保留紀錄；需使用 JSON 匯出／匯入。

## 換電腦接續

```powershell
git clone https://github.com/HungHaoMing/taiwan-wildlife-passport.git
cd taiwan-wildlife-passport
npm ci
npm test
npm run dev
```

在新 Codex 工作中，先請 Codex 閱讀 `AGENTS.md` 與 `HANDOFF.md`，再描述這次要修改的內容。不要依賴舊對話作為唯一交接來源。

## 發佈流程

1. 確認 `git status -sb` 與差異內容。
2. 執行 `npm test`、`npm run build`，必要時完成手機寬度瀏覽器檢查。
3. 明確加入本次檔案並建立提交，不混入無關內容。
4. 推送 `agent/*` 分支並建立 PR 到 `main`。
5. 合併 PR；等待 `.github/workflows/deploy-pages.yml` 完成。
6. 開啟正式網站或新素材網址，確認線上版本真的更新。

## 尚待真機驗證

- iPhone Safari：七站相機掃碼、觸控手寫、旋轉、PNG 下載、長按存照片、Web Share、重開與短暫斷網。
- Android Chrome：七站相機掃碼、觸控手寫、旋轉、PNG 下載、Web Share、重開與短暫斷網。
- 實際印刷 QR Code 的距離、尺寸和辨識速度。
- Epson L3550 搭配彩之舞 HY-B862 的 4×6 橫式無邊界列印、色彩、進紙與裁切安全範圍。
- 正式 GitHub Pages origin 對總關 API 的 CORS、5／6／7 枚各一次真實投稿、斷網重試與相同 pending 投稿更新。
- 最終手機上的透明印章邊緣、三語字型與 3496 × 2480 圖片清晰度。

完整素材來源與衍生方式見 `docs/ASSET_PROVENANCE.md`；實際測試結果見 `TEST_REPORT.md`。
