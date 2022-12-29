import { storeToRefs } from "pinia"
import { computed, reactive } from "vue"
import { useThemeStore } from "../stores/theme"
import { userPasswordChangeStore } from '../stores/passwordChange';
import { useUserStore } from '../stores/user';
import { useGetHelpStore } from "../stores/getHelp";
import { useConfirmModalStore } from "../stores/confirmModal";

export default computed(()=>{
    const theme = useThemeStore()
    const user = useUserStore()
    const getHelp = useGetHelpStore()
    const { nightTheme } = storeToRefs(theme)
    const passwordChange = userPasswordChangeStore()
    const confirmModal = useConfirmModalStore()
    const menu = reactive([
        {
            label: 'Subscribe Now',
            icon: 'material-symbols:star-rate-rounded',
            url: './api/subscribe',
            hidden: computed(()=>{return user.status === 0 ? false:true}),
            highlight: true,
        },
        {
            label: 'Manage Properties',
            icon: 'material-symbols:house-outline-rounded',
            path: '/properties'
        },
        {
            label: 'Manage Subscription',
            icon: 'icon-park-outline:bill',
            hidden: computed(()=>{return user.status === 0 ? true:false}),
            callBack: () => {
                if (user.demo) return confirmModal.show({title: 'Woops', message: 'Action retricted as this is a demo account.'})
                window.open('./api/manage-subscription', '_self')
            }
        },
        {
            label: 'Change Password',
            icon: 'mdi:password-outline',
            callBack: () => passwordChange.open()
        },
        {
            label: 'Night Theme',
            icon: 'material-symbols:invert-colors',
            switch: true,
            value: nightTheme,
        },
        {
            label: 'Get Help',
            icon: 'mdi:envelope-outline',
            callBack: () => getHelp.open()
        },
        {
            label: 'Sign Out',
            icon: 'tabler:logout',
            callBack: async () => {
                const req = await fetch('./api/users/signout')
                if (req.status == 200) window.open(import.meta.env.BASE_URL, '_self')
            }
        }
    ])

    return menu
})
