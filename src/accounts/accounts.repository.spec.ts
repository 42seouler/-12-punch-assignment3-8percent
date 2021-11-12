import { AccountsRepository } from './accounts.repository';

describe('AccountsRepository', () => {
  it('should be defined', () => {
    expect(new AccountsRepository()).toBeDefined();
  });
});
