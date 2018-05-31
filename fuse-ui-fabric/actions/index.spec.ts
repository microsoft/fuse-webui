///<reference types='jasmine'/>
import { ActionNames } from './index';

describe('action names', () => {
  it('has namespace', () => {
    expect(ActionNames.login.logIn).toBe('login.logIn');
    expect(ActionNames.login.getUser).toBe('login.getUser');
  })
})
