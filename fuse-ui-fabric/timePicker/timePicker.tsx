import { lazy } from '@fuselab/ui-shared/lib';
import { BaseComponent, IBaseProps } from '@uifabric/utilities/lib';
import { TextField } from 'office-ui-fabric-react/lib-commonjs/TextField';
import * as React from 'react';
import { EnumDropdown, EnumDropdownProps } from '../enumDropdown';
import classNames from './timePicker.classNames';

export enum TimeNotation {
  AM,
  PM,
  D24H // 24 hour day
}

export interface ClockTime {
  hour: number;
  minute: number;
  notation: TimeNotation;
}

export interface TimePickerAttributes {
  time: ClockTime;
}

export interface TimePickerActions {
  change(ClockTime);
}

export type TimePickerProps = IBaseProps<TimePicker> & TimePickerAttributes & TimePickerActions;

let NotationDropdown: new (props: EnumDropdownProps<TimeNotation>) => React.Component<EnumDropdownProps<TimeNotation>> = EnumDropdown;

export interface TimePickerState {
  notation: TimeNotation;
}

/**
 * editor for time in a day
 */
export class TimePicker extends BaseComponent<TimePickerProps, TimePickerState> {
  private _errorMessages: { [key: string]: string } = {};

  constructor(props: TimePickerProps) {
    super(props);
    this.state = { notation: props.time.notation };
  }

  public render(): JSX.Element {
    return (
      <div className={classNames().root}>
        <TextField
          className={classNames().text}
          placeholder='hh'
          type='number'
          min={0}
          max={this.maxHour}
          step={1}
          suffix='H'
          value={`${this.displayHour}`}
          onChanged={this.changeHour}
          errorMessage={this._errorMessages.hour}
        />
        <TextField
          className={classNames().text}
          placeholder='mm'
          type='number'
          min={0}
          max={59}
          step={1}
          suffix='M'
          value={`${this.props.time.minute}`}
          onChanged={this.changeMinute}
          errorMessage={this._errorMessages.minute}
        />
        <NotationDropdown val={this.state.notation} change={this.changeNotation} enumType={TimeNotation} />
      </div>
    );
  }

  @lazy()
  private get changeHour(): (x: string) => void {
    return x => {
      this.handleChange('hour', x);
    };
  }

  @lazy()
  private get changeMinute(): (x: string) => void {
    return x => {
      this.handleChange('minute', x);
    };
  }

  private get maxHour(): number {
    return this.props.time.notation === TimeNotation.D24H ? 23 : 12;
  }

  @lazy()
  private get changeNotation(): (x: TimeNotation) => void {
    return x => {
      this.setState({ notation: x });
      this.props.change(convertNotation(this.props.time, x));
    };
  }

  private get displayHour(): number {
    return convertNotation(this.props.time, this.state.notation).hour;
  }

  private handleChange(field: keyof ClockTime, v: string) {
    const val = parseInt(v, 10);

    if (!this.validateNumber(field, val)) {
      const max = field === 'hour' ? this.maxHour : 59;
      this._errorMessages[field] = `integer from 0 to ${max}`;
      this.forceUpdate();

      return;
    }

    this._errorMessages[field] = undefined;
    switch (field) {
      case 'hour':
        this.props.change({ ...this.props.time, hour: val });
        break;
      case 'minute':
        this.props.change({ ...this.props.time, minute: val });
        break;
      default:
    }
  }

  private validateNumber(field: keyof ClockTime, val: number) {
    if (isNaN(val) || val < 0) {
      return false;
    }

    return field === 'hour' ? val <= this.maxHour : val <= 59;
  }
}

export function getD24hour(time: ClockTime): number {
  if (time.notation === TimeNotation.D24H || time.notation === TimeNotation.AM) {
    return time.hour;
  }

  return time.hour + 12;
}

export function getClock(time: Date): ClockTime {
  return {
    hour: time.getUTCHours(),
    minute: time.getUTCMinutes(),
    notation: TimeNotation.D24H
  };
}

export function convertNotation(time: ClockTime, notation: TimeNotation): ClockTime {
  if (time.notation === notation) {
    return time;
  }

  if (notation === TimeNotation.AM && time.hour > 12) {
    return { ...time, hour: time.hour - 12, notation };
  }

  if (notation === TimeNotation.PM && time.notation === TimeNotation.D24H && time.hour > 12) {
    return { hour: time.hour - 12, minute: time.minute, notation };
  }

  return { ...time, notation };
}
