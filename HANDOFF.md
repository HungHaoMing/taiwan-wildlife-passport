# 專案交接

更新日期：2026-09-15（Asia/Taipei）

> 完整開發順序、跨專案待辦與資安風險，以 `docs/DEVELOPMENT_BACKLOG.md` 為準。專案擁有者指定先補齊七件作品名稱／內容與新介紹照片，再將預設語言改為繁體中文，最後才處理技術待修與多人功能。

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
- 新使用者預設繁體中文；既有瀏覽器中已保存的英文或日文選擇會繼續保留。
- 暱稱建立及修改，20 字元限制與安全輸出。
- 七組不同 ID + token 的 QR 領章網址，可亂序、阻擋重複及錯誤 token。
- 網頁內相機掃碼，以及用手機內建相機開啟網址的替代流程。
- 七枚印章依百分比座標疊在新版集點卡的七個白色格子，進度使用 `localStorage` 保存。
- 五枚以上可開啟完成流程，第七枚會自動進入；手寫支援高 DPI、觸控、復原、清除、重寫及重載復原。
- 100 字元鍵盤留言、高解析 PNG、Web Share 與 iPhone 長按保存替代流程；完成日期目前保留資料但未顯示。
- 公開前端只有參加者流程；`?staff=1` 與 `?view=qr` 不會開啟工作人員或補章介面。
- 七站 QR Code 改以本機 `npm run generate:qrs -- <正式根網址>` 離線產生。
- 完成頁以送到總關 Server 為主要流程，另保留 PNG 下載、Web Share 與開圖儲存備援；手機端不直接列印。
- 完成頁可將 1800 × 1200 JPEG 投稿至 `https://stamp-api.bbqhung.org/api/v1/submissions`，保存並顯示兌換碼；包含穩定隨機參與者 ID、冪等鍵及狀態錯誤處理。
- Service Worker 短暫離線快取與 GitHub Pages Actions 部署。

## 卡片版面與七站

- 新版來源底卡為 `public/assets/event/2026-tie/point-card-source.png`，尺寸 1748 × 1240。
- 高解析輸出為 3496 × 2480，亦即來源底卡的 2 倍尺寸。
- 七枚 RGBA 印章原檔保存在同一資料夾，顯示時順時鐘旋轉 14.9° 並以七個白格的中心點定位。
- 畫面預覽與 Canvas PNG 都讀取 `src/config/eventConfig.js` 的同一組百分比座標。
- 姓名位於左上 NAME 區域；手寫／繪圖／鍵盤文字區位於左下。座標仍待專案擁有者確認。
- 七件作品的正式中、英、日名稱與介紹，以及八張介紹圖，已由專案擁有者提供並放入設定；磁吸式智慧電路教具使用兩張介紹圖。未提供的作者／團隊／單位與補充資訊欄位不保留。
- 內部 ID `animal01` 至 `animal06` 暫時保留以兼容既有瀏覽器資料，另新增 `animal07`；這些 ID 不代表新版活動主題。

## 重要設定與限制

- 唯一活動設定檔：`src/config/eventConfig.js`
- 正式 bundle 不含公開 PIN、QR 管理或補發／移除印章介面；舊的 `?staff=1`、`?view=qr` 會被忽略。
- QR 圖檔需在開發電腦以正式根網址產生，預設輸出至被 Git 忽略的 `qr-output/`。
- QR token 仍必須存在公開前端才能驗證站點網址，不應被當作高價獎品或敏感權限的安全邊界。
- 修改 token 後，所有舊 QR Code 立即失效，必須重新下載、列印、實掃。
- 參加者換瀏覽器、清除網站資料或換手機都不會自動保留紀錄；公開站不提供匯出／匯入或人工補章。

## 已記錄的展前 P0 待修

- Service Worker 目前以固定 cache 名稱及 cache-first 方式保存入口 HTML；部署新版後，既有瀏覽器可能仍讀到舊 HTML，造成只顯示「Skip to content」或引用已移除的舊 bundle。需改成可更新的 cache 版本與適合導覽請求的更新策略；修正前不要要求已有集章進度的參加者清除網站資料。
- 總關後台 session 過期後直接開啟 `/admin/` 會顯示 `{"detail":"Session expired"}`，尚未自動導回 `/admin/login`。需讓後台 HTML 頁面在未登入或 session 過期時導向登入頁，同時保留 API／靜態資源適當的 401 行為。

其餘低成本資安、維運風險與第三階段待決規格已集中整理於 `docs/DEVELOPMENT_BACKLOG.md`，接手者不得只依對話紀錄判斷現況。

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
- 總關 Server 收件後的實際列印、色彩、進紙與裁切安全範圍（由總關端流程驗證）。
- 正式 GitHub Pages origin 對總關 API 的 CORS、5／6／7 枚各一次真實投稿、斷網重試與相同 pending 投稿更新。
- 最終手機上的透明印章邊緣、三語字型與 3496 × 2480 圖片清晰度。

完整素材來源與衍生方式見 `docs/ASSET_PROVENANCE.md`；實際測試結果見 `TEST_REPORT.md`。
