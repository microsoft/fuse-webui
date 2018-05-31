import { lazy } from '@fuselab/ui-shared';
import { BaseComponent } from '@uifabric/utilities/lib';
import { DatePicker, IDatePickerProps } from 'office-ui-fabric-react/lib/DatePicker';
import * as React from 'react';
import { ClockTime, getD24hour, TimePicker, TimePickerProps } from '../timePicker';
import classNames from './datetimePicker.classNames';

export interface DatetimePickerAttributes {
  timeProps: TimePickerProps;
  dateProps: IDatePickerProps;
}

export interface DatetimePickerActions {
  change(x: Date);
}

export type DatetimePickerProps = DatetimePickerActions & DatetimePickerAttributes;

/**
 * UTC date and  time picker
 */
export class DatetimePicker extends BaseComponent<DatetimePickerProps> {
  private _clock: ClockTime;
  private _date: Date;

  constructor(props: DatetimePickerProps) {
    super(props);
    this._clock = props.timeProps.time;
    this._date = props.dateProps.value;
  }

  public render(): JSX.Element {
    return (
      <div className={classNames().root}>
        <DatePicker {...this.props.dateProps} onSelectDate={this.changeDate} />
        <TimePicker {...this.props.timeProps} change={this.changeClock} />
      </div>
    );
  }

  @lazy()
  private get changeDate(): (x: Date) => void {
    return x => {
      // update date
      this._date = x;
      this.props.change(this.datetime);
    };
  }

  @lazy()
  private get changeClock(): (x: ClockTime) => void {
    return x => {
      // update clock
      this._clock = x;
      this.props.change(this.datetime);
    };
  }

  private get datetime(): Date {
    const date = this._date;
    const time = this._clock;

    return new Date(Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      getD24hour(time),
      time.minute
    ));
  }
}
