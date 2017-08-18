import { observable } from 'mobx'

const UserStore = {
  arr: [],
  showList: true
}

export default observable(UserStore)
