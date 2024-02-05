<template>
  <div>
    <a-button type="primary" @click="showModal">Open Modal with async logic</a-button>
    <a-modal v-model:open="open" title="Title" :confirm-loading="confirmLoading" @ok="handleOk">
      <a-form :model="formState" :layout="'vertical'">
        <a-form-item label="参赛名称:">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="报名时间:">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="佐证材料:">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="状态:">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="操作:">
          <a-input v-model:value="formState.name" />
        </a-form-item>
      </a-form>
      <a-button type="primary" style="width: 30%"> 确 定 </a-button>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const modalText = ref<string>('Content of the modal')
const open = ref<boolean>(false)
const confirmLoading = ref<boolean>(false)
const showModal = () => {
  open.value = true
}

const handleOk = () => {
  modalText.value = 'The modal will be closed after two seconds'
  confirmLoading.value = true
  setTimeout(() => {
    open.value = false
    confirmLoading.value = false
  }, 2000)
}
//暴露给父组件的方法
defineExpose({
  open
})
</script>
