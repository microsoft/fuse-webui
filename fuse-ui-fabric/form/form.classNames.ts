import { mergeStyleSets } from '@uifabric/merge-styles';

const formClassNames = (): { [key: string]: string } => mergeStyleSets({
  formBody: {},
  formField: ['ms-GridCol', 'ms-sm12', 'ms-md8', 'ms-lg6', {
    marginBottom: 8,
    selectors: {
      '& > div:first-child': {
        marginBottom: 4
      },
      '& .ms-Dropdown-container': {
        display: 'flex'
      }
    }
  }],
  inlineField: ['ms-GridCol', 'ms-sm12', 'ms-md8', 'ms-lg6', {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 12,
    selectors: {
      '& >div:first-child': {
        textAlign: 'right',
        marginRight: 8,
        minWidth: 120
      }
    }
  }]
});

export default formClassNames;
