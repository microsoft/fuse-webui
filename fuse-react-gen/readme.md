# General purpose code generator from template

fuse-gen is a general purpose template based code generator

## Get started

```bash
npm install -g @fuselab/react-gen
```

## Basic usage

The <kbd>new</kbd> sub command has built-in templates to support common usage scenarios of bootstrapping React-redux app.

### Create starter React-redux-uifabric app

```bash
fuse-gen new -k app -a [appName]
# answer prompts about the configuration of the your app
```

### Create new redux component

```bash
cd {appRoot}\components
fuse-gen new -k component -a .
# specify the name of your component
```

### create new redux action

```bash
cd {appRoot}\actions
fuse-gen new -k action -a .
# answer prompts about the actions to be created
```

### create new yargs based cli

```bash
fuse-gen new -k cli -a .
```

## Advanced usage

The <kbd>add</kbd> sub command allows you use custom templates to

```bash
fuse-gen add --source [file|folder] --target [file|folder]
```

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
