import { mergeStyleSets } from '@uifabric/merge-styles';

const userProfileClassNames = (): { [key: string]: string } => mergeStyleSets({
  root: {
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    paddingRight: 4
  }
});

export default userProfileClassNames;
