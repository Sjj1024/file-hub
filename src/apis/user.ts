import http from '@/utils/request'
import { Body } from '@tauri-apps/api/http'
import { bossToken } from '@/utils/useTypes'

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
    loginUserName(userName: String) {
        return http(
            `repos/Sjj1024/DataHub/contents/FileData/users/${userName}.txt`,
            {
                method: 'get',
            }
        )
    },
    registUser(userName: string, body: any) {
        return http(
            `repos/Sjj1024/DataHub/contents/FileData/users/${userName}.txt`,
            {
                method: 'put',
                headers: {
                    Authorization: `Bearer ${bossToken}`,
                },
                body: Body.json(body),
            }
        )
    },
}
