import * as stringCases from '@fuselab/ui-shared/lib/stringCases';
import { Answers, prompt, Question } from 'inquirer';
import * as _ from 'underscore';
import { Arguments, Options } from 'yargs';
import * as yargs from 'yargs/yargs';
import { readFileAsObj } from './utils';
export type YargOptions = { [option: string]: Options };

const ignoreFailure = () => {
  // do nothing
};

function asList(text: string): string[] {
  return text.split(',').map(x => x.trim());
}

export async function parseAgainstConfig(
  configPath: string,
  cli: string,
  promptOverride?: (questions: Question[]) => Promise<Answers>): Promise<Arguments> {
  const options = await readFileAsObj<YargOptions>(configPath);
  const args = yargs().exitProcess(false).fail(ignoreFailure).option(options).parse(cli);
  const keys = Object.keys(options);
  const missingKeys = keys.filter(key => !args[key]);

  const questions = missingKeys.map(key => {
    const option = options[key];

    return {
      type: 'input',
      name: key,
      message: option.describe,
      validate: async x => Promise.resolve<boolean>(option.required ? !!x : true)
    };
  });

  const answers: any = promptOverride ? await promptOverride(questions) : await prompt(questions);
  const answerKeys = Object.keys(answers);

  const typedAnswers = answerKeys.reduce(
    (cur, key) => {
      const val = answers[key];
      const option = options[key];

      return {
        ...cur,
        //key: options[key].type === 'array' ? val.split(',').map(x => x.trim()) : val
        [key]: option && option.type === 'array' ? asList(val) : val
      };
    },
    {});

  const argKeys = Object.keys(args);
  const transformedArgs: any = argKeys.reduce(
    (cur, key) => {
      const val = args[key];
      const transformedVal = typeof val === 'string' ? _.template(val)({ ...args, ...answers, ...stringCases }) : val;

      return { ...cur, [key]: transformedVal };
    },
    {});

  return { ...transformedArgs, ...typedAnswers };
}
