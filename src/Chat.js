import React, { Component } from 'react'
import MsgStore from './MsgStore'
import AuthStore from './AuthStore'
import { observer } from 'mobx-react'
import firebase from 'firebase'

class Chat extends Component {
  handleSubmit (e) {
    e.preventDefault()
    e.target.reset()
    let database = firebase.database()
    let myId = AuthStore.uid

    database.ref('users').on('value', data => {
      let obj = data.val()
      let objArr = Object.values(obj)
      let friendObj = objArr.filter(n => {
        return n.email === MsgStore.clickedWho
      })
      let friendId = friendObj[0].uid
      // console.log(friendId)
      database
        .ref(`/${myId}:${friendId}`)
        .push(`${AuthStore.email} : ${MsgStore.message}`)

      database
        .ref(`/${friendId}:${myId}`)
        .push(`${AuthStore.email} : ${MsgStore.message}`)
    })
  }

  handleChange (e) {
    MsgStore.message = e.target.value
  }

  componentDidMount () {
    let database = firebase.database()
    let myId = AuthStore.uid

    database.ref('users').on('value', data => {
      let obj = data.val()
      let objArr = Object.values(obj)
      let friendObj = objArr.filter(n => {
        return n.email === MsgStore.clickedWho
      })
      let friendId = friendObj[0].uid
      // console.log(friendId)

      database.ref(`/${myId}:${friendId}`).on('value', data => {
        if (data.val()) {
          MsgStore.msgArr = Object.values(data.val())
          // console.log(MsgStore.msgArr)
        }
      })
    })
  }

  render () {
    const self = this
    return (
      <div>
        {MsgStore.msgArr.map(n => <p>{n}</p>)}
        <form onSubmit={this.handleSubmit.bind(self)}>
          <textarea onChange={this.handleChange.bind(self)} />
          <br /><br />
          <button type='submit'>Send Message</button>
        </form>
      </div>
    )
  }
}

export default observer(Chat)
