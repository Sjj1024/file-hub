import { privateKey, publickKey } from '@/config'
import JSEncrypt from 'jsencrypt'

export const rsaEncode = (content: string) => {
    var encrypt = new JSEncrypt()
    encrypt.setPublicKey(publickKey)
    return encrypt.encrypt(content) as string
}

export const rsaDecode = (content: string) => {
    const decrypt = new JSEncrypt()
    decrypt.setPrivateKey(privateKey)
    return decrypt.decrypt(content) as string
}
