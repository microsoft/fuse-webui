///<reference types='jasmine'/>
import {handler} from './create';

describe('create command', () => {
    it('handles input', async () => {
        const result = await handler({kind: 'namespace', dest: '.'});
        expect(result).toBeNull();
    });
});
