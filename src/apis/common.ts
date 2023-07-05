import http from '@/utils/request'

// {
//   "body": "I'm having a problem with this.",
//   "labels": [
//       "bug"
//   ],
//   "title": "Found a bug"
// }

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
    creatGitPage(user: string, repo:string, token: string, body: any) {
        return http(`/repos/${user}/${repo}/pages`, {
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body,
        })
    },
}
