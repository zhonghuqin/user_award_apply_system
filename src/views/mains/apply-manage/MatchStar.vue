<!--
    * @FileDescription: 报名表单管理 —— 竞赛之星报名管理。
    * @Author: 张亭婷and钟胡琴
    * @Date: 2024年1月22日
    * @LastEditors: 李思佳
    * @LastEditTime: 2024年1月30日
-->
<template>
  <div class="contain">
    <div class="main">
      <a-spin tip="正在加载，请稍候..." :spinning="spinning">
        <!--        列表-->
        <a-table :data-source="data" :columns="columns" bordered>
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'signuptime'">
              {{ formatDate(record.signuptime) }}
            </template>
            <!-- 佐证材料 -->
            <template v-if="column.dataIndex == 'url'">
              <a-button type="link" @click="showUrl">点击查看</a-button>
              <a-modal v-model:open="openUrl" title="佐证材料" :footer="null" centered>
                <a>{{ record.url }}</a>
              </a-modal>
            </template>
            <!-- 状态 -->
            <template v-else-if="column.dataIndex == 'state' && record.state == '0'">
              <span style="color: #000">未审核</span>
            </template>
            <template v-if="column.dataIndex == 'state' && record.state == '1'">
              <span style="color: #81c26b">已通过</span>
            </template>
            <template v-else-if="column.dataIndex == 'state' && record.state == '2'">
              <span style="color: #d41212">未通过</span>
            </template>
            <template v-else-if="column.dataIndex == 'operate'">
              <!-- 操作 -->
              <template v-if="record.state == '1'">
                <a-button type="text" style="color: green" @click="showCertificate"
                  >查看证书</a-button
                >
                <a-modal v-model:open="openCertificate" title="查看详情" :footer="null" centered>
                  <p>balabala</p>
                </a-modal>
              </template>
              <template v-else-if="record.state == '0'">
                <!-- 确定修改内容 -->
                <a-button
                  type="primary"
                  style="background-color: rgb(241, 170, 78)"
                  @click="showModal1(record)"
                >
                  修改
                </a-button>
                <a-modal
                  v-model:open="open"
                  title="修改填写内容"
                  @ok="handleOk"
                  :footer="null"
                  centered
                >
                  <!-- 表单验证 -->
                  <a-form :model="formState" :layout="'vertical'" hideRequiredMark :rules="rules">
                    <a-form-item label="参赛名称:" name="entryname">
                      <a-input v-model:value="formState.entryname" />
                    </a-form-item>
                    <a-form-item label="竞赛报名时间" name="signuptime">
                      <a-input v-model:value="formState.signuptime" />
                    </a-form-item>
                    <a-form-item label="佐证材料" name="url">
                      <a-form-item name="file" no-style>
                        <a-upload
                          :action="ossUploadUrl"
                          :multiple="true"
                          :headers="headers"
                          :file-list="fileList"
                          @change="handleChange"
                        >
                          <a-button>
                            <upload-outlined></upload-outlined>
                            Upload
                          </a-button>
                        </a-upload>
                      </a-form-item>
                    </a-form-item>
                  </a-form>
                  <a-button type="primary" style="width: 30%" @click="onSubmit"> 确 定 </a-button>
                </a-modal>
                <a-popconfirm
                  v-if="data.length"
                  title="您确定删除？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="onDelete(record.key, record)"
                >
                  <a-button type="primary" style="margin-left: 3%" danger>删除</a-button>
                </a-popconfirm>
              </template>
              <template v-else-if="record.state == '2'">
                <a-button type="text" danger @click="showModal2(record.key, record)"
                  >查看驳回原因</a-button
                >
                <a-modal v-model:open="open2" title="查看驳回原因" :footer="null" centered>
                  <p>{{ record.name }}</p>
                </a-modal>
                <a-popconfirm
                  v-if="data.length"
                  title="您确定删除？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="onDelete(record.key, record)"
                >
                  <a-button type="primary" style="margin-left: 3%" danger>删除</a-button>
                </a-popconfirm>
              </template>
            </template>
          </template>
        </a-table>
      </a-spin>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive} from 'vue'
import type { UnwrapRef } from 'vue'

import {
  ZHQdeleteJingsai,
  ZHQeditcompetition,
  ZHQgetCompetition,
  ZHQgetreasonJingsai
} from '@/service/mains/apply-manage/match-star'
import { message } from 'ant-design-vue'
import type { UploadChangeParam, UploadProps } from 'ant-design-vue/es/upload'
import { BASE_URL } from '@/service/config'
import { UploadOutlined } from '@ant-design/icons-vue'
import { format } from 'date-fns'
import type { Rule } from 'ant-design-vue/es/form'

// 定义加载状态
const spinning = ref<boolean>(true)
let data = ref([])
//时间戳转换
const formatDate = (timestamp, formatStr = 'yyyy-MM-dd HH:mm:ss') => {
  return format(new Date(timestamp), formatStr)
}
/**
 * @description 请求竞赛之星数据。
 */
const getData = async () => {
  const loginResult = await ZHQgetCompetition()
  // console.log(loginResult)
  if (loginResult.code) {
    data.value = loginResult.data
    console.log(data.value)
    spinning.value = false
  } else {
    message.warning(`${loginResult.msg}`)
  }
}
getData()

/**
 * @description 定义表头。
 */
const columns = reactive([
  {
    title: '竞赛名称',
    dataIndex: 'entryname',
    customHeaderCell: () => ({
      style: {
        backgroundColor: '#F0FEFF',
        color: '#000',
        fontWeight: 'bold'
      }
    }),
    width: 180,
    align: 'center'
  },
  {
    title: '竞赛报名时间',
    dataIndex: 'signuptime',
    customHeaderCell: () => ({
      style: {
        backgroundColor: '#F0FEFF',
        color: '#000',
        fontWeight: 'bold'
      }
    }),
    width: 180,
    align: 'center'
  },
  {
    title: '佐证材料',
    dataIndex: 'url',
    customHeaderCell: () => ({
      style: {
        backgroundColor: '#F0FEFF',
        color: '#000',
        fontWeight: 'bold'
      }
    }),
    width: 180,
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'state',
    customHeaderCell: () => ({
      style: {
        backgroundColor: '#F0FEFF',
        color: '#000',
        fontWeight: 'bold'
      }
    }),
    width: 180,
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'operate',
    customHeaderCell: () => ({
      style: {
        backgroundColor: '#F0FEFF',
        color: '#000',
        fontWeight: 'bold'
      }
    }),
    width: 250,
    align: 'center'
  }
])

/**
 * @description 表单相关。
 */
// 定义表单接口类型
interface FormState {
  entryname: string
  signuptime: string
  url: string
  id: string
}
const formState: UnwrapRef<FormState> = reactive({
  entryname: '',
  signuptime: '',
  url: '',
  id: ''
})
const rules: Record<string, Rule[]> = {
  entryname: [{ required: true, message: '请填写竞赛名称', trigger: 'change' }],
  signuptime: [
    { required: true, message: '请填写竞赛报名时间', trigger: 'change', type: 'object' }
  ],
  url: [{ required: true, message: '请上传佐证材料', trigger: 'change' }]
}
const fileList = ref<UploadProps['fileList']>([])
const handleChange = (info: UploadChangeParam) => {
  let resFileList = [...info.fileList]
  resFileList = resFileList.slice(-2)
  resFileList = resFileList.map((file) => {
    const newFile = {
      uid: file.uid,
      name: file.name || 'Untitled',
      url: file.response ? file.response.data : file.url
    }

    return newFile
  })
  fileList.value = resFileList
  console.log(resFileList)
}
// 设置请求头
const token = localStorage.getItem('LOGIN_TOKEN')
const headers = {
  Authorization: 'Bearer ' + token
}
//设置上传文件地址
// 上传PDF地址
const ossUploadUrl = BASE_URL + 'api/stu/OssUpdate'
/**
 * @description 佐证材料相关。
 */
const openUrl = ref<boolean>(false)
const showUrl = () => {
  openUrl.value = true
}

/**
 * @description 查看证书相关。
 */
const openCertificate = ref<boolean>(false)
const showCertificate = () => {
  openUrl.value = true
}

/**
 * @description 删除竞赛之星数据。
 */
const onDelete = async (key: string, record) => {
  try {
    // 调用 ContestRequest 函数
    const res = await ZHQdeleteJingsai(record.id)
    console.log(res)
    // 在接口请求成功后进行提示
    message.success('删除成功')
    getData()
  } catch (error) {
    // 在接口请求失败时进行提示
    console.error(error)
    message.error('删除失败')
  }
}
/**
 * @description 修改竞赛之星数据。
 */
const open = ref<boolean>(false)

const showModal1 = (record) => {
  // 将表格中的数据赋值给表单
  formState.entryname = record.entryname
  formState.signuptime = formState.signuptime = formatDate(record.signuptime)
  formState.url = record.url
  formState.id = record.id
  fileList.value = [
    {
      uid: 'someUid', // 为uid设置一个值，可以使用某个生成uid的方法
      name: record.url, // 为name设置一个值，可以使用record.name或其他默认名称
      url: record.url
    }
  ]
  console.log(fileList.value)
  open.value = true
}
//点击出现修改弹窗
const handleOk = (e: MouseEvent) => {
  console.log(e)
  open.value = false
}
/**
 * @description 提交竞赛之星表单数据。
 */
async function onSubmit() {
  // 检查表单是否填写完整
  if (!formState.entryname || !formState.signuptime || formState.url.length === 0) {
    message.error('请填写完整表单')
    return
  }
  try {
    // 调用 ContestRequest 函数
    const response = await ZHQeditcompetition(
      formState.entryname,
      formState.signuptime,
      formState.url,
      formState.id
    )
    console.log(response)
    // 在接口请求成功后进行提示
    message.success('提交成功')
    getData()
  } catch (error) {
    // 在接口请求失败时进行提示
    console.error(error)
    message.error('提交失败')
  }
  open.value = false
}
/**
 * @description 请求竞赛之星驳回原因。
 */
const open2 = ref<boolean>(false)
let data2 = ref([])
const showModal2 = async (key: string, record) => {
  const loginResult = await ZHQgetreasonJingsai(record.id)
  console.log(loginResult)

  if (loginResult.code === 200) {
    // 通过索引获取数组中的第一个对象
    const firstObject = loginResult.data[0]

    if (firstObject) {
      // 通过对象属性名获取 reason 的值
      const reasonValue = firstObject.reason
      record.name = reasonValue
      // 输出 reason 的值
      console.log(reasonValue)
    } else {
      console.error('Data array is empty or undefined.')
    }

    data2.value = loginResult.data
    console.log(data2.value)
    spinning.value = false
  } else {
    message.warning(`${loginResult.msg}`)
  }

  open2.value = true
}
</script>

<style scoped>
.contain {
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255, 0.6);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.main {
  width: 95%;
  height: 90%;
  background-color: white;
  border-radius: 10px;
}

.ant-modal-content .ant-modal-footer {
  text-align: center;
  background-color: red;
}
:deep(:where(.css-dev-only-do-not-override-19yxfbp).ant-table-wrapper .ant-table-pagination-right) {
  opacity: 0;
}
[data-doc-theme='light'] .ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
[data-doc-theme='dark'] .ant-table-striped :deep(.table-striped) td {
  background-color: rgb(29, 29, 29);
}
</style>
