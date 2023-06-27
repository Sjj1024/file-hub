import http from '@/utils/request'
import { Body } from '@tauri-apps/api/http'


export default {
    gitRatelimit() {
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
}
