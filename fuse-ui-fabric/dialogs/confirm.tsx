import { Deferred, lazy } from '@fuselab/ui-shared';
import { DefaultButton } from 'office-ui-fabric-react/lib-commonjs/Button';
import { Dialog, DialogFooter, DialogType, IDialogContentProps } from 'office-ui-fabric-react/lib-commonjs/Dialog';
import { BaseComponent, IBaseProps } from 'office-ui-fabric-react/lib-commonjs/Utilities';
import * as React from 'react';
import { DialogState, IDialogBase } from './dialog.types';

export interface ConfirmState extends DialogState<boolean> {
  prompt: string;
}

export interface IConfirmDialog extends IDialogBase<boolean> {
  setPrompt(prompt: string);
}

export interface ConfirmProps extends IBaseProps<IConfirmDialog> {
  prompt?: string;
}

/**
 * simple text prompt confirmation modal dialog
 */
export class ConfirmDialog extends BaseComponent<ConfirmProps, ConfirmState>  {
  constructor(props: ConfirmProps) {
    super(props);
    this.state = { showing: false, response: null, prompt: null };
  }

  public setPrompt(prompt: string) {
    this.setState({ prompt: prompt });
  }

  public setShowing(showing: boolean) {
    this.setState({ showing: showing });
  }

  public setResponse(response: Deferred<boolean>) {
    this.setState({ response: response });
  }

  public render(): JSX.Element {
    return (
      <Dialog
        hidden={!this.state.showing}
        onDismiss={this.cancel}
        dialogContentProps={this.dialogContent}
        modalProps={{ isBlocking: true }}
      >
        <DialogFooter>
          <DefaultButton primary={true} onClick={this.confirm} text='Yes' />
          <DefaultButton onClick={this.cancel} text='No' />
        </DialogFooter>
      </Dialog>
    );
  }

  private get dialogContent(): IDialogContentProps {
    return {
      type: DialogType.normal,
      title: this.state.prompt || this.props.prompt
    };
  }

  @lazy()
  private get confirm(): (e: React.MouseEvent<any>) => void {
    return e => {
      if (this.state.response) {
        this.state.response.resolve(true);
      }
    };
  }

  @lazy()
  private get cancel(): (e: React.MouseEvent<any>) => void {
    return e => {
      if (this.state.response) {
        this.state.response.resolve(false);
      }
    };
  }
}
