import { mergeStyleSets } from '@uifabric/merge-styles';
import { IStyle, IStyleSet } from '@uifabric/styling';

const indentSpace = 16;

function indent(level: number) {
  return {
    marginLeft: indentSpace * level,
    display: 'flex',
    'align-items': 'center'
  };
}

function indents(total: number): IStyle[] {
  let result = [];
  for (let i = 0; i < total; i++) {
    result.push(indent(i));
  }

  return result;
}

function indentStyles(maxLevel: number, hideRoot: boolean): { [key: string]: IStyle } {
  let result: { [key: string]: IStyle } = {};
  let index = 0;
  let seq = indents(maxLevel);
  for (let level of seq) {
    result[`level_${hideRoot ? (index + 1) : index}`] = level;
    index++;
  }

  return result;
}

function rootStyles(s: IStyleSet, theme: 'dark' | 'light'): IStyleSet {
  return {
    container: {
      outline: 'none',
      backgroundColor: theme === 'dark' ? '#222' : undefined,
      color: theme === 'dark' ? '#f2f2f2' : undefined
    },
    root: {
      padding: '4px 0',
      outline: 'none',
      selectors: {
        i: { marginRight: 2 }
      }
    },
    rootSelected: {
      backgroundColor: theme === 'dark' ? '#444' : '#ccc'
    },
    containerCollapsed: ['ms-Icon', 'ms-Icon--CaretRight8'],
    containerExpanded: ['ms-Icon', 'ms-Icon--CaretRightSolid8', {
      transform: 'rotate(45deg)'
    }],
    leaf: ['ms-Icon', 'ms-Icon--Document', s && s.icon],
    name: {
      outline: 'none'
    },
    hiddenRoot: { display: 'none' }
  };
}

const treeClassNames = (styles: IStyleSet, theme: 'dark' | 'light', hideRoot?: boolean): { [key: string]: string } => mergeStyleSets({
  ...rootStyles(styles, theme),
  ...indentStyles(16, hideRoot)
});

export default treeClassNames;
