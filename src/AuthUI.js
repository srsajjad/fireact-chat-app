import React from 'react'
import AuthStore from './AuthStore'
import { observer } from 'mobx-react'

const AuthUI = props => {
  if (AuthStore.uid) {
    return (
      <div>
        <button onClick={props.handleLogOut}>Log Out</button><br /><br />
      </div>
    )
  } else {
    return (
      <div>
        <label htmlFor='email'>email </label>
        <input
          onChange={e => (AuthStore.email = e.target.value)}
          type='text'
          id='email'
        />
        <br />
        <br />
        <label htmlFor='password'>password </label>
        <input
          onChange={e => (AuthStore.password = e.target.value)}
          type='text'
          id='password'
        />
        <br />
        <br />
        <button onClick={props.handleLogIn}>Log In</button><br /><br />
        <button onClick={props.handleSignUp}>Sign Up</button><br /><br />

      </div>
    )
  }
}

export default observer(AuthUI)
