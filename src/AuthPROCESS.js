import React, { Component } from 'react'
import AuthUI from './AuthUI'
import AuthStore from './AuthStore'
import firebase from 'firebase'
import { observer } from 'mobx-react'

class AuthPROCESS extends Component {
  componentDidMount () {
    // console.log(firebase.database())
    // auth state controller
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // console.log('some one just logged in')
        AuthStore.email = user.email
        AuthStore.uid = user.uid
      } else {
        AuthStore.uid = null
      }
    })
  }

  handleLogIn () {
    let { email, password } = AuthStore
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // console.log(error.message)
        alert(error.message)
      })
  }

  handleSignUp () {
    let { email, password } = AuthStore
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        firebase.database().ref('/users/').push({
          email: data.email,
          uid: data.uid
        })
      })
      .catch(function (error) {
        // con
        alert(error.message)
      })
  }

  handleLogOut () {
    firebase.auth().signOut().catch(function (error) {
      // con
      alert(error.message)
    })
  }

  render () {
    const self = this
    return (
      <AuthUI
        handleLogIn={this.handleLogIn.bind(self)}
        handleSignUp={this.handleSignUp.bind(self)}
        handleLogOut={this.handleLogOut.bind(self)}
      />
    )
  }
}

export default observer(AuthPROCESS)
