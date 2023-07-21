import { defineStore } from 'pinia'

export const useUserStore = defineStore('userInfo', {
    // 定义state
    state: () => {
        return {
            name: '',
            userName: localStorage.getItem('userName') || "",
            passWord: localStorage.getItem('passWord') || "",
            gitAvatar: 'https://avatars.githubusercontent.com/u/48399687?v=4',
            theme: localStorage.getItem('theme') || 'light',
            gitName: localStorage.getItem('gitName') || 'sjj1024',
            gitRepo: localStorage.getItem('gitRepo') || 'FileHub',
            gitBranch: localStorage.getItem('gitBranch') || 'main',
            apiLimit: localStorage.getItem('apiLimit')
                ? JSON.parse(localStorage.getItem('apiLimit')!)
                : {
                      limit: 5000,
                      used: 0,
                      remaining: 5000,
                      reset: 1687853989,
                  },
            gitPath:
                localStorage.getItem('gitPath') ||
                'https://api.github.com/repos/Sjj1024/HelloMyPic/contents',
            fileCdn:
                localStorage.getItem('fileCdn') ||
                'https://cdn.staticaly.com/gh/sjj1024/FileHub@main',
            gitIoCdn:
                localStorage.getItem('gitIoCdn') ||
                'https://sjj1024.github.io/FileHub',
            gitToken: localStorage.getItem('gitToken') || "",
            gitInfo: JSON.parse(
                localStorage.getItem('gitInfo')
                    ? localStorage.getItem('gitInfo')!
                    : '{}'
            ),
        }
    },
    // 定义getters
    getters: {
        apiRate: (state) =>
            (state.apiLimit.remaining / state.apiLimit.limit) * 100,
        threeAge: () => 6,
    },
    // 定义action
    actions: {
        setTheme(the: string) {
            this.theme = the
            localStorage.setItem('theme', the)
        },
        setFileHub(repo: string, branch: string) {
            this.gitRepo = repo
            this.gitBranch = branch
            this.gitPath = `https://api.github.com/repos/${this.gitName}/${this.gitRepo}/contents`
            this.fileCdn = `https://cdn.staticaly.com/gh/${this.gitName}/${this.gitRepo}@${this.gitBranch}/`
            this.gitIoCdn = `https://${this.gitName}.github.io/${this.gitRepo}`
            localStorage.setItem('gitRepo', this.gitRepo)
            localStorage.setItem('gitBranch', this.gitBranch)
            localStorage.setItem('gitPath', this.gitPath)
            localStorage.setItem('fileCdn', this.fileCdn)
            localStorage.setItem('gitIoCdn', this.gitIoCdn)
        },
        setGitInfo(gitToken: string, gitInfo: any) {
            this.gitToken = gitToken
            this.gitInfo = gitInfo
            this.name = gitInfo.name
            this.gitName = gitInfo.login
            this.gitAvatar = gitInfo.avatar_url
            this.gitPath = `https://api.github.com/repos/${this.gitName}/${this.gitRepo}/contents`
            this.fileCdn = `https://cdn.staticaly.com/gh/${this.gitName}/${this.gitRepo}@${this.gitBranch}/`
            this.gitIoCdn = `https://${this.gitName}.github.io/${this.gitRepo}`
            localStorage.setItem('gitToken', gitToken)
            localStorage.setItem('gitAvatar', this.gitAvatar)
            localStorage.setItem('gitInfo', JSON.stringify(gitInfo))
            localStorage.setItem('name', this.name)
            localStorage.setItem('gitName', this.gitName)
            localStorage.setItem('gitPath', this.gitPath)
            localStorage.setItem('fileCdn', this.fileCdn)
            localStorage.setItem('gitIoCdn', this.gitIoCdn)
        },
        setApiRate(apiInfo: any) {
            this.apiLimit = apiInfo
            localStorage.setItem('apiLimit', JSON.stringify(apiInfo))
        },
    },
})
