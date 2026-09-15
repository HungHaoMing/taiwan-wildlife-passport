# 2026 TIE 電子集點卡

供「2026TIE台灣創新技術博覽會－暨大與暨大附中」使用的手機優先網站。參加者不需安裝 App 或登入；集章進度保存在目前瀏覽器，收集 5～7 枚後可將姓名、印章數與完成明信片投稿到總關伺服器列印。

> 跨電腦接手、待開發項目、資安風險及專案擁有者指定的開發順序，請先閱讀 [`docs/DEVELOPMENT_BACKLOG.md`](docs/DEVELOPMENT_BACKLOG.md)。

> 新版集點卡與七枚 RGBA 印章均為活動提供的正式檔案；七個作品的正式名稱與介紹尚待提供，目前只顯示中性編號。專案沒有使用 AI 產圖或網路圖片，也不會依圖片猜測作品主題。

## 功能

- 掃描七組含 ID 與獨立 token 的網址，以任何順序領章，重複與錯誤連結有友善提示。
- 參加者可按卡片上的「掃描 QR Code」直接開啟後鏡頭；iPhone Safari 與 Android Chrome 會要求相機權限。
- 第一次由集章 QR Code 進站時，先設定暱稱，再自動補領剛才的章。
- 七張透明印章依設定百分比疊在新版卡片七個白格中心，並順時鐘旋轉 14.9°。
- 收集至少五枚即可進入完成流程；第七枚完成時會自動進入。手寫支援觸控、高 DPI、旋轉後保留、復原、清除與鍵盤文字。
- 合成 3496 × 2480 高解析 PNG；預覽與輸出共用同一組百分比座標。
- 將 5～7 枚完成卡轉成 1800 × 1200 JPEG，以 `multipart/form-data` 投稿至總關並顯示兌換碼；網路重試沿用同一組冪等鍵。
- 七站 QR Code 由本機指令產生，不把管理入口或補章功能部署到公開網站。
- 參加者可修改姓名、清除或重寫留言，以及二次確認重置整張卡片。
- 相對資源路徑、離線快取與 GitHub Pages 子路徑部署。
- English 預設，並提供完整日本語與繁體中文介面；所有翻譯仍可由設定檔修改。

## 專案結構

```text
.
├─ .github/workflows/deploy-pages.yml  # GitHub Pages 自動部署
├─ public/
│  ├─ assets/placeholders/             # 可直接替換的純幾何 placeholder
│  ├─ assets/event/                    # 活動提供的新舊底卡與印章來源檔
│  ├─ assets/sounds/                    # 日後放蓋章音效
│  ├─ manifest.webmanifest
│  └─ sw.js                            # 短暫離線快取
├─ src/
│  ├─ config/eventConfig.js            # 唯一活動內容與位置設定檔
│  ├─ cardRenderer.js                  # 高解析 PNG 合成
│  ├─ drawingPad.js                    # 手寫畫布
│  ├─ state.js                         # 儲存、驗證與投稿狀態
│  ├─ submission.js                    # 總關投稿 API client
│  ├─ main.js                          # 頁面與操作流程
│  └─ styles.css
├─ test/state.test.js
├─ scripts/generate-station-qrs.mjs   # 僅限本機的七站 QR 產生工具
├─ index.html
├─ package.json
└─ vite.config.js
```

## 本機執行、測試與建置

需要 Node.js 20.19+ 或 22.12+。

```bash
npm install
npm run dev
npm test
npm run build
npm run preview
```

Windows PowerShell 若停用 `.ps1`，可將上面的 `npm` 改成 `npm.cmd`。`npm run dev` 顯示的網址可在電腦開啟；真機測試時，請讓手機與電腦位於同一網路並使用 Vite 顯示的區網網址。

### 換電腦或交給另一個 Codex

```powershell
git clone https://github.com/HungHaoMing/taiwan-wildlife-passport.git
cd taiwan-wildlife-passport
npm ci
npm test
npm run dev
```

新環境接手前先閱讀 [`AGENTS.md`](AGENTS.md) 與 [`HANDOFF.md`](HANDOFF.md)。前者是固定的開發習慣及品質規則，後者是目前版面、內容狀態、未決事項與發佈清單。素材來源及機械式轉檔紀錄位於 [`docs/ASSET_PROVENANCE.md`](docs/ASSET_PROVENANCE.md)。所有本機變更必須提交並推送後，換電腦 clone 才能取得。

## GitHub Pages 部署

1. 將專案推送到 GitHub，預設分支命名為 `main`。
2. Repository → **Settings → Pages → Source** 選擇 **GitHub Actions**。
3. 推送 `main`，工作流程會依序安裝、測試、建置並部署 `dist`。

`vite.config.js` 使用 `base: './'`，圖片、程式和 QR Code 都可在 `https://帳號.github.io/專案名稱/` 子路徑運作，不必把 repository 名稱寫死。

## 完成卡片與總關列印

參加者完成頁的主要按鈕會將卡片送到總關 Server，由總關工作人員處理列印與兌換；手機頁面不提供直接列印按鈕，也不顯示印表機驅動設定。下載 PNG、Web Share 與「開啟圖片後儲存」仍保留作為網路或裝置相容性的備援。

## 活動設定

所有正式內容都在 [`src/config/eventConfig.js`](src/config/eventConfig.js)，不用改核心程式。

- 活動名稱、日期、語言：`event`
- Logo、首頁主視覺、音效：`assets` 與 `sound`；完成頁直接顯示合成後的完成卡片。
- 一張或多張卡片底圖：`cardDesigns`；有多張時開始頁會自動顯示選擇器。
- 暱稱、手寫、鍵盤留言、活動名稱與日期位置：`placements`
- PNG 大小：`output.width`、`output.height`
- 作品資料、圖片、token 與印章位置：`animals`（沿用既有內部欄位名稱）
- 所有介面文案：`text.en`、`text.ja`、`text['zh-TW']`
- 投稿 API、五枚門檻及圖片限制：`submission`

## 總關投稿與列印

收集至少五枚後，完成頁會把目前姓名、印章、手寫與鍵盤文字合成為 6:4 JPEG，送往 `https://stamp-api.bbqhung.org/api/v1/submissions`。瀏覽器會自動設定 multipart boundary；前端不含後台密碼或伺服器密鑰。每張新卡使用隨機 `participantId` 與獨立 `Idempotency-Key`，回應成功後保存並顯示六碼兌換碼。

伺服器回傳 400、413、415、422、429 或網路錯誤時，三語介面會顯示對應提示並允許重送。相同卡片在伺服器仍為 `pending` 時可更新，沿用原投稿與兌換碼。

### 調整印章位置

每個 `animals` 項目可獨立修改；目前七枚印章皆順時鐘旋轉 14.9°，中心對齊底卡白格：

| 欄位 | 意義 |
|---|---|
| `stampX`, `stampY` | 印章中心相對卡片左上角的百分比（0–100） |
| `stampWidth`, `stampHeight` | 相對卡片寬、高的百分比 |
| `stampRotation` | 順時針角度，負數為逆時針 |
| `stampZIndex` | 重疊時的圖層順序 |
| `stampOpacity` | 透明度，0 到 1 |

修改後開啟一般集章卡即可預覽。所有位置和 PNG 輸出共用同一組設定，畫面與下載結果會保持一致。

### 更換內容與翻譯

- 作品名稱：`nameZh`、`nameEn`、`nameJa`
- 正式補充欄位：`scientificName`（新版作品未必需要，可留空）
- 作品介紹／補充資訊：`description`、`funFact` 的三語值
- 圖片替代文字：`altText`
- 介面翻譯：在各語言的 `text` 中加入與 `text.en` 相同的 key；缺漏會回退英文。
- token：修改各作品／站點 `token`，建議至少 16 個混合英數字元且每站不同；更換後重新下載／列印 QR Code，舊 QR Code 隨即失效。

### 素材對照表

正式素材可以沿用建議檔名覆蓋 placeholder，或修改設定路徑。所有檔案必須放在 `public/` 內，避免 Canvas 跨來源限制。

| 建議檔名 | 用途 | 建議格式 | 建議尺寸 | 透明背景 | 設定欄位 |
|---|---|---|---:|---|---|
| `2026-tie/logo-source.png` | 網站 Logo（目前正式檔） | PNG | 800 × 300 | 是 | `assets.logo` |
| `2026-tie/point-card-source.png` | 首頁主視覺（暫用集點卡） | PNG | 1748 × 1240 | 否 | `assets.hero` |
| `2026-tie/point-card-source.png` | 電子集點卡底圖（目前正式檔） | PNG | 1748 × 1240 | 否 | `cardDesigns[].image` |
| `2026-tie/stamp-source-01.png`～`07.png` | 七張作品介紹圖與印章 | PNG | 152–174 px | **是** | `animals[].animalImage`、`stampImage` |
| `stamp.mp3` | 蓋章短音效 | MP3、AAC | 1 秒內 | 不適用 | `sound.path` |

正式印章若尺寸比例不同，請同時調整 `stampWidth`、`stampHeight`。音效預設 `sound.enabled: false`，放入檔案後再改為 `true`。
新版七張印章原檔已含 alpha 透明通道，因此沒有進行白底去除；舊版素材仍保留在 `public/assets/event/`，新版位於 `public/assets/event/2026-tie/`。
完成頁直接顯示依目前姓名、留言、手寫內容與七枚印章合成的完成卡片，不再使用另外的完成頁裝飾圖。

## QR Code 產生與現場使用

- 一般網址：部署根網址
- 公開站的 `?view=qr` 與 `?staff=1` 都只會進入一般參加者流程，不提供 QR 管理、補章或移除印章功能。

QR Code 只在開發電腦離線產生。部署完成並確認正式根網址後執行：

```bash
npm run generate:qrs -- https://hunghaoming.github.io/taiwan-wildlife-passport/
```

指令會在被 Git 忽略的 `qr-output/` 產生七張 PNG 及 `station-links.tsv`。也可在網址後加第二個參數指定輸出資料夾。產生結果含有效 token，應視為展務檔案妥善保存；正式 bundle 只負責驗證站點連結，不含任何公開 PIN 或前端工作人員介面。修改 token 後必須重新產生、列印並逐站實掃。

### 相機掃描

參加者建立卡片後按 **Scan QR code／QRコードを読み取る／掃描 QR Code**，允許相機權限並對準站點圖碼。相機功能需要 HTTPS；GitHub Pages 符合此條件。若拒絕權限、裝置沒有相機或瀏覽器不支援，畫面會提示改用手機內建相機掃描。相機影像只在參加者裝置上辨識，不會上傳。

## 資料、隱私與備援

瀏覽器保存暱稱、已取得印章、卡片樣式、手寫圖、鍵盤留言、完成時間、語言、隨機參與者 ID、冪等鍵與投稿回應。按下「送到總關 Server」後，姓名、印章數、投稿時間與完成圖片會上傳總關伺服器：

- 全程使用同一支手機、同一個瀏覽器。
- 不要使用無痕／私密瀏覽。
- 清除網站資料會清掉進度。
- 換手機不會自動轉移；公開站不提供進度匯出、匯入或補章工具。
- QR token 不會隨投稿上傳。總關伺服器的存取權限、保留期限與備份政策由 server 專案負責。

## 現場操作建議

1. 活動前部署，以本機 `generate:qrs` 指令產生並列印七站圖碼。
2. 用 iPhone Safari 與 Android Chrome 各完成一次七站實掃、手寫和儲存圖片。
3. 總關以獨立 Server 後台處理待印卡片與兌換狀態，不使用參加者前端作為管理工具。
4. 參加者若掃錯或漏掃，回到正確站點重新掃描；公開前端不提供人工補章／移除。
5. 瀏覽器儲存異常時先不要關頁，保留畫面並由現場工作人員協助判斷。
6. iPhone 若按「Download PNG」沒有出現在下載項目，改按 **Open image to save**，再長按圖片加入照片。

## 錯誤與故障排除

| 狀況 | 處理方式 |
|---|---|
| 顯示無效集章連結 | 以本機指令重新產生並確認正式網址；ID 或 token 任一不符都不發章。 |
| 同一章再次掃描 | 系統只顯示已有提示，不新增第二份。 |
| 圖片顯示缺檔提示 | 檢查檔案大小寫、路徑與設定；GitHub Pages 對大小寫敏感。功能仍可繼續。 |
| 進度重開後消失 | 常見原因是無痕模式、清除瀏覽器資料，或換了瀏覽器／手機。 |
| PNG 失敗 | 確認素材都在本站 `public/`，不要填外部網址；重新整理後重試。 |
| 手寫時頁面捲動 | 畫布已使用 Pointer Events 與 `touch-action: none`；若仍發生，記錄手機／OS／瀏覽器版本。 |
| 離線開不了 | Service Worker 只保證已成功開過並快取的資源；第一次使用仍需要網路。 |
| 音效沒播放 | 先確認 `sound.enabled`、檔案路徑；iOS 也可能依使用者手勢／靜音設定阻擋。 |
| 無法開啟相機 | 確認網址是 HTTPS、允許網站相機權限；仍無法使用時改用手機內建相機。 |

## 已知限制

- QR token 必須隨站點連結在公開前端驗證，技術使用者仍可能修改本機集章資料；公開站不提供管理 PIN 或補章介面，最終兌換由總關後台狀態流程控制。
- `localStorage` 空間依瀏覽器而異；單張透明手寫圖適合本活動，但不應保存大量照片。
- PWA 快取是短暫斷線備援，不保證瀏覽器清理儲存空間後仍可離線。
- Safari 對程式觸發下載的處理不同，因此同時提供開啟圖片長按保存。
- 系統字型用於 Canvas 三語輸出；實際字型外觀依手機而異。若要品牌字型，需自行提供有授權的本地字型並在 CSS 載入。
- 螢幕模擬與自動測試不能取代真實手機的相機掃碼、觸控筆跡、分享面板與相簿保存驗證。

## 測試範圍

`npm test` 會實際驗證姓名／留言限制、ID + token 驗證、亂序七章、重複章、完成狀態、本機保存重載、投稿識別碼、污染資料正規化、5／6／7 枚 pending 更新、七組素材與百分比座標、三語正式文案、不再提供列印／工作人員設定、公開管理 query 無效、離線 QR 網址，以及 multipart 投稿欄位、冪等 header、成功與錯誤回應。`npm run build` 會驗證正式 bundle 與相對資源輸出。每次 GitHub Pages 部署也會重跑兩者。

最後一次本機執行的詳細結果與仍待真機項目，請見 [`TEST_REPORT.md`](TEST_REPORT.md)。
