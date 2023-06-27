import http from '@/utils/request'
import { Body } from '@tauri-apps/api/http'
import { bossToken } from '@/utils/useTypes'

export default {
    gitRatelimit() {
        return http('/user', {
            method: 'get'
        })
    },
    creatIssue(){
      
    }
}
