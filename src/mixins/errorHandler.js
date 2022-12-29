import { useConfirmModalStore } from '../stores/confirmModal'
import { useLoaderStore } from '../stores/loader';

export default async (res) => {
    const confirmModal = useConfirmModalStore()
    const loader = useLoaderStore()
    if (res.status != 200) {
        const data = await res.json()
        if (data.errors && data.name) {
            const errors = () => {
                let msg = ''
                for (let i of data.errors) msg += `\n- ${i.message}`
                return msg
            }

            confirmModal.show({
                title: 'Woops', 
                message: 'Please review the following errors:'+errors()
            })

            loader.active = false
            throw new Error(errors())
        }

        if (data.error) {
            if (data.error.errors && data.error.name) {
                const errors = () => {
                    let msg = ''
                    for (let i of data.error.errors) msg += `\n- ${i.message}`
                    return msg
                }
    
                confirmModal.show({
                    title: 'Woops', 
                    message: 'Please review the following errors:'+errors()
                })
    
                loader.active = false
                throw new Error(errors())
            }

            confirmModal.show({
                title: 'Woops', 
                message: data.error
            })
            loader.active = false
            throw new Error(data.error)
        }
        
        confirmModal.show({
            title: 'Woops', 
            message: 'Something went wrong, please try again later'
        })

        loader.active = false
        throw new Error('Something went wrong, please try again later')
    }
}