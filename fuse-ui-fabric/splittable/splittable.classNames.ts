import { mergeStyleSets } from '@uifabric/merge-styles';

const splittableClassNames = (orientation: 'vertical' | 'horizontal'): { [key: string]: string } => mergeStyleSets(<any>{
  root: {
    display: 'flex',
    flexWrap: 'no-wrap',
    flexDirection: orientation === 'vertical' ? 'row' : 'column'
  },
  divider: {
    cursor: orientation === 'vertical' ? 'ew-resize' : 'ns-resize',
    borderStyle: 'solid',
    width: orientation === 'vertical' ? 5 : 'auto',
    height: orientation === 'vertical' ? 'auto' : 5,
    background: 'lightgray',
    boxSizing: 'border-box',
    borderWidth: orientation === 'vertical' ? '0px 2px' : '2px 0px',
    borderColor: 'white',
    selectors: {
      ':hover': {
        borderColor: 'lightgray'
      }
    }
  },
  part: {
    padding: orientation === 'vertical' ? '0 12px' : '12px 0'
  }
});

export default splittableClassNames;
