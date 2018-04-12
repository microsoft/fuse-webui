import { lazy } from '@fuselab/ui-shared';
import { BaseComponent } from '@uifabric/utilities/lib';
import * as React from 'react';
import classNames from './tree.classNames';
import { ITreeNodeView, TreeNode, TreeNodeViewProps } from './tree.types';

export interface TreeNodeState {
  selected: boolean;
  expanded: boolean;
  editing: boolean;
}
/**
 * tree node view
 */
export class TreeNodeView<T> extends BaseComponent<TreeNodeViewProps<T>, TreeNodeState> implements ITreeNodeView {
  private _nameSpan: HTMLSpanElement;
  private _children: ITreeNodeView[];

  constructor(props: TreeNodeViewProps<T>) {
    super(props);
    this.state = { selected: false, expanded: false, editing: false };
  }

  public select = (selected: boolean) => {
    this.setState({ selected });
    if (!selected && this.state.editing) {
      this.setState({ editing: false });
    }
  }

  public expand = () => {
    this.setState({ expanded: true });
  }
  public collapse = () => {
    this.setState({ expanded: false });
  }
  public edit = () => {
    this.setState({ editing: true });
  }

  public componentDidMount() {
    if (this.node.type === 'container') {
      if (this.props.data.level === 0) {
        this.expand();
        this.props.loadContainer(this.node).then(
          () => {
            this.forceUpdate();
          },
          err => {
            // ignore
          });
      }
    }

    this.props.mounted(this);
  }

  public componentWillUnmount() {
    if (this.state.selected) {
      this.props.select(null);
    }
  }

  public componentDidUpdate(prevProps: TreeNodeViewProps<T>, prevState: TreeNodeState) {
    if (this.state.editing && !prevState.editing && this._nameSpan) {
      // select text
      this.selectEditingText();
      this._nameSpan.focus();
    }
  }

  public render(): JSX.Element {
    const node = this.props.data;
    const level = node.level;

    return (
      <div>
        <div className={this.nodeSelectClassName} onClick={this.selectNode} onContextMenu={this.toggleContextMenu} role='menu'>
          <div className={classNames(this.props.getStyle(this), this.theme)[`level_${level}`]}>
            {this.renderIcon()}
            <span
              className={classNames(this.props.getStyle(this), this.theme).name}
              ref={this.setName}
              contentEditable={this.state.editing}
              onKeyPress={this.nameKeyPress}
              onKeyDown={this.keyDown}
              role={this.state.editing ? 'textbox' : undefined}
            >
              {this.props.data.name}
            </span>
          </div>
        </div>
        {this.renderChildren()}
      </div>
    );
  }

  public get elementRef(): HTMLElement {
    return this._nameSpan;
  }

  public get node(): TreeNode<T> {
    return this.props.data;
  }

  public get parent(): ITreeNodeView {
    return this.props.parent;
  }

  public get children(): Iterator<ITreeNodeView> {
    return this.iterateChildren();
  }

  public get expanded(): boolean {
    return this.state.expanded;
  }

  public get editing(): boolean {
    return this.state.editing;
  }

  public get theme(): 'dark' | 'light' {
    return this.props.theme;
  }

  private * iterateChildren() {
    if (this._children && this._children.length) {
      for (let c of this._children) {
        yield c;
      }
    }
  }

  private get nodeSelectClassName(): string {
    const styles = this.props.getStyle(this);
    const names = classNames(styles, this.theme);
    if (this.state.selected) {
      return `${names.root} ${names.rootSelected}`;
    }

    return names.root;
  }

  private get nodeIconClassName(): string {
    const iconClass = this.node.type === 'container'
      ? `container${this.state.expanded ? 'Expanded' : 'Collapsed'}`
      : 'leaf';

    return classNames(this.props.getStyle(this), this.theme)[iconClass];
  }

  private renderIcon(): JSX.Element {
    if (this.node.type === 'container') {
      return <i className={this.nodeIconClassName} onClick={this.toggleNode} role='button' />;
    }

    return <i className={this.nodeIconClassName} />;
  }

  private renderChildren(): JSX.Element[] {
    if (!this.state.expanded || this.node.type === 'leaf') {
      return null;
    }
    this._children = [];

    return this.node.children.map((x, i) => {
      return (
        <TreeNodeView
          {...this.props}
          key={x.name || '__new'}
          data={x}
          parent={this}
          //tslint:disable-next-line
          componentRef={c => this._children[i] = c}
        />);
    });
  }

  private selectEditingText(): void {
    const range = document.createRange();
    range.selectNodeContents(this._nameSpan);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  private unselectAll(): void {
    const selection = window.getSelection();
    selection.removeAllRanges();
  }

  @lazy()
  private get toggleNode(): React.MouseEventHandler<HTMLElement> {
    return x => {
      x.preventDefault();
      x.stopPropagation();
      this.setState({ expanded: !this.state.expanded });
    };
  }

  @lazy()
  private get toggleContextMenu(): React.MouseEventHandler<HTMLElement> {
    return x => {
      x.preventDefault();
      x.stopPropagation();
      this.props.toggleContextMenu(this, x);
    };
  }

  @lazy()
  private get selectNode(): React.MouseEventHandler<HTMLElement> {
    return x => {
      x.preventDefault();
      x.stopPropagation();
      this.props.select(this);
    };
  }

  @lazy()
  private get setName(): (x: HTMLSpanElement) => void {
    return x => {
      this._nameSpan = x;
    };
  }

  @lazy()
  private get nameKeyPress(): React.KeyboardEventHandler<HTMLSpanElement> {
    return x => {
      if (x.key === 'Enter') {
        x.preventDefault();
        const val = x.currentTarget.textContent.trim();
        this.node.name = val;
        this.setState({ editing: false });
        this.props.blur();
      }
    };
  }

  @lazy()
  private get keyDown(): React.KeyboardEventHandler<HTMLSpanElement> {
    return async x => {
      // if ESC
      if (x.keyCode === 27) {
        this.unselectAll();
        if (!this.node.name) {
          await this.props.remove(this.node);
        } else {
          this._nameSpan.textContent = this.node.name;
          this.setState({ editing: false });
        }
        this.props.blur();
      }
    };
  }
}
