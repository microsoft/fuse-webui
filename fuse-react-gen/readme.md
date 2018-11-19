# General purpose code generator from template

react-gen is a general purpose template based code genertor

## Create template

1. Create template folder structure. Use <kbd>{{name}}</kbd> to place variable entity in your template file content.
1. Also use <kbd>{{name}}</kbd> in file and folder names to change the generated file names

### example

```bash
\component
   \{{component}}.tsx
   \index.ts
   \{{component}}Classes.tx
```

{{component}}.tsx

```typescript
export interface {{Component}}Attributes {
  id: string;
}

export interface {{Component}}Actiosn {
  save(): void;
}

export type {{Component}}Props = {{Component}}Attributes & {{Component}}Actions;

export class {{Component}} extends ReactCompoent<{{Component}}Props> {
}
```

## Use react-gen

```bash
react-gen --source {path to template file/folder} --target {path to target source file/folder} (--{fieldName} {filedValue})*
```

### Example

```bash
bin\react-gen --source ".\examples\{{app}}" --target ..\..\cortana --app cortana --port 3010 --version 1.3.0--app cortana --port 3010 --version 1.3.0 --package @intercom/cortana
```
