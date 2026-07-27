/**
 * EVENT CONTENT AND LAYOUT SETTINGS
 * All user-facing text, file paths, tokens, and card coordinates live here.
 * Coordinates are percentages of the card image (0–100), so they scale on phones.
 * Replace placeholder files in public/assets or change only the paths below.
 */
export const eventConfig = {
  event: {
    name: 'Taiwan Wildlife Passport',
    subtitle: { en: 'International Cultural Exchange Activity', ja: '国際文化交流イベント', 'zh-TW': '國際文化交流活動' },
    date: 'YYYY-MM-DD',
    defaultLanguage: 'en',
    languages: ['en', 'ja', 'zh-TW'],
  },
  assets: {
    logo: 'assets/placeholders/logo-placeholder.svg',
    hero: 'assets/placeholders/hero-placeholder.svg',
    completionBackground: 'assets/placeholders/completion-placeholder.svg',
    stampSound: 'assets/sounds/stamp.mp3',
  },
  cardDesigns: [
    {
      id: 'card-01',
      name: { en: 'Taiwan Endemic Friends Postcard', ja: '台湾固有の仲間たち ポストカード', 'zh-TW': '臺灣特有種好朋友明信片' },
      image: 'assets/event/postcard.jpg',
      alt: 'Taiwan Endemic Friends postcard with six stamp circles',
      width: 1323,
      height: 901,
    },
  ],
  output: { width: 2646, height: 1802, filePrefix: 'taiwan-endemic-friends' },
  placements: {
    nickname: { x: 14, y: 72.8, maxWidth: 20, fontSize: 2.1, color: '#102f63', align: 'center', fontWeight: '700' },
    handwriting: { x: 72, y: 2, width: 23, height: 13 },
    message: { x: 50, y: 72.8, maxWidth: 42, fontSize: 1.8, color: '#102f63', align: 'center', fontWeight: '600' },
    eventName: { enabled: false, x: 50, y: 5.5, maxWidth: 86, fontSize: 3, color: '#173f35', align: 'center', fontWeight: '700' },
    date: { x: 86, y: 72.8, maxWidth: 20, fontSize: 1.5, color: '#365d54', align: 'center', fontWeight: '500' },
  },
  stampAnimation: { enabled: true, durationMs: 650 },
  sound: { enabled: false, path: 'assets/sounds/stamp.mp3' },
  staff: { enabled: true, pin: '2468', queryKey: 'staff' },
  // Animals follow the six circles from left to right on the supplied postcard.
  // Until separate animal photos are supplied, each introduction reuses its stamp image.
  animals: [
    {
      id: 'animal01', token: 'f9K2mQ7vT4xP8cR3',
      nameZh: '臺灣黑熊', nameEn: 'Formosan Black Bear', nameJa: 'タイワンツキノワグマ',
      scientificName: 'Ursus thibetanus formosanus Swinhoe, 1864',
      description: {
        en: 'The Formosan black bear is a Taiwan-endemic subspecies of the Asiatic black bear and Taiwan’s largest land carnivore. Many have a pale V-shaped mark on the chest.',
        ja: 'タイワンツキノワグマは、ツキノワグマの台湾固有亜種で、台湾最大の陸生食肉目動物です。胸には淡いV字形の模様がよく見られます。',
        'zh-TW': '臺灣黑熊是亞洲黑熊的臺灣特有亞種，也是臺灣體型最大的陸域食肉目動物。許多個體胸前有淡色的 V 字形斑紋。',
      },
      funFact: { en: 'It is an endemic subspecies, not a separate endemic species.', ja: '台湾固有「種」ではなく、台湾固有「亜種」です。', 'zh-TW': '牠是臺灣特有「亞種」，不是獨立的臺灣特有「種」。' },
      animalImage: 'assets/event/stamp-formosan-black-bear.jpg', stampImage: 'assets/event/stamp-formosan-black-bear.jpg',
      stampX: 9.6, stampY: 86.3, stampWidth: 13.4, stampHeight: 19.7, stampRotation: 0, stampZIndex: 1, stampOpacity: 1,
      altText: 'Black-and-white circular stamp illustration of a Formosan black bear',
    },
    {
      id: 'animal02', token: 'a6N8wD2zL9jS5eH7',
      nameZh: '臺灣獼猴', nameEn: 'Formosan Macaque', nameJa: 'タイワンザル',
      scientificName: 'Macaca cyclopis (Swinhoe, 1863)',
      description: {
        en: 'The Formosan macaque is a primate species found only in Taiwan. It has cheek pouches that can temporarily hold food.',
        ja: 'タイワンザルは台湾だけに分布する固有種の霊長類です。頬袋に食べ物を一時的に入れることができます。',
        'zh-TW': '臺灣獼猴是只分布於臺灣的靈長類特有種。牠的頰囊可以暫時存放食物。',
      },
      funFact: { en: 'This one is a Taiwan-endemic species.', ja: 'こちらは台湾固有の「種」です。', 'zh-TW': '牠是臺灣特有「種」。' },
      animalImage: 'assets/event/stamp-formosan-macaque.jpg', stampImage: 'assets/event/stamp-formosan-macaque.jpg',
      stampX: 25.8, stampY: 86.3, stampWidth: 13.4, stampHeight: 19.7, stampRotation: 0, stampZIndex: 2, stampOpacity: 1,
      altText: 'Black-and-white circular stamp illustration of a Formosan macaque',
    },
    {
      id: 'animal03', token: 'u3B7pX9kC2gM6rV8',
      nameZh: '臺灣雲豹', nameEn: 'Formosan Clouded Leopard', nameJa: 'タイワンウンピョウ',
      scientificName: 'Neofelis nebulosa brachyura Swinhoe, 1862',
      description: {
        en: 'The Formosan clouded leopard was the Taiwan-endemic subspecies of the clouded leopard. Taiwan’s Red List now classifies it as Regionally Extinct (RE).',
        ja: 'タイワンウンピョウは、ウンピョウの台湾固有亜種でした。現在、台湾のレッドリストでは「地域絶滅（RE）」に分類されています。',
        'zh-TW': '臺灣雲豹是雲豹的臺灣特有亞種。現行臺灣紅皮書將牠列為「區域滅絕（RE）」。',
      },
      funFact: { en: 'Robert Swinhoe recorded it in scientific literature in 1862.', ja: '1862年にロバート・スウィンホーが科学文献に記録しました。', 'zh-TW': '史溫侯於 1862 年將牠記錄於科學文獻。' },
      animalImage: 'assets/event/stamp-taiwan-clouded-leopard.jpg', stampImage: 'assets/event/stamp-taiwan-clouded-leopard.jpg',
      stampX: 42.2, stampY: 86.3, stampWidth: 13.4, stampHeight: 19.7, stampRotation: 0, stampZIndex: 3, stampOpacity: 1,
      altText: 'Black-and-white circular stamp illustration of a Formosan clouded leopard',
    },
    {
      id: 'animal04', token: 'q8E4tY6nF2sJ9dW3',
      nameZh: '帝雉', nameEn: 'Mikado Pheasant', nameJa: 'ミカドキジ',
      scientificName: 'Syrmaticus mikado (Ogilvie-Grant, 1906)',
      description: {
        en: 'The Mikado pheasant is a bird species found only in Taiwan. It lives in mountain forests and is also called the Black Long-tailed Pheasant.',
        ja: 'ミカドキジは台湾だけに分布する固有種です。山地の森林に生息し、中国語では「黒長尾雉」とも呼ばれます。',
        'zh-TW': '帝雉是只分布於臺灣的鳥類特有種，棲息於山區森林，也稱為黑長尾雉。',
      },
      funFact: { en: 'Its scientific name “mikado” is an old Japanese title for the emperor.', ja: '学名の「mikado」は、天皇を表す古い日本語に由来します。', 'zh-TW': '學名中的「mikado」來自日語中對天皇的舊稱。' },
      animalImage: 'assets/event/stamp-mikado-pheasant.jpg', stampImage: 'assets/event/stamp-mikado-pheasant.jpg',
      stampX: 57.6, stampY: 86.3, stampWidth: 13.4, stampHeight: 19.7, stampRotation: 0, stampZIndex: 4, stampOpacity: 1,
      altText: 'Black-and-white circular stamp illustration of a Mikado pheasant',
    },
    {
      id: 'animal05', token: 'h5R9cA3vK7mZ2pL6',
      nameZh: '白面鼯鼠', nameEn: 'Taiwan Giant Flying Squirrel', nameJa: 'タイワンムササビ',
      scientificName: 'Petaurista lena Thomas, 1907',
      description: {
        en: 'The white-faced flying squirrel is a large nocturnal flying squirrel of Taiwan. It moves between trees with a broad gliding membrane and can glide for more than 50 metres.',
        ja: '白面鼯鼠は台湾に生息する大型の夜行性ムササビです。大きな飛膜で木々の間を移動し、50メートル以上滑空することがあります。',
        'zh-TW': '白面鼯鼠是臺灣的大型夜行性飛鼠。牠利用寬大的飛膜在樹林間移動，最遠可滑翔超過 50 公尺。',
      },
      funFact: { en: 'Current Taiwan records list Petaurista lena as endemic; older sources treated it as the subspecies P. alborufus lena.', ja: '現在の台湾の目録では固有種 Petaurista lena とされますが、以前は P. alborufus lena という亜種として扱われました。', 'zh-TW': '現行臺灣名錄將牠列為特有種 Petaurista lena；較早資料則視為 P. alborufus lena 亞種。' },
      animalImage: 'assets/event/stamp-white-faced-flying-squirrel.jpg', stampImage: 'assets/event/stamp-white-faced-flying-squirrel.jpg',
      stampX: 73.6, stampY: 86.3, stampWidth: 13.4, stampHeight: 19.7, stampRotation: 0, stampZIndex: 5, stampOpacity: 1,
      altText: 'Black-and-white circular stamp illustration of a white-faced flying squirrel',
    },
    {
      id: 'animal06', token: 'x2G6bT8qN4wD7sF9',
      nameZh: '臺灣琉璃小灰蝶', nameEn: 'Taiwan Blue', nameJa: 'タイワンルリシジミ',
      scientificName: 'Acytolepis puspa myla (Fruhstorfer, 1909)',
      description: {
        en: 'The Taiwan blue is Taiwan’s endemic subspecies of the common hedge blue butterfly. Adults span about 25–33 mm, and males have glossy blue-violet upper wings.',
        ja: 'タイワンルリシジミは、コモン・ヘッジ・ブルーの台湾固有亜種です。成虫の開張は約25〜33ミリで、雄の翅表は青紫色に輝きます。',
        'zh-TW': '臺灣琉璃小灰蝶是靛色琉灰蝶的臺灣特有亞種。成蝶展翅約 25 至 33 毫米，雄蝶翅背帶有藍紫色金屬光澤。',
      },
      funFact: { en: 'Its larvae can use many different kinds of host plants.', ja: '幼虫は非常に多くの種類の植物を食草として利用できます。', 'zh-TW': '牠的幼蟲可以利用非常多種不同的寄主植物。' },
      animalImage: 'assets/event/stamp-taiwan-blue.jpg', stampImage: 'assets/event/stamp-taiwan-blue.jpg',
      stampX: 89.4, stampY: 86.3, stampWidth: 13.4, stampHeight: 19.7, stampRotation: 0, stampZIndex: 6, stampOpacity: 1,
      altText: 'Black-and-white circular stamp illustration of a Taiwan blue butterfly',
    },
  ],
  text: {
    en: {
      start: 'Start', nickname: 'Nickname', nicknameHint: 'Required, up to 20 characters', chooseCard: 'Choose your card',
      intro: 'Meet six Taiwan animals. Scan each station QR code and collect every stamp on this phone.',
      progress: 'Progress', animals: 'Animal guide', editNickname: 'Edit nickname', instructions: 'How to play', home: 'Home', reset: 'Reset card',
      noStamp: 'Stamp not collected', stampAdded: 'New stamp added!', alreadyOwned: 'You already have this stamp.', invalidStamp: 'This stamp link is not valid. Please ask a staff member.',
      backToCard: 'Back to card', description: 'About', funFact: 'Fun fact', completeTitle: 'All six stamps collected!', completeIntro: 'Add a handwritten note, signature, or small drawing.',
      handwriting: 'Handwriting area', undo: 'Undo', clear: 'Clear', redoWriting: 'Write again', save: 'Save', message: 'Keyboard message (optional)', messageHint: 'Up to 100 characters',
      preview: 'Completed card', download: 'Download PNG', share: 'Share', openImage: 'Open image to save', staff: 'Staff mode', qrAdmin: 'QR code manager',
      confirmClear: 'Clear the handwriting?', confirmEdit: 'Replace the saved handwriting or keyboard message?', confirmReset1: 'Reset this entire card?', confirmReset2: 'This removes all stamps and messages. Continue?',
      storageWarning: 'Progress could not be saved in this browser. Keep this page open and ask staff for help.', imageError: 'An activity image is missing. Staff can replace the configured file.', exportError: 'The completed image could not be created. Please try again or ask staff.',
      privacy: 'Use the same browser, avoid private browsing, and do not clear browser data. Progress does not move automatically to another phone.',
      staffPin: 'Staff PIN', enter: 'Enter', exitStaff: 'Return to participant view', add: 'Add', remove: 'Remove', exportData: 'Export progress', importData: 'Import progress', clearMessages: 'Clear messages',
      qrIntro: 'These station links contain access tokens. Print one QR code for each station.', copy: 'Copy link', qrDownload: 'Download QR', print: 'Print', copied: 'Link copied.', notComplete: 'Collect all six stamps before opening the completed card.', cancel: 'Cancel', confirm: 'Confirm', close: 'Close', language: 'Language', useInstructions: 'Scan each station QR code with this same browser. Collect all six stamps, then add a message and save your card.',
      heroAlt: 'Activity visual placeholder', logoAlt: 'Activity logo placeholder', completionAlt: 'Completion decoration placeholder', cardAria: 'Electronic stamp card', handwritingAlt: 'Saved handwriting', qrAria: 'QR code for',
      staffSecurity: 'This PIN is only a local safeguard. It is not secure server authentication.',
      wrongPin: 'The staff PIN is not correct.', importError: 'This progress file is not valid. Please choose a file exported by this activity.', saved: 'Saved.', longPressSave: 'On iPhone, touch and hold the image, then save it to Photos.',
      scanQr: 'Scan QR code', scanTitle: 'Scan a station QR code', scanHelp: 'Point the camera at the QR code shown at an animal station.', stopScan: 'Stop camera', cameraError: 'The camera could not be opened. Allow camera access, or scan the station code with your phone camera.', scanInvalid: 'This is not a valid activity QR code.',
    },
    ja: {
      start: 'スタート', nickname: 'ニックネーム', nicknameHint: '必須・20文字以内', chooseCard: 'カードを選ぶ',
      intro: '台湾の6種類の動物に出会い、各ステーションのQRコードを読み取って、このスマートフォンにスタンプを集めましょう。',
      progress: '進み具合', animals: '動物ガイド', editNickname: 'ニックネームを変更', instructions: '遊び方', home: 'ホーム', reset: 'カードをリセット',
      noStamp: '未取得のスタンプ', stampAdded: '新しいスタンプを獲得しました！', alreadyOwned: 'このスタンプは取得済みです。', invalidStamp: 'このスタンプのリンクは無効です。スタッフにお尋ねください。',
      backToCard: 'カードに戻る', description: '紹介', funFact: '豆知識', completeTitle: '6個のスタンプがそろいました！', completeIntro: '手書きメッセージ、サイン、または簡単な絵を追加してください。',
      handwriting: '手書きエリア', undo: '元に戻す', clear: '消去', redoWriting: '書き直す', save: '保存', message: 'キーボードメッセージ（任意）', messageHint: '100文字以内',
      preview: '完成したカード', download: 'PNGをダウンロード', share: '共有', openImage: '画像を開いて保存', staff: 'スタッフモード', qrAdmin: 'QRコード管理',
      confirmClear: '手書きを消去しますか？', confirmEdit: '保存済みの手書きまたはメッセージを書き換えますか？', confirmReset1: 'カード全体をリセットしますか？', confirmReset2: 'すべてのスタンプとメッセージが削除されます。続けますか？',
      storageWarning: 'このブラウザに進み具合を保存できませんでした。ページを閉じずにスタッフへお尋ねください。', imageError: 'イベント画像が見つかりません。スタッフが設定ファイルを交換できます。', exportError: '完成画像を作成できませんでした。もう一度試すか、スタッフにお尋ねください。',
      privacy: '同じブラウザを使用し、プライベートブラウズやブラウザデータの消去は避けてください。別のスマートフォンへ自動移行はされません。',
      staffPin: 'スタッフPIN', enter: '入る', exitStaff: '参加者画面に戻る', add: '追加', remove: '削除', exportData: '進み具合を書き出す', importData: '進み具合を読み込む', clearMessages: 'メッセージを消去',
      qrIntro: '各ステーションのリンクにはアクセストークンが含まれています。ステーションごとにQRコードを1枚印刷してください。', copy: 'リンクをコピー', qrDownload: 'QRをダウンロード', print: '印刷', copied: 'リンクをコピーしました。', notComplete: '完成カードを開くには、6個すべてのスタンプを集めてください。', cancel: 'キャンセル', confirm: '確認', close: '閉じる', language: '言語', useInstructions: '同じブラウザで各ステーションのQRコードを読み取ります。6個集めたらメッセージを追加してカードを保存してください。',
      heroAlt: 'イベントメイン画像のプレースホルダー', logoAlt: 'イベントロゴのプレースホルダー', completionAlt: '完成画面装飾のプレースホルダー', cardAria: '電子スタンプカード', handwritingAlt: '保存済みの手書き', qrAria: 'QRコード：',
      staffSecurity: 'このPINは端末上の簡易的な誤操作防止です。安全なサーバー認証ではありません。', wrongPin: 'スタッフPINが正しくありません。', importError: 'この進み具合ファイルは無効です。このイベントから書き出したファイルを選んでください。', saved: '保存しました。', longPressSave: 'iPhoneでは画像を長押しして「写真に保存」を選んでください。',
      scanQr: 'QRコードを読み取る', scanTitle: 'ステーションのQRコードを読み取る', scanHelp: 'カメラを動物ステーションのQRコードに向けてください。', stopScan: 'カメラを停止', cameraError: 'カメラを開けませんでした。カメラへのアクセスを許可するか、スマートフォンのカメラでステーションのコードを読み取ってください。', scanInvalid: 'このイベントの有効なQRコードではありません。',
    },
    'zh-TW': {
      start: '開始', nickname: '暱稱', nicknameHint: '必填，最多20個字元', chooseCard: '選擇集章卡',
      intro: '認識六種台灣動物。掃描各站 QR Code，在這支手機上收集所有印章。',
      progress: '目前進度', animals: '動物介紹', editNickname: '修改暱稱', instructions: '使用說明', home: '首頁', reset: '重置集章卡',
      noStamp: '尚未取得印章', stampAdded: '取得新印章！', alreadyOwned: '你已經有這個印章了。', invalidStamp: '這個集章連結無效，請洽詢工作人員。',
      backToCard: '返回集章卡', description: '動物介紹', funFact: '有趣知識', completeTitle: '六個印章都收集完成！', completeIntro: '請加入手寫留言、簽名或簡單圖案。',
      handwriting: '手寫留言區', undo: '復原', clear: '清除', redoWriting: '重新書寫', save: '儲存', message: '鍵盤文字留言（選填）', messageHint: '最多100個字元',
      preview: '完成卡片', download: '下載 PNG', share: '分享', openImage: '開啟圖片後儲存', staff: '工作人員模式', qrAdmin: 'QR Code 管理',
      confirmClear: '確定要清除手寫內容嗎？', confirmEdit: '確定要取代已儲存的手寫或文字留言嗎？', confirmReset1: '確定要重置整張集章卡嗎？', confirmReset2: '這會移除所有印章與留言，確定繼續嗎？',
      storageWarning: '這個瀏覽器無法保存進度。請保持頁面開啟並洽詢工作人員。', imageError: '活動圖片載入失敗，工作人員可以更換設定的檔案。', exportError: '無法產生完成圖片，請重試或洽詢工作人員。',
      privacy: '請使用同一個瀏覽器、避免無痕模式，也不要清除瀏覽器資料。進度不會自動轉移到另一支手機。',
      staffPin: '工作人員 PIN', enter: '進入', exitStaff: '返回參加者畫面', add: '補發', remove: '移除', exportData: '匯出進度', importData: '匯入進度', clearMessages: '清除留言',
      qrIntro: '各站連結包含存取 token。請為每一站分別列印一張 QR Code。', copy: '複製連結', qrDownload: '下載 QR Code', print: '列印', copied: '連結已複製。', notComplete: '請先收集六個印章，再開啟完成卡片。', cancel: '取消', confirm: '確認', close: '關閉', language: '語言', useInstructions: '請用同一個瀏覽器掃描每一站的 QR Code。收集六個印章後，加入留言並儲存卡片。',
      heroAlt: '活動主視覺 placeholder', logoAlt: '活動 Logo placeholder', completionAlt: '完成頁裝飾 placeholder', cardAria: '電子集章卡', handwritingAlt: '已儲存的手寫內容', qrAria: 'QR Code：',
      staffSecurity: '這組 PIN 只是裝置上的簡易防誤觸，不是真正安全的伺服器驗證。', wrongPin: '工作人員 PIN 不正確。', importError: '這個進度檔案無效，請選擇由本活動匯出的檔案。', saved: '已儲存。', longPressSave: 'iPhone 請長按圖片，再選擇儲存到照片。',
      scanQr: '掃描 QR Code', scanTitle: '掃描集章站 QR Code', scanHelp: '請將相機對準動物集章站所展示的 QR Code。', stopScan: '停止相機', cameraError: '無法開啟相機。請允許相機權限，或改用手機內建相機掃描集章站 QR Code。', scanInvalid: '這不是有效的活動 QR Code。',
    },
  },
};

// Missing translation keys safely fall back to English.
export function textFor(language, key) {
  return eventConfig.text[language]?.[key] || eventConfig.text.en[key] || key;
}

export function animalName(animal, language) {
  return language === 'ja' ? animal.nameJa : language === 'zh-TW' ? animal.nameZh : animal.nameEn;
}
