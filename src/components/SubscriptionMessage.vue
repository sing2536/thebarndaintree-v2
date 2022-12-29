<script setup>
import MessageBox from './MessageBox.vue';
import { useUserStore } from '../stores/user'
import { ref } from 'vue';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useGetHelpStore } from '../stores/getHelp';

const route = useRoute()
const user = useUserStore()
const getHelp = useGetHelpStore()
const type = ref()

watch(()=>user.status, (v) => {
    if (v == 2) return type.value = 'danger'
    if (user.demo) return type.value = 'warning'
    type.value = ''
})
</script>

<template>
    <MessageBox v-if="user.demo || user.status !== undefined && user.status !== 1 && !route.query.signup" class="wrapper" :type="type">
        <div class="content">
            <template v-if="user.demo">
                This is a live demo account, certain actions are retricted.<br />
                Happy with the test drive? <a href="./signup">Sign up now.</a>
            </template>

            <template v-else>
                <template v-if="user.status == 0">
                    It looks like your subscription is not yet active, <a href="./api/subscribe">subscribe now.</a><br />
                </template>
    
                <template v-if="user.status == 2">
                    Your subscription is no longer active, <a href="./api/subscribe">resubscribe now.</a><br />
                </template>
    
                Booking creation and updates are currently restricted.<br />
                If you believe this is a mistake, <a href="#" @click.prevent="getHelp.open()">please contact us.</a>
            </template>

        </div>
    </MessageBox>
</template>

<style lang="less" scoped>
.wrapper {
    margin-bottom: var(--gap-medium);
}
.content {
    line-height: var(--gap-medium);
}
</style>