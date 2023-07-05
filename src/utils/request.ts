import { HttpVerb, fetch } from '@tauri-apps/api/http'
import { useUserStore } from '@/stores/user'
import { Body } from '@tauri-apps/api/http'

const server = 'https://api.github.com'
const baseURL = `${server}`
const userStore = useUserStore()

const BODY_TYPE = {
    Form: 'Form',
    Json: 'Json',
    Text: 'Text',
    Bytes: 'Bytes',
}

const commonOptions = {
    timeout: 60,
}

const isAbsoluteURL = (url: string): boolean => {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url)
}

const combineURLs = (baseURL: string, relativeURL: string): string => {
    return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL
}

const buildFullPath = (baseURL: string, requestedURL: string) => {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL)
    }
    return requestedURL
}

// 重新获取API接口速率
export const getApiLimit = () => {
    let payload = {
        method: 'GET' as HttpVerb,
        headers: {
            Authorization: userStore.gitToken!,
        },
    }
    fetch('https://api.github.com/rate_limit', payload)
        .then(({ status, data }) => {
            if (status >= 200 && status < 500) {
                console.log('apilimit---', data)
                userStore.setApiRate((data as any).rate)
            }
        })
        .catch((err) => {
            console.error('apilimiterr-------', err)
        })
}

const http = async (url: string, options: any = {}) => {
    if (!options.headers)
        options.headers = {
            Authorization: userStore.gitToken,
        }
    if (options?.body) {
        options.body = Body.json(options.body)
        if (options.body.type === BODY_TYPE.Form) {
            options.headers['Content-Type'] = 'multipart/form-data'
        }
    }
    options = { ...commonOptions, ...options }
    console.log('request-------', buildFullPath(baseURL, url), options)
    return fetch(buildFullPath(baseURL, url), options)
        .then(({ status, data }) => {
            if (status >= 200 && status < 500) {
                return { status, data }
            }
            return Promise.reject({ status, data })
        })
        .catch((err) => {
            console.error(err)
            return Promise.reject(err)
        })
        .finally(() => {
            // 发送接口速率
            getApiLimit()
        })
}

export default http
