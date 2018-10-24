import { enumNames, lazy } from '@fuselab/ui-shared';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib-commonjs/Dropdown';
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
    let names = enumNames(this.props.enumType);
    if (names.length === 0) {
      names = Object.keys(this.props.enumType);
    }

    return names.map(
      key => {
        return { key: this.props.enumType[key] as number, text: key };
      });
  }

  @lazy()
  private get changeSelection(): (option: IDropdownOption, index: number) => void {
    const enumType = this.props.enumType;

    return (option, index) => {
      const key = option.key;
      if (typeof key === 'string') {
        const keyIndex = parseInt(key, 10);
        if (isNaN(keyIndex)) {
          this.props.change(key as any);

          return;
        }
      }
      this.props.change(enumType[enumType[key]]);
    };
  }
}
