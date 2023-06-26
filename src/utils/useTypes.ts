export const bossToken = 'Bearer ghp_888grzs67MqxbZUH3wmIFKzecaKB0cTLy3ICBkl'.replace('888', '')

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