import { FeedbackData } from '../models';
import { ErrorAction } from './action.types';
//tslint:disable:no-reserved-keywords

export enum Actions {
  update = 'feedback.update',
  send = 'feedback.send'
}

export interface UpdateFeedback {
  type: Actions.update;
  feedback: FeedbackData;
}

export interface SendFeedback extends ErrorAction {
  type: Actions.send;
  feedback: FeedbackData;
}

export type FeedbackActions = UpdateFeedback | SendFeedback;

export function updateFeedback(feedback: FeedbackData): UpdateFeedback {
  return { type: Actions.update, feedback };
}

export function sendFeedback(feedback: FeedbackData): SendFeedback {
  return { type: Actions.send, feedback };
}
