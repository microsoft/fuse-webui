# Action template

Assuming model is already defined, action templates helps developer to create boiler-plate action interface and generators

The developer fill in the following questions to generate the actions

1. model type name
1. action namespace prefix
1. list of action verbs

For example, the following spec

```json
{
  "model": "Todo",
  "namespace-prefix": "redux-compose.sample",
  "verbs": [
    "add",
    "remove",
    "assign",
    "start",
    "update",
    "complete"
  ]
}
```

should generate the following action declaration

```typescript

import { Todo } from '../models';

export enum ActionNames {
  add = 'redux-compose.sample.add',
  remove = 'redux-compose.sample.remove'
  //...
}

export Interface AddTodo {
  type: ActionNames.add,
  model: Todo
}

export Interface RemoveTodo {
  type: ActionNames.add,
  model: Todo
}

//...

export const addTodo = (model: Todo) => ({ type: ActionNames.add, model });
export const removeTodo = (model: Todo) => ({ type: ActionNames.remove, model });

//...

```
