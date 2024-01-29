<!--
    * @FileDescription: 布局页面。
    * @Author: 李思佳
    * @Date: 2024年1月22日
    * @LastEditors: 李思佳
    * @LastEditTime: 2024年1月22日
-->
<template>
  <a-layout class="main">
    <a-layout-header class="header">
      <HeaderMenu />
    </a-layout-header>
    <a-layout-content class="main-content">
      <a-layout class="main-content-layout">
        <a-layout-sider width="200" class="main-content-sider">
          <MainMenu />
        </a-layout-sider>
        <a-layout-content class="main-content-layout-content">
          <RouterView />
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer class="footer">
      <a-divider plain
        ><span class="footer-font"
          >Copyright © 2024 成都东软学院. 京ICP备10214630号</span
        ></a-divider
      >
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts" setup>
// 导入组件
import HeaderMenu from '@/components/mains-components/mainpage/HeaderMenu.vue'
import MainMenu from '@/components/mains-components/mainpage/MainMenu.vue'
</script>

<style scoped>
.main {
  min-height: 100%;
  background-image: url('../../assets/images/back6.jpeg');
  background-size: cover;
}
.header {
  background: #02509b;
}

.main-content {
  display: flex;
  padding: 3% 3% 1% 3%;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
}

.main-content-layout {
  flex: 1;
  padding: 3% 0;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 15px;
}

.main-content-sider {
  background-color: rgba(255, 255, 255, 0.1);
}

.main-content-layout-content {
  padding: 0 3%;
}

.footer {
  text-align: center;
  padding: 0 3%;
}

.footer-font {
  font-weight: 100;
}
:deep :where(.css-dev-only-do-not-override-19yxfbp).ant-menu-light {
  color: rgba(0, 0, 0, 0.88);
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
