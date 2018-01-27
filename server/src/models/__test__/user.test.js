import User from '../User';
import { initializeTestDb, clearTestDb } from '../../utils/test_helper';

describe('User', () => {
  let joe; let jane; let jack;
  beforeAll(() => initializeTestDb());

  afterAll(() => clearTestDb());

  beforeEach((done) => {
    joe = new User({
      username: 'JoeyChesnut',
      email: 'fake@email.com',
      password_hash: 'jkfsljflsjdflkksjdlj',
    });

    jane = new User({
      username: 'JaneFonda',
      email: 'fake2@email.com',
      password_hash: 'kjfsluelrkjskfldl',
    });

    jack = new User({
      username: 'JackArmsStrong',
      email: 'Jack@email.com',
      password_hash: 'jdkfljsfusikljeljlfsjk',
    });

    Promise.all([joe.save(), jane.save(), jack.save()])
      .then(() => done());
  });

  test('should be invalid if username is empty', (done) => {
    const user = new User();

    user.validate((err) => {
      expect(err.errors.username).toBeDefined();
      done();
    });
  });

  test('should be invalid if email is empty', (done) => {
    const user = new User();

    user.validate((err) => {
      expect(err.errors.email).toBeDefined();
      done();
    });
  });

  test('should be invalid if password_hash is empty', (done) => {
    const user = new User();

    user.validate((err) => {
      expect(err.errors.password_hash).toBeDefined();
      done();
    });
  });

  test('should insert a new user', (done) => {
    const bob = new User({
      username: 'bob',
      email: 'bob@email.com',
      password_hash: 'jfksjdlfjlsdkfuiewjril',
    });

    bob.save()
      .then((user) => {
        expect(user.username).toBe('bob');
        done();
      });
  });

  test('should find a user', (done) => {
    User.findOne({
      username: 'JoeyChesnut',
    })
      .then((user) => {
        expect(user.username).toBe('JoeyChesnut');
        done();
      });
  });
  /* eslint no-param-reassign: ["error", { "props": false }] */
  test('should update a user', (done) => {
    User.findOne({ username: 'JoeyChesnut' })
      .then((user) => {
        user.username = 'JoeDimagion';
        user.save()
          .then((userSaved) => {
            expect(userSaved.username).toBe('JoeDimagion');
            done();
          });
      });
  });

  test('should remove a user', (done) => {
    User.findOneAndRemove({ username: 'JoeDimagion' });
    User.findOne({ username: 'JoeDimagion' })
      .then((user) => {
        expect(user).toBe(null);
      });
    done();
  });
});
