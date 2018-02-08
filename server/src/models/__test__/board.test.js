import Board from '../board';
import { initializeTestDb, clearTestDb } from '../../utils/test_helper';

describe('Board', () => {
  beforeAll(() => initializeTestDb());

  afterAll(() => clearTestDb());
});
