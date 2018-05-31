import { } from '@uifabric/merge-styles';

export const compactList = (compact: boolean) => [compact && {
  selectors: {
    '& .ms-DetailsRow-fields .ms-DetailsRow-cell': {
      display: 'flex',
      minHeight: 24,
      padding: '4px 6px',
      alignItems: 'center'
    },
    '& .ms-Button': {
      maxHeight: 24
    },
    '& .ms-Toggle': {
      marginBottom: 1
    }
  }
}];
