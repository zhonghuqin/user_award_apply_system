<!--
    * @FileDescription: 科研之星报名 —— 科研项目。
    * @Author: 钟胡琴
    * @Date: 2024年1月22日
    * @LastEditors: 李思佳
    * @LastEditTime: 2024年1月22日
-->
<template>
  <div class="contest_main">
    <div class="describe">
      <h1 style="display: none">{{ title }}</h1>
      <span class="describe_content">评选说明:</span><br />
      <span class="describe_content"
        >1.作为项目主要成员(排名前八)获得院级及以上科研项目或教研课题立项(含教师科研项目)1项及以上;
        2.作为主申请人(排名第三)获得软件著作权1项及以上;
        3.作为主要作者(排名前三)在正规专业期刊公开发表论文1篇及以上。</span
      >
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
      <a-form-item ref="name" label="项目名称" class="custom-label" name="name">
        <a-input v-model:value="formState.name" placeholder="请输入内容" />
      </a-form-item>
      <a-form-item ref="name" label="项目级别" class="custom-label" name="content">
        <a-input v-model:value="formState.level" placeholder="请输入内容" />
      </a-form-item>
      <a-form-item ref="name" label="排名/总人数" class="custom-label" name="level">
        <a-input v-model:value="formState.ranking" placeholder="请输入内容" />
      </a-form-item>
      <a-form-item label="立项时间" name="date1">
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
import { Dayjs } from 'dayjs'
import { reactive, ref, toRaw } from 'vue'
import type { UnwrapRef } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import { InboxOutlined } from '@ant-design/icons-vue'
import { message, Upload } from 'ant-design-vue'
import type { UploadChangeParam } from 'ant-design-vue'
import cssAnimation from 'ant-design-vue/es/_util/css-animation'
import style = cssAnimation.style
import { BASE_URL } from '@/service/config'
import { useRouter } from 'vue-router'
import { zhqresearchRequest } from '@/service/mains/science-star/research-project'

interface FormState {
  name: string
  date1: string
  dragger: string
  level: string
  ranking: string
}
// 传递导航标题
const router = useRouter()
const { title } = router.currentRoute.value.meta
const formRef = ref()
const labelCol = { span: 9 }
const wrapperCol = { span: 8 }
const formState: UnwrapRef<FormState> = reactive({
  name: '',
  date1: '',
  dragger: '',
  level: '',
  ranking: ''
})
//表单验证
const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '请填写竞赛名称', trigger: 'change' }],
  level: [{ required: true, message: '请填写项目级别', trigger: 'change' }],
  ranking: [{ required: true, message: '请填写项目内容', trigger: 'change' }],
  date1: [{ required: true, message: '请填写立项时间', trigger: 'change', type: 'object' }],
  dragger: [{ required: true, message: '请上传佐证材料', trigger: 'change' }]
}
//获取token和设置请求头
const token = localStorage.getItem('LOGIN_TOKEN')
const headers = {
  Authorization: 'Bearer ' + token
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
    scitype: title as string,
    sciname: formState.name,
    scigrade: formState.level,
    ranking: formState.ranking,
    signuptime: formState.date1,
    url: formState.dragger
  }
  try {
    // 调用 ContestRequest 函数
    const response = await zhqresearchRequest(requestData)
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
//pdf文件上传状态
const handleChange = (info: UploadChangeParam) => {
  const status = info.file.status
  if (status !== 'uploading') {
    console.log(info.file, info.fileList)
  }
  if (status === 'done') {
    const fileurl = info.file.response.data
    formState.dragger = fileurl
    message.success(`${info.file.name} file uploaded successfully.`)
  } else if (status === 'error') {
    message.error(`${info.file.name} file upload failed.`)
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
