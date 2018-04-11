import { mergeStyleSets } from '@uifabric/merge-styles';

export const commandBarClassNames = (compact: boolean): { [key: string]: string } => mergeStyleSets({
  root: [compact && {
    selectors: {
      '& .ms-CommandBar-primaryCommands': {
        margin: 0
      },
      '& .ms-CommandBar-primaryCommands .ms-CommandBarItem-icon': {
        fontSize: 12
      },
      '& .ms-CommandBar-primaryCommands .ms-CommandBarItem-commandText': {
        fontSize: 12
      },
      '& .ms-CommandBar-primaryCommands .ms-CommandBarItem-link': {
        fontSize: 12
      }
    }
  }]
});
