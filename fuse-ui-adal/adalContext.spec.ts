///<reference types='jasmine'/>
import * as fetchMock from 'fetch-mock';
import * as jest from 'jest';
import { API_RESOURCES, ensureAuthContext, listTenants, switchTenant } from './adalContext';

describe('adalContext', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  beforeAll(async () => {
    const ctx = ensureAuthContext({ clientId: 'mock' });
    spyOn(ctx, 'login').and.callFake(() => {
    });
    spyOn(ctx, 'acquireToken').and.callFake((rsrc, cb) => {
      cb(null, 'mockToken', null);
    });
  });

  it('ensure context', () => {
    const ctx = ensureAuthContext({ clientId: 'mock' });
    expect(ctx).toBeTruthy();
  });

  it('switch tenant', () => {
    const ctx = ensureAuthContext({ clientId: 'mock' });
    switchTenant('mockTenant');
    expect(ctx.config.tenant).toBe('mockTenant');
  });

  it('list tenants', async () => {
    fetchMock.mock(API_RESOURCES.Tenants, {
      status: 200,
      body: {
        value: []
      }
    });
    const tenants = await listTenants();
    expect(tenants).toEqual([]);
  })
})
