<template>
  <el-result icon="success" title="博客提交成功">
    <template slot="extra">
      <el-button type="primary" size="medium" @click="handleToArticle"
        >返回</el-button
      >
    </template>
  </el-result>
</template>

<script>
export default {
  props: {
    result: {
      type: String,
    },
  },
  methods: {
    handleToArticle() {
      this.$router.push("/home/editE");
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-result__title p {
  color: #000000 !important;
}
</style>
