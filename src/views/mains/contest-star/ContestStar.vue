<!--
    * @FileDescription: 竞赛之星报名页面。
    * @Author: 钟胡琴
    * @Date: 2024年1月22日
    * @LastEditors: 李思佳
    * @LastEditTime: 2024年1月22日
-->
<template>
  <div class="contest_main">
    <div class="describe">
      <span class="describe_content">评选说明:</span><br />
      <span class="describe_content">报名参加竞赛达3次以上</span>
    </div>
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      hideRequiredMark
      class="form"
    >
      <a-form-item ref="name" label="参与竞赛名称" class="custom-label" name="name">
        <a-input v-model:value="formState.name" placeholder="请输入内容" />
      </a-form-item>
      <a-form-item label="竞赛报名时间" name="date1">
        <a-date-picker
          v-model:value="formState.date1"
          type="date"
          placeholder="请选择日期"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="佐证材料">
        <a-form-item name="dragger" no-style>
          <a-upload-dragger
            v-model="formState.dragger"
            name="file"
            :max-count="1"
            :action="ossUploadUrl"
            :headers="headers"
            :beforeUpload="beforeUpload"
            @change="handleChange"
          >
            <p class="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p class="ant-upload-text">将文件拖到此处或点击上传</p>
          </a-upload-dragger>
        </a-form-item>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 15, offset: 12 }">
        <a-button type="primary" @click="onSubmit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { UnwrapRef } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import { InboxOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { UploadChangeParam } from 'ant-design-vue'
import cssAnimation from 'ant-design-vue/es/_util/css-animation'
import style = cssAnimation.style
import { ContestRequest } from '@/service/mains/contest-star/contest-star'
import { BASE_URL } from '@/service/config'

interface FormState {
  name: string
  date1: string
  dragger: string
}
const formRef = ref()
const labelCol = { span: 9 }
const wrapperCol = { span: 8 }
const formState: UnwrapRef<FormState> = reactive({
  name: '',
  date1: '',
  dragger: ''
})
const token = localStorage.getItem('LOGIN_TOKEN')
const headers = {
  Authorization: 'Bearer ' + token
}
const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '请填写竞赛名称', trigger: 'change' }],
  date1: [{ required: true, message: '请填写竞赛报名时间', trigger: 'change', type: 'object' }],
  dragger: [{ required: true, message: '请上传佐证材料', trigger: 'change' }]
}
// 提交表单
async function onSubmit() {
  // 检查表单是否填写完整
  if (!formState.name || !formState.date1 || formState.dragger.length === 0) {
    message.error('请填写完整表单')
    return
  }
  // 创建符合期望类型的对象
  const requestData = {
    entryname: formState.name,
    url: formState.dragger,
    signuptime: formState.date1
  }
  try {
    // 调用 ContestRequest 函数
    const response = await ContestRequest(requestData)
    console.log(response)
    // 在接口请求成功后进行提示
    message.success('提交成功')
  } catch (error) {
    // 在接口请求失败时进行提示
    console.error(error)
    message.error('提交失败')
  }
}
// 上传PDF地址
const ossUploadUrl = BASE_URL + 'api/stu/OssUpdate'
// 判断只能上传PDF文件
const beforeUpload = (file: any) => {
  const isPDF = file.type === 'application/pdf'
  const maxFileSize = 10 * 1024 * 1024

  if (!isPDF) {
    message.error('只能上传 PDF 文件！')
  } else if (file.size > maxFileSize) {
    message.error('文件大小超过限制10MB！')
  } else {
    // message.success('PDF 文件上传成功！');
  }

  return isPDF && file.size <= maxFileSize
}
// 上传PDF状态
const handleChange = (info: UploadChangeParam) => {
  const status = info.file.status
  if (status !== 'uploading') {
    console.log(info.file, info.fileList)
  }
  if (status === 'done') {
    const fileurl = info.file.response.data
    formState.dragger = fileurl
    message.success(`${info.file.name} 文件上传成功！.`)
  } else if (status === 'error') {
    message.error(`${info.file.name} 文件上传失败！.`)
  }
}
</script>
<style scoped>
.describe {
  width: 100%;
  background-color: rgb(255, 255, 255);
  border-radius: 16px;
  padding: 10px;
  overflow: hidden;
}
.describe_content {
  line-height: normal;
  color: #02509b;
}
.form {
  width: 90%;
  margin-top: 40px;
}
:deep(:where(.css-dev-only-do-not-override-19yxfbp).ant-form-item .ant-form-item-label > label) {
  color: #02509b;
}
</style>
