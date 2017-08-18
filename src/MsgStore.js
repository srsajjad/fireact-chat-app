import { observable } from 'mobx'

const MsgStore = {
  message: '',
  clickedWho: '',
  msgArr: []
}

export default observable(MsgStore)
