import React, { Component } from 'react'
import firebase from 'firebase'
import UserStore from './UserStore'
import { observer } from 'mobx-react'
import MsgStore from './MsgStore'

class Users extends Component {
  constructor (props) {
    super(props)
    this.state = {
      item: UserStore.arr
    }
  }

  handleChange (e) {
    let search = e.target.value
    let a = UserStore.arr.filter(n => n.startsWith(search))
    this.setState({
      item: a
    })
  }

  componentDidMount () {
    let database = firebase.database().ref('/users')
    database.on('value', data => {
      let x = data.val()
      if (x) {
        let y = Object.values(x)
        let z = y.map(n => n.email)
        UserStore.arr = z
        this.setState({
          item: UserStore.arr
        })
      }
    })
  }
  render () {
    return (
      <div>
        <span>Search for particular user </span>
        <input onChange={this.handleChange.bind(this)} type='text' />
        <p>User Lists : </p>
        <ul>
          {this.state.item.map((n, i) => {
            return (
              <li key={i}>
                <button
                  onClick={e => {
                    UserStore.showList = false
                    MsgStore.clickedWho = e.target.innerText
                    MsgStore.msgArr = []
                  }}
                >
                  {n}
                </button>
                <br />
                <br />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default observer(Users)
