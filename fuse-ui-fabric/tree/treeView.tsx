import { createDeferred, first, last, lazy, trackEvent } from '@fuselab/ui-shared';
import { BaseComponent, KeyCodes } from '@uifabric/utilities/lib';
import { ContextualMenu, IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import * as React from 'react';
import { ConfirmDialog, IConfirmDialog } from '../dialogs';
import classNames from './tree.classNames';
import { ITreeNodeView, ITreeView, TreeNode, TreeViewProps } from './tree.types';
import { TreeNodeView } from './treeNode';

export interface TreeViewState {
  contextVisible: boolean;
  contextTarget: HTMLElement | string | MouseEvent;
}
/**
 * TreeView container
 */
export class TreeView<T> extends BaseComponent<TreeViewProps<T>, TreeViewState> implements ITreeView {
  private root: ITreeNodeView;
  private selected: ITreeNodeView;
  private confirmDialog: IConfirmDialog;
  private rootRef: HTMLElement;

  constructor(props: TreeViewProps<T>) {
    super(props);
    this.state = { contextVisible: false, contextTarget: null };
  }

  public componentDidUpdate(prevProps: TreeViewProps<T>, prevState: TreeViewState) {
    const prevData = prevProps.selectedData;
    const curData = this.props.selectedData;
    const needUpdateSelection = prevData !== curData ||
      ((this.props.selectedData || this.state.contextVisible) && !this.selected);

    if (needUpdateSelection) {
      // the selected tree node view got unmounted
      const selected = this.props.selectedData;
      // find the matching tree node view
      const treeNodes = this.iterateTreeNodeViews();
      let iter = treeNodes.next();

      while (!iter.done) {
        const c = iter.value;
        if (c.node === selected) {
          this.select(c);
          if (!selected.name) {
            this.selected.edit();
          }
          break;
        }
        iter = treeNodes.next();
      }
    }
  }

  public render(): JSX.Element {
    let { componentRef, ...nodeProps } = this.props;

    return (
      <section
        className={classNames({ icon: null, treeRoot: {} }, this.props.theme, this.props.hideRoot).container}
        onKeyDown={this.handleKey}
        role='menu'
        tabIndex={0}
        ref={this.setRootRef}
      >
        <TreeNodeView
          {...nodeProps}
          componentRef={this.setRoot}
          data={this.node}
          select={this.selectNode}
          toggleContextMenu={this.toggleNodeContextMenu}
          blur={this.setFocus}
          mounted={this.setMounted}
        />
        {this.renderContextMenu()}
        {this.renderConfirmDelete()}
      </section>
    );
  }

  public select(node: ITreeNodeView) {
    // select a single node
    if (this.selected) {
      this.selected.select(false);
    }

    if (node) {
      this.selected = node;
      this.selected.select(true);
      this.props.selectNode(node.node);
      if (this.state.contextVisible && !this.state.contextTarget) {
        this.setState({ contextTarget: node.elementRef });
      }
    } else {
      this.selected = null;
    }
  }

  public focus() {
    if (this.rootRef) {
      this.rootRef.focus();
    }
  }

  private renderContextMenu(): JSX.Element {
    if (this.props.readonly) {
      return null;
    }

    const target = this.state.contextTarget || (this.selected && this.selected.elementRef);
    if (!this.state.contextVisible || !target) {
      return null;
    }

    return (
      <ContextualMenu
        target={target}
        isBeakVisible={false}
        items={this.contextMenuItems}
        onItemClick={this.handleContextMenu}
        onDismiss={this.dismissContextMenu}
      />
    );
  }

  private renderConfirmDelete(): JSX.Element {
    return <ConfirmDialog prompt='' componentRef={this.setConfirmDialog} />;
  }

  @lazy()
  private get setConfirmDialog(): (x: IConfirmDialog) => void {
    return x => {
      this.confirmDialog = x;
    };
  }

  private async confirmThenDelete(): Promise<boolean> {
    if (this.props.readonly) {
      return Promise.resolve(false);
    }

    const x = createDeferred<boolean>();

    this.confirmDialog.setPrompt(`Deleting ${this.selected.node.name}?`);
    this.confirmDialog.setResponse(x);
    this.confirmDialog.setShowing(true);

    const f = await x.promise;
    this.confirmDialog.setShowing(false);
    if (f) {
      const parent = this.selected.parent;
      const next = this.findNext(this.selected) || this.findPrev(this.selected);
      await this.props.remove(this.selected.node);
      this.select(next);
      if (parent) {
        parent.forceUpdate();
      } else {
        this.forceUpdate();
      }
    }

    return f;
  }

  private get contextMenuItems(): IContextualMenuItem[] {
    const commonEdits = [
      { key: 'rename', name: 'Rename' },
      { key: 'remove', name: 'Delete' }
    ];

    if (this.selected && this.selected.node.type === 'container') {
      return [
        { key: 'newLeaf', name: 'New File' },
        { key: 'newContainer', name: 'New Folder' },
        ...commonEdits
      ];
    }

    return commonEdits;
  }

  @lazy()
  private get selectNode(): (x: ITreeNodeView) => void {
    return x => {
      this.select(x);
    };
  }

  @lazy()
  private get toggleNodeContextMenu(): (x: ITreeNodeView, e: React.MouseEvent<HTMLElement>) => void {
    return (x, e) => {
      if (this.selected !== x) {
        this.select(x);
      }
      if (this.state.contextVisible) {
        this.setState({ contextVisible: false });
      } else {
        trackEvent('treeView.contextMenu.show', {});
        this.setState({ contextVisible: true, contextTarget: e.nativeEvent });
      }
    };
  }

  private insertNodeOf(nodeType: 'container' | 'leaf'): void {
    const parent = this.selected.node;
    if (parent.type === 'container') {
      this.selected.expand();
      const node = { name: '', type: nodeType };
      this.props.insertAt(parent, node as any);
    }
  }

  private * iterateTreeNodeViews(): Iterator<ITreeNodeView> {
    let queue = [];
    queue.push(this.root);

    while (queue.length > 0) {
      let head = queue.shift();
      let children = head.children;
      let iter = children.next();

      while (!iter.done) {
        queue.push(iter.value);
        iter = children.next();
      }

      yield head;
    }
  }

  @lazy()
  private get handleContextMenu(): (e: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => void {
    return async (e, x) => {
      switch (x.key) {
        case 'newContainer':
          this.insertNodeOf('container');
          break;
        case 'newLeaf':
          this.insertNodeOf('leaf');
          break;
        case 'rename':
          this.selected.edit();
          break;
        case 'remove':
          await this.confirmThenDelete();
          break;
        default:
      }
      this.setState({ contextVisible: false });
    };
  }

  @lazy()
  private get dismissContextMenu(): (e: any, dismissAll?: boolean) => void {
    return (e, f) => {
      this.setState({ contextVisible: false });
    };
  }

  @lazy()
  private get setFocus(): () => void {
    return () => {
      this.focus();
    };
  }

  @lazy()
  private get setMounted(): (x: ITreeNodeView) => void {
    return x => {
      if (this.selected === null && this.props.selectedData === x.node) {
        this.select(x);
        this.forceUpdate();
      }
    };
  }

  private get node(): TreeNode<T> {
    return this.props.data;
  }

  private get setRoot(): (x: ITreeNodeView) => void {
    return x => {
      this.root = x;
      if (this.props.hideRoot && this.root) {
        this.root.expand();
      }
    };
  }

  private handleCollapse() {
    if (this.selected != null) {
      if (this.selected.node.type === 'container') {
        // collapse the container if expanded
        if (this.selected.expanded) {
          this.selected.collapse();
        }
      } else {
        const parent = this.selected.parent;
        if (!this.props.hideRoot || this.root !== parent) {
          this.select(parent);
          parent.collapse();
        }
      }
    }
  }

  private async handleKeyCommands(e: React.KeyboardEvent<HTMLElement>) {
    const code = e.keyCode;
    let isHandled = true;
    let nextNode: ITreeNodeView = null;

    if (!this.selected || this.selected.editing) {
      return;
    }

    switch (code) {
      case KeyCodes.up:
        nextNode = this.findPrev(this.selected);
        if (nextNode) {
          this.selectNode(nextNode);
        }
        break;
      case KeyCodes.down:
        nextNode = this.findNext(this.selected);
        if (nextNode) {
          this.selectNode(nextNode);
        }
        break;
      case KeyCodes.del:
        await this.confirmThenDelete();
        break;
      case 113: //F2
        this.selected.edit();
        break;
      case KeyCodes.right:
        if (this.selected != null && this.selected.node.type === 'container') {
          // expand container if not already expanded.
          if (!this.selected.expanded) {
            this.selected.expand();
          }
        }
        break;
      case KeyCodes.left:
        this.handleCollapse();
        break;
      case 121: //F10
        if (e.shiftKey) {
          this.setState({ contextVisible: true, contextTarget: null });
        }
        break;
      default:
        isHandled = false;
    }

    if (isHandled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  private findPrev(cur: ITreeNodeView): ITreeNodeView {
    const parent = cur.parent;
    if (!parent) {
      return null;
    }

    const children = parent.children;
    let iter = children.next();
    let prev: ITreeNodeView = parent;

    while (!iter.done) {
      if (iter.value === cur) {
        if (prev.expanded && prev !== parent) {
          return last(prev.children) || prev;
        }

        return prev;
      }
      prev = iter.value;
      iter = children.next();
    }

    return null;
  }

  private findNext(cur: ITreeNodeView, skipChildren: boolean = false): ITreeNodeView {
    if (cur.expanded && !skipChildren) {
      const firstChild = first(cur.children);
      if (firstChild) {
        return firstChild;
      }
    }

    const parent = cur.parent;
    if (!parent) {
      return null;
    }

    const children = parent.children;
    let iter = children.next();
    let prev: ITreeNodeView = null;

    while (!iter.done) {
      if (prev === cur) {
        return iter.value;
      }
      prev = iter.value;
      iter = children.next();
    }

    return this.findNext(parent, true);
  }

  @lazy()
  private get handleKey(): React.KeyboardEventHandler<HTMLElement> {
    return async e => {
      await this.handleKeyCommands(e);
    };
  }

  @lazy()
  private get setRootRef(): (x: HTMLElement) => void {
    return x => {
      this.rootRef = x;
    };
  }
}
