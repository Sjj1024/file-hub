import http from '@/utils/request'


export default {
    getFiles() {
        return []
    },
    getUserInfo(token: String) {
        return http('/user', {
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    },
    getUserRepos(gitName: String) {
        return http(`/users/${gitName}/repos`, {
            method: 'get',
        })
    },
    loginUserName(userName: String) {
        return http(
            `repos/Sjj1024/DataHub/contents/FileData/users/${userName}.txt`,
            {
                method: 'get',
            }
        )
    },
    registUser(token: string, body: any) {
        return http(`/repos/Sjj1024/DataHub/issues`, {
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body,
        })
    },
    updateUser(token: string, body: any){
      return http(`/repos/Sjj1024/DataHub/issues`, {
        method: 'put',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body,
    })
    },
    frokFileHub(token: string, body: any) {
        return http(`/repos/Sjj1024/FileHub/forks`, {
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body,
        })
    },
    creatFileHub(token: string, body: any) {
        return http(`/repos/Sjj1024/FileHub/generate`, {
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body,
        })
    },
    checkReady(path: string) {
        return http(path, {
            method: 'get',
        })
    },
}
