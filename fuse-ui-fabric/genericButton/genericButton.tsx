import { lazy } from '@fuselab/ui-shared/lib';
import { ActionButton, CommandButton, IButtonProps } from 'office-ui-fabric-react/lib-commonjs/Button';
import * as React from 'react';

export interface ButtonProps<T> extends IButtonProps {
  item: T;
  itemClicked(t: T);
}

/**
 * Action button with context on click
 */
export class GenericButton<T> extends ActionButton {
  constructor(props: ButtonProps<T>) {
    super(props);
  }

  public render(): JSX.Element {
    return <CommandButton {...this.props} onClick={this.handleClick} />;
  }

  @lazy()
  private get handleClick(): React.MouseEventHandler<any> {
    return x => {
      const props: ButtonProps<T> = this.props as any;
      props.itemClicked(props.item);
    };
  }
}
