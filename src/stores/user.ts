import { defineStore } from 'pinia'

export const useUserStore = defineStore('userInfo', {
    // 定义state
    state: () => {
        return {
            name: '1024小神',
            apiLimit: localStorage.getItem('apiLimit')
                ? JSON.parse(localStorage.getItem('apiLimit')!)
                : {
                      limit: 5000,
                      used: 0,
                      remaining: 5000,
                      reset: 1687853989,
                  },
            theme: localStorage.getItem('theme') || 'light',
            fileCdn: 'https://sjj1024.github.io/FileHub/',
            gitIoCdn:"https://cdn.staticaly.com/gh/sjj1024/FileHub@main/",
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
        doubleAge: (state) => 2,
        threeAge: () => 6,
    },
    // 定义action
    actions: {
        setTheme(the: string) {
            this.theme = the
            localStorage.setItem('theme', the)
        },
        setGitInfo(gitToken: string, gitInfo: any) {
            this.gitToken = gitToken
            this.gitInfo = gitInfo
            this.name = gitInfo.name
            localStorage.setItem('gitToken', gitToken)
            localStorage.setItem('gitInfo', JSON.stringify(gitInfo))
        },
        setApiRate(apiInfo: any) {
            this.apiLimit = apiInfo
            localStorage.setItem('apiLimit', JSON.stringify(apiInfo))
        },
    },
})
