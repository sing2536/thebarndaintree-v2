<script setup>
import moment from 'moment';
import { useBookingModalStore } from '../stores/bookingModal';
import BookingCommentsForm from './BookingCommentsForm.vue';

const bookingModal = useBookingModalStore()
const data = bookingModal.data.comments
</script>

<template>
    <div>
        <h4>Comments</h4>
        <BookingCommentsForm />
        <div v-if="!data.length" class="empty-wrapper">No comments yet</div>
        <div v-else class="container">
            <div v-for="item in data" class="wrapper">
                <p>{{item.message}}</p>
                <div class="meta">{{moment(item.createdAt).format('DD/MM/YYYY h:mm a')}}</div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.empty-wrapper {
    font-size: smaller;
    font-weight: 500;
    color: var(--color-text2);
}
.container {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: var(--gap-small);
}
.wrapper {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid var(--color-shade);
    padding-bottom: var(--gap-tiny);
}

p {
    font-size: small;
    white-space: pre-line;
    word-break: break-word;
}

.meta {
    font-size: x-small;
    padding-top: var(--gap-xtiny);
    color: var(--color-text2);
    font-weight: 500;
}
</style>