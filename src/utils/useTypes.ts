export const bossUrl = "https://api.github.com/repos/Sjj1024/DataHub/issues"
export const bossToken = 'ghp_888grzs67MqxbZUH3wmIFKzecaKB0cTLy3ICBkl'.replace('888', '')
// sjj token: ghp_888grzs67MqxbZUH3wmIFKzecaKB0cTLy3ICBkl
// huijia token: ghp_888LSkJC7DbB8pgMw6mynhQGLienoPv4P0pOLZ0

interface fileRes {
  name: string
  path: string
  type: string
  size: string
  openLink: string
  downLink: string
  htmlLink: string
  creatTime: string
  selected: boolean
  showTips: boolean
  uploading: boolean
}


export type {
  fileRes
}