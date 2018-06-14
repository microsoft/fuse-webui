import { Actions, FeedbackActions } from '../actions/feedback';
import { FeedbackData, FeedbackSentiment } from '../models';

export function feedback(state: FeedbackData = { sentiment: FeedbackSentiment.unspecified }, action: FeedbackActions): FeedbackData {
  if (action.type === Actions.update) {
    return action.feedback;
  }

  return state;
}
