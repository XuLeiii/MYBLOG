<template>
  <div class="header">
    <div class="header-left">白开水很烫的博客管理</div>
    <div class="header-right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar size="medium" :src="avatar" shape="square"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="admin">管理员</div>
    </div>
  </div>
</template>

<script>
import avatar from "../assets/img/avatar.png";
export default {
  data() {
    return {
      avatar,
    };
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .header-left {
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    padding-left: 18px;
  }
  .header-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 80px;
    color: #fff;
    .el-dropdown {
        padding-right: 10px;
      .el-avatar {
        border-radius: 8px;
      }
    }
  }
}
</style>
