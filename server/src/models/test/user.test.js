import User from '../User';
import initializeTestDb from '../../utils/test_helper';

describe('User', () => {
  let joe, jane, jack;
  beforeAll(() => {
    return initializeTestDb();
  });

  beforeEach(done => {

    joe = new User({
      username: "JoeyChesnut",
      email: "fake@email.com",
      password_hash: "jkfsljflsjdflkksjdlj"
    });

    jane = new User({
      username: "JaneFonda",
      email: "fake2@email.com",
      password_hash: "kjfsluelrkjskfldl"
    });

    jack = new User({
      username: "JackArmsStrong",
      email: "Jack@email.com",
      password_hash: "jdkfljsfusikljeljlfsjk"
    });

    Promise.all([joe.save(), jane.save(), jack.save()])
      .then(() => done())
  });
  
  test('should be invalid if username is empty', (done) => {
    var user = new User();

    user.validate((err) => {
      expect(err.errors.username).toBeTruthy();
      done();
    });
  });

});