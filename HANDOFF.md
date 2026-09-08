# 專案交接

更新日期：2026-09-08（Asia/Taipei）

## 專案定位

這是國際文化交流活動使用的「臺灣特有動物電子集章」手機網站。參加者不需登入，以同一支手機掃描六站 QR Code；暱稱、印章、手寫及文字留言只保存在瀏覽器 `localStorage`。網站為 Vite 靜態專案，可部署到 GitHub Pages 子路徑。

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
- 六組不同 ID + token 的 QR 領章網址，可亂序、阻擋重複及錯誤 token。
- 網頁內相機掃碼，以及用手機內建相機開啟網址的替代流程。
- 六枚印章疊在明信片指定圓框，進度使用 `localStorage` 保存。
- 第六章觸發完成流程；手寫支援高 DPI、觸控、復原、清除、重寫及重載復原。
- 100 字元鍵盤留言、完成日期、高解析 PNG、Web Share 與 iPhone 長按保存替代流程。
- PIN 門檻的工作人員模式及 QR 管理／列印頁。
- JSON 進度匯出、匯入及二次確認重置。
- Service Worker 短暫離線快取與 GitHub Pages Actions 部署。

## 卡片版面

- `public/assets/event/postcard.jpg` 是使用者提供的 1323 × 901 原始明信片。
- `postcard-extended.png` 將原圖完整保留在上方，向下延伸為 1323 × 2200。
- 六枚印章仍對齊上方明信片原有圓框。
- 下方採上下排列：先是大面積手寫區，再是暱稱、鍵盤留言、完成日期。
- 完成圖輸出為 2646 × 4400，亦即卡片的 2 倍尺寸。
- 畫面預覽與 Canvas PNG 都讀取同一組 `placements` 和印章座標。
- 原圖上方不可裁切、縮放或重繪；需要新內容時優先調整下方延伸區。

## 六站順序

| ID | 中文顯示名稱 | 學名／狀態 | 圓框順序 |
|---|---|---|---:|
| `animal01` | 臺灣黑熊 | `Ursus thibetanus formosanus`，特有亞種 | 1 |
| `animal02` | 臺灣獼猴 | `Macaca cyclopis`，特有種 | 2 |
| `animal03` | 臺灣雲豹 | `Neofelis nebulosa brachyura`，特有亞種、區域滅絕 | 3 |
| `animal04` | 藍腹鷴 | `Lophura swinhoii`，特有種 | 4 |
| `animal05` | 臺灣長鬃飛鼠 | 活動指定名稱；正式分類待主辦單位確認 | 5 |
| `animal06` | 臺灣琉璃小灰蝶 | `Acytolepis puspa myla`，特有亞種 | 6 |

「臺灣長鬃飛鼠」目前查不到對應的臺灣正式物種中文名。程式刻意不套用猜測學名；主辦單位確認物種後，更新 `animal05` 的三語名稱、學名、介紹與替代文字即可，ID 和 token 不要變。

## 重要設定與限制

- 唯一活動設定檔：`src/config/eventConfig.js`
- 工作人員 PIN 預設：`2468`
- QR 管理入口：`?view=qr`，仍須輸入 PIN
- 工作人員入口：`?staff=1`
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

- iPhone Safari：六站相機掃碼、觸控手寫、旋轉、PNG 下載、長按存照片、Web Share、重開與短暫斷網。
- Android Chrome：六站相機掃碼、觸控手寫、旋轉、PNG 下載、Web Share、重開與短暫斷網。
- 實際印刷 QR Code 的距離、尺寸和辨識速度。
- 最終手機上的透明印章邊緣、三語字型與 2646 × 4400 圖片清晰度。

完整素材來源與衍生方式見 `docs/ASSET_PROVENANCE.md`；實際測試結果見 `TEST_REPORT.md`。

