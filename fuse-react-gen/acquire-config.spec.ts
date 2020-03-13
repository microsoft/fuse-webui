///<reference types='jasmine'/>
import { Question } from 'inquirer';
import { parseAgainstConfig } from './acquire-config';

describe('acquire-config', () => {
  it('parses yargs', async () => {
    const cli = '-a appName -p 4567';
    const args: any = await parseAgainstConfig('./examples/{{app}}/.react-gen-rc.json', cli,
      questions => Promise.resolve({
        version: '1.4.0.2',
        package: '@mock/module',
        questions
      }));

    expect(args.app).toBe('appName');
    expect(args.port).toBe(4567);

    expect(args.questions).not.toBe(null);

    const questions: Question[] = args.questions;
    expect(questions.length).toBe(2);
    expect(questions[0].name).toBe('package');
    expect(questions[1].name).toBe('host');
  });

  it('parses array', async () => {
    const cli = '-n mockApp -m mock';
    const args = await parseAgainstConfig('./examples/actions/.react-gen-rc.json', cli,
      questions => Promise.resolve({
        actions: 'approve, reject, start',
        questions
      }));

    expect(args.actions).toEqual(['approve', 'reject', 'start']);
  });
})
