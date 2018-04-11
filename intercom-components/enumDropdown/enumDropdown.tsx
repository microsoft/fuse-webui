import { enumNames, lazy } from '@intercom/ui-shared';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import * as React from 'react';

export interface DropdownAttributes<T> {
  val: T;
  enumType: object;
}

export interface DropdownActions<T> {
  change(t: T);
}

export type EnumDropdownProps<T> = DropdownAttributes<T> & DropdownActions<T>;

/**
 * render enum type as dropdown
 */
export class EnumDropdown<T> extends React.Component<EnumDropdownProps<T>> {
  constructor(props: EnumDropdownProps<T>) {
    super(props);
  }

  public render(): JSX.Element {
    const key: any = this.props.val;

    return (
      <Dropdown
        selectedKey={key}
        onChanged={this.changeSelection}
        options={this.options}
      />);
  }

  private get options(): IDropdownOption[] {
    return enumNames(this.props.enumType).map(
      key => {
        return { key: this.props.enumType[key] as number, text: key };
      });
  }

  @lazy()
  private get changeSelection(): (option: IDropdownOption, index: number) => void {
    const enumType = this.props.enumType;

    return (option, index) => {
      this.props.change(enumType[enumType[option.key]]);
    };
  }
}
