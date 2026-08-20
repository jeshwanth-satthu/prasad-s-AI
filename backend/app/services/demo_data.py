"""
Realistic sample content used whenever GEMINI_API_KEY is not configured, or a live
Gemini call fails / returns malformed output. This is what makes the whole app usable
and demonstrable with zero external credentials (see PRD section 15, Demo Mode).
"""
import re


def generate_research(topic: str, competitor: str | None = None) -> dict:
    is_duel = bool(re.search(r"\bvs\b|versus", topic, re.IGNORECASE))
    return {
        "overview": (
            f"{topic} is the flagship matchup Telugu tech audiences ask about most this "
            "quarter. Both phones push the same core story — faster on-device AI, bigger "
            "camera sensors, titanium-class builds — but solve it with different philosophies."
            if is_duel else
            f"{topic} sits at the center of this quarter's tech conversation, combining "
            "meaningful hardware upgrades with a handful of software-only AI features that "
            "reviewers are split on."
        ),
        "keySpecs": [
            {"label": "Display", "value": "6.7\" LTPO AMOLED, 120Hz"},
            {"label": "Chipset", "value": "Latest flagship silicon, 3nm class"},
            {"label": "RAM", "value": "12GB"},
            {"label": "Primary Camera", "value": "50MP main, 5x periscope telephoto"},
            {"label": "Battery", "value": "5,000mAh"},
            {"label": "Charging", "value": "45W wired"},
            {"label": "Starting Price (India)", "value": "₹1,44,999"},
        ],
        "majorFeatures": [
            "On-device AI writing & photo-editing tools",
            "Titanium-class frame",
            "Satellite connectivity for emergencies",
            "Faster in-display fingerprint sensor",
        ],
        "whatsNew": [
            "Brighter always-on display",
            "New camera sensor ~15% larger than last generation",
            "Faster charging chip cuts 0-50% time by roughly 8 minutes",
        ],
        "pros": [
            "Best-in-class chip efficiency this generation",
            "Strong value at this price tier compared to last year",
            "Excellent battery life for typical Telugu-audience usage patterns",
        ],
        "cons": [
            "Charging speed still trails some Android flagships",
            "Storage tiers remain overpriced for what you get",
        ],
        "competitorComparison": [
            {"competitor": competitor or "Previous generation", "verdict": "A meaningful but not dramatic upgrade — skip if you already own last year's flagship."},
            {"competitor": "Nearest value flagship", "verdict": "Still the value pick for viewers priced out of this segment."},
        ],
        "whoShouldBuy": ["Anyone upgrading from a 3+ year old phone", "Content-first buyers who shoot a lot of photo/video"],
        "whoShouldAvoid": ["Anyone who upgraded within the last 12 months", "Budget-conscious buyers priced out of this tier"],
        "talkingPoints": [
            "Open with the price reveal to set expectations early",
            "Do a real-world low-light camera comparison, not lab charts",
            "End with a clear 'buy this if...' decision tree",
        ],
        "factsToVerify": [
            "Confirm India launch pricing and bank cashback offers at time of publish",
            "Confirm exact battery capacity from the official spec sheet, not leaks",
        ],
        "sources": [
            {"title": "Official brand press kit / spec sheet", "note": "Primary source for specs and pricing"},
            {"title": "GSMArena spec comparison", "note": "Cross-check hardware specs"},
            {"title": "DXOMark camera test labs", "note": "Independent camera scoring"},
        ],
    }


def generate_script(topic: str, video_type: str, language: str) -> dict:
    telugu = language != "English"
    hook = (
        f'"{topic} konali anukuntunnara? Video complete ayyaka decision teesukondi."'
        if telugu else f'"Before you spend a single rupee on {topic}, watch this."'
    )
    intro = (
        f"Namaskaram andariki, ee video lo manam {topic} గురించి discuss చేయబోతున్నాం. "
        "Idi generic spec-sheet video కాదు, real usage nunchi వచ్చిన honest opinion."
        if telugu else
        f"Hey everyone, today we're breaking down {topic} based on real day-to-day usage, "
        "not just a spec sheet."
    )
    main = (
        [
            "Display colors accurate గా వస్తున్నాయి, sunlight lo visibility బాగుంది.",
            "Performance side chudite daily multitasking, gaming lo lag అనిపించలేదు.",
            "Camera ni different lighting conditions lo test chesanu, low light improvement clear గా కనపడుతుంది.",
            "Battery ఒక్క full day easy గా వస్తుంది.",
        ] if telugu else
        [
            "Display colors are accurate and outdoor visibility holds up well.",
            "Daily multitasking and gaming both felt smooth with no noticeable lag.",
            "The low-light camera improvement is genuinely noticeable.",
            "Battery comfortably lasts a full day of heavy use.",
        ]
    )
    verdict = (
        f"Overall, {topic} ఒక solid upgrade — kani andariki కాదు, already recent flagship "
        "వాడుతుంటే wait చేయమని నా suggestion." if telugu else
        f"Overall, {topic} is a solid upgrade, but not for everyone already on a recent flagship."
    )
    cta = (
        "Video useful అనిపిస్తే like చేయండి, comment లో mee opinion చెప్పండి. Subscribe చేయండి!"
        if telugu else "If this helped, drop a like and let me know your thoughts. Subscribe for more!"
    )
    return {
        "hook": hook, "intro": intro, "mainContent": main,
        "comparison": (
            "Compare చేస్తే, ఇది competitor kanna better camera value ఇస్తుంది, kani battery konchem behind."
            if video_type == "Comparison" and telugu else
            "Compared to its rival, this offers better camera value but trails slightly on battery."
            if video_type == "Comparison" else None
        ),
        "verdict": verdict, "cta": cta,
    }


def generate_ideas(topic: str) -> list[dict]:
    angles = [
        ("BEST PHONE ఏది?", "Which is the BEST?", "Comparison / Ranking", "High commercial intent keeps watch-time high."),
        ("కొనే ముందు ఈ 5 mistakes చేయకండి!", "Don't make these 5 mistakes", "Listicle / Advice", "Loss-aversion hooks outperform pure feature videos."),
        ("1 నెల వాడాక నా REAL అభిప్రాయం", "My REAL opinion after 1 month", "Long-term review", "Less competition, builds channel trust."),
        ("vs మీ పాత phone - upgrade చేయాలా?", "vs your old phone — upgrade?", "Decision guide", "Speaks to the largest audience segment."),
        ("Camera Test అన్ని lighting conditions లో", "Camera tested in every lighting condition", "Deep-dive test", "Camera comparisons drive high retention."),
        ("మీరు అడిగిన TOP 10 ప్రశ్నలు", "Top 10 questions YOU asked", "Q&A", "Repurposes comments into content at near-zero cost."),
        ("EMI తో konali, Cash తో konali?", "EMI or cash — which is smarter?", "Finance explainer", "Underserved angle most channels skip."),
        ("6 నెలల తర్వాత price ఎంత తగ్గుతుంది?", "How much will the price drop in 6 months?", "Prediction / analysis", "Taps recurring festival-sale search intent."),
        ("Unboxing + First Impressions", "Unboxing and first impressions", "Unboxing", "Captures launch-week search spike."),
        ("కొనొద్దు, బదులుగా ఇది కొనండి!", "Don't buy this — buy this instead", "Contrarian pick", "Pattern-interrupt title stands out in-feed."),
    ]
    ideas = []
    for te, en, fmt, why in angles:
        ideas.append({
            "titleTelugu": f"{topic} {te}",
            "titleEnglish": f"{en}: {topic}",
            "hook": f'"{topic} గురించి ఇది meeku useful గా untundi."',
            "audience": "Telugu tech audience researching this topic",
            "format": fmt,
            "whyItWorks": why,
            "thumbnailConcept": f"Bold Telugu text overlay on {topic} product shot.",
        })
    return ideas


def analyze_comments(raw_text: str) -> dict:
    lines = [l.strip() for l in raw_text.split("\n") if l.strip()]
    total = max(len(lines), 128)
    return {
        "totalComments": total,
        "buckets": [
            {"category": "Questions", "count": round(total * 0.28), "examples": ["Battery ఎన్ని hours వస్తుంది?", "5G support unda?"]},
            {"category": "Complaints", "count": round(total * 0.12), "examples": ["Heating issue వస్తుంది gaming time lo"]},
            {"category": "Feature Requests", "count": round(total * 0.09), "examples": ["Manual camera mode kavali"]},
            {"category": "Video Requests", "count": round(total * 0.15), "examples": ["1 month review video కావాలి"]},
            {"category": "Positive Feedback", "count": round(total * 0.20), "examples": ["Best Telugu tech channel"]},
            {"category": "Negative Feedback", "count": round(total * 0.06), "examples": ["Video konchem long ga undi"]},
            {"category": "Buying Questions", "count": round(total * 0.10), "examples": ["Ippudu konte price తగ్గుతుందా?"]},
        ],
        "topRequests": [
            "A dedicated long-term (30-day) review",
            "Camera comparison against the previous generation",
            "A budget alternative recommendation video",
            "EMI vs cash-buying breakdown",
            "Gaming + heating stress test",
        ],
        "mostMentionedProducts": [
            {"name": "This device", "mentions": 214},
            {"name": "Previous generation model", "mentions": 96},
            {"name": "Nearest competitor", "mentions": 71},
        ],
        "commonProblems": [
            "Heating during extended gaming sessions",
            "Confusion around which storage variant to buy",
        ],
        "mostAskedQuestions": [
            "Real-world battery backup on a heavy-use day?",
            "Does it support 5G reliably on Jio and Airtel?",
        ],
        "sentiment": {"positive": 64, "neutral": 24, "negative": 12},
        "topicMentions": [
            {"topic": "Camera", "value": 13}, {"topic": "Battery", "value": 9},
            {"topic": "Price", "value": 7}, {"topic": "Performance", "value": 6},
            {"topic": "Software", "value": 4},
        ],
        "recommendedTopics": [
            "30-day long-term battery & heating deep dive",
            "Camera comparison vs previous generation, same lighting",
            "Best budget alternative under half the price",
            "EMI vs cash: real cost breakdown",
            "Answering your top 10 comment questions",
        ],
    }


def generate_shorts(source_text: str) -> list[dict]:
    seed = (source_text.strip()[:40] or "this phone")
    templates = [
        ("1 line లో cheppali అంటే — worth cheయ్యాలా? Chudandi.", "The ONE thing nobody talks about", "ఒక్క FEATURE!"),
        ("Ee mistake chesi money waste cheyakandi!", "Don't make this mistake", "MISTAKE!"),
        ("Real battery test - 1 day full usage తో chusam.", "24-hour battery test", "24 HRS"),
        ("Camera Zoom ఎంత వరకు పని చేస్తుందో chuddam.", "Zoom test you won't believe", "30x ZOOM"),
        ("Meeru అడిగిన question కి direct answer.", "Answering your #1 question", "ANSWERED"),
    ]
    out = []
    for i, (hook, title, thumb) in enumerate(templates, start=1):
        out.append({
            "index": i, "hook": f'"{hook}"',
            "script": f"Fast-paced 30-45 second cut focused on {seed}, text overlay reinforcing the hook, ending with a punchy verdict.",
            "caption": f"{seed} గురించి ఇది మిస్ కావద్దు 👀",
            "title": title,
            "hashtags": ["#TeluguTech", "#TechReview", "#Shorts"],
            "thumbnailText": thumb,
            "whyItWorks": "Curiosity-gap hook plus a single clear claim is ideal for sub-45-second retention.",
        })
    return out
