
export type PageType = "HOME" | "TOOLS" | "CHALLENGE" | "AI_PROJECT" | "CONTACT";

export interface LevelData {
  title: string;
  desc: string;
  hint: string;
  fake_pos: 1 | 2; // 1: Left (Trái), 2: Right (Phải)
  advice: string;
  video_url: string; // Link video youtube đã edit 2 khung hình
}

export interface GameState {
  levels: LevelData[];
  current: number;
  score: number;
  wrong_count: number;
  wrong_topics: string[]; // Lưu lại tên các chủ đề bị sai để thống kê
  finished: boolean;
  show_result: boolean;
  last_correct: boolean | null;
}

// === NEW TYPES FOR PERSONALITY TEST & ANALYTICS ===
export type LikertScale = 1 | 2 | 3 | 4 | 5; // 1: Strongly Disagree -> 5: Strongly Agree

export interface PersonalityQuestion {
  id: string;
  text: string;
  trait: "CONFIDENCE" | "ANXIETY" | "SKEPTICISM" | "AWARENESS";
}

export interface PersonalityTestResult {
  answers: Record<string, LikertScale>; // questionId -> value
}

export interface GameHistoryItem {
  id: string;
  timestamp: number;
  score: number;
  wrong_topics: string[];
  personality: PersonalityTestResult | null;
}

export interface UserSession {
  username: string;
  history: GameHistoryItem[];
}

export interface ChecklistItem {
  category: string;
  items: string[];
}

export interface NewsItem {
  tag: string;
  title: string;
  date: string;
  loss: string;
  desc: string;
  url: string;
}

export interface FunFact {
    title: string;
    content: string;
}
