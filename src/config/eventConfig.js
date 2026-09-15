/**
 * EVENT CONTENT AND LAYOUT SETTINGS
 * Coordinates are percentages of the supplied card image (0–100).
 * Public work content is supplied and approved by the organiser.
 */
const works = [
  {
    nameZh: '百香果殼碳環保貓砂', nameEn: 'Passion Fruit Shell Biochar Cat Litter', nameJa: 'パッションフルーツ果皮炭のエコ猫砂',
    description: {
      'zh-TW': '將埔里盛產的百香果果殼轉化為環保貓砂！本作品以百香果殼製成生物炭，利用其吸附特性，結合木薯粉、玉米澱粉、黃豆渣與瓜爾膠等低成本材料製成果殼炭貓砂，讓原本可能被丟棄的農業廢棄物，轉化為具有生活應用價值的環保產品。',
      en: 'This project transforms discarded passion fruit shells from Puli into eco-friendly cat litter. The shells are converted into biochar and combined with low-cost materials such as tapioca flour, corn starch, soybean residue, and guar gum. By turning agricultural waste into a practical product, the project explores new possibilities for local resources and promotes responsible consumption and production.',
      ja: '埔里（プーリー）のパッションフルーツの果皮を再利用し、環境にやさしい猫砂を開発しました。果皮をバイオ炭に加工し、その吸着性を活かして、タピオカ粉、コーンスターチ、大豆かす、グアーガムなどの低コスト素材と組み合わせています。農業廃棄物を実用的な製品へと生まれ変わらせ、地域資源の新たな可能性を提案します。',
    },
    altText: '以埔里百香果果殼製成生物炭，再結合天然及低成本材料製作的環保貓砂作品。',
    images: ['work-01-passion-fruit-cat-litter.png'],
  },
  {
    nameZh: '剩食再生米餐具', nameEn: 'Upcycled Rice Tableware', nameJa: '食品ロスを活用した米製食器',
    description: {
      'zh-TW': '本作品以「剩食結合創意」為發想，將學校團膳剩餘且未受油污污染的白飯重新利用。白飯分別製成米泥與乾燥研磨後的米粉，經多次實驗找出約 1：2 的適合比例，使乾燥後的成品具有較佳硬度，再於表面薄塗可食用蜂蠟，改善遇水受潮與掉渣問題。',
      en: 'Inspired by the idea of combining food waste with creativity, this project transforms leftover uncontaminated rice from school meals into biodegradable tableware. Rice paste and dried rice powder are mixed at an experimentally determined ratio of approximately 2:1. A thin coating of edible beeswax is then applied to improve water resistance and reduce crumbling, giving leftover food a new and practical purpose.',
      ja: '学校給食で余った、油などで汚れていない白米を再利用し、分解可能な食器を製作しました。米をペースト状と乾燥粉末状に加工し、実験を重ねて適切な配合を検討しました。さらに表面に食用ミツロウを薄く塗ることで耐水性を高め、食品ロスと使い捨てプラスチックの削減を目指しています。',
    },
    altText: '學校團膳剩餘白飯經製成米泥與米粉後重新塑形，並以食用蜂蠟改善防水性的米製餐具。',
    images: ['work-02-upcycled-rice-tableware.png'],
  },
  {
    nameZh: '香菇太空包再生育苗盆', nameEn: 'Biodegradable Seedling Pot from Mushroom Substrate Waste', nameJa: '廃菌床を再利用した生分解性育苗ポット',
    description: {
      'zh-TW': '本作品以廢棄香菇太空包中的木屑為主要材料，結合澱粉、明膠等天然材料，製作生物可分解育苗盆。將原本需要處理的農業廢棄物重新利用，取代部分傳統塑膠育苗盆。育苗完成後可直接連盆定植，減少脫盆過程對植物根系造成的傷害，並讓育苗盆在自然環境中逐漸分解。',
      en: 'This project transforms discarded sawdust from used mushroom growing bags into biodegradable seedling pots. By combining the recovered sawdust with natural materials such as starch and gelatin, the project creates an alternative to conventional plastic pots. Seedlings can be transplanted together with the pot, reducing root disturbance while allowing the container to gradually decompose in the environment.',
      ja: '使用済みのキノコ栽培バッグに含まれるおがくずを主原料とし、デンプンやゼラチンなどの天然素材と組み合わせて、生分解性の育苗ポットを製作しました。苗をポットごと植え付けることで根へのダメージを減らし、ポットは自然環境の中で徐々に分解されます。',
    },
    altText: '廢棄香菇太空包木屑結合天然材料製成的生物可分解育苗盆，可讓植物連盆直接定植。',
    images: ['work-03-mushroom-seedling-pot.png'],
  },
  {
    nameZh: 'Formoya 福萌芽', nameEn: 'Formoya', nameJa: 'Formoya 福萌芽',
    description: {
      'zh-TW': '傳統生產履歷多以文字與表格呈現，不僅資訊閱讀門檻較高，也缺乏互動性。「Formoya 福萌芽」將農業生產資料轉化為視覺化、可追溯且具互動性的資訊，打造更直觀、有趣且容易操作的智慧農業平台，提升種植者的紀錄意願，也幫助消費者了解作物來源與生產過程。',
      en: 'Traditional agricultural traceability records often rely heavily on text and tables, making them difficult to understand and lacking in interactivity. Formoya transforms production records into visual, traceable, and interactive information. By integrating QR codes, agricultural knowledge, and gamification, the platform encourages growers to record production data while helping consumers better understand where their food comes from and how it is produced.',
      ja: '従来の農業生産履歴は文字や表が中心で、消費者にとって分かりにくく、インタラクティブ性にも欠けていました。「Formoya 福萌芽」は、生産データを視覚的で追跡可能な情報へと変換するスマート農業プラットフォームです。QRコード、農業知識、ゲーム要素を組み合わせ、生産者と消費者をより分かりやすくつなぎます。',
    },
    altText: '農業生產履歷智慧平台 Formoya 福萌芽，透過視覺化資訊、QR Code 與互動機制呈現農產品的來源與生產過程。',
    images: ['work-04-formoya.png'],
  },
  {
    nameZh: '磁吸式智慧電路教具', nameEn: 'Magnetic Modular Circuit Learning Kit', nameJa: 'マグネット式モジュール回路教材',
    description: {
      'zh-TW': '本作品將傳統需要逐一接線的感測器與電子元件進行模組化設計，並導入磁吸式連結。使用者只需完成一次基本接線，後續即可直接透過磁吸方式快速更換與組合模組，大幅簡化電路操作流程。作品搭配溫室情境，讓學生不只學習電路，更能培養跨領域思辨與問題解決能力。',
      en: 'This project simplifies circuit learning by packaging sensors and electronic components into modular units connected magnetically. After the initial wiring is completed, users can quickly attach or replace modules without repeatedly reconnecting individual components. Combined with a greenhouse learning scenario, the kit helps students explore circuits, sensors, programming, and interdisciplinary problem-solving through hands-on experimentation.',
      ja: 'センサーや電子部品をモジュール化し、マグネットで簡単に接続できるようにした回路学習教材です。基本的な配線を一度行えば、その後はモジュールを磁力で取り付けるだけで回路を構成できます。温室を活用した学習環境と組み合わせ、回路だけでなく、プログラミングや農業などを含む分野横断的な学びを目指します。',
    },
    altText: '感測器等元件可透過磁吸方式快速拆裝的模組化電路教具，並搭配溫室模型進行跨領域學習。',
    images: ['work-05-magnetic-circuit-kit-01.png', 'work-05-magnetic-circuit-kit-02.png'],
  },
  {
    nameZh: '茭白筍殼環保複合材料', nameEn: 'Water Bamboo Husk Eco-Composite Material', nameJa: 'マコモタケの皮を活用した環境配慮型複合材料',
    description: {
      'zh-TW': '本作品將在地農業廢棄的茭白筍殼粉末化後與紙漿結合，並以天然糯米膠及小蘇打進行材料改質，製成兼具強度與輕量化特色的環保複合材料。材料可進一步製成杯墊、象棋、穴盆與吊飾等實用或文創產品，探索農業剩餘資材循環利用與自然分解的可能性。',
      en: 'This project transforms discarded water bamboo husks into a lightweight eco-composite material. The husks are ground into powder, combined with paper pulp, and modified using natural glutinous rice adhesive and baking soda. The resulting material can be made into practical and creative products such as coasters, Chinese chess pieces, seedling trays, and accessories, demonstrating new possibilities for agricultural waste.',
      ja: '農業廃棄物であるマコモタケの皮を粉末化して紙パルプと混ぜ、天然のもち米糊と重曹を加えて改質した、軽量で強度のある環境配慮型複合材料です。コースター、中国将棋の駒、育苗トレー、アクセサリーなどに加工し、農業廃棄物の新たな活用方法を提案します。',
    },
    altText: '茭白筍殼粉末與紙漿結合製成的環保複合材料，以及以此材料製作的杯墊、象棋、穴盆與吊飾等成品。',
    images: ['work-06-water-bamboo-composite.png'],
  },
  {
    nameZh: '智慧物聯網保險箱', nameEn: 'IoT Smart Safe', nameJa: 'IoTスマート金庫',
    description: {
      'zh-TW': '本作品是一款結合安全性與手機端操作的智慧保險箱系統，針對傳統保險箱密碼輸入較繁瑣及忘記密碼等使用問題進行改善。系統以 ESP32 為控制核心並結合物聯網技術，完成身分驗證後，即可控制電磁鐵伸縮桿進行自動解鎖與上鎖，並採低成本模組化設計，提升維修便利性。',
      en: 'This project is a smart safe system that combines security with mobile control. Powered by an ESP32 and IoT technology, the system controls an electromagnetic locking mechanism to automatically lock or unlock the safe after user authentication. Its low-cost modular design emphasizes stability and ease of maintenance, with potential applications in homes, accommodations, and shared storage spaces.',
      ja: '安全性とスマートフォン操作を組み合わせたスマート金庫システムです。ESP32を制御コアとしてIoT技術を活用し、ユーザー認証後に電磁式ロック機構を制御して、自動的に施錠・解錠します。低コストのモジュール設計により、安定性とメンテナンス性を両立し、家庭、宿泊施設、共有収納スペースなどへの応用を想定しています。',
    },
    altText: 'ESP32 與物聯網技術製作的智慧保險箱，可透過身分驗證控制電磁鐵伸縮桿自動上鎖與解鎖。',
    images: ['work-07-iot-smart-safe.png'],
  },
];

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
    backToCard: 'Back to card', description: 'About this work', completeTitle: '{stampCount} stamps collected — ready for the final station!', completeIntro: 'Add a handwritten note, signature, drawing, or keyboard message.',
    handwriting: 'Handwriting and drawing area', undo: 'Undo', clear: 'Clear', redoWriting: 'Write again', save: 'Save', message: 'Keyboard message (optional)', messageHint: 'Up to 100 characters',
    preview: 'Completed card', download: 'Download PNG', share: 'Share', openImage: 'Open image to save',
    confirmClear: 'Clear the handwriting?', confirmEdit: 'Replace the saved handwriting or keyboard message?', confirmReset1: 'Reset this entire card?', confirmReset2: 'This removes all stamps and messages. Continue?',
    storageWarning: 'Progress could not be saved in this browser. Keep this page open and ask staff for help.', imageError: 'An activity image is missing. Staff can replace the configured file.', exportError: 'The completed image could not be created. Please try again or ask staff.',
    privacy: 'Use the same browser, avoid private browsing, and do not clear browser data. Progress does not move automatically to another phone.',
    notComplete: 'Collect at least {minimum} stamps before opening the completed card.', cancel: 'Cancel', confirm: 'Confirm', close: 'Close', language: 'Language', useInstructions: 'Scan each station QR code with this same browser. Collect at least {minimum} of {count} stamps, then finish and send your card to the final-station server.',
    heroAlt: '2026 TIE point card', logoAlt: 'National Chi Nan University and affiliated school logos', cardAria: 'Electronic stamp card', handwritingAlt: 'Saved handwriting',
    saved: 'Saved.', longPressSave: 'On iPhone, touch and hold the image, then save it to Photos.',
    scanQr: 'Scan QR code', scanTitle: 'Scan a station QR code', scanHelp: 'Point the camera at a station QR code.', stopScan: 'Stop camera', cameraError: 'The camera could not be opened. Allow camera access, or scan the station code with your phone camera.', scanInvalid: 'This is not a valid activity QR code.',
    submitToServer: 'Send to the final-station server', submitHint: 'After collecting at least {minimum} stamps, send this card to the final-station server for printing and prize redemption.', submitting: 'Sending…', submissionSuccess: 'Card sent successfully', redemptionCode: 'Redemption code', submissionUpdated: 'The pending card on the final-station server has been updated.', submissionUpdateNeeded: 'You now have {stampCount} stamps. Update the pending card on the final-station server.', submitAgain: 'Update submitted card', submitError: 'Could not send the card. Please try again.', submitError400: 'The submitted information is invalid. Please check the name and try again.', submitError409: 'This card conflicts with an earlier submission. Please ask staff for help.', submitError413: 'The card image is too large. Please try again.', submitError415: 'The image format is not supported. Please try again.', submitError422: 'The card could not be accepted. Please ask staff for help.', submitError429: 'Too many submissions right now. Wait a moment and try again.', submitError503: 'The final station is busy. Wait a moment and try again.', submitErrorNetwork: 'Could not connect to the final station. Check the network and try again.', imageTooLarge: 'The completed image is larger than 6 MiB.', showCodeHint: 'Show this code to staff at the final station. Keep this page open.',
  },
  ja: {
    start: 'スタート', nickname: '名前', nicknameHint: '必須・20文字以内', chooseCard: 'カードを選ぶ',
    intro: 'このスマートフォンでQRコードを読み取り、{count}個中{minimum}個以上集めてゴールへ進みましょう。',
    progress: '進み具合', animals: '作品紹介', editNickname: '名前を変更', instructions: '遊び方', home: 'ホーム', reset: 'カードをリセット',
    noStamp: '未取得のスタンプ', stampAdded: '新しいスタンプを獲得しました！', alreadyOwned: 'このスタンプは取得済みです。', invalidStamp: 'このスタンプのリンクは無効です。スタッフにお尋ねください。',
    backToCard: 'カードに戻る', description: '作品紹介', completeTitle: '{stampCount}個のスタンプを集めました。ゴールへ進めます！', completeIntro: '手書きメッセージ、サイン、絵、またはキーボード入力を追加してください。',
    handwriting: '手書き・描画エリア', undo: '元に戻す', clear: '消去', redoWriting: '書き直す', save: '保存', message: 'キーボードメッセージ（任意）', messageHint: '100文字以内',
    preview: '完成したカード', download: 'PNGをダウンロード', share: '共有', openImage: '画像を開いて保存',
    confirmClear: '手書きを消去しますか？', confirmEdit: '保存済みの手書きまたはメッセージを書き換えますか？', confirmReset1: 'カード全体をリセットしますか？', confirmReset2: 'すべてのスタンプとメッセージが削除されます。続けますか？',
    storageWarning: 'このブラウザに進み具合を保存できませんでした。ページを閉じずにスタッフへお尋ねください。', imageError: 'イベント画像が見つかりません。スタッフが設定ファイルを交換できます。', exportError: '完成画像を作成できませんでした。もう一度試すか、スタッフにお尋ねください。',
    privacy: '同じブラウザを使用し、プライベートブラウズやブラウザデータの消去は避けてください。別のスマートフォンへ自動移行はされません。',
    notComplete: '完成カードを開くには、{minimum}個以上のスタンプを集めてください。', cancel: 'キャンセル', confirm: '確認', close: '閉じる', language: '言語', useInstructions: '同じブラウザで各ステーションのQRコードを読み取ります。{count}個中{minimum}個以上集めたらカードを完成させ、ゴールのサーバーへ送信してください。',
    heroAlt: '2026 TIEポイントカード', logoAlt: '国立暨南国際大学と附属学校のロゴ', cardAria: '電子スタンプカード', handwritingAlt: '保存済みの手書き',
    saved: '保存しました。', longPressSave: 'iPhoneでは画像を長押しして「写真に保存」を選んでください。',
    scanQr: 'QRコードを読み取る', scanTitle: 'ステーションのQRコードを読み取る', scanHelp: 'カメラをステーションのQRコードに向けてください。', stopScan: 'カメラを停止', cameraError: 'カメラを開けませんでした。カメラへのアクセスを許可するか、スマートフォンのカメラでステーションのコードを読み取ってください。', scanInvalid: 'このイベントの有効なQRコードではありません。',
    submitToServer: 'ゴールのサーバーへ送信', submitHint: '{minimum}個以上集めたら、印刷と景品交換のためカードをゴールのサーバーへ送信してください。', submitting: '送信中…', submissionSuccess: 'カードを送信しました', redemptionCode: '引換コード', submissionUpdated: 'ゴールのサーバーで待機中のカードを更新しました。', submissionUpdateNeeded: 'スタンプが{stampCount}個になりました。ゴールのサーバーで待機中のカードを更新してください。', submitAgain: '送信済みカードを更新', submitError: 'カードを送信できませんでした。もう一度お試しください。', submitError400: '送信内容が正しくありません。名前を確認して再試行してください。', submitError409: '以前の送信と競合しています。スタッフにお尋ねください。', submitError413: 'カード画像が大きすぎます。もう一度お試しください。', submitError415: 'この画像形式は使用できません。もう一度お試しください。', submitError422: 'カードを受け付けられませんでした。スタッフにお尋ねください。', submitError429: '送信が混み合っています。少し待ってから再試行してください。', submitError503: 'ゴールが混み合っています。少し待ってから再試行してください。', submitErrorNetwork: 'ゴールに接続できません。通信状態を確認して再試行してください。', imageTooLarge: '完成画像が6 MiBを超えています。', showCodeHint: 'ゴールのスタッフにこのコードを見せてください。この画面を閉じないでください。',
  },
  'zh-TW': {
    start: '開始', nickname: '姓名', nicknameHint: '必填，最多20個字元', chooseCard: '選擇集點卡',
    intro: '用這支手機掃描站點 QR Code；{count} 個印章中收集至少 {minimum} 個，即可前往總關。',
    progress: '目前進度', animals: '作品介紹', editNickname: '修改姓名', instructions: '使用說明', home: '首頁', reset: '重置集點卡',
    noStamp: '尚未取得印章', stampAdded: '取得新印章！', alreadyOwned: '你已經有這個印章了。', invalidStamp: '這個集章連結無效，請洽詢工作人員。',
    backToCard: '返回集點卡', description: '作品介紹', completeTitle: '已收集 {stampCount} 個印章，可以前往總關！', completeIntro: '請加入手寫留言、簽名、圖案或鍵盤文字。',
    handwriting: '手寫／繪圖區', undo: '復原', clear: '清除', redoWriting: '重新書寫', save: '儲存', message: '鍵盤文字（選填）', messageHint: '最多100個字元',
    preview: '完成卡片', download: '下載 PNG', share: '分享', openImage: '開啟圖片後儲存',
    confirmClear: '確定要清除手寫內容嗎？', confirmEdit: '確定要取代已儲存的手寫或文字嗎？', confirmReset1: '確定要重置整張集點卡嗎？', confirmReset2: '這會移除所有印章與留言，確定繼續嗎？',
    storageWarning: '這個瀏覽器無法保存進度。請保持頁面開啟並洽詢工作人員。', imageError: '活動圖片載入失敗，工作人員可以更換設定的檔案。', exportError: '無法產生完成圖片，請重試或洽詢工作人員。',
    privacy: '請使用同一個瀏覽器、避免無痕模式，也不要清除瀏覽器資料。進度不會自動轉移到另一支手機。',
    notComplete: '請先收集至少 {minimum} 個印章，再開啟完成卡片。', cancel: '取消', confirm: '確認', close: '關閉', language: '語言', useInstructions: '請用同一個瀏覽器掃描每一站的 QR Code。收集 {count} 個印章中的至少 {minimum} 個後，完成卡片並送到總關 Server。',
    heroAlt: '2026 TIE 集點卡', logoAlt: '國立暨南國際大學與附屬學校標誌', cardAria: '電子集點卡', handwritingAlt: '已儲存的手寫內容',
    saved: '已儲存。', longPressSave: 'iPhone 請長按圖片，再選擇儲存到照片。',
    scanQr: '掃描 QR Code', scanTitle: '掃描站點 QR Code', scanHelp: '請將相機對準站點 QR Code。', stopScan: '停止相機', cameraError: '無法開啟相機。請允許相機權限，或使用手機相機掃描站點 QR Code。', scanInvalid: '這不是有效的活動 QR Code。',
    submitToServer: '送到總關 Server', submitHint: '收集至少 {minimum} 個印章後，將明信片送到總關 Server，由工作人員列印並兌換獎品。', submitting: '傳送中…', submissionSuccess: '明信片已成功送出', redemptionCode: '兌換碼', submissionUpdated: '已更新總關 Server 等待中的明信片。', submissionUpdateNeeded: '你現在有 {stampCount} 個印章，請更新總關 Server 等待中的明信片。', submitAgain: '更新已送出的明信片', submitError: '明信片送出失敗，請再試一次。', submitError400: '投稿資料格式有誤，請確認姓名後重試。', submitError409: '這張卡片與先前投稿衝突，請洽工作人員。', submitError413: '明信片圖片太大，請再試一次。', submitError415: '圖片格式不支援，請再試一次。', submitError422: '伺服器無法接受這張明信片，請洽工作人員。', submitError429: '目前送出人數較多，請稍候再試。', submitError503: '總關目前忙碌，請稍候再試。', submitErrorNetwork: '無法連線總關，請確認網路後再試。', imageTooLarge: '完成圖片超過 6 MiB。', showCodeHint: '請在總關向工作人員出示此兌換碼，並先不要關閉本頁。',
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
    date: 'YYYY-MM-DD', defaultLanguage: 'zh-TW', languages: ['en', 'ja', 'zh-TW'],
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
  // IDs 01–06 stay stable so existing browser data is not silently discarded.
  // Public work content and image mapping were supplied by the organiser.
  animals: stampSources.map((filename, index) => ({
    id: `animal0${index + 1}`, token: stationTokens[index],
    ...works[index], scientificName: '',
    animalImage: `assets/event/2026-tie/works/${works[index].images[0]}`,
    animalImages: works[index].images.map((image) => `assets/event/2026-tie/works/${image}`),
    stampImage: `assets/event/2026-tie/${filename}`,
    ...stampPlacements[index], stampWidth: 9.2, stampHeight: 12.9, stampRotation: 14.9,
    stampZIndex: index + 1, stampOpacity: 1,
  })),
  text,
};

export function textFor(language, key) {
  return eventConfig.text[language]?.[key] || eventConfig.text.en[key] || key;
}

export function animalName(animal, language) {
  return language === 'ja' ? animal.nameJa : language === 'zh-TW' ? animal.nameZh : animal.nameEn;
}

export function workImagePaths(animal) {
  return animal.animalImages?.length ? animal.animalImages : [animal.animalImage];
}
