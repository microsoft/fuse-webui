import { mergeStyleSets } from '@uifabric/merge-styles';

const userProfileClassNames = (theme: 'dark' | 'light'): { [key: string]: string } => mergeStyleSets({
  root: {
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    paddingRight: 4
  },
  link: theme === 'dark' && {
    color: 'white !important',
    selectors: {
      '&:hover': {
        color: '#d0d0d0 !important'
      }
    }
  }
});

export default userProfileClassNames;
