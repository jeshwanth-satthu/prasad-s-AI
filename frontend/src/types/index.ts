export interface ResearchBrief {
  id: string;
  topic: string;
  createdAt: string;
  overview: string;
  keySpecs: { label: string; value: string }[];
  majorFeatures: string[];
  whatsNew: string[];
  pros: string[];
  cons: string[];
  competitorComparison: { competitor: string; verdict: string }[];
  whoShouldBuy: string[];
  whoShouldAvoid: string[];
  talkingPoints: string[];
  factsToVerify: string[];
  sources: { title: string; note: string }[];
}

export type VideoType = "Review" | "Comparison" | "News" | "Explainer" | "Buying Guide" | "Shorts";
export type Duration = "30 seconds" | "60 seconds" | "3 minutes" | "5 minutes" | "8 minutes" | "10 minutes";
export type ScriptLanguage = "Telugu" | "Telugu + English Tech Terms" | "English";
export type Tone = "Energetic" | "Friendly" | "Professional" | "Educational" | "Storytelling";

export interface Script {
  id: string;
  topic: string;
  videoType: VideoType;
  duration: Duration;
  language: ScriptLanguage;
  tone: Tone;
  createdAt: string;
  hook: string;
  intro: string;
  mainContent: string[];
  comparison?: string;
  verdict: string;
  cta: string;
}

export interface VideoIdea {
  id: string;
  titleTelugu: string;
  titleEnglish: string;
  hook: string;
  audience: string;
  format: string;
  whyItWorks: string;
  thumbnailConcept: string;
  saved?: boolean;
}

export interface CommentBucket {
  category: "Questions" | "Complaints" | "Feature Requests" | "Video Requests" | "Positive Feedback" | "Negative Feedback" | "Buying Questions";
  count: number;
  examples: string[];
}

export interface CommentAnalysis {
  id: string;
  createdAt: string;
  totalComments: number;
  buckets: CommentBucket[];
  topRequests: string[];
  mostMentionedProducts: { name: string; mentions: number }[];
  commonProblems: string[];
  mostAskedQuestions: string[];
  sentiment: { positive: number; neutral: number; negative: number };
  topicMentions: { topic: string; value: number }[];
  recommendedTopics: string[];
}

export interface ShortIdea {
  id: string;
  index: number;
  hook: string;
  script: string;
  caption: string;
  title: string;
  hashtags: string[];
  thumbnailText: string;
  whyItWorks: string;
}

export type HistoryKind = "research" | "script" | "idea" | "comments" | "shorts";

export interface HistoryItem {
  id: string;
  kind: HistoryKind;
  title: string;
  createdAt: string;
  refId: string;
}

export interface ApiStatus {
  gemini: "connected" | "demo";
  mongodb: "connected" | "demo";
  youtube: "connected" | "demo";
}
