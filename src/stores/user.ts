import { defineStore } from 'pinia'

export const useUserStore = defineStore('userInfo', {
  // 定义state
  state: () => {
    return {
      name: '1024小神',
      age: 18
    }
  },
  // 定义getters
  getters: {
    doubleAge: (state) => state.age * 2,
    threeAge:()=> 6
  },
  // 定义action
  actions: {
    setAge() {
      console.log('设置age----')
      this.age = 99
    }
  }
})