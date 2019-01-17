import { Answers, prompt, Question } from 'inquirer';
import { Arguments, Options } from 'yargs';
import * as yargs from 'yargs/yargs';
import { readFileAsObj } from './utils';
export type YargOptions = { [option: string]: Options };

const ignoreFailure = () => {
  // do nothing
};

export async function parseAgainstConfig(
  configPath: string,
  cli: Arguments,
  promptOverride?: (questions: Question[]) => Promise<Answers>): Promise<Arguments> {
  const options = await readFileAsObj<YargOptions>(configPath);
  const args = yargs().exitProcess(false).fail(ignoreFailure).option(options).parse(cli._);
  const keys = Object.keys(options);

  const missingKeys = keys.filter(key => !args[key]);

  const questions = missingKeys.map(key => {
    const option = options[key];

    return {
      type: 'input',
      name: key,
      message: option.describe,
      validate: x => Promise.resolve<boolean>(option.required ? !!x : true)
    };
  });

  const answers = promptOverride ? await promptOverride(questions) : await prompt(questions);

  return { ...args, ...answers };
}
