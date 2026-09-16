# 素材來源與衍生紀錄

更新日期：2026-09-16

## 使用原則

所有正式視覺素材均由專案擁有者提供。本專案沒有使用 AI 產圖、網路下載圖片或另外繪製正式作品、印章及卡片素材。首頁 Logo 已使用提供的正式檔案，首頁主視覺暫用新版集點卡；完成頁直接使用程式依目前進度合成的完成卡片，不使用另外的裝飾圖。

## 2026 TIE 新版素材

活動名稱：`2026TIE台灣創新技術博覽會－暨大與暨大附中`

以下 PNG 均由專案擁有者於 2026-09-14 提供，專案中的副本與附件 SHA-256 完全相同，沒有重繪、生成、裁切、旋轉或去背。作品名稱及正式順序尚待提供，因此目前只使用中性編號；畫面上的 `14.9°` 順時鐘旋轉由 `src/config/eventConfig.js` 在顯示與輸出時套用，來源檔維持不變。

| 原始附件名稱 | 專案中的來源備份 | 尺寸 | SHA-256 |
|---|---|---:|---|
| `2026創博集點卡/1.png` | `public/assets/event/2026-tie/point-card-source.png` | 1748 × 1240 RGB | `091db7fe…57bf69` |
| `2026創博集點卡.png` | `public/assets/event/2026-tie/stamp-source-01.png` | 152 × 153 RGBA | `5c6564c7…05f0495` |
| `2026創博集點卡 (1).png` | `public/assets/event/2026-tie/stamp-source-02.png` | 169 × 166 RGBA | `95ab563d…4fbc0d2` |
| `2026創博集點卡 (2).png` | `public/assets/event/2026-tie/stamp-source-03.png` | 174 × 173 RGBA | `4acff4e0…cab4f6` |
| `2026創博集點卡 (3).png` | `public/assets/event/2026-tie/stamp-source-04.png` | 158 × 153 RGBA | `d219c063…13ee3a` |
| `2026創博集點卡 (4).png` | `public/assets/event/2026-tie/stamp-source-05.png` | 159 × 150 RGBA | `df127d00…0c91a7` |
| `2026創博集點卡 (6).png` | `public/assets/event/2026-tie/stamp-source-06.png` | 171 × 159 RGBA | `8300b244…1780d` |
| `2026創博集點卡 (7).png` | `public/assets/event/2026-tie/stamp-source-07.png` | 168 × 160 RGBA | `9d351968…2aa667` |
| `Logo Placeholder.png` | `public/assets/event/2026-tie/logo-source.png` | 800 × 300 RGBA | `47256d41…fdde7ab` |

七枚印章原檔都已包含透明通道，無須使用 `scripts/remove_stamp_background.py`。舊版明信片與六枚動物印章仍保留於 `public/assets/event/`，未被覆蓋。

首頁 Logo 直接使用 `logo-source.png`。舊版 Hero 曾直接引用 `point-card-source.png`；2026-09-15 起改用下方記錄的標準 4 × 6 正式底圖。

### 4 × 6 新版集點卡

專案擁有者於 2026-09-15 提供 `2026創博集點卡/新版集點卡.png`：

| 原始附件名稱 | 專案中的來源備份 | 尺寸 | SHA-256 |
|---|---|---:|---|
| `新版集點卡.png` | `public/assets/event/2026-tie/point-card-source-v2.png` | 3590 × 2409 RGB | `174e104b…e4d98e57` |

原檔完整保留。網站顯示與高解析輸出使用 `point-card-4x6.png`，由原檔作確定性處理：左右各裁 1 像素、上方裁 8 像素、下方裁 9 像素，得到正確 3:2 的 3588 × 2392 畫面，再以 Lanczos 縮放為 3600 × 2400（標準 4 × 6 比例）。沒有重繪、生成或加入其他內容。衍生檔 SHA-256 為 `addd498b…4af71e`。

## 2026 TIE 七件作品介紹圖

以下八張 PNG 由專案擁有者於 2026-09-15 提供，米餐具圖於 2026-09-16 更正；網站中的檔案是未裁切、未縮放、未重新編碼的正式檔案副本。檔名依作品順序整理；磁吸式智慧電路教具使用兩張介紹圖。既有七張透明印章原檔未變更。

| 原始附件名稱 | 專案中的來源備份 | 尺寸 | SHA-256 |
|---|---|---:|---|
| `果殼貓砂.png` | `public/assets/event/2026-tie/works/work-01-passion-fruit-cat-litter.png` | 1894 × 1578 | `020ea21b…6b8f0844` |
| `米餐具.png`（更正版） | `public/assets/event/2026-tie/works/work-02-upcycled-rice-tableware.png` | 1149 × 960 | `629d1753…8d4c44e` |
| `環保花盆.png` | `public/assets/event/2026-tie/works/work-03-mushroom-seedling-pot.png` | 1894 × 1578 | `1a4b53a6…cc7057f5` |
| `生產履歷.png` | `public/assets/event/2026-tie/works/work-04-formoya.png` | 1894 × 1578 | `63d1fdc2…d8348c19` |
| `磁吸教材.png` | `public/assets/event/2026-tie/works/work-05-magnetic-circuit-kit-01.png` | 1894 × 1578 | `13802b3b…afb34fc` |
| `磁吸教材2.png` | `public/assets/event/2026-tie/works/work-05-magnetic-circuit-kit-02.png` | 1894 × 1578 | `d053830c…182e0bd9` |
| `環保筍殼材料.png` | `public/assets/event/2026-tie/works/work-06-water-bamboo-composite.png` | 1894 × 1578 | `d6cd9213…3d0f463e` |
| `保險箱.png` | `public/assets/event/2026-tie/works/work-07-iot-smart-safe.png` | 1894 × 1578 | `3f51aeab…4af83d19` |

## 使用者提供的來源檔

| 原始附件名稱 | 專案中的來源備份 | 用途 |
|---|---|---|
| `S__30941239.jpg` | `public/assets/event/postcard.jpg` | 1323 × 901 明信片原圖 |
| `S__30957604_0.jpg` | `stamp-formosan-black-bear.jpg` | 臺灣黑熊印章 |
| `S__30957605_0.jpg` | `stamp-formosan-macaque.jpg` | 臺灣獼猴印章 |
| `S__30957607_0.jpg` | `stamp-taiwan-clouded-leopard.jpg` | 臺灣雲豹印章 |
| `S__30957609_0.jpg` | `stamp-swinhoes-pheasant.jpg` | 藍腹鷴印章；早期曾誤標為帝雉 |
| `S__30957608_0.jpg` | `stamp-white-faced-flying-squirrel.jpg` | 活動顯示名稱「臺灣長鬃飛鼠」印章 |
| `S__30957606_0.jpg` | `stamp-taiwan-blue.jpg` | 臺灣琉璃小灰蝶印章 |

原始附件位於舊電腦使用者文件夾，不應成為建置依賴；必要來源備份已放入 Git repository。

## 衍生檔

### 延伸明信片

`postcard-extended.png` 由 `postcard.jpg` 進行確定性格式處理：

- 原始 1323 × 901 像素放在左上角，沒有裁切、縮放、重繪或色彩調整。
- 底部增加 1299 像素高度，延伸後為 1323 × 2200。
- 延伸底色為 RGB `248, 246, 238`（`#f8f6ee`）。
- 曾以解碼後 raw RGB 的 SHA-256 比對上方區域與原始 JPG，結果一致。

### 透明印章

六張網站實際使用的 `stamp-*.png` 由相同名稱 JPG 以亮度遮罩去除白底：

- 圖像尺寸維持 1254 × 1254。
- 輸出 RGB 固定為黑色，以來源亮度計算透明度。
- 亮度不低於 246 的像素設為完全透明；其餘像素依亮度平滑映射，保留抗鋸齒邊緣與黑色細節。
- 沒有重新繪製、生成或加入印章內容。
- JPG 保留作為可追溯來源，PNG 作為網站及 Canvas 的正式輸入。

若日後使用者提供原生透明 PNG，直接保存新原檔、更新本表與 `src/config/eventConfig.js`，不要再套用目前的白底去除規則。
