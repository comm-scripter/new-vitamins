// ── Stub vitamins (lorem ipsum placeholders for new topics) ──
const _sv = [
  ['"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."',         'Lorem 1:1'],
  ['"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."',      'Ipsum 2:3'],
  ['"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat."',  'Dolor 4:5'],
  ['"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt."',      'Amet 6:7'],
  ['"Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit consequatur."',  'Consectetur 8:9'],
  ['"Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae."','Adipiscing 10:11'],
  ['"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci."',     'Elit 12:1'],
];
const stubs = _sv.map(([verse, ref], day) => ({ day, verse, ref, author: null }));

// ── Category groups (4 faces of the drum sidebar) ────────────
export const CATEGORY_GROUPS = [
  { id: 'g0', label: 'Faith & Spirit',       color: ['#a855f7', '#ec4899'],
    categoryIds: ['faith','hope','love','prayer','trust','grace','redemption','surrender','worship','scripture','salvation','eternity'] },
  { id: 'g1', label: 'Heart & Soul',         color: ['#60a5fa', '#34d399'],
    categoryIds: ['anxiety','grief','gratitude','joy','peace','healing','forgiveness','patience','humility','compassion','courage','identity'] },
  { id: 'g2', label: 'Character & Virtue',   color: ['#10b981', '#0ea5e9'],
    categoryIds: ['strength','wisdom','integrity','perseverance','discipline','generosity','kindness','service','leadership','stewardship','purpose','excellence'] },
  { id: 'g3', label: 'Life & Relationships', color: ['#fbbf24', '#f97316'],
    categoryIds: ['family','friendship','marriage','community','work','rest','health','finances','adversity','change','loneliness','legacy'] },
];

// ── All 48 categories ─────────────────────────────────────────
export const CATEGORIES = [
  // Group 0 — Faith & Spirit
  { id: 'faith',        label: 'Faith',        color: ['#a855f7','#ec4899'], emoji: '✨' },
  { id: 'hope',         label: 'Hope',         color: ['#60a5fa','#34d399'], emoji: '🌅' },
  { id: 'love',         label: 'Love',         color: ['#f472b6','#fb923c'], emoji: '❤️' },
  { id: 'prayer',       label: 'Prayer',       color: ['#c084fc','#818cf8'], emoji: '🙏' },
  { id: 'trust',        label: 'Trust',        color: ['#34d399','#06b6d4'], emoji: '💎' },
  { id: 'grace',        label: 'Grace',        color: ['#f9a8d4','#c084fc'], emoji: '🌷' },
  { id: 'redemption',   label: 'Redemption',   color: ['#fbbf24','#a855f7'], emoji: '💫' },
  { id: 'surrender',    label: 'Surrender',    color: ['#6ee7b7','#3b82f6'], emoji: '🌿' },
  { id: 'worship',      label: 'Worship',      color: ['#f472b6','#a855f7'], emoji: '🎵' },
  { id: 'scripture',    label: 'Scripture',    color: ['#0ea5e9','#6366f1'], emoji: '📖' },
  { id: 'salvation',    label: 'Salvation',    color: ['#fde68a','#f59e0b'], emoji: '🌟' },
  { id: 'eternity',     label: 'Eternity',     color: ['#6366f1','#a855f7'], emoji: '♾️' },
  // Group 1 — Heart & Soul
  { id: 'anxiety',      label: 'Anxiety',      color: ['#818cf8','#a5b4fc'], emoji: '🕊️' },
  { id: 'grief',        label: 'Grief',        color: ['#6366f1','#8b5cf6'], emoji: '💙' },
  { id: 'gratitude',    label: 'Gratitude',    color: ['#fbbf24','#f97316'], emoji: '🙏' },
  { id: 'joy',          label: 'Joy',          color: ['#f59e0b','#ef4444'], emoji: '😊' },
  { id: 'peace',        label: 'Peace',        color: ['#0ea5e9','#06b6d4'], emoji: '🌊' },
  { id: 'healing',      label: 'Healing',      color: ['#10b981','#34d399'], emoji: '🌸' },
  { id: 'forgiveness',  label: 'Forgiveness',  color: ['#c084fc','#f472b6'], emoji: '💜' },
  { id: 'patience',     label: 'Patience',     color: ['#84cc16','#22c55e'], emoji: '⏳' },
  { id: 'humility',     label: 'Humility',     color: ['#a3a3a3','#737373'], emoji: '🌾' },
  { id: 'compassion',   label: 'Compassion',   color: ['#fb7185','#f472b6'], emoji: '🤗' },
  { id: 'courage',      label: 'Courage',      color: ['#f97316','#ef4444'], emoji: '🦁' },
  { id: 'identity',     label: 'Identity',     color: ['#6366f1','#8b5cf6'], emoji: '🪞' },
  // Group 2 — Character & Virtue
  { id: 'strength',     label: 'Strength',     color: ['#10b981','#0ea5e9'], emoji: '⚡' },
  { id: 'wisdom',       label: 'Wisdom',       color: ['#f59e0b','#f97316'], emoji: '🦉' },
  { id: 'integrity',    label: 'Integrity',    color: ['#0ea5e9','#3b82f6'], emoji: '⚖️' },
  { id: 'perseverance', label: 'Perseverance', color: ['#10b981','#059669'], emoji: '🏔️' },
  { id: 'discipline',   label: 'Discipline',   color: ['#6366f1','#4f46e5'], emoji: '📏' },
  { id: 'generosity',   label: 'Generosity',   color: ['#fbbf24','#10b981'], emoji: '🎁' },
  { id: 'kindness',     label: 'Kindness',     color: ['#f9a8d4','#fb7185'], emoji: '🌼' },
  { id: 'service',      label: 'Service',      color: ['#34d399','#0ea5e9'], emoji: '🤲' },
  { id: 'leadership',   label: 'Leadership',   color: ['#f97316','#eab308'], emoji: '👑' },
  { id: 'stewardship',  label: 'Stewardship',  color: ['#22c55e','#16a34a'], emoji: '🌱' },
  { id: 'purpose',      label: 'Purpose',      color: ['#a855f7','#7c3aed'], emoji: '🎯' },
  { id: 'excellence',   label: 'Excellence',   color: ['#f59e0b','#d97706'], emoji: '🏆' },
  // Group 3 — Life & Relationships
  { id: 'family',       label: 'Family',       color: ['#f472b6','#ec4899'], emoji: '🏠' },
  { id: 'friendship',   label: 'Friendship',   color: ['#60a5fa','#818cf8'], emoji: '🤝' },
  { id: 'marriage',     label: 'Marriage',     color: ['#f43f5e','#fb7185'], emoji: '💍' },
  { id: 'community',    label: 'Community',    color: ['#0ea5e9','#38bdf8'], emoji: '🏘️' },
  { id: 'work',         label: 'Work',         color: ['#6366f1','#818cf8'], emoji: '💼' },
  { id: 'rest',         label: 'Rest',         color: ['#c084fc','#818cf8'], emoji: '☁️' },
  { id: 'health',       label: 'Health',       color: ['#22c55e','#4ade80'], emoji: '🌿' },
  { id: 'finances',     label: 'Finances',     color: ['#eab308','#f59e0b'], emoji: '💰' },
  { id: 'adversity',    label: 'Adversity',    color: ['#64748b','#475569'], emoji: '⛈️' },
  { id: 'change',       label: 'Change',       color: ['#06b6d4','#0ea5e9'], emoji: '🔄' },
  { id: 'loneliness',   label: 'Loneliness',   color: ['#8b5cf6','#6d28d9'], emoji: '🕯️' },
  { id: 'legacy',       label: 'Legacy',       color: ['#a3e635','#84cc16'], emoji: '🌳' },
];

export const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
export const TODAY_IDX = new Date().getDay();

export const VITAMINS = {
  // ── Full content ──────────────────────────────────────────────
  faith: [
    { day:0, verse:'"Now faith is the substance of things hoped for, the evidence of things not seen."', ref:'Hebrews 11:1 (KJV)', author:null },
    { day:1, verse:'"If ye have faith as a grain of mustard seed... nothing shall be impossible unto you."', ref:'Matthew 17:20 (KJV)', author:null },
    { day:2, verse:'"Trust in the Lord with all thine heart; and lean not unto thine own understanding."', ref:'Proverbs 3:5 (KJV)', author:null },
    { day:3, verse:'"Faith is taking the first step even when you don\'t see the whole staircase."', ref:null, author:'Martin Luther King Jr.' },
    { day:4, verse:'"For we walk by faith, not by sight."', ref:'2 Corinthians 5:7 (KJV)', author:null },
    { day:5, verse:'"Be faithful in small things because it is in them that your strength lies."', ref:null, author:'Mother Teresa' },
    { day:6, verse:'"Faith is not believing that God can. It is knowing that God will."', ref:null, author:'Ben Stein' },
  ],
  hope: [
    { day:0, verse:'"For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."', ref:'Jeremiah 29:11 (NIV)', author:null },
    { day:1, verse:'"Hope deferred maketh the heart sick: but when the desire cometh, it is a tree of life."', ref:'Proverbs 13:12 (KJV)', author:null },
    { day:2, verse:'"We must accept finite disappointment, but never lose infinite hope."', ref:null, author:'Martin Luther King Jr.' },
    { day:3, verse:'"And now these three remain: faith, hope and love. But the greatest of these is love."', ref:'1 Corinthians 13:13 (NIV)', author:null },
    { day:4, verse:'"Hope is being able to see that there is light despite all of the darkness."', ref:null, author:'Desmond Tutu' },
    { day:5, verse:'"But they that wait upon the Lord shall renew their strength."', ref:'Isaiah 40:31 (KJV)', author:null },
    { day:6, verse:'"Once you choose hope, anything\'s possible."', ref:null, author:'Christopher Reeve' },
  ],
  love: [
    { day:0, verse:'"For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."', ref:'John 3:16 (KJV)', author:null },
    { day:1, verse:'"Love is patient, love is kind. It does not envy, it does not boast, it is not proud."', ref:'1 Corinthians 13:4 (NIV)', author:null },
    { day:2, verse:'"The best thing to hold onto in life is each other."', ref:null, author:'Audrey Hepburn' },
    { day:3, verse:'"Beloved, let us love one another: for love is of God."', ref:'1 John 4:7 (KJV)', author:null },
    { day:4, verse:'"Where there is love there is life."', ref:null, author:'Mahatma Gandhi' },
    { day:5, verse:'"Greater love hath no man than this, that a man lay down his life for his friends."', ref:'John 15:13 (KJV)', author:null },
    { day:6, verse:'"The greatest happiness of life is the conviction that we are loved."', ref:null, author:'Victor Hugo' },
  ],
  anxiety: [
    { day:0, verse:'"Cast all your anxiety on him because he cares for you."', ref:'1 Peter 5:7 (NIV)', author:null },
    { day:1, verse:'"Do not be anxious about anything, but in every situation, by prayer and petition... present your requests to God."', ref:'Philippians 4:6 (NIV)', author:null },
    { day:2, verse:'"You don\'t have to control your thoughts. You just have to stop letting them control you."', ref:null, author:'Dan Millman' },
    { day:3, verse:'"Peace I leave with you; my peace I give you. I do not give to you as the world gives."', ref:'John 14:27 (NIV)', author:null },
    { day:4, verse:'"Almost everything will work again if you unplug it for a few minutes, including you."', ref:null, author:'Anne Lamott' },
    { day:5, verse:'"The Lord is my shepherd; I shall not want."', ref:'Psalm 23:1 (KJV)', author:null },
    { day:6, verse:'"You can\'t calm the storm, so stop trying. What you can do is calm yourself."', ref:null, author:'Timber Hawkeye' },
  ],
  grief: [
    { day:0, verse:'"Blessed are those who mourn, for they will be comforted."', ref:'Matthew 5:4 (NIV)', author:null },
    { day:1, verse:'"The Lord is close to the brokenhearted and saves those who are crushed in spirit."', ref:'Psalm 34:18 (NIV)', author:null },
    { day:2, verse:'"Grief is the price we pay for love."', ref:null, author:'Queen Elizabeth II' },
    { day:3, verse:'"He heals the brokenhearted and binds up their wounds."', ref:'Psalm 147:3 (NIV)', author:null },
    { day:4, verse:'"There is a sacredness in tears. They are not the mark of weakness, but of power."', ref:null, author:'Washington Irving' },
    { day:5, verse:'"Weeping may endure for a night, but joy cometh in the morning."', ref:'Psalm 30:5 (KJV)', author:null },
    { day:6, verse:'"What we have once enjoyed we can never lose. All that we love deeply becomes a part of us."', ref:null, author:'Helen Keller' },
  ],
  gratitude: [
    { day:0, verse:'"Give thanks in all circumstances; for this is God\'s will for you in Christ Jesus."', ref:'1 Thessalonians 5:18 (NIV)', author:null },
    { day:1, verse:'"O give thanks unto the Lord; for he is good: for his mercy endureth for ever."', ref:'Psalm 107:1 (KJV)', author:null },
    { day:2, verse:'"Gratitude turns what we have into enough."', ref:null, author:'Aesop' },
    { day:3, verse:'"Enter his gates with thanksgiving and his courts with praise."', ref:'Psalm 100:4 (NIV)', author:null },
    { day:4, verse:'"Gratitude is not only the greatest of virtues, but the parent of all others."', ref:null, author:'Cicero' },
    { day:5, verse:'"In everything give thanks: for this is the will of God."', ref:'1 Thessalonians 5:18 (KJV)', author:null },
    { day:6, verse:'"Joy is the simplest form of gratitude."', ref:null, author:'Karl Barth' },
  ],
  strength: [
    { day:0, verse:'"I can do all things through Christ which strengtheneth me."', ref:'Philippians 4:13 (KJV)', author:null },
    { day:1, verse:'"The Lord is my strength and my shield; my heart trusted in him, and I am helped."', ref:'Psalm 28:7 (KJV)', author:null },
    { day:2, verse:'"Strength does not come from physical capacity. It comes from an indomitable will."', ref:null, author:'Mahatma Gandhi' },
    { day:3, verse:'"Be strong and courageous. Do not be afraid; do not be discouraged."', ref:'Joshua 1:9 (NIV)', author:null },
    { day:4, verse:'"You never know how strong you are until being strong is your only choice."', ref:null, author:'Bob Marley' },
    { day:5, verse:'"God is our refuge and strength, a very present help in trouble."', ref:'Psalm 46:1 (KJV)', author:null },
    { day:6, verse:'"Character cannot be developed in ease and quiet. Only through experience of trial and suffering can the soul be strengthened."', ref:null, author:'Helen Keller' },
  ],
  // ── Stub content (lorem ipsum) ────────────────────────────────
  prayer: stubs, trust: stubs, grace: stubs, redemption: stubs, surrender: stubs,
  worship: stubs, scripture: stubs, salvation: stubs, eternity: stubs,
  joy: stubs, peace: stubs, healing: stubs, forgiveness: stubs, patience: stubs,
  humility: stubs, compassion: stubs, courage: stubs, identity: stubs,
  wisdom: stubs, integrity: stubs, perseverance: stubs, discipline: stubs,
  generosity: stubs, kindness: stubs, service: stubs, leadership: stubs,
  stewardship: stubs, purpose: stubs, excellence: stubs,
  family: stubs, friendship: stubs, marriage: stubs, community: stubs,
  work: stubs, rest: stubs, health: stubs, finances: stubs,
  adversity: stubs, change: stubs, loneliness: stubs, legacy: stubs,
};

export const DEVOTIONALS = {
  faith: {
    title: 'Walking in the Unseen',
    scripture: { verse: '"Now faith is the substance of things hoped for, the evidence of things not seen."', ref: 'Hebrews 11:1 (KJV)' },
    body: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faith is not a feeling we conjure; it is a posture of the heart that chooses trust even when the evidence is hidden from view. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. When Abraham left his homeland, he did not know where he was going — only that he was called to go. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'The mustard seed does not demand to see the harvest before it falls into the soil. In the same way, your daily act of trust — however small — is never invisible to the One who holds all things together. Ut labore et dolore magna aliqua enim ad minim veniam, quis nostrud exercitation ullamco.',
    ],
    reflection: 'Is there an area of your life where you are waiting for visible proof before you trust? What would it look like to take one small step forward in faith today, without seeing the full staircase?',
    prayer: 'Lord, increase my faith in the seasons when I cannot see. Remind me that You are already at work in what I cannot yet perceive. Help me to rest in Your promises and to take the next step, trusting that You are faithful to complete what You have begun. Amen.',
  },
  hope: {
    title: 'An Anchor for the Soul',
    scripture: { verse: '"For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."', ref: 'Jeremiah 29:11 (NIV)' },
    body: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hope is not wishful thinking — it is a confident expectation grounded in the character of God. When Jeremiah delivered these words, Israel was in exile, far from everything they had known. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. The remarkable thing about hope is that it does not deny the difficulty of the present; it simply refuses to let the present be the final word. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      'Every sunrise is a small sermon on hope — a reminder that darkness does not last, that mornings come, and that the One who placed the stars in their courses holds your story with the same steady hand. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
    ],
    reflection: 'What does hope feel like to you right now — distant, fragile, or steady? Where in your current circumstances do you sense God inviting you to lift your eyes toward a future that is not yet visible?',
    prayer: 'Father, when hope feels thin, remind me that it is anchored not in my circumstances but in Your unchanging nature. Renew my vision for the future You have prepared. Let my heart be a place where hope takes root and grows. Amen.',
  },
  love: {
    title: 'The Greatest of These',
    scripture: { verse: '"Love is patient, love is kind. It does not envy, it does not boast, it is not proud."', ref: '1 Corinthians 13:4 (NIV)' },
    body: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Love, as Paul describes it, is less a feeling and more a practice — a series of choices made daily in the direction of another person\'s good. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. The extraordinary love of God does not wait for us to earn it or deserve it. It moves toward us at our most broken and calls us beloved anyway. Excepteur sint occaecat cupidatat non proident, mollit anim id est laborum.',
      'To love others well, we must first be rooted in the love that is already ours. When we truly know that we are loved by God, love becomes less of an obligation and more of an overflow — a natural outpouring of a heart that has been filled. Ut labore et dolore magna aliqua enim ad minim.',
    ],
    reflection: 'Who in your life might need a practical act of love this week — patience, a kind word, or simply your presence? How might you express love today in a way that costs you something small?',
    prayer: 'God, thank You for loving me first. Teach me to love others not from a place of duty but from a place of overflow. Where I have withheld love out of fear or pride, soften my heart and make me more like You. Amen.',
  },
  anxiety: {
    title: 'The Peace That Passes Understanding',
    scripture: { verse: '"Do not be anxious about anything, but in every situation, by prayer and petition... present your requests to God."', ref: 'Philippians 4:6 (NIV)' },
    body: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Paul wrote these words from a prison cell — not from a place of comfort and ease, but from genuine constraint. His peace was not the product of favorable circumstances. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Anxiety whispers that we must carry what only God was meant to carry. The invitation of scripture is to cast, not carry — to release what we were never designed to hold alone. Excepteur sint occaecat cupidatat non proident.',
      'The practice of prayer is, in part, a practice of relinquishment. Every prayer is an act of trust — an acknowledgment that there is One who knows, who holds, and who is already working in the very places we most fear. Ut labore et dolore magna aliqua enim ad minim veniam nostrud.',
    ],
    reflection: 'What worry are you currently carrying that you have not yet brought to God in prayer? Take a moment now to name it, release it, and ask for the peace that transcends your understanding.',
    prayer: 'Lord, I bring You my anxious thoughts today. I confess that I have tried to carry what only You can hold. Grant me the peace that passes understanding — the kind that guards my heart even when nothing outwardly has changed. I trust You. Amen.',
  },
  grief: {
    title: 'Held in the Mourning',
    scripture: { verse: '"The Lord is close to the brokenhearted and saves those who are crushed in spirit."', ref: 'Psalm 34:18 (NIV)' },
    body: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Grief is one of the most honest things a human being can experience. It is the price of love — the ache that arises precisely because something or someone mattered deeply. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. The Psalms do not shy away from lament. There is no posture of grief too undone for His presence — He does not ask us to clean ourselves up before coming to Him. Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      'In the midst of loss, we are not abandoned to our sorrow. The same God who wept at the tomb of Lazarus weeps with you. Your tears are not weakness — they are worship, a testament to love\'s depth and life\'s sacred weight. Ut labore et dolore magna aliqua enim ad minim veniam quis nostrud.',
    ],
    reflection: 'Is there a grief you have been carrying quietly, without permission to mourn? Give yourself space today to acknowledge the weight of your loss. What would it mean to let God simply sit with you in it?',
    prayer: 'Comforter, draw near to me in this place of sorrow. I do not ask You to take away the grief — only to be present in it with me. Hold what I cannot hold. Heal what only You can heal. And when the time is right, lead me gently toward morning. Amen.',
  },
  gratitude: {
    title: 'The Discipline of Thankfulness',
    scripture: { verse: '"Give thanks in all circumstances; for this is God\'s will for you in Christ Jesus."', ref: '1 Thessalonians 5:18 (NIV)' },
    body: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gratitude is less a spontaneous feeling and more a trained orientation of the heart. Paul does not say to give thanks for all circumstances, but in them — a subtle but profound distinction. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. There is something quietly revolutionary about thankfulness. It refuses to let scarcity have the final word. In this way, gratitude is an act of spiritual resistance — a choice to notice abundance. Excepteur sint occaecat cupidatat non proident.',
      'A grateful heart is not a heart without need — it is a heart that has learned to recognize the goodness already woven into ordinary days. The morning light, a kind word, the breath in your lungs: these are not small things. Ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation.',
    ],
    reflection: 'Name three things — however small — that you are genuinely grateful for today. How might intentionally practicing gratitude shift your perspective on a current struggle in your life?',
    prayer: 'Father, forgive me for the times I have been surrounded by Your goodness and failed to notice. Open my eyes to the gifts hidden in ordinary moments. Let thankfulness become not just a response to blessing, but the posture of my whole life. Amen.',
  },
  strength: {
    title: 'Strength Made Perfect in Weakness',
    scripture: { verse: '"I can do all things through Christ which strengtheneth me."', ref: 'Philippians 4:13 (KJV)' },
    body: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. This verse is among the most quoted in scripture — and perhaps among the most misunderstood. Paul is not promising athletic victory or worldly success. He is speaking of contentment: the strength to endure plenty and want alike. Sed do eiusmod tempor incididunt ut labore.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. True spiritual strength is not the absence of struggle — it is the capacity to keep going when the struggle is real, grounded in a settled trust in the One who supplies what we lack. Excepteur sint occaecat cupidatat non proident.',
      'The greatest acts of strength in scripture rarely look impressive from the outside. A widow giving her last coin. A shepherd boy facing a giant. Strength, in God\'s economy, is often indistinguishable from surrender. Ut labore et dolore magna aliqua enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    ],
    reflection: 'Where are you currently striving in your own strength? What might it look like to stop striving and start leaning into the strength that is made perfect in weakness — to let your need become an invitation?',
    prayer: 'Lord, I am tired of trying to be strong in ways You never asked me to be. Teach me to draw from Your strength rather than my own. Let my weakness be the very place where Your power is most clearly seen. Amen.',
  },
};

export const BONUS_VITAMINS = [
  { id:'bonus1', label:'Bonus Vitamin', color:['#fbbf24','#f472b6'], verse:'"This is the day which the Lord hath made; we will rejoice and be glad in it."', ref:'Psalm 118:24 (KJV)', author:null },
];
