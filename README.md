# 台灣特有動物電子集章

供國際學術研討會文化交流活動使用的手機優先靜態網站。參加者不需安裝 App 或登入；暱稱、印章、留言與完成日期只存在使用者目前瀏覽器的 `localStorage`，不會上傳伺服器。

> 明信片底圖與六枚黑白印章已換成活動提供的正式檔案；未提供的 Logo、首頁主視覺、完成頁裝飾與獨立動物照片仍使用 placeholder。專案沒有使用 AI 產圖或網路圖片。

## 功能

- 掃描六組含 ID 與 16 字元 token 的網址，以任何順序領章，重複與錯誤連結有友善提示。
- 參加者可按卡片上的「掃描 QR Code」直接開啟後鏡頭；iPhone Safari 與 Android Chrome 會要求相機權限。
- 第一次由集章 QR Code 進站時，先設定暱稱，再自動補領剛才的章。
- 六張透明印章依設定百分比疊在卡片底圖，而非顯示成普通清單。
- 第六章完成後自動進入手寫流程；支援觸控、高 DPI、旋轉後保留、復原、清除與鍵盤留言。
- 合成 2646 × 1802 橫式高解析 PNG；支援下載、Web Share，以及 iPhone 開啟圖片後長按保存。
- QR 管理／列印頁與各別 PNG 下載。
- 工作人員補發、移除、改暱稱、清留言、二次確認重置，以及 JSON 進度匯出／匯入。
- 相對資源路徑、離線快取與 GitHub Pages 子路徑部署。
- English 預設，並提供完整日本語與繁體中文介面；所有翻譯仍可由設定檔修改。

## 專案結構

```text
.
├─ .github/workflows/deploy-pages.yml  # GitHub Pages 自動部署
├─ public/
│  ├─ assets/placeholders/             # 可直接替換的純幾何 placeholder
│  ├─ assets/event/                    # 活動提供的明信片與六枚印章
│  ├─ assets/sounds/                    # 日後放蓋章音效
│  ├─ manifest.webmanifest
│  └─ sw.js                            # 短暫離線快取
├─ src/
│  ├─ config/eventConfig.js            # 唯一活動內容與位置設定檔
│  ├─ cardRenderer.js                  # 高解析 PNG 合成
│  ├─ drawingPad.js                    # 手寫畫布
│  ├─ state.js                         # 儲存、驗證、匯出／匯入
│  ├─ main.js                          # 頁面與操作流程
│  └─ styles.css
├─ test/state.test.js
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

## GitHub Pages 部署

1. 將專案推送到 GitHub，預設分支命名為 `main`。
2. Repository → **Settings → Pages → Source** 選擇 **GitHub Actions**。
3. 推送 `main`，工作流程會依序安裝、測試、建置並部署 `dist`。

`vite.config.js` 使用 `base: './'`，圖片、程式和 QR Code 都可在 `https://帳號.github.io/專案名稱/` 子路徑運作，不必把 repository 名稱寫死。

## 活動設定

所有正式內容都在 [`src/config/eventConfig.js`](src/config/eventConfig.js)，不用改核心程式。

- 活動名稱、日期、語言：`event`
- Logo、首頁／完成圖、音效：`assets` 與 `sound`
- 一張或多張卡片底圖：`cardDesigns`；有多張時開始頁會自動顯示選擇器。
- 暱稱、手寫、鍵盤留言、活動名稱與日期位置：`placements`
- PNG 大小：`output.width`、`output.height`
- 動物資料、圖片、token 與印章位置：`animals`
- 所有介面文案：`text.en`、`text.ja`、`text['zh-TW']`

### 調整印章位置

每個 `animals` 项目可獨立修改：

| 欄位 | 意義 |
|---|---|
| `stampX`, `stampY` | 印章中心相對卡片左上角的百分比（0–100） |
| `stampWidth`, `stampHeight` | 相對卡片寬、高的百分比 |
| `stampRotation` | 順時針角度，負數為逆時針 |
| `stampZIndex` | 重疊時的圖層順序 |
| `stampOpacity` | 透明度，0 到 1 |

修改後開啟一般集章卡即可預覽。所有位置和 PNG 輸出共用同一組設定，畫面與下載結果會保持一致。

### 更換內容與翻譯

- 動物名稱：`nameZh`、`nameEn`、`nameJa`
- 學名：`scientificName`
- 介紹／趣聞：`description`、`funFact` 的三語值
- 圖片替代文字：`altText`
- 介面翻譯：在各語言的 `text` 中加入與 `text.en` 相同的 key；缺漏會回退英文。
- token：修改各動物 `token`，建議至少 16 個混合英數字元且每站不同；更換後重新下載／列印 QR Code，舊 QR Code 隨即失效。

### 素材對照表

正式素材可以沿用建議檔名覆蓋 placeholder，或修改設定路徑。所有檔案必須放在 `public/` 內，避免 Canvas 跨來源限制。

| 建議檔名 | 用途 | 建議格式 | 建議尺寸 | 透明背景 | 設定欄位 |
|---|---|---|---:|---|---|
| `logo.svg` / `logo.png` | 網站 Logo | SVG、PNG | 800 × 300 | 可選 | `assets.logo` |
| `hero.jpg` | 首頁主視覺 | JPG、WebP、PNG | 1600 × 800 | 否 | `assets.hero` |
| `postcard.jpg` | 電子集章卡底圖（目前正式檔） | JPG | 1323 × 901（橫式） | 否 | `cardDesigns[].image` |
| `animal-01.png`～`animal-06.png` | 六張動物介紹圖 | PNG、WebP、JPG | 1200 × 800 | 可選 | `animals[].animalImage` |
| `stamp-*.jpg` | 六張印章（目前正式檔） | JPG | 1254 × 1254 | 否；目前為白底 | `animals[].stampImage` |
| `completion.jpg` | 完成頁裝飾 | JPG、WebP、PNG | 1600 × 1000 | 否 | `assets.completionBackground` |
| `stamp.mp3` | 蓋章短音效 | MP3、AAC | 1 秒內 | 不適用 | `sound.path` |

正式印章若尺寸比例不同，請同時調整 `stampWidth`、`stampHeight`。音效預設 `sound.enabled: false`，放入檔案後再改為 `true`。

## QR Code 管理與現場使用

- 一般網址：部署根網址
- QR 管理頁：`部署根網址?view=qr`（必須先輸入工作人員 PIN）
- 工作人員模式：一般頁按 **Staff mode**，或開啟 `部署根網址?staff=1`
- 預設工作人員 PIN：`2468`，請在 `staff.pin` 修改。

QR 管理頁不會出現在一般參加者選單，只能從工作人員模式進入；直接開啟管理網址也會要求 PIN。通過後，頁面會依「當下部署網址 + 子路徑」產生六個正確連結，可複製、逐張下載或直接列印。建議部署後才輸出正式 QR Code。現場先用每一張 QR Code 實掃一次，確認站名和印章一致。

工作人員 PIN 完全存在前端，任何懂得查看網站原始碼的人都能找到；它只用來避免參加者誤入，不是伺服器驗證，也不能防止蓄意作弊。這符合低風險活動的簡化需求，但不能用於獎金、身分或敏感資料場景。

### 相機掃描

參加者建立卡片後按 **Scan QR code／QRコードを読み取る／掃描 QR Code**，允許相機權限並對準站點圖碼。相機功能需要 HTTPS；GitHub Pages 符合此條件。若拒絕權限、裝置沒有相機或瀏覽器不支援，畫面會提示改用手機內建相機掃描。相機影像只在參加者裝置上辨識，不會上傳。

## 資料、隱私與備援

只保存暱稱、已取得印章、卡片樣式、手寫圖、鍵盤留言、完成時間與語言。資料預設只在目前瀏覽器：

- 全程使用同一支手機、同一個瀏覽器。
- 不要使用無痕／私密瀏覽。
- 清除網站資料會清掉進度。
- 換手機不會自動轉移；可先從工作人員模式匯出 JSON，再於新手機匯入。
- QR token 與暱稱都不會上傳；GitHub Pages 只提供靜態檔案。

## 現場操作建議

1. 活動前部署並以 QR 管理頁列印六站圖碼。
2. 用 iPhone Safari 與 Android Chrome 各完成一次六站實掃、手寫和儲存圖片。
3. 工作人員保留 QR 管理頁、工作人員網址與 PIN。
4. 參加者若誤蓋或漏蓋，由工作人員在同一支手機補發／移除。
5. 瀏覽器儲存異常時先不要關頁，立刻從工作人員模式匯出 JSON。
6. iPhone 若按「Download PNG」沒有出現在下載項目，改按 **Open image to save**，再長按圖片加入照片。

## 錯誤與故障排除

| 狀況 | 處理方式 |
|---|---|
| 顯示無效集章連結 | 確認是 QR 管理頁新產生的圖碼；ID 或 token 任一不符都不發章。 |
| 同一章再次掃描 | 系統只顯示已有提示，不新增第二份。 |
| 圖片顯示缺檔提示 | 檢查檔案大小寫、路徑與設定；GitHub Pages 對大小寫敏感。功能仍可繼續。 |
| 進度重開後消失 | 常見原因是無痕模式、清除瀏覽器資料，或換了瀏覽器／手機。 |
| PNG 失敗 | 確認素材都在本站 `public/`，不要填外部網址；重新整理後重試。 |
| 手寫時頁面捲動 | 畫布已使用 Pointer Events 與 `touch-action: none`；若仍發生，記錄手機／OS／瀏覽器版本。 |
| 離線開不了 | Service Worker 只保證已成功開過並快取的資源；第一次使用仍需要網路。 |
| 音效沒播放 | 先確認 `sound.enabled`、檔案路徑；iOS 也可能依使用者手勢／靜音設定阻擋。 |
| 無法開啟相機 | 確認網址是 HTTPS、允許網站相機權限；仍無法使用時改用手機內建相機。 |

## 已知限制

- 靜態網站無法真正保護管理 PIN 或 QR token，也無法跨裝置同步。
- `localStorage` 空間依瀏覽器而異；單張透明手寫圖適合本活動，但不應保存大量照片。
- PWA 快取是短暫斷線備援，不保證瀏覽器清理儲存空間後仍可離線。
- Safari 對程式觸發下載的處理不同，因此同時提供開啟圖片長按保存。
- 系統字型用於 Canvas 三語輸出；實際字型外觀依手機而異。若要品牌字型，需自行提供有授權的本地字型並在 CSS 載入。
- 螢幕模擬與自動測試不能取代真實手機的相機掃碼、觸控筆跡、分享面板與相簿保存驗證。

## 測試範圍

`npm test` 會實際驗證暱稱／留言限制、ID + token 驗證、亂序六章、重複章、完成日期、本機保存重載、污染資料正規化、進度匯出／匯入，以及六組素材與座標設定。`npm run build` 會驗證正式 bundle 與相對資源輸出。每次 GitHub Pages 部署也會重跑兩者。

最後一次本機執行的詳細結果與仍待真機項目，請見 [`TEST_REPORT.md`](TEST_REPORT.md)。
