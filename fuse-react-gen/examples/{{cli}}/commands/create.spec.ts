///<reference types='jasmine'/>
import { handler } from './create';

describe('create command', () => {
  it('handles input', async () => {
    const result = await handler(<any>{ kind: 'namespace', dest: '.' });
    expect(result).toBeNull();
  });
});
