///<reference types='jasmine'/>
import { parseCookie } from './parse-cookie';

describe('parse cookie', () => {
  it('parse cookie string', () => {
    const cookies = parseCookie('foo=123;bar=abcd');
    expect(cookies.foo).toBe('123');
    expect(cookies.bar).toBe('abcd');
    const chromeCookies = parseCookie('foo=123; bar=abcd');
    expect(chromeCookies.foo).toBe('123');
    expect(chromeCookies.bar).toBe('abcd');
  });
});
