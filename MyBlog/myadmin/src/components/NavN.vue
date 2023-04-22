<template>
  <div class="nav-box">
    <el-menu router :default-active="$route.path" background-color="#545c64" text-color="#fff">
      <el-menu-item  index="/home/article">
        <i class="el-icon-menu" ></i>
        <span slot="title">文章管理</span>
      </el-menu-item>
      <el-menu-item index="/home/editE" >
        <i class="el-icon-setting"></i>
        <span slot="title">编辑文章</span>
      </el-menu-item>
      <el-menu-item index="/home/photoEdit">
        <i class="el-icon-setting"></i>
        <span slot="title">照片管理</span>
      </el-menu-item>
      <el-menu-item index="/home/dataBorder">
        <i class="el-icon-setting"></i>
        <span slot="title">数据看板</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.nav-box {
  .el-menu {
    border: 0;
  }
  background-color: #545c64;
}
</style>
