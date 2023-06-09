import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

export default function (theme: string) {
    theme = theme || localStorage.getItem('theme') || 'dark'
    if (theme !== 'dark') {
        document.documentElement.setAttribute('theme', 'light')
        document.querySelector('html')?.classList.remove('dark')
        document.querySelector('html')?.classList.add('light')
        userStore.setTheme('light')
    } else {
        document.documentElement.setAttribute('theme', 'dark')
        document.querySelector('html')?.classList.remove('light')
        document.querySelector('html')?.classList.add('dark')
        userStore.setTheme('dark')
    }
}
