<!--
    * @FileDescription: 登录页面。
    * @Author: 作者信息
    * @Date: 2024年1月22日
    * @LastEditors: 李思佳
    * @LastEditTime: 2024年1月22日
-->
<template>
  <div>
    <h2>登录</h2>
    <a-button type="primary" ghost @click="LogIn">登录</a-button>
    <a-button type="primary" @click="signIn">注册</a-button>
    <a-button @click="forgotPassword">忘记密码</a-button>
  </div>
</template>

<script setup lang="ts">
import router from '@/routers'

function LogIn() {
  router.push('/HomePage')
}

function signIn() {
  router.push('/SignIn')
}

function forgotPassword() {
  router.push('/ForgotPassword')
}
</script>

<style scoped></style>
