export type Mode = "learning" | "conversation" | "engagement" | "support";

export type Level = 1 | 2 | 3;

export type ItemType = "choice" | "word" | "fill_blank" | "sentence";

export type MessageRole = "bot" | "child";

export type AttemptResult =
  | "correct"
  | "incorrect"
  | "unsure"
  | "skipped"
  | "revealed";

export type Avatar = "sprout" | "sun" | "cloud" | "butterfly";

export type Session = {
  level: number;
  nickname: string | null;
  avatar: string;
};

export type Message = {
  id: number;
  role: MessageRole;
  content: string;
  mode: Mode | null;
};

export type Choice = {
  id: string;
  label: string;
  emoji: string | null;
};

export type FeelingCheckin = {
  type: "feeling_checkin";
  choices: { id: string; emoji: string; label: string }[];
};

export type Activity = {
  id: string;
  level: Level;
  skill: string;
  type: ItemType;
  prompt: string;
  emoji: string | null;
  choices: Choice[];
  hint: string;
};

export type ActivityPayload = Activity | FeelingCheckin;

export type Feedback = {
  result: AttemptResult | null;
  hint: string | null;
};

export type Progress = {
  level: number;
  correct_in_window: number;
  window: number;
  required: number;
};

export type ProgressResponse = Progress & {
  skills: Record<string, number>;
};

export type TurnMeta = {
  fallback: boolean;
  llm_ms: number;
  total_ms: number;
  request_id: string;
};

export type TurnInput =
  | { text: string; choice_id?: never; feeling?: never }
  | { text?: never; choice_id: string; feeling?: never }
  | { text?: never; choice_id?: never; feeling: string };

export type TurnResponse = {
  messages: Message[];
  mode: Mode;
  level: number;
  level_up: boolean | null;
  feedback: Feedback;
  activity: ActivityPayload | null;
  progress: Progress;
  meta: TurnMeta;
};

export type CreateSessionInput = {
  nickname?: string | null;
  avatar: Avatar;
};

export type CreateSessionResponse = {
  session_token: string;
  session: Session;
  messages: Message[];
  activity: null;
};

export type GetSessionResponse = {
  session: Session;
  messages: Message[];
  progress: Progress;
  activity: ActivityPayload | null;
};
