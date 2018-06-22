import { mergeStyleSets } from '@uifabric/merge-styles';

const notificationClassNames = (): { [key: string]: string } => mergeStyleSets({
  root: {
    marginBottom: 20
  },
  infoIcon: {
    fontSize: 20
  },
  header: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    selectors: {
      h3: {
        fontWeight: 'normal',
        flexGrow: 1,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        margin: '0 4px'
      }
    }
  },
  content: {
    maxHeight: 64,
    overflowY: 'hidden'
  }
});

export default notificationClassNames;
