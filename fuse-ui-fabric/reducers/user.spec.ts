///<reference types='jasmine'/>
import { ActionNames } from '../actions';
import { user } from './user';

const mockUser = { displayName: 'foo', email: 'foo@bar.com' };

describe('user reducer', () => {
  it('reset user on logout', () => {
    expect(user(mockUser, { type: ActionNames.login.logOut })).toBeNull();
  });
  it('set user', () => {
    expect(user(null, { type: ActionNames.login.getUserResult, user: mockUser })).toEqual(mockUser);
  });
});
