import { DefaultButton, IconButton } from 'office-ui-fabric-react/lib-commonjs/Button';
import { Checkbox } from 'office-ui-fabric-react/lib-commonjs/Checkbox';
import { Link } from 'office-ui-fabric-react/lib-commonjs/Link';
import { TextField } from 'office-ui-fabric-react/lib-commonjs/TextField';
import * as React from 'react';
import { FeedbackData, FeedbackSentiment } from '../models';
import classNames from './feedbackPanel.classNames';

export interface FeedbackAttributes {
  supportUri: string;
  serviceName: string;
  communityUri?: string;
  privacyUri?: string;
  feedback: FeedbackData;
}

export interface FeedbackActions {
  updateFeedback(feedback: FeedbackData);
  submitFeedback(feedback: FeedbackData);
}

export type FeedbackProps = FeedbackAttributes & FeedbackActions;

function renderCommunityFlyer(props: FeedbackProps): JSX.Element {
  if (!props.communityUri || !props.serviceName) {
    return null;
  }

  return (
    <p>
      Passionate about shaping the future of {props.serviceName}?{' '}
      <Link href={props.communityUri} target='_blank'>Join our community</Link>
    </p>
  );
}

export const FeedbackFooter = (props: FeedbackProps) => {
  const sendFeedback = () => props.submitFeedback(props.feedback);
  const toggleContactable = (x, contactable) => props.updateFeedback({ ...props.feedback, contactable });

  return (
    <div>
      {renderCommunityFlyer(props)}
      <Checkbox label='Microsoft can email you about your feedback' onChange={toggleContactable} />
      <Link href={props.privacyUri} target='_blank'>Privacy</Link>
      <p>
        <DefaultButton primary={true} onClick={sendFeedback} >Submit feedback</DefaultButton>
      </p>
    </div>
  );
};

export const FeedbackForm = (props: FeedbackProps) => {
  const clickHappy = () => props.updateFeedback({ ...props.feedback, ...{ sentiment: FeedbackSentiment.happy } });
  const clickUnhappy = () => props.updateFeedback({ ...props.feedback, ...{ sentiment: FeedbackSentiment.unhappy } });
  const updateComment = (comment: string) => props.updateFeedback({ ...props.feedback, comment });
  const iconStyle = { icon: { fontSize: 32 } };

  return (
    <div>
      <p>If you need help, please contact <Link href={props.supportUri} target='_blank'>Support</Link></p>
      <hr />
      <p>Are you satisfied with your experience?</p>
      <div>
        <IconButton
          className={classNames().sentiment}
          iconProps={{ iconName: 'Emoji2' }}
          ariaLabel='Yes'
          checked={props.feedback.sentiment === FeedbackSentiment.happy}
          onClick={clickHappy}
          styles={iconStyle}
        />
        <IconButton
          className={classNames().sentiment}
          iconProps={{ iconName: 'EmojiDisappointed' }}
          ariaLabel='No'
          checked={props.feedback.sentiment === FeedbackSentiment.unhappy}
          onClick={clickUnhappy}
          styles={iconStyle}
        />
      </div>
      <TextField
        multiline={true}
        placeholder='Tell us about your experience...'
        autoAdjustHeight={true}
        value={props.feedback.comment || ''}
        onChanged={updateComment}
      />
    </div>
  );
};
