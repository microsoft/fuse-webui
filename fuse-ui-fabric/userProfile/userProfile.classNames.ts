import { mergeStyleSets } from '@uifabric/merge-styles';

const userProfileClassNames = (): { [key: string]: string } => mergeStyleSets({
  root: {
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    paddingRight: 4
  },
  loginLink: {
    lineHeight: 32
  },
  darkThemeButton: {
    backgroundColor: 'black',
    color: 'white',
    selectors: {
      ':hover': {
        backgroundColor: '#575757',
        color: 'white'
      },
      ':active': {
        backgroundColor: '#373737',
        color: 'white'
      }
    }
  }
});

export default userProfileClassNames;
