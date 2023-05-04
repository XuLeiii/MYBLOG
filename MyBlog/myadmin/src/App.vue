<template>
  <div id="app">
    <router-view class="box"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  // outline: red 1px solid;
}
body {
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>
