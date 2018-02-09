import Board from '../board';
import { initializeTestDb, clearTestDb } from '../../utils/test_helper';

describe('Board', () => {
  beforeAll(() => initializeTestDb());

  afterAll(() => clearTestDb());

  test('should be invalid if name is empty', (done) => {
    const board = new Board();

    board.validate((err) => {
      expect(err.errors.name).toBeDefined();
      done();
    });
  });

  test('should be invalid if userId is empty', (done) => {
    const board = new Board();

    board.validate((err) => {
      expect(err.errors.userId).toBeDefined();
      done();
    });
  });

  test('should insert a new board', async (done) => {
    const name = 'Study Board';
    const board = new Board({
      name,
      userId: '123',
      category: 'Study Category',
    });

    const newBoard = await board.save();

    expect(newBoard.name).toBe(name);
    done();
  });

  // test('should find a board', async (done) => {
  //   const testBoard = new Board({
  //     name: 'Test Board',
  //     userId: '12',
  //     category: 'Test Category',
  //   });

  //   const savedBoard = await testBoard.save();
  //   //console.log(savedBoard)
  //   const board = await Board.findByUserId(savedBoard.userId);

  //   expect(board.name).toBe(testBoard.name);
  //   done();
  // });
});
