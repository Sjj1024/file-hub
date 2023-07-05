import http from '@/utils/request'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
// 先判断仓库FileHub是否存在，存在就获取文件，不存在就frok然后再获取

export default {
    getFiles(path: string) {
        console.log('getFilespath---', path)
        return http(userStore.gitPath + path, {
            method: 'get',
        })
    },
    creatIssue(body: any) {
        return http('/repos/Sjj1024/DataHub/issues', {
            method: 'post',
            body: body,
        })
    },
    uploadFile(filePath: string, body: any) {
        return http(
            `/repos/${userStore.gitName}/${userStore.gitRepo}/contents${filePath}`,
            {
                method: 'put',
                body: body,
            }
        )
    },
    delFile(filePath: string, body: any) {
        return http(
            `/repos/${userStore.gitName}/${userStore.gitRepo}/contents/${filePath}`,
            {
                method: 'DELETE',
                body: body,
            }
        )
    },
    registUser(token: string, body: any) {
        return http(`/repos/Sjj1024/DataHub/issues`, {
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: body,
        })
    },
}
