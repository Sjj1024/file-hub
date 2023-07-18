import { defineStore } from 'pinia'

export const useFileStore = defineStore('fileStore', {
    state: () => {
        return {
            downNum: 0,
            downDone: 0,
        }
    },
    getters: {
        downRate: (state) => {
            if (state.downDone === state.downNum) {
                return 100
            } else {
                return (state.downDone / state.downNum) * 100
            }
        },
    },
    actions: {
        setDownNum(num: number) {
            this.downNum = num
        },
        setDownDone(num: number) {
            this.downDone = num
            if (this.downDone === this.downNum) {
                this.downDone = 0
                this.downNum = 0
            }
        },
    },
})
