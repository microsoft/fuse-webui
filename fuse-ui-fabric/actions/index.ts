import { AnnotationActions } from './annotations';
import { Actions as AsyncStateActions } from './asyncState';
import { EntityActions } from './entity';
import { Actions as _feedback } from './feedback';
import { Actions as _login } from './login';
import { ThemeActions } from './theme';
import { Actions as _tree } from './tree';

export * from './entity';
export * from './login';
export * from './theme';

export namespace ActionNames {
  export import login = _login;
  export import tree = _tree;
  export import entity = EntityActions;
  export import theme = ThemeActions;
  export import annotations = AnnotationActions;
  export import asyncState = AsyncStateActions;
  export import feedback = _feedback;
}
