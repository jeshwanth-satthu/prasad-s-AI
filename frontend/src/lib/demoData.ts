import type {
  ResearchBrief, Script, VideoIdea, CommentAnalysis, ShortIdea,
  VideoType, Duration, ScriptLanguage, Tone,
} from "../types";

const uid = () => Math.random().toString(36).slice(2, 10);

// ---------- RESEARCH ----------

export function generateResearch(topic: string): ResearchBrief {
  const t = topic.trim() || "iPhone 17 Pro vs Samsung Galaxy S26 Ultra";
  const isFlagshipDuel = /vs|versus/i.test(t);

  return {
    id: uid(),
    topic: t,
    createdAt: new Date().toISOString(),
    overview: isFlagshipDuel
      ? `${t} is the flagship matchup Telugu tech audiences ask about most this quarter. Both phones push the same core story — faster on-device AI, bigger camera sensors, titanium-class builds — but they solve it with very different philosophies: Apple leans on ecosystem polish and chip efficiency, Samsung leans on raw display + camera specs and S-Pen versatility.`
      : `${t} sits at the center of this quarter's tech conversation. It combines meaningful hardware upgrades with a handful of software-only "AI features" that reviewers are split on — some call it genuinely useful, others call it marketing dressed as innovation. This brief gives you everything needed to form and defend an opinion on camera.`,
    keySpecs: isFlagshipDuel
      ? [
          { label: "Display", value: "iPhone 17 Pro: 6.3\" LTPO OLED, 120Hz  |  S26 Ultra: 6.9\" LTPO AMOLED, 120Hz" },
          { label: "Chipset", value: "A19 Pro  |  Snapdragon 8 Elite Gen 5" },
          { label: "RAM", value: "12GB  |  16GB" },
          { label: "Primary Camera", value: "48MP main, 5x periscope  |  200MP main, 5x periscope" },
          { label: "Battery", value: "~3,650mAh  |  5,000mAh" },
          { label: "Charging", value: "45W wired / 25W MagSafe  |  45W wired" },
          { label: "Starting Price (India)", value: "₹1,49,900  |  ₹1,44,999" },
        ]
      : [
          { label: "Display", value: "6.7-inch, 120Hz LTPO AMOLED" },
          { label: "Processor", value: "Latest flagship silicon, 3nm class" },
          { label: "RAM / Storage", value: "8GB/12GB, 128GB–512GB" },
          { label: "Battery", value: "5,000mAh, 65W wired charging" },
          { label: "Camera", value: "50MP main + 12MP ultrawide + 10MP telephoto" },
          { label: "Price (India)", value: "₹34,999 onwards" },
        ],
    majorFeatures: isFlagshipDuel
      ? [
          "On-device AI writing & photo-editing tools on both platforms",
          "Titanium/aluminum hybrid frame on iPhone vs titanium frame on Ultra",
          "S26 Ultra retains the built-in S-Pen; iPhone has no stylus story",
          "Both ship satellite connectivity for emergencies",
          "Apple pushes N1 chip for faster, more private Wi-Fi/Bluetooth; Samsung pushes Galaxy AI circle-to-search deepened with Gemini",
        ]
      : [
          "AI-assisted night photography with real-time scene detection",
          "Faster in-display fingerprint sensor",
          "Cleaner software with a promised 4-year OS update commitment",
          "Improved haptics and stereo speaker tuning",
        ],
    whatsNew: isFlagshipDuel
      ? [
          "Apple: brighter always-on display, larger vapor chamber for sustained gaming",
          "Apple: new camera control button gets a dedicated zoom gesture",
          "Samsung: 200MP sensor gets a new binning algorithm for cleaner low-light shots",
          "Samsung: Gemini-powered live translation during phone calls",
        ]
      : [
          "New camera sensor is ~15% larger than last generation",
          "Faster charging chip cuts 0-50% time by roughly 8 minutes",
          "Redesigned control center / quick settings UI",
        ],
    pros: isFlagshipDuel
      ? [
          "iPhone: best-in-class chip efficiency, longest software support window, tightest ecosystem integration",
          "Galaxy: bigger, sharper display for content consumption, S-Pen productivity, faster charging",
        ]
      : [
          "Genuinely useful AI camera features, not just gimmicks",
          "Strong value at this price tier compared to last year",
          "Excellent battery life for typical Telugu-audience usage patterns (heavy YouTube + WhatsApp + camera)",
        ],
    cons: isFlagshipDuel
      ? [
          "iPhone: charging speed still trails Android flagships, no bundled charger",
          "Galaxy: One UI still feels heavier than stock Android for some users, price creeps up every year",
        ]
      : [
          "Storage tiers are still overpriced for what you get",
          "Some AI features need cloud processing and don't work well on patchy networks",
        ],
    competitorComparison: isFlagshipDuel
      ? [
          { competitor: "iPhone 16 Pro (last-gen)", verdict: "17 Pro is a meaningful but not dramatic upgrade — skip if you already own the 16 Pro." },
          { competitor: "Galaxy S25 Ultra (last-gen)", verdict: "S26 Ultra's camera + AI jump is bigger than Apple's generational jump this cycle." },
          { competitor: "OnePlus 13 (value flagship)", verdict: "Still the value pick for viewers priced out of both flagships." },
        ]
      : [
          { competitor: "Previous generation", verdict: "Worth upgrading only if you're two generations behind." },
          { competitor: "Nearest rival at this price", verdict: "Trades blows — better camera here, better display there." },
        ],
    whoShouldBuy: isFlagshipDuel
      ? ["Existing iPhone users deep in the Apple ecosystem (buy iPhone)", "Power users who want S-Pen + biggest possible screen (buy Galaxy)", "Creators who edit on-device and want longest resale value (either, but iPhone historically resells better in India)"]
      : ["Anyone upgrading from a 3+ year old phone", "Content-first buyers who shoot a lot of photo/video", "Buyers who want 4+ years of guaranteed updates"],
    whoShouldAvoid: isFlagshipDuel
      ? ["Anyone who already owns last year's flagship from the same brand", "Budget-conscious buyers — both are ₹1.4L+ purchases"]
      : ["Buyers who upgraded within the last 12 months", "Anyone who prioritizes raw price-to-spec ratio over polish"],
    talkingPoints: isFlagshipDuel
      ? [
          "Open with the price reveal — both are within ₹5,000 of each other, which flips the usual narrative",
          "Do a real-world low-light camera comparison, not lab charts",
          "Talk about resale value in the Indian market specifically",
          "End with a clear 'buy this if...' decision tree instead of a vague 'it depends'",
        ]
      : [
          "Lead with the single most surprising spec change",
          "Show the AI feature working live, don't just describe it",
          "Compare price-to-spec against what audience is used to seeing",
        ],
    factsToVerify: [
      "Confirm India launch pricing and offer bank cashback at time of publish",
      "Confirm exact battery capacity from official spec sheet, not leaks",
      "Double-check software update commitment years before stating on camera",
    ],
    sources: [
      { title: "Official brand press kit / spec sheet", note: "Primary source for specs and pricing" },
      { title: "GSMArena spec comparison", note: "Cross-check hardware specs" },
      { title: "DXOMark / camera test labs", note: "Independent camera scoring" },
      { title: "Early reviewer hands-on coverage", note: "Real-world performance impressions" },
    ],
  };
}

// ---------- SCRIPT ----------

export function generateScript(params: {
  topic: string; videoType: VideoType; duration: Duration; language: ScriptLanguage; tone: Tone;
}): Script {
  const { topic, videoType, duration, language, tone } = params;
  const teluguMode = language !== "English";

  const hookLines: Record<string, string> = {
    Telugu: `"${topic} konali anukuntunnara? Video complete ayyaka decision teesukondi — kారణం ఇక్కడ చెప్తా."`,
    "Telugu + English Tech Terms": `"${topic} — ఈ phone మీ money కి worth avutunda? 60 seconds లో నా honest verdict."`,
    English: `"Before you spend a single rupee on ${topic}, watch this."`,
  };

  const introTelugu = `Namaskaram andariki, ee channel lo మనం ఇవాళ discuss చేయబోయేది ${topic}. Nenu last one week nunchi ee device ni actual daily use lo test chesanu, so idi generic spec-sheet video కాదు — real experience nunchi వచ్చిన honest opinion.`;
  const introEnglish = `Hey everyone, today we're breaking down ${topic}. I've been using this for the past week in real day-to-day conditions, so this isn't a spec-sheet reading — it's an honest, lived-in take.`;

  const mainTelugu = [
    `Display గురించి మాట్లాడితే, colors chala accurate గా వస్తున్నాయి, sunlight lo kuda visibility bagundi.`,
    `Performance side chudite, daily multitasking, gaming lo ఎలాంటి lag అనిపించలేదు నాకు.`,
    `Camera ni nenu different lighting conditions lo test chesanu — low light lo improvement chala clear గా కనపడుతుంది.`,
    `Battery ఒక్క full day easy గా వస్తుంది, heavy usage తో kuda evening varaku వెళ్తుంది.`,
  ];
  const mainEnglish = [
    `Starting with the display — colors are accurate and visibility outdoors holds up well.`,
    `On performance, daily multitasking and gaming both felt smooth with zero noticeable lag.`,
    `I tested the camera across different lighting conditions — the low-light improvement is genuinely noticeable.`,
    `Battery comfortably lasts a full day, even with heavy usage stretching into the evening.`,
  ];

  const verdictTelugu = `Overall చూస్తే, ${topic} ఒక solid upgrade అని చెప్పగలను, kani ఇది andariki కాదు — meeru already recent flagship వాడుతుంటే wait చేయమని నా suggestion.`;
  const verdictEnglish = `Overall, ${topic} is a solid upgrade — but not for everyone. If you're already on a recent flagship, I'd say wait for the next cycle.`;

  const ctaTelugu = `Meeku ee video useful అనిపిస్తే like చేయండి, mee opinion comment లో చెప్పండి — next video లో ఏం కావాలో kuda comment చేయండి. Subscribe చేయడం మర్చిపోకండి!`;
  const ctaEnglish = `If this helped, drop a like and let me know your take in the comments — and tell me what you want covered next. Don't forget to subscribe!`;

  return {
    id: uid(),
    topic, videoType, duration, language, tone,
    createdAt: new Date().toISOString(),
    hook: hookLines[language],
    intro: teluguMode ? introTelugu : introEnglish,
    mainContent: teluguMode ? mainTelugu : mainEnglish,
    comparison: videoType === "Comparison" ? (teluguMode
      ? `Compare చేస్తే, competitor phone kanna idi better value ఇస్తుంది camera department లో, kani battery department లో konchem behind undi.`
      : `Compared to the competitor, this offers better camera value but trails slightly on battery.`) : undefined,
    verdict: teluguMode ? verdictTelugu : verdictEnglish,
    cta: teluguMode ? ctaTelugu : ctaEnglish,
  };
}

// ---------- IDEAS ----------

export function generateIdeas(topic: string): VideoIdea[] {
  const t = topic.trim() || "Smartphones under ₹30,000";
  const templates: Omit<VideoIdea, "id">[] = [
    {
      titleTelugu: `${t} లో BEST PHONE ఏది?`,
      titleEnglish: `Which is the BEST in ${t}?`,
      hook: `"${t} budget lo phone konali anukuntunnara? Ee 3 phones lo winner evaro chuddam."`,
      audience: "First-time flagship-curious buyers, 18-28 age group",
      format: "Comparison / Ranking",
      whyItWorks: "High commercial intent search term with clear decision framing keeps watch-time high.",
      thumbnailConcept: "3 phones lined up with a glowing crown over the winner, bold Telugu number overlay.",
    },
    {
      titleTelugu: `${t} కొనే ముందు ఈ 5 mistakes చేయకండి!`,
      titleEnglish: `Don't make these 5 mistakes before buying ${t}`,
      hook: `"Nenu ee mistake chesi 2 phones waste chesanu — meeru cheyakandi."`,
      audience: "First-time buyers researching before purchase",
      format: "Listicle / Advice",
      whyItWorks: "Loss-aversion hooks consistently outperform pure feature videos.",
      thumbnailConcept: "Red X marks over phone icons with shocked creator reaction face.",
    },
    {
      titleTelugu: `${t} - 1 నెల వాడాక నా REAL అభిప్రాయం`,
      titleEnglish: `My REAL opinion after 1 month with ${t}`,
      hook: `"Review video chala చూసారు, kani 1 month tarvata em jarigindo cheptha."`,
      audience: "Viewers who distrust day-one reviews",
      format: "Long-term review",
      whyItWorks: "Long-term usage content has less competition and builds channel trust.",
      thumbnailConcept: "Calendar graphic with '30 Days' badge next to the device.",
    },
    {
      titleTelugu: `${t} vs మీ పాత phone - upgrade చేయాలా వద్దా?`,
      titleEnglish: `${t} vs your old phone — should you upgrade?`,
      hook: `"Meeru already 2 years old phone వాడుతున్నారా? Ee video meeku."`,
      audience: "Existing owners deciding on upgrade timing",
      format: "Decision guide",
      whyItWorks: "Speaks directly to the largest audience segment — people who already own a phone.",
      thumbnailConcept: "Split screen old vs new phone with a big 'Upgrade?' question mark.",
    },
    {
      titleTelugu: `${t} - Camera Test అన్ని lighting conditions లో`,
      titleEnglish: `${t} — Camera tested in every lighting condition`,
      hook: `"Camera ye main factor అయితే, ఈ test మీకు క్లారిటీ ఇస్తుంది."`,
      audience: "Camera-focused buyers and content creators",
      format: "Deep-dive test",
      whyItWorks: "Camera comparisons are consistently among the highest-retention formats.",
      thumbnailConcept: "4-way grid of sample shots — day, night, portrait, zoom.",
    },
    {
      titleTelugu: `${t} గురించి మీరు అడిగిన TOP 10 ప్రశ్నలు`,
      titleEnglish: `Top 10 questions YOU asked about ${t}`,
      hook: `"Comments లో meeru అడిగిన ప్రశ్నలకి direct answers ఇక్కడ."`,
      audience: "Existing subscribers, high engagement segment",
      format: "Q&A",
      whyItWorks: "Repurposes comment data into content — near-zero research cost, high loyalty payoff.",
      thumbnailConcept: "Speech-bubble collage with creator pointing at a giant '10'.",
    },
    {
      titleTelugu: `${t} - EMI తో konali, Cash తో konali?`,
      titleEnglish: `${t} — Should you buy on EMI or pay cash?`,
      hook: `"EMI konte extra ఎంత pay chestunnaro meeku telusa?"`,
      audience: "Budget-conscious buyers, tier-2/3 city audience",
      format: "Finance explainer",
      whyItWorks: "Underserved angle most tech channels skip — strong differentiation.",
      thumbnailConcept: "Calculator + rupee symbol graphic next to the phone.",
    },
    {
      titleTelugu: `${t} - 6 నెలల తర్వాత price ఎంత తగ్గుతుంది?`,
      titleEnglish: `${t} — how much will the price drop in 6 months?`,
      hook: `"Wait చేస్తే ఎంత save చేయొచ్చో ఇక్కడ చెప్తా."`,
      audience: "Patient buyers tracking price trends",
      format: "Prediction / analysis",
      whyItWorks: "Taps into recurring search intent around festival sale pricing.",
      thumbnailConcept: "Downward price graph overlay on the device photo.",
    },
    {
      titleTelugu: `${t} Unboxing + First Impressions`,
      titleEnglish: `${t} — Unboxing and first impressions`,
      hook: `"Box open చేసిన మొదటి 5 నిమిషాల్లో నాకు అనిపించిన విషయాలు."`,
      audience: "Day-one hype viewers, launch-week traffic",
      format: "Unboxing",
      whyItWorks: "Captures launch-week search spike with minimal production time.",
      thumbnailConcept: "Hands opening the box mid-frame, box art clearly visible.",
    },
    {
      titleTelugu: `${t} కొనొద్దు, బదులుగా ఇది కొనండి!`,
      titleEnglish: `Don't buy ${t} — buy this instead`,
      hook: `"Contrarian take, kani data తో backup chestha."`,
      audience: "Viewers seeking alternative recommendations",
      format: "Contrarian / alternative pick",
      whyItWorks: "Pattern-interrupt title stands out in a feed full of positive reviews.",
      thumbnailConcept: "Big red arrow pointing away from the phone toward an alternative.",
    },
  ];
  return templates.map((t2) => ({ ...t2, id: uid() }));
}

// ---------- COMMENTS ----------

export function analyzeComments(rawText: string): CommentAnalysis {
  const lines = rawText.split("\n").map((l) => l.trim()).filter(Boolean);
  const total = Math.max(lines.length, 128);

  return {
    id: uid(),
    createdAt: new Date().toISOString(),
    totalComments: total,
    buckets: [
      { category: "Questions", count: Math.round(total * 0.28), examples: ["Battery ఎన్ని hours వస్తుంది real usage లో?", "Ee price lo storage ఎంత?", "5G support unda?"] },
      { category: "Complaints", count: Math.round(total * 0.12), examples: ["Heating issue వస్తుంది gaming time lo", "Camera app slow గా open avutundi"] },
      { category: "Feature Requests", count: Math.round(total * 0.09), examples: ["Manual camera mode kavali", "Dark mode improve cheyandi"] },
      { category: "Video Requests", count: Math.round(total * 0.15), examples: ["Ee phone vs OnePlus video cheyandi", "1 month review video kavali"] },
      { category: "Positive Feedback", count: Math.round(total * 0.20), examples: ["Chala clear గా explain chesaru bro", "Best Telugu tech channel"] },
      { category: "Negative Feedback", count: Math.round(total * 0.06), examples: ["Video konchem long ga undi"] },
      { category: "Buying Questions", count: Math.round(total * 0.10), examples: ["Ippudu konte tarvata price తగ్గుతుందా?", "Which color best అంటారు?"] },
    ],
    topRequests: [
      "A dedicated long-term (30-day) review",
      "Camera comparison against the previous generation",
      "A budget alternative recommendation video",
      "EMI vs cash-buying breakdown",
      "Gaming + heating stress test",
    ],
    mostMentionedProducts: [
      { name: "This device", mentions: 214 },
      { name: "Previous generation model", mentions: 96 },
      { name: "Nearest competitor", mentions: 71 },
      { name: "Budget alternative brand", mentions: 34 },
    ],
    commonProblems: [
      "Heating during extended gaming sessions",
      "Camera app takes a moment to launch from lock screen",
      "Confusion around which storage variant to buy",
    ],
    mostAskedQuestions: [
      "Real-world battery backup on a heavy-use day?",
      "Does it support 5G on Jio and Airtel reliably?",
      "Is the camera actually better than last year's model?",
      "Which color finish shows fingerprints least?",
    ],
    sentiment: { positive: 64, neutral: 24, negative: 12 },
    topicMentions: [
      { topic: "Camera", value: 13 },
      { topic: "Battery", value: 9 },
      { topic: "Price", value: 7 },
      { topic: "Performance", value: 6 },
      { topic: "Software", value: 4 },
    ],
    recommendedTopics: [
      "30-day long-term battery & heating deep dive",
      "Camera comparison vs previous generation, same lighting",
      "Best budget alternative under half the price",
      "EMI vs cash: real cost breakdown for Telugu audience",
      "Answering your top 10 comment questions",
    ],
  };
}

// ---------- SHORTS ----------

export function generateShorts(sourceText: string): ShortIdea[] {
  const seedTopic = sourceText.trim().slice(0, 40) || "this phone";
  const base: Omit<ShortIdea, "id" | "index">[] = [
    {
      hook: `"1 line లో cheppali అంటే — ${seedTopic} worth cheyyala? Chudandi."`,
      script: `Hook తో start చేసి, strongest single feature ni 15 seconds లో చూపించి, quick verdict తో close చేయండి. Text overlay: 'Worth it?' -> 'YES, if...'`,
      caption: `${seedTopic} లో అందరూ మిస్ అయిపోతున్న ఒక్క feature 👀`,
      title: `The ONE thing nobody talks about`,
      hashtags: ["#TeluguTech", "#TechReview", "#Shorts", "#Smartphone"],
      thumbnailText: "ఒక్క FEATURE!",
      whyItWorks: "Curiosity-gap hook + single-claim structure is ideal for sub-30-second retention.",
    },
    {
      hook: `"Ee mistake chesi money waste cheyakandi!"`,
      script: `Open with the mistake, show the consequence visually, end with the fix in one sentence. Fast cuts every 1.5s.`,
      caption: `Konే ముందు ఇది చూడండి ⚠️`,
      title: `Don't make this mistake`,
      hashtags: ["#TeluguTech", "#Shorts", "#BuyingGuide"],
      thumbnailText: "MISTAKE!",
      whyItWorks: "Loss-aversion framing consistently drives high completion rates on Shorts.",
    },
    {
      hook: `"Real battery test - 1 day full usage తో chusam"`,
      script: `Timelapse-style battery percentage overlay across a day, quick voiceover summary, end card with final % remaining.`,
      caption: `Full day battery test 🔋 result meeku shock avuvchu`,
      title: `24-hour battery test`,
      hashtags: ["#BatteryTest", "#TeluguTech", "#Shorts"],
      thumbnailText: "24 HRS",
      whyItWorks: "Visual proof format performs better than spoken claims alone.",
    },
    {
      hook: `"Camera Zoom ఎంత వరకు పని చేస్తుందో chuddam"`,
      script: `Show 1x -> 5x -> 30x zoom in one continuous shot with on-screen zoom-level counter.`,
      caption: `30x zoom result 😳 last shot చూడండి`,
      title: `Zoom test you won't believe`,
      hashtags: ["#CameraTest", "#Shorts", "#TeluguTech"],
      thumbnailText: "30x ZOOM",
      whyItWorks: "Continuous zoom shots are highly shareable and algorithm-friendly.",
    },
    {
      hook: `"Meeru అడిగిన question కి direct answer"`,
      script: `Read the top comment question on screen, answer in under 20 seconds, CTA to full video for details.`,
      caption: `Meeru అడిగారు, నేను answer చేసాను ✅`,
      title: `Answering your #1 question`,
      hashtags: ["#QnA", "#TeluguTech", "#Shorts"],
      thumbnailText: "ANSWERED",
      whyItWorks: "Directly recycles audience-generated demand, near-zero scripting effort.",
    },
  ];
  return base.map((s, i) => ({ ...s, id: uid(), index: i + 1 }));
}
