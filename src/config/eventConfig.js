/**
 * EVENT CONTENT AND LAYOUT SETTINGS
 * All user-facing text, file paths, tokens, and card coordinates live here.
 * Coordinates are percentages of the card image (0–100), so they scale on phones.
 * Replace placeholder files in public/assets or change only the paths below.
 */
export const eventConfig = {
  event: {
    name: 'Taiwan Wildlife Passport',
    subtitle: 'International Cultural Exchange Activity',
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
    { id: 'card-01', name: { en: 'Card 1', ja: 'カード 1', 'zh-TW': '集章卡 1' }, image: 'assets/placeholders/card-placeholder.svg', alt: 'Placeholder electronic stamp card background' },
  ],
  output: { width: 1800, height: 2400, filePrefix: 'wildlife-passport' },
  placements: {
    nickname: { x: 50, y: 12, maxWidth: 72, fontSize: 3.6, color: '#173f35', align: 'center', fontWeight: '700' },
    handwriting: { x: 12, y: 70, width: 76, height: 16 },
    message: { x: 50, y: 89, maxWidth: 76, fontSize: 2.5, color: '#173f35', align: 'center', fontWeight: '500' },
    eventName: { x: 50, y: 5.5, maxWidth: 86, fontSize: 3, color: '#173f35', align: 'center', fontWeight: '700' },
    date: { x: 50, y: 95, maxWidth: 70, fontSize: 2, color: '#365d54', align: 'center', fontWeight: '400' },
  },
  stampAnimation: { enabled: true, durationMs: 650 },
  sound: { enabled: false, path: 'assets/sounds/stamp.mp3' },
  staff: { enabled: true, pin: '2468', queryKey: 'staff' },
  animals: Array.from({ length: 6 }, (_, index) => {
    const n = index + 1;
    const id = `animal${String(n).padStart(2, '0')}`;
    const positions = [
      [28, 29], [72, 29], [28, 48], [72, 48], [28, 64], [72, 64],
    ];
    return {
      id,
      token: [
        'f9K2mQ7vT4xP8cR3', 'a6N8wD2zL9jS5eH7', 'u3B7pX9kC2gM6rV8',
        'q8E4tY6nF2sJ9dW3', 'h5R9cA3vK7mZ2pL6', 'x2G6bT8qN4wD7sF9',
      ][index],
      nameZh: `Animal ${n}`,
      nameEn: `Animal ${n}`,
      nameJa: `Animal ${n}`,
      scientificName: 'Scientific name placeholder',
      description: { en: 'Placeholder description', ja: 'Placeholder description', 'zh-TW': 'Placeholder description' },
      funFact: { en: 'Placeholder fun fact', ja: 'Placeholder fun fact', 'zh-TW': 'Placeholder fun fact' },
      animalImage: `assets/placeholders/placeholder-animal-${String(n).padStart(2, '0')}.svg`,
      stampImage: `assets/placeholders/placeholder-stamp-${String(n).padStart(2, '0')}.svg`,
      stampX: positions[index][0], stampY: positions[index][1],
      stampWidth: 30, stampHeight: 15, stampRotation: index % 2 ? 5 : -5,
      stampZIndex: n, stampOpacity: 0.9,
      altText: `Placeholder image for Animal ${n}`,
    };
  }),
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
    },
    ja: {},
    'zh-TW': {},
  },
};

// Until translations are supplied, missing Japanese and Traditional Chinese strings
// deliberately fall back to the simple English copy above.
export function textFor(language, key) {
  return eventConfig.text[language]?.[key] || eventConfig.text.en[key] || key;
}

export function animalName(animal, language) {
  return language === 'ja' ? animal.nameJa : language === 'zh-TW' ? animal.nameZh : animal.nameEn;
}
