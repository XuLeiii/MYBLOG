<template>
  <div id="header-box">
    <span class="logo-box">白开水很烫的博客</span>
    <el-input class="serach"  placeholder="请输入关键字...">
      <i class="el-icon-search" slot="suffix"></i>
    </el-input>
  </div>
  
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
  #header-box {
    height: 50px;
    background-color: rgb(100, 100, 100);
    position: fixed;
    width: 80vw;
    top: 0;
    padding-left: 10vw;
    padding-right: 10vw;
    line-height: 50px;
    z-index: 9;
    .logo-box {
      float: left;
      color:rgb(255, 255, 255) ;
      font-size: 25px;
      height: 50px;
    }
    
    .serach {
      float: right;
      width: 20vw;
      i {
        font-size: 18px;
        margin-right: 5px;
      }
    }
  }
</style>
