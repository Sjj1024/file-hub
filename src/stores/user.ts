import { defineStore } from 'pinia'

export const useUserStore = defineStore('userInfo', {
    // 定义state
    state: () => {
        return {
            name: '1024小神',
            age: 18,
            theme: localStorage.getItem('theme') || 'light',
            fileCdn:"https://sjj1024.github.io/FileHub/",
            // fileCdn:"https://cdn.staticaly.com/gh/sjj1024/FileHub@main/",
            gitInfo: {
                login: 'Sjj1024',
                id: 48399687,
                node_id: 'MDQ6VXNlcjQ4Mzk5Njg3',
                avatar_url:
                    'https://avatars.githubusercontent.com/u/48399687?v=4',
                gravatar_id: '',
                url: 'https://api.github.com/users/Sjj1024',
                html_url: 'https://github.com/Sjj1024',
                followers_url: 'https://api.github.com/users/Sjj1024/followers',
                following_url:
                    'https://api.github.com/users/Sjj1024/following{/other_user}',
                gists_url:
                    'https://api.github.com/users/Sjj1024/gists{/gist_id}',
                starred_url:
                    'https://api.github.com/users/Sjj1024/starred{/owner}{/repo}',
                subscriptions_url:
                    'https://api.github.com/users/Sjj1024/subscriptions',
                organizations_url: 'https://api.github.com/users/Sjj1024/orgs',
                repos_url: 'https://api.github.com/users/Sjj1024/repos',
                events_url:
                    'https://api.github.com/users/Sjj1024/events{/privacy}',
                received_events_url:
                    'https://api.github.com/users/Sjj1024/received_events',
                type: 'User',
                site_admin: false,
                name: '1024小神',
                company: '1024小神',
                blog: '1024shen.com',
                location: 'ShangHai',
                email: null,
                hireable: null,
                bio: 'Who am I? \r\nWhere am I? \r\nWhat am I going to do?\r\n',
                twitter_username: null,
                public_repos: 64,
                public_gists: 0,
                followers: 46,
                following: 44,
                created_at: '2019-03-10T04:28:19Z',
                updated_at: '2023-06-01T09:03:15Z',
            }
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
    },
})
