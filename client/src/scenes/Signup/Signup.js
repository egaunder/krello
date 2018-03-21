import React from 'react'
import './Signup.css'

const Signup = () => (
  <div className="signup">
    <section className="signup_sect">
      <h1 className="signup_sect_title">Krello Signup Form</h1>
      <form>
        <div className="form_content">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" />
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="password">Password</label>
          <input type="text" id="password" name="password" />
          <label htmlFor="password confirmation">Password Confirmation</label>
          <input type="text" id="password-confirmation" name="password-confirmation" />
          <input type="submit" id="submit" value="Create new account" />
        </div>
      </form>
    </section>
  </div>
)

export default Signup
