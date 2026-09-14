/**
 * EVENT CONTENT AND LAYOUT SETTINGS
 * Coordinates are percentages of the supplied card image (0–100).
 * Work names and descriptions remain neutral until the organiser provides them.
 */
const pendingDescription = {
  en: 'The official work name and introduction will be added after confirmation by the organiser.',
  ja: '正式な作品名と紹介は、主催者の確認後に追加します。',
  'zh-TW': '正式作品名稱與介紹將在主辦單位確認後補上。',
};

const stampSources = Array.from({ length: 7 }, (_, index) => `stamp-source-0${index + 1}.png`);
const stampPlacements = [
  { stampX: 68.03, stampY: 27.44 },
  { stampX: 77.23, stampY: 48.34 },
  { stampX: 61.67, stampY: 59.57 },
  { stampX: 86.42, stampY: 69.24 },
  { stampX: 58.55, stampY: 75.68 },
  { stampX: 70.90, stampY: 80.50 },
  { stampX: 55.37, stampY: 91.69 },
];
const stationTokens = [
  '7b5e91d4c8a36f02e17d94ab', 'c2098e5a71f34bd6a4e98c13',
  '4f7a13c9e28560bd98a1e736', 'a683d05f92c74e1b3f6982cd',
  '19e4b8a6d370cf25a9814e62', 'e7c1469a82f35bd04a6981ce',
  '538ac2e17d946bf08a3e51c7',
];

const text = {
  en: {
    start: 'Start', nickname: 'Name', nicknameHint: 'Required, up to 20 characters', chooseCard: 'Choose your card',
    intro: 'Scan station QR codes on this phone. Collect at least {minimum} of {count} stamps to visit the final station.',
    progress: 'Progress', animals: 'Works', editNickname: 'Edit name', instructions: 'How to play', home: 'Home', reset: 'Reset card',
    noStamp: 'Stamp not collected', stampAdded: 'New stamp added!', alreadyOwned: 'You already have this stamp.', invalidStamp: 'This stamp link is not valid. Please ask a staff member.',
    backToCard: 'Back to card', description: 'About this work', funFact: 'Additional information', completeTitle: '{stampCount} stamps collected — ready for the final station!', completeIntro: 'Add a handwritten note, signature, drawing, or keyboard message.',
    handwriting: 'Handwriting and drawing area', undo: 'Undo', clear: 'Clear', redoWriting: 'Write again', save: 'Save', message: 'Keyboard message (optional)', messageHint: 'Up to 100 characters',
    preview: 'Completed card', download: 'Download PNG', printCard: 'Print 4×6', printCardHint: 'First use: select L3550, 4×6 borderless, landscape, and matte photo paper. The print dialog usually remembers these settings.', share: 'Share', openImage: 'Open image to save', staff: 'Staff mode', qrAdmin: 'QR code manager',
    confirmClear: 'Clear the handwriting?', confirmEdit: 'Replace the saved handwriting or keyboard message?', confirmReset1: 'Reset this entire card?', confirmReset2: 'This removes all stamps and messages. Continue?',
    storageWarning: 'Progress could not be saved in this browser. Keep this page open and ask staff for help.', imageError: 'An activity image is missing. Staff can replace the configured file.', exportError: 'The completed image could not be created. Please try again or ask staff.',
    privacy: 'Use the same browser, avoid private browsing, and do not clear browser data. Progress does not move automatically to another phone.',
    staffPin: 'Staff PIN', enter: 'Enter', exitStaff: 'Return to participant view', add: 'Add', remove: 'Remove', exportData: 'Export progress', importData: 'Import progress', clearMessages: 'Clear messages',
    qrIntro: 'These station links contain access tokens. Print one QR code for each station.', copy: 'Copy link', qrDownload: 'Download QR', print: 'Print', copied: 'Link copied.', notComplete: 'Collect at least {minimum} stamps before opening the completed card.', cancel: 'Cancel', confirm: 'Confirm', close: 'Close', language: 'Language', useInstructions: 'Scan each station QR code with this same browser. Collect at least {minimum} of {count} stamps, then finish and send your card to the final station.',
    heroAlt: '2026 TIE point card', logoAlt: 'National Chi Nan University and affiliated school logos', cardAria: 'Electronic stamp card', handwritingAlt: 'Saved handwriting', qrAria: 'QR code for',
    staffSecurity: 'This PIN is only a local safeguard. It is not secure server authentication.', wrongPin: 'The staff PIN is not correct.', importError: 'This progress file is not valid. Please choose a file exported by this activity.', saved: 'Saved.', longPressSave: 'On iPhone, touch and hold the image, then save it to Photos.',
    scanQr: 'Scan QR code', scanTitle: 'Scan a station QR code', scanHelp: 'Point the camera at a station QR code.', stopScan: 'Stop camera', cameraError: 'The camera could not be opened. Allow camera access, or scan the station code with your phone camera.', scanInvalid: 'This is not a valid activity QR code.',
    submitForPrint: 'Send to the final station', submitHint: 'After collecting at least {minimum} stamps, send this card for printing and prize redemption.', submitting: 'Sending…', submissionSuccess: 'Card sent successfully', redemptionCode: 'Redemption code', submissionUpdated: 'The pending card at the final station has been updated.', submissionUpdateNeeded: 'You now have {stampCount} stamps. Update the pending card before printing.', submitAgain: 'Update submitted card', submitError: 'Could not send the card. Please try again.', submitError400: 'The submitted information is invalid. Please check the name and try again.', submitError409: 'This card conflicts with an earlier submission. Please ask staff for help.', submitError413: 'The card image is too large. Please try again.', submitError415: 'The image format is not supported. Please try again.', submitError422: 'The card could not be accepted. Please ask staff for help.', submitError429: 'Too many submissions right now. Wait a moment and try again.', submitError503: 'The final station is busy. Wait a moment and try again.', submitErrorNetwork: 'Could not connect to the final station. Check the network and try again.', imageTooLarge: 'The completed image is larger than 6 MiB.', showCodeHint: 'Show this code to staff at the final station. Keep this page open.',
  },
  ja: {
    start: 'スタート', nickname: '名前', nicknameHint: '必須・20文字以内', chooseCard: 'カードを選ぶ',
    intro: 'このスマートフォンでQRコードを読み取り、{count}個中{minimum}個以上集めてゴールへ進みましょう。',
    progress: '進み具合', animals: '作品紹介', editNickname: '名前を変更', instructions: '遊び方', home: 'ホーム', reset: 'カードをリセット',
    noStamp: '未取得のスタンプ', stampAdded: '新しいスタンプを獲得しました！', alreadyOwned: 'このスタンプは取得済みです。', invalidStamp: 'このスタンプのリンクは無効です。スタッフにお尋ねください。',
    backToCard: 'カードに戻る', description: '作品紹介', funFact: '補足情報', completeTitle: '{stampCount}個のスタンプを集めました。ゴールへ進めます！', completeIntro: '手書きメッセージ、サイン、絵、またはキーボード入力を追加してください。',
    handwriting: '手書き・描画エリア', undo: '元に戻す', clear: '消去', redoWriting: '書き直す', save: '保存', message: 'キーボードメッセージ（任意）', messageHint: '100文字以内',
    preview: '完成したカード', download: 'PNGをダウンロード', printCard: '4×6で印刷', printCardHint: '初回のみ、L3550・4×6フチなし・横向き・マット写真用紙を選択してください。通常、次回から前回の設定が使用されます。', share: '共有', openImage: '画像を開いて保存', staff: 'スタッフモード', qrAdmin: 'QRコード管理',
    confirmClear: '手書きを消去しますか？', confirmEdit: '保存済みの手書きまたはメッセージを書き換えますか？', confirmReset1: 'カード全体をリセットしますか？', confirmReset2: 'すべてのスタンプとメッセージが削除されます。続けますか？',
    storageWarning: 'このブラウザに進み具合を保存できませんでした。ページを閉じずにスタッフへお尋ねください。', imageError: 'イベント画像が見つかりません。スタッフが設定ファイルを交換できます。', exportError: '完成画像を作成できませんでした。もう一度試すか、スタッフにお尋ねください。',
    privacy: '同じブラウザを使用し、プライベートブラウズやブラウザデータの消去は避けてください。別のスマートフォンへ自動移行はされません。',
    staffPin: 'スタッフPIN', enter: '入る', exitStaff: '参加者画面に戻る', add: '追加', remove: '削除', exportData: '進み具合を書き出す', importData: '進み具合を読み込む', clearMessages: 'メッセージを消去',
    qrIntro: '各ステーションのリンクにはアクセストークンが含まれています。ステーションごとにQRコードを1枚印刷してください。', copy: 'リンクをコピー', qrDownload: 'QRをダウンロード', print: '印刷', copied: 'リンクをコピーしました。', notComplete: '完成カードを開くには、{minimum}個以上のスタンプを集めてください。', cancel: 'キャンセル', confirm: '確認', close: '閉じる', language: '言語', useInstructions: '同じブラウザで各ステーションのQRコードを読み取ります。{count}個中{minimum}個以上集めたらカードを完成させ、ゴールへ送信してください。',
    heroAlt: '2026 TIEポイントカード', logoAlt: '国立暨南国際大学と附属学校のロゴ', cardAria: '電子スタンプカード', handwritingAlt: '保存済みの手書き', qrAria: 'QRコード：',
    staffSecurity: 'このPINは端末上の簡易的な誤操作防止です。安全なサーバー認証ではありません。', wrongPin: 'スタッフPINが正しくありません。', importError: 'この進み具合ファイルは無効です。このイベントから書き出したファイルを選んでください。', saved: '保存しました。', longPressSave: 'iPhoneでは画像を長押しして「写真に保存」を選んでください。',
    scanQr: 'QRコードを読み取る', scanTitle: 'ステーションのQRコードを読み取る', scanHelp: 'カメラをステーションのQRコードに向けてください。', stopScan: 'カメラを停止', cameraError: 'カメラを開けませんでした。カメラへのアクセスを許可するか、スマートフォンのカメラでステーションのコードを読み取ってください。', scanInvalid: 'このイベントの有効なQRコードではありません。',
    submitForPrint: 'ゴールへ送信', submitHint: '{minimum}個以上集めたら、印刷と景品交換のためカードをゴールへ送信してください。', submitting: '送信中…', submissionSuccess: 'カードを送信しました', redemptionCode: '引換コード', submissionUpdated: 'ゴールで待機中のカードを更新しました。', submissionUpdateNeeded: 'スタンプが{stampCount}個になりました。印刷前にゴールで待機中のカードを更新してください。', submitAgain: '送信済みカードを更新', submitError: 'カードを送信できませんでした。もう一度お試しください。', submitError400: '送信内容が正しくありません。名前を確認して再試行してください。', submitError409: '以前の送信と競合しています。スタッフにお尋ねください。', submitError413: 'カード画像が大きすぎます。もう一度お試しください。', submitError415: 'この画像形式は使用できません。もう一度お試しください。', submitError422: 'カードを受け付けられませんでした。スタッフにお尋ねください。', submitError429: '送信が混み合っています。少し待ってから再試行してください。', submitError503: 'ゴールが混み合っています。少し待ってから再試行してください。', submitErrorNetwork: 'ゴールに接続できません。通信状態を確認して再試行してください。', imageTooLarge: '完成画像が6 MiBを超えています。', showCodeHint: 'ゴールのスタッフにこのコードを見せてください。この画面を閉じないでください。',
  },
  'zh-TW': {
    start: '開始', nickname: '姓名', nicknameHint: '必填，最多20個字元', chooseCard: '選擇集點卡',
    intro: '用這支手機掃描站點 QR Code；{count} 個印章中收集至少 {minimum} 個，即可前往總關。',
    progress: '目前進度', animals: '作品介紹', editNickname: '修改姓名', instructions: '使用說明', home: '首頁', reset: '重置集點卡',
    noStamp: '尚未取得印章', stampAdded: '取得新印章！', alreadyOwned: '你已經有這個印章了。', invalidStamp: '這個集章連結無效，請洽詢工作人員。',
    backToCard: '返回集點卡', description: '作品介紹', funFact: '補充資訊', completeTitle: '已收集 {stampCount} 個印章，可以前往總關！', completeIntro: '請加入手寫留言、簽名、圖案或鍵盤文字。',
    handwriting: '手寫／繪圖區', undo: '復原', clear: '清除', redoWriting: '重新書寫', save: '儲存', message: '鍵盤文字（選填）', messageHint: '最多100個字元',
    preview: '完成卡片', download: '下載 PNG', printCard: '列印 4×6', printCardHint: '首次請選擇 L3550、4×6 無邊界、橫向及霧面相紙；列印視窗通常會沿用上次設定。', share: '分享', openImage: '開啟圖片後儲存', staff: '工作人員模式', qrAdmin: 'QR Code 管理',
    confirmClear: '確定要清除手寫內容嗎？', confirmEdit: '確定要取代已儲存的手寫或文字嗎？', confirmReset1: '確定要重置整張集點卡嗎？', confirmReset2: '這會移除所有印章與留言，確定繼續嗎？',
    storageWarning: '這個瀏覽器無法保存進度。請保持頁面開啟並洽詢工作人員。', imageError: '活動圖片載入失敗，工作人員可以更換設定的檔案。', exportError: '無法產生完成圖片，請重試或洽詢工作人員。',
    privacy: '請使用同一個瀏覽器、避免無痕模式，也不要清除瀏覽器資料。進度不會自動轉移到另一支手機。',
    staffPin: '工作人員 PIN', enter: '進入', exitStaff: '返回參加者畫面', add: '補發', remove: '移除', exportData: '匯出進度', importData: '匯入進度', clearMessages: '清除留言',
    qrIntro: '各站連結包含存取 token。請為每一站分別列印一張 QR Code。', copy: '複製連結', qrDownload: '下載 QR Code', print: '列印', copied: '連結已複製。', notComplete: '請先收集至少 {minimum} 個印章，再開啟完成卡片。', cancel: '取消', confirm: '確認', close: '關閉', language: '語言', useInstructions: '請用同一個瀏覽器掃描每一站的 QR Code。收集 {count} 個印章中的至少 {minimum} 個後，完成卡片並送到總關。',
    heroAlt: '2026 TIE 集點卡', logoAlt: '國立暨南國際大學與附屬學校標誌', cardAria: '電子集點卡', handwritingAlt: '已儲存的手寫內容', qrAria: 'QR Code：',
    staffSecurity: '這組 PIN 只是裝置上的簡易防誤觸，不是真正安全的伺服器驗證。', wrongPin: '工作人員 PIN 不正確。', importError: '這個進度檔案無效，請選擇由本活動匯出的檔案。', saved: '已儲存。', longPressSave: 'iPhone 請長按圖片，再選擇儲存到照片。',
    scanQr: '掃描 QR Code', scanTitle: '掃描站點 QR Code', scanHelp: '請將相機對準站點 QR Code。', stopScan: '停止相機', cameraError: '無法開啟相機。請允許相機權限，或使用手機相機掃描站點 QR Code。', scanInvalid: '這不是有效的活動 QR Code。',
    submitForPrint: '送到總關列印', submitHint: '收集至少 {minimum} 個印章後，將明信片送到總關列印並兌換獎品。', submitting: '傳送中…', submissionSuccess: '明信片已成功送出', redemptionCode: '兌換碼', submissionUpdated: '已更新總關等待中的明信片。', submissionUpdateNeeded: '你現在有 {stampCount} 個印章，列印前請更新總關等待中的明信片。', submitAgain: '更新已送出的明信片', submitError: '明信片送出失敗，請再試一次。', submitError400: '投稿資料格式有誤，請確認姓名後重試。', submitError409: '這張卡片與先前投稿衝突，請洽工作人員。', submitError413: '明信片圖片太大，請再試一次。', submitError415: '圖片格式不支援，請再試一次。', submitError422: '伺服器無法接受這張明信片，請洽工作人員。', submitError429: '目前送出人數較多，請稍候再試。', submitError503: '總關目前忙碌，請稍候再試。', submitErrorNetwork: '無法連線總關，請確認網路後再試。', imageTooLarge: '完成圖片超過 6 MiB。', showCodeHint: '請在總關向工作人員出示此兌換碼，並先不要關閉本頁。',
  },
};

export const eventConfig = {
  event: {
    name: '2026TIE台灣創新技術博覽會－暨大與暨大附中',
    subtitle: {
      en: '2026TIE台灣創新技術博覽會－暨大與暨大附中',
      ja: '2026TIE台灣創新技術博覽會－暨大與暨大附中',
      'zh-TW': '2026TIE台灣創新技術博覽會－暨大與暨大附中',
    },
    date: 'YYYY-MM-DD', defaultLanguage: 'en', languages: ['en', 'ja', 'zh-TW'],
  },
  assets: {
    logo: 'assets/event/2026-tie/logo-source.png', hero: 'assets/event/2026-tie/point-card-source.png',
    stampSound: 'assets/sounds/stamp.mp3',
  },
  cardDesigns: [{
    id: 'card-01',
    name: { en: '2026 TIE point card', ja: '2026 TIE ポイントカード', 'zh-TW': '2026 TIE 集點卡' },
    image: 'assets/event/2026-tie/point-card-source.png',
    alt: '2026 TIE point card with a name area, drawing area, and seven stamp spaces',
    width: 1748, height: 1240,
  }],
  output: { width: 3496, height: 2480, filePrefix: '2026-tie-point-card' },
  submission: {
    enabled: true,
    apiBaseUrl: 'https://stamp-api.bbqhung.org',
    endpoint: '/api/v1/submissions',
    minimumStampCount: 5,
    maxImageBytes: 6 * 1024 * 1024,
    imageWidth: 1800,
    imageHeight: 1200,
    jpegQuality: 0.92,
  },
  placements: {
    nickname: { x: 30.8, y: 38.7, maxWidth: 23.5, fontSize: 3.2, color: '#ffffff', align: 'center', fontWeight: '700' },
    handwriting: { x: 2.5, y: 59.5, width: 36.5, height: 36.5 },
    message: { x: 20.75, y: 78, maxWidth: 32, fontSize: 2.2, color: '#25404d', align: 'center', fontWeight: '600' },
    eventName: { enabled: false, x: 50, y: 5, maxWidth: 90, fontSize: 3, color: '#173f35', align: 'center', fontWeight: '700' },
    date: { enabled: false, x: 20.75, y: 94, maxWidth: 32, fontSize: 1.6, color: '#365d54', align: 'center', fontWeight: '500' },
    personalization: null,
  },
  stampAnimation: { enabled: true, durationMs: 650 }, sound: { enabled: false, path: 'assets/sounds/stamp.mp3' },
  staff: { enabled: true, pin: '2468', queryKey: 'staff', showParticipantEntry: false },
  // IDs 01–06 stay stable so existing browser data is not silently discarded.
  // Display names are neutral placeholders; do not infer the works from the images.
  animals: stampSources.map((filename, index) => ({
    id: `animal0${index + 1}`, token: stationTokens[index],
    nameZh: `作品 ${index + 1}`, nameEn: `Work ${index + 1}`, nameJa: `作品 ${index + 1}`,
    scientificName: '', description: pendingDescription, funFact: pendingDescription,
    animalImage: `assets/event/2026-tie/${filename}`, stampImage: `assets/event/2026-tie/${filename}`,
    ...stampPlacements[index], stampWidth: 9.2, stampHeight: 12.9, stampRotation: 14.9,
    stampZIndex: index + 1, stampOpacity: 1,
    altText: `Temporary stamp artwork ${index + 1}; official work description pending`,
  })),
  text,
};

export function textFor(language, key) {
  return eventConfig.text[language]?.[key] || eventConfig.text.en[key] || key;
}

export function animalName(animal, language) {
  return language === 'ja' ? animal.nameJa : language === 'zh-TW' ? animal.nameZh : animal.nameEn;
}
