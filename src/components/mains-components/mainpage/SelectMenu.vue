<!--
    * @FileDescription: 注册页面选择部分。
    * @Author: 作者信息
    * @Date: 2024年1月22日
    * @LastEditors: 蒋雯绘
    * @LastEditTime: 2024年1月22日
-->
<template>
  <div class="demo-dropdown-wrap">
    <a-dropdown-button >
      {{ Selectgrade }}
      <template #overlay >
        <a-menu @click="handlegradeMenuClick">
          <a-menu-item v-for="grade in gradesArray" :key="grade.grade">
            {{ grade.grade }}
          </a-menu-item>
        </a-menu>
      </template>
      <template #icon ><DownOutlined @click="grade"/></template>
    </a-dropdown-button>
    <a-dropdown-button>
      {{ Selectmajor }}
      <template #overlay>
        <a-menu @click="handlemajorMenuClick">
          <a-menu-item v-for="major in majorsArray" :key="major.major">
            {{ major.major }}
          </a-menu-item>
        </a-menu>
      </template>
      <template #icon><DownOutlined  @click="major"/></template>
    </a-dropdown-button>
    <a-dropdown-button>
      {{ Selectclass }}
      <template #overlay>
        <a-menu @click="handleclassMenuClick">
          <a-menu-item v-for="myclass in myclassesArray" :key="myclass.class">
            {{ myclass.class }}
          </a-menu-item>
        </a-menu>
      </template>
      <template #icon><DownOutlined  @click="myclass"/></template>
    </a-dropdown-button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { DownOutlined } from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import { JWHgetgradeRequest } from '@/service/begin/signin/signin'
import { JWHgetmajorRequest } from '@/service/begin/signin/signin'
import { JWHgetclassRequest } from '@/service/begin/signin/signin'
const  emit  = defineEmits();

const selectedGrade = ref('');

interface Grade {
  grade: string,
}
interface Major {
  major: string,
}
interface Class {
  myclass: string,
  class:string
}
const Selectgrade = ref('请选择年级')
const gradesArray = ref<Grade[]>([]);
const Selectmajor = ref('请选择专业')
const majorsArray = ref<Major[]>([]);
const Selectclass = ref('请选择班级')
const myclassesArray = ref<Class[]>([]);

// 年级选项接口
async function grade() {
  const gradeResult = await JWHgetgradeRequest()
    //console.log(gradeResult)
  if (gradeResult.code == 200) {
    gradesArray.value = gradeResult.data;
  }
}
// 专业选项接口
async function major() {
  const majorResult = await JWHgetmajorRequest()
    // console.log(majorResult)
  if (majorResult.code == 200) {
    majorsArray.value = majorResult.data;
    // console.log(majorsArray.value)
  }
}
//班级选项接口
async function myclass() {
  const myclassResult = await JWHgetclassRequest()
    // console.log(myclassResult)
  if (myclassResult.code == 200) {
    myclassesArray.value = myclassResult.data;
    // console.log(myclassesArray.value)
  }
}

 const handlegradeMenuClick = (info: any) => {
   const selectedOption = info.key
   Selectgrade.value = `${selectedOption}`
   emit('gradeSelected', Selectgrade.value); // 把数据传给父组件
 }
const handlemajorMenuClick = (info: any) => {
  const selectedOption = info.key
  Selectmajor.value = `${selectedOption}`
  emit('majorSelected', Selectmajor.value);
}
const handleclassMenuClick = (info: any) => {
  const selectedOption = info.key
  Selectclass.value = `${selectedOption}`
  emit('classSelected', Selectclass.value);
}


</script>

<style scoped>
.demo-dropdown-wrap :deep(.ant-dropdown-button) {
  margin-right: 8px;
  margin-left: 9px;
  margin-bottom: 20px;
}

</style>
