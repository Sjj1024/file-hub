import { defineStore } from 'pinia'

export const useUserStore = defineStore('userInfo', {
    // 定义state
    state: () => {
        return {
            name: '1024小神',
            age: 18,
            theme: localStorage.getItem('theme') || 'light',
            fileCdn: 'https://sjj1024.github.io/FileHub/',
            // fileCdn:"https://cdn.staticaly.com/gh/sjj1024/FileHub@main/",
            gitToken: localStorage.getItem('gitToken')
                ? localStorage.getItem('gitToken')
                : '',
            gitInfo: JSON.parse(
                localStorage.getItem('gitInfo')
                    ? localStorage.getItem('gitInfo')!
                    : '{}'
            ),
        }
    },
    // 定义getters
    getters: {
        doubleAge: (state) => state.age * 2,
        threeAge: () => 6,
    },
    // 定义action
    actions: {
        setAge() {
            console.log('设置age----')
            this.age = 99
        },
        setTheme(the: string) {
            this.theme = the
            localStorage.setItem('theme', the)
        },
        setGitInfo(gitToken: string, gitInfo: any) {
            this.gitToken = gitToken
            this.gitInfo = gitInfo
            localStorage.setItem('gitToken', gitToken)
            localStorage.setItem('gitInfo', JSON.stringify(gitInfo))
        },
    },
})
