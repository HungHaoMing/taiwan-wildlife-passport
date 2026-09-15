# 開發待辦、風險與接手順序

更新日期：2026-09-15（Asia/Taipei）

這份文件是跨電腦接手的主要狀態表。內容涵蓋公開前端 `taiwan-wildlife-passport` 與獨立後端 `tie-stamp-server`；開始工作前仍須閱讀各 repository 的 `AGENTS.md`、`HANDOFF.md`、`README.md` 與測試報告。

## 目前可運作的主流程

1. 參加者由正式 GitHub Pages 根網址進站、輸入姓名並在同一瀏覽器保存進度。
2. 七站各使用固定的站點 ID 與不同 token；同一張卡不可重複取得同一章。
3. 收集 5～7 枚後，可加入手寫／繪圖／鍵盤文字並合成完成卡。
4. 前端將 1800 × 1200 JPEG 投稿至 `https://stamp-api.bbqhung.org/api/v1/submissions`，顯示固定於該投稿的六位兌換碼。
5. 總關後台可搜尋、每 10 秒更新清單、預覽、列印、標記已列印及已兌換。

已確認的基準版本：

- 前端 `main`：`96de77b`（GitHub Pages 部署成功；29 項測試與 build 通過）
- Server `main`：`621f04b`（29 項測試通過；NAS `/healthz` 已由專案擁有者確認正常）

## 專案擁有者指定的開發順序

不得跳階段。每階段完成、預覽並經專案擁有者確認後，才能開始下一階段。

### 1. 先補齊七件作品內容與介紹照片

目前 `animal01`～`animal07` 只是為相容既有瀏覽器資料而保留的內部 ID，不代表作品主題。顯示名稱仍是「作品 1」～「作品 7」，介紹頁暫時重用印章圖。

需要專案擁有者提供：

- 每件作品與 `stamp-source-01.png`～`stamp-source-07.png` 的對應確認。
- 中文正式名稱、作品介紹、選填的補充資訊，以及選填的作者／團隊／單位。
- 英文、日文內容，或明確授權由開發者翻譯後再確認。
- 七張新的作品介紹照片及其一對一對應；不得自行生成、下載或由印章圖片猜測內容。

實作要求：

- 保留七張印章原檔、既有內部 ID、token 與集點卡位置。
- 新照片保留使用者提供的原始檔，另存清楚檔名並更新 `docs/ASSET_PROVENANCE.md`。
- `animalImage` 改用作品介紹照片；`stampImage` 繼續使用既有透明印章。
- 更新三語名稱、介紹、補充資訊及無障礙替代文字。
- 先提供七個作品介紹頁與卡片預覽；確認前不要 push。

### 2. 再將預設語言改為繁體中文

目前 `eventConfig.event.defaultLanguage` 是 `en`。作品內容確認後改為 `zh-TW`，並驗證：

- 新使用者第一次開啟顯示繁體中文。
- 已在本機選擇語言的既有使用者仍保留自己的選擇，不強制覆寫。
- 英文、日文切換及所有新作品內容完整。
- 首頁、集章、作品介紹、完成／投稿與錯誤流程沒有英文漏字。

### 3. 最後處理技術待修與待開發項目

#### P0：展前應完成

- **前端 Service Worker 更新策略**：目前 `public/sw.js` 使用固定 cache 名稱 `2026-tie-point-card-v1` 且對入口 HTML 採 cache-first。部署新版後，舊瀏覽器可能保留舊 HTML、引用已移除的 bundle，只剩未套樣式的「Skip to content」。應讓導覽請求優先取得新版、升級 cache 版本並清除舊 cache；不得以清除 `localStorage` 作為一般修復方式。
- **Server 過期 session 導回登入**：工作人員 session 過期後直接開啟 `/admin/` 目前會看到 JSON `Session expired`，後台 HTML 頁面應導向 `/admin/login`；API 與受保護靜態資源仍應維持正確 401。
- **真機與實體列印驗收**：iPhone Safari、Android Chrome、七張實體 QR、短暫斷網重試，以及 Epson L3550 + 彩之舞 HY-B862 的 4 × 6 橫式無邊界列印。

#### P1：低成本可靠性與資安補強

- **GitHub Actions runtime 升級**：2026-09-15 Pages workflow 成功，但 GitHub 警告目前使用的部分官方 actions 仍以已淘汰的 Node.js 20 runtime 為目標並由 runner 強制改用 Node.js 24。先確認官方新 major 版本與相容性，再更新 checkout、setup-node、Pages artifact／deploy actions；現況不阻擋部署。
- **Server 限流器記憶體上限**：目前滑動視窗 limiter 會為每個來源 IP 永久保留 dictionary key。大量不同來源可能造成長期記憶體成長；加入過期 key 清理或總 key 上限。
- **密碼產生命令**：文件目前示範把工作人員密碼放在命令列參數，可能留在 shell history 或短暫出現在 process list。改用 `python -m app.password` 的互動式輸入，並考慮移除 argv 密碼模式。
- **孤立圖片清理**：資料庫 transaction 已盡量配合檔案刪除，但刪檔失敗仍可能留下不再被 DB 引用的圖片。加入只刪除未被引用且超過安全等待時間的維護／稽核功能。
- **備份個資期限**：Server 會清理正式資料，但 `/data/backups` 不會自動跟著清除。NAS 備份與異地副本必須採相同或更短的保存期限。
- **正式設定複核**：`TRUSTED_PROXY_CIDRS` 只能是 Synology reverse proxy 實際來源網段；只對外開 443，不能直接公開 container host port；`COOKIE_SECURE=true`、精確 CORS origin 與 HTTPS 必須維持。

#### P2：第三階段多人共用手機

尚未開發。開始前需先更新並確認 `docs/multi-participant-flow-spec.md`：

- 一支手機最多是否為 6 位參加者。
- 網站內切換與真正瀏覽器多分頁的支援範圍。
- 每次掃描是否都再次確認參加者。
- 是否允許使用者刪除單一卡片。
- 完成門檻需由舊草案的 7/7 修正為目前的 5/7 以上。
- 草案中的公開工作人員補章功能已被安全決策淘汰，不可直接照舊實作。
- v1 單一卡片資料必須無損遷移到 v2，且不同分頁同時蓋章不可互相覆蓋。

## 資安檢視摘要

2026-09-14 至 2026-09-15 對前端與 Server 做過靜態程式檢查、威脅邊界檢視與測試；這不是外部滲透測試。

### 已有防護

- 公開前端已移除 PIN、補章／移除及 QR 管理介面；`?staff=1`、`?view=qr` 不再取得管理能力。
- Server 後台使用 Argon2id 密碼 hash、HttpOnly/Secure/SameSite session cookie、idle/absolute timeout、CSRF 與狀態機 transaction。
- 公開 API 不提供投稿清單、圖片或兌換碼查詢；後台圖片需要 session。
- 圖片限制檔案大小、像素、邊長與格式，並重新解碼／編碼；同時處理數限制為 DS920+ 建議值 2。
- Container 使用 non-root、read-only root filesystem、drop capabilities、`no-new-privileges`，資料只掛載 `/data`。
- CORS、CSP、安全標頭、HTTPS reverse proxy、冪等投稿與重複兌換阻擋均已實作。

### 刻意接受的低價獎品風險

- 七站 token 必須存在公開 QR 與前端 bundle，能防止誤操作，但無法阻止技術使用者分析或轉傳。
- 集章進度保存在 `localStorage`，Server 接受 client 宣告的 `stampCount`；有意修改瀏覽器資料者可能偽造 5～7 枚。
- `participantId` 與 idempotency key 具高熵且不公開，但若被取得，在投稿仍為 `pending` 時可能被用來更新同一筆投稿；狀態離開 `pending` 後不再覆寫。
- CORS 是瀏覽器邊界，不是 API 身分驗證；公開投稿端點仍可能被非瀏覽器 client 呼叫，主要依限流、圖片限制與總關人工流程控制。

上述風險依「獎品價值低、不蒐集帳號或敏感身分、總關人工交付」的活動模型暫時接受。若未來涉及高價獎品、抽獎資格或正式身分驗證，需改為 server 驗證的一次性站點憑證，不能沿用目前模式。

## 尚待操作驗證

- 正式 GitHub Pages 由舊 Service Worker 升級到修正版時，不清除集章資料且能載入新 bundle。
- 正式 API 的 5／6／7 枚新投稿、pending 更新、斷網後相同 key 重試。
- 工作人員登入、搜尋、清單自動更新、列印失敗復原、重印及重複兌換阻擋。
- 活動結束後設定／確認 `PURGE_ALL_AFTER`，並同步清除含個資的備份。

## 發佈原則

- 每個階段使用獨立 commit／PR，不把作品內容、語言切換與技術修正混成一個難以回復的提交。
- 前端每次執行 `npm test`、`npm run build`、窄螢幕瀏覽器檢查；合併後等待 Pages Action 並驗證正式站。
- Server 每次執行完整 `pytest` 與 `git diff --check`；push 只更新 GitHub，NAS 必須另行備份、pull、build、health check。
- 不 commit `.env`、token 清單輸出、`qr-output/`、投稿圖片、資料庫、備份或任何密碼／secret。
