export enum FeedbackSentiment {
  unspecified = 'unspecified',
  happy = 'happy',
  unhappy = 'unhappy'
}

export interface FeedbackData {
  sentiment: FeedbackSentiment;
  comment?: string;
  contactable?: boolean;
}

export interface FeedbackContext {
  pageUrl: string;
  sessionId?: string;
}
