<script setup>
import Modal from './Modal.vue'
import { usePropertiesStore } from '../stores/properties'
import MessageBox from '../components/MessageBox.vue'
import FieldHelp from './FieldHelp.vue';

const propertyModal = usePropertiesStore()
</script>

<template>
    <Modal :modal-active="propertyModal.modal" @close="propertyModal.close()">
        <h2>{{propertyModal.creating ? 'Create':'Manage'}} Property</h2>
        <div class="content">

            <div class="field">
                <label>Property Name</label>
                <input v-model="propertyModal.data.name" type="text">
            </div>
            
            <MessageBox class="message">
                <div>Information below is not required, but preferable as it will be displayed in receipts you generate for customers.</div>
            </MessageBox>
    
            <div class="field">
                <label>Business Identification Number<FieldHelp content="Typically issued by your goverment or country"/></label>
                <input v-model="propertyModal.data.businessId" type="text">
            </div>
    
            <div class="field">
                <label>Business Phone</label>
                <input v-model="propertyModal.data.phone" type="text">
            </div>
    
            <div class="field">
                <label>Business Email</label>
                <input v-model="propertyModal.data.email" type="text" autocapitalize="off">
            </div>
        </div>

        <template #footer>
            <div class="actions">
                <button @click="propertyModal.save()" class="raised primary">{{propertyModal.creating ? 'Create':'Save'}}</button>
            </div>
        </template>
    </Modal>
</template>

<style lang="less" scoped>
h2 {
    padding-bottom: var(--gap-medium);
}
.message {
    padding: var(--gap-tiny) 0;
}
.content {
    display: flex;
    // gap: var(--gap-tiny);
    flex-direction: column;
    width: 540px;
}
@media (max-width: 800px) {
    .content {
        width: 100%;
    }
}
.actions {
    display: flex;
    justify-content: flex-end;
}
</style>