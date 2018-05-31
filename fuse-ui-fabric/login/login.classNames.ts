import { mergeStyleSets } from '@uifabric/merge-styles';

const loginClassNames = (): { [key: string]: string } => mergeStyleSets({
  button: {
    display: 'block'
  }
});

export default loginClassNames;
