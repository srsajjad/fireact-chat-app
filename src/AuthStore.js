import { observable } from 'mobx'

let AuthStore = {
  email: '',
  password: '',
  user: '',
  uid: null
}

export default observable(AuthStore)
