import { getInfo, setInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      // 个人权证相关
      userInfo: getInfo()
    }
  },
  mutations: {
    setUserInfo (state, payload) {
      state.userInfo = payload
      setInfo(payload)
    }
  },
  actions: {
    logout (context) {
      context.commit('setUserInfo', {})
      // 跨模块调用mutation要开启root:true
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {

  }
}
