import http from '@/utils/request'
import { Body } from '@tauri-apps/api/http'

// {
//   "body": "I'm having a problem with this.",
//   "labels": [
//       "bug"
//   ],
//   "title": "Found a bug"
// }

export default {
    getFiles(path: string) {
        return http('/rate_limit', {
            method: 'get',
        })
    },
    creatIssue(body: any) {
        return http('/repos/Sjj1024/DataHub/issues', {
            method: 'post',
            body: Body.json(body),
        })
    },
    registUser(token: string, body: any) {
        return http(`/repos/Sjj1024/DataHub/issues`, {
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: Body.json(body),
        })
    },
}
