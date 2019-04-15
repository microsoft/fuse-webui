import { mergeStyleSets } from '@uifabric/merge-styles';

const classNames = {
  root: 'splittable-root',
  divider: 'splittable-divider',
  part: 'splittable-part'
};

const splittableClassNames = (orientation: 'vertical' | 'horizontal'): { [key: string]: string } => mergeStyleSets(<any>{
  root: [
    classNames.root,
    {
      display: 'flex',
      flexWrap: 'no-wrap',
      flexDirection: orientation === 'vertical' ? 'row' : 'column',
      selectors: {
        [`.${classNames.part} &`]: {
          width: orientation === 'vertical' ? 'auto' : '100%',
          height: orientation === 'vertical' ? '100%' : 'auto'
        }
      }
    }],
  divider: [
    classNames.divider,
    {
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
        },
        [`.${classNames.part} & `]: {
          margin: orientation === 'vertical' ? '-12px 0' : '0 -12px'
        }
      }
    }],
  part: [
    classNames.part,
    {
      overflow: 'hidden',
      padding: orientation === 'vertical' ? '0 12px' : '12px 0'
    }]
});

export default splittableClassNames;
