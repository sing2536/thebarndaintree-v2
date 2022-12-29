import { defineStore } from 'pinia'
import { useLoaderStore } from './loader'
import { ref } from 'vue';
import { useConfirmModalStore } from './confirmModal';

export const userPasswordChangeStore = defineStore('passwordChange', () => {
  const loader = useLoaderStore()
  const confirmModal = useConfirmModalStore()
  const modal = ref(false)
  const passwordCurrent = ref('')
  const passwordNew = ref('')
  const passwordNewConfirm = ref('')
  const error = ref('')

  async function passwordChange() {
    loader.active = true
    error.value = ''
    if (passwordNew.value != passwordNewConfirm.value) {
      error.value = 'New password does not match confirm new password'
      loader.active = false
      return
    }

    await fetch(`api/users/change-password`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            passwordCurrent: passwordCurrent.value,
            passwordNew: passwordNew.value,
        })
    })

    close()
    confirmModal.show({title:'Success' ,message: 'Your password has been changed.'})
  }

  function open() {
    modal.value = true
  }

  function close() {
    loader.active = false
    modal.value = false
    passwordCurrent.value = ''
    passwordNewConfirm.value = ''
    passwordNew.value = ''
  }

  return { modal, passwordCurrent, passwordNew, passwordNewConfirm, error, passwordChange, close, open }
})
