# 新電腦接手提示詞

把以下整段貼到新電腦上、剛建立的 Codex 專案中：

---

我要繼續開發 GitHub 專案：

- Repository：`https://github.com/HungHaoMing/taiwan-wildlife-passport.git`
- 預設分支：`main`
- 技術：Vite、原生 JavaScript、Vitest
- 專案用途：「2026TIE台灣創新技術博覽會－暨大與暨大附中」展場電子集章網站

請先確認 `gh auth status`。如果尚未 clone，請在目前空白工作目錄執行：

```bash
git clone https://github.com/HungHaoMing/taiwan-wildlife-passport.git .
npm ci
npm test
npm run build
```

開始修改前，請完整閱讀：

- `AGENTS.md`
- `HANDOFF.md`
- `README.md`
- `TEST_REPORT.md`
- `docs/ASSET_PROVENANCE.md`
- `docs/DEVELOPMENT_BACKLOG.md`
- `docs/multi-participant-flow-spec.md`
- `src/config/eventConfig.js`
- `src/cardRenderer.js`
- `src/main.js`
- `src/state.js`

請先檢查 `git status` 與最新 commit，不要覆蓋既有修改。後續工作必須依照以下三個階段進行；每一階段完成、讓我確認後，才能開始下一階段。

請完整閱讀 `docs/DEVELOPMENT_BACKLOG.md`。2026-09-15 起的最新優先順序覆蓋本文件較早的三階段敘述：

1. 先依專案擁有者提供的資料補齊七件作品名稱、介紹、補充資訊與新的作品介紹照片；不得由印章圖猜測內容，確認前不要 push。
2. 作品內容確認後，將新使用者預設語言由英文改成繁體中文，同時保留既有使用者自行選擇的語言。
3. 最後才處理 Service Worker 舊快取、Server session 過期導回登入、低成本資安／維運改善及多人共用手機功能。

不要因為看見後文的「第三階段」就先開始多人功能；最新 backlog 是唯一執行順序來源。

目前狀態：第一階段素材替換已完成；第二階段的姓名、手寫／文字區與七枚印章百分比座標已實作並提供預覽，仍待專案擁有者最後確認。另已依新展場流程加入「5～7 枚完成後投稿總關 API 並顯示兌換碼」功能。作品名稱與三語介紹尚未提供。不要重做已完成項目，也不要在確認前開始第三階段。

## 第一階段：換成新版集點卡與 7 枚印章（已完成）

新版集點卡、Logo 與 7 枚新版印章已保存在 `public/assets/event/2026-tie/`，原素材與來源紀錄均已保留。

執行要求：

1. 如果新版素材尚未在工作區，先請我提供或附上新版集點卡與 7 枚印章，不要自行生成或猜測素材。
2. 保留原始素材，不要直接覆蓋；新版檔名要清楚且可追溯，並同步更新 `docs/ASSET_PROVENANCE.md`。
3. 印章若仍是黑圖白底，使用 repo 內的 `scripts/remove_stamp_background.py` 以 OpenCV 產生透明 PNG，不要使用 AI 重新繪圖。
4. 讀取新版卡片的實際像素尺寸，更新 `eventConfig.cardDesigns` 與輸出尺寸。
5. 將 `eventConfig.animals` 更新為 7 筆。若第 7 枚印章的名稱、三語內容、學名或介紹資料不完整，先列出缺項請我確認。
6. 每一站使用不同且不可預測的 token；不要在回覆中完整顯示 token。
7. 搜尋並修正所有寫死的「6 枚／six／6個」文案與測試，完成條件一律以設定中的動物數量為準。
8. 確認首頁、集章卡、動物介紹、完成圖與輸出 PNG 都引用新版素材。
9. 執行 `npm test` 與 `npm run build`，並用本機瀏覽器檢查圖片沒有 404、透明印章沒有白色方框。
10. 完成後先回報變更與預覽結果，等我確認新版素材正確，再進入第二階段。

## 第二階段：定位卡片上的文字與畫圖區（已實作，待確認）

以新版集點卡為準，調整以下項目：

- 姓名／暱稱位置
- 鍵盤文字留言位置
- 手寫／簽名／畫圖區的位置與大小
- 完成日期位置（若新版卡片需要）
- 7 枚印章各自的位置、尺寸、旋轉、圖層與透明度

執行要求：

1. 優先只修改 `src/config/eventConfig.js` 的百分比座標；畫面預覽與高解析輸出必須共用同一組設定。
2. 若需要校正，可建立只供開發使用的座標輔助線或預覽模式，但不可出現在正式活動畫面。
3. 將新版卡片像素位置換算成百分比：

   - `xPercent = xPixel / cardWidth * 100`
   - `yPercent = yPixel / cardHeight * 100`

4. 分別驗證手機畫面與 `renderCompletedCard` 產生的 PNG，兩者的位置需一致。
5. 先提供定位預覽讓我確認；我確認姓名、留言、畫圖區及 7 枚印章位置後，才進入第三階段。

## 第三階段：多人共用手機集章

依照 `docs/multi-participant-flow-spec.md` 繼續開發。核心需求：

- 同一支手機可保存多張參加者卡片。
- 每張卡有獨立的暱稱、7 枚印章進度、留言、畫圖與完成日期。
- 同一參加者同一站只能加一次；不同參加者可以取得相同印章。
- 掃描後要清楚選擇印章歸屬。
- 同一站掃描一次後，可逐一確認並替同行的其他參加者加同一枚章。
- 不做登入、裝置指紋、後端或跨手機同步。
- 必須安全遷移現有 v1 單一卡片資料，不能讓舊進度消失。

尚待我確認的主要規格：

1. 「多分頁」是網站內的參加者切換頁籤，還是瀏覽器真正的多個分頁。
2. 一支手機最多可建立幾位參加者，目前草案建議 6 位。
3. 內建掃描器是否每次都要再次確認參加者姓名。
4. 使用者是否可自行刪除單一卡片。

第三階段開始前，請先用簡短問題與我確認上述規格，不要自行假設後直接開發。

## 全程品質要求

- 保持 GitHub Pages 靜態部署與相對資源路徑可用。
- 保持英文、日文、繁體中文介面完整。
- 不要提交 `node_modules`、`.venv` 或 `dist`。
- 保留並擴充 Vitest 測試。
- 每階段都執行 `npm test`、`npm run build` 與必要的瀏覽器驗證。
- 不要在我確認前 push；先提供 diff 摘要與測試結果。

請先完成 clone、環境安裝、測試與文件閱讀，確認最新狀態後，再依專案擁有者當次指示繼續；不要重做第一階段或自行開始第三階段。

---

## 新電腦手動指令備忘

```bash
mkdir -p taiwan-wildlife-passport
cd taiwan-wildlife-passport
git clone https://github.com/HungHaoMing/taiwan-wildlife-passport.git .
npm ci
npm test
npm run build
npm run dev
```

若 GitHub CLI 尚未登入：

```bash
gh auth login -h github.com
gh auth status
```
