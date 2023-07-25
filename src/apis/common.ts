import http from '@/utils/request'
import { ResponseType } from '@tauri-apps/api/http'

export default {
    gitRatelimit() {
        return http('/rate_limit', {
            method: 'get',
        })
    },
    creatIssue(body: any) {
        return http('/repos/Sjj1024/DataHub/issues', {
            method: 'post',
            body,
        })
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
    creatGitPage(user: string, repo: string, token: string, body: any) {
        return http(`/repos/${user}/${repo}/pages`, {
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body,
        })
    },
    getHubInfo() {
        return http(
            `https://sjj1024.github.io/DataHub/FileData/update/index.json`,
            {
                method: 'get',
                responseType: ResponseType.JSON,
            }
        )
    },
}
