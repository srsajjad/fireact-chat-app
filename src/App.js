import React, { Component } from 'react'
import AuthPROCESS from './AuthPROCESS'
import Users from './Users'
import Chat from './Chat'
import UserStore from './UserStore'
import AuthStore from './AuthStore'
import { observer } from 'mobx-react'

class App extends Component {
  render () {
    return (
      <div>
        <h1>SSSUPPPP ?!!?</h1>
        <AuthPROCESS />
        {AuthStore.uid
          ? <div>
            <h2>{AuthStore.email} is logged in right now</h2>
            <button onClick={() => (UserStore.showList = true)}>
                Show User List
              </button><br /><br />
            {UserStore.showList ? <Users /> : <Chat />}
          </div>
          : <h2>No one is logged in right now</h2>}
      </div>
    )
  }
}

export default observer(App)
