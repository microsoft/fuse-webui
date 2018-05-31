/* tslint:disable:no-use-before-declare */
import { lazy } from '@fuselab/ui-shared';
import { IconNames } from '@uifabric/icons';
import { BaseComponent, IBaseProps } from '@uifabric/utilities/lib';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenu, IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import * as React from 'react';
import { commandBarClassNames, Preference } from '../themes';
import { History, WithRouter } from '../withRouter';
import classNames from './form.classNames';
/* tslint:enable:no-use-before-declare */

export interface FormAttributes<T> extends Preference {
  entity: T;
  rollback: T;
  id?: string;
}

export interface FormActions<T> {
  load(id: string);
  discard(rollback: T, history: History);
  save(entity: T);
  delete(entity: T);
}

export enum FormState {
  loading,
  loaded,
  saving,
  saved,
  deleting,
  deleted,
  error
}

export interface EditorState {
  status: FormState;
}

export interface IFormEditor {
  update(state: FormState);
}

export type FormProps<T> = FormAttributes<T> & FormActions<T> & WithRouter<FormAttributes<T> & FormActions<T>> & IBaseProps<IFormEditor>;

const iconSave: IconNames = 'Save' as IconNames;
const iconRemove: IconNames = 'Remove' as IconNames;
const iconDiscard: IconNames = 'Undo' as IconNames;

/**
 * Generic form editor
 */
export class GenericForm<T> extends BaseComponent<FormProps<T>, EditorState> implements IFormEditor {
  constructor(props: FormProps<T>) {
    super(props);
    this.state = { status: FormState.loading };
  }

  public componentDidMount() {
    this.update(FormState.loading);
    this.props.load(this.params.id);
  }

  public update(state: FormState) {
    this.setState({ status: state });
  }

  public componentDidUpdate(prevProps: FormProps<T>, prevState: EditorState) {
    if (this.state.status === FormState.deleted || this.state.status === FormState.saved) {
      this.props.history.goBack();
    }
  }

  public render(): JSX.Element {
    return (
      <section>
        <CommandBar
          className={commandBarClassNames(this.props.compact).root}
          items={this.formButtons}
        />
        <div className={classNames().formBody}>
          {this.props.children}
        </div>
      </section>
    );
  }

  private get params(): FormAttributes<T> {
    return this.props.match ? this.props.match.params : this.props;
  }

  @lazy()
  private get formButtons(): IContextualMenuItem[] {
    return [
      { key: 'save', name: 'Save', iconProps: { iconName: iconSave }, onClick: this.onSave },
      { key: 'discard', name: 'Discard', iconProps: { iconName: iconDiscard }, onClick: this.onDiscard },
      { key: 'delete', name: 'Remove', iconProps: { iconName: iconRemove }, onClick: this.onDelete }
    ];
  }

  @lazy()
  private get onSave(): (ev?: React.MouseEvent<HTMLElement>, item?: IContextualMenu) => void {
    return e => {
      this.update(FormState.saving);
      this.props.save(this.props.entity);
    };
  }

  @lazy()
  private get onDiscard(): (ev?: React.MouseEvent<HTMLElement>, item?: IContextualMenu) => void {
    return e => {
      this.props.discard(this.props.rollback, this.props.history);
    };
  }

  @lazy()
  private get onDelete(): (ev?: React.MouseEvent<HTMLElement>, item?: IContextualMenu) => void {
    return e => {
      this.update(FormState.deleting);
      this.props.delete(this.props.entity);
    };
  }
}
