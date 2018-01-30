/* eslint no-unused-vars: ["error", { "args": "none" }] */
/* eslint no-shadow: ["error", { "allow": ["err"] }] */
/* eslint consistent-return: false */

import bcrypt from 'bcrypt';
import User from '../models/User';
import { isEmpty } from '../utils/helperFunctions';

export default (app) => {
  app.post('/auth/local/register', async (req, res) => {
    let { password } = req.body;
    const { email } = req.body;

    if (isEmpty(email) || isEmpty(password)) {
      return res.json({
        success: false,
        message: 'Please enter email and password',
      });
    }

    // password is coming in base64 encoded
    password = Buffer.from(password, 'base64').toString('ascii');

    try {
      const existingUser = await User.findOne({ email });

      if (isEmpty(existingUser)) {
        const username = email.substring(0, email.indexOf('@'));
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              console.error(err);
            }

            const newUser = new User({ username, email, password_hash: hash });

            newUser.save((err, user) => {
              if (err) {
                return res.status(500).json({ success: false, message: 'The server encountered an internal error' });
              }

              return res.status(200).json({ success: true, message: 'User has been created' });
            });
          });
        });
      } else {
        return res.status(422).json({ success: false, message: 'User account already exist' });
      }

    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'The server encountered an internal error' });
    }
  })
};