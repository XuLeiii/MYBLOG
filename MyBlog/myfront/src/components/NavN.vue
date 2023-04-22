<template>
  <div class="nav-box">
    <el-menu
      class="navbar"
      :collapse="false"
      router
      :default-active="$route.path"
    >
      <el-menu-item index="/list/blog">
        <i class="el-icon-menu"></i>
        <span slot="title">博客</span>
      </el-menu-item>
      <el-menu-item index="/photo">
        <i class="el-icon-picture"></i>
        <span slot="title">照片墙</span>
      </el-menu-item>
      <el-menu-item index="/MessageBoard">
        <i class="el-icon-chat-dot-round"></i>
        <span slot="title">留言板</span>
      </el-menu-item>
      <el-menu-item index="/about">
        <i class="el-icon-user"></i>
        <span slot="title">关于</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
//
<script>
export default {
  data() {
    return {
      isCollapse: document.documentElement.clientWidth < 900,
    };
  },
};
</script>

<style scoped lang="less">
.nav-box {
  position: sticky;
  top: 50px;
  width: 16vw;
  height: 100%;
  opacity: 0.8;
  padding-top: 5px;
  .navbar {
    border: 0;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    height: 350px;
  }
}
</style>
