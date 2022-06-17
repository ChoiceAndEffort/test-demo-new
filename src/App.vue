<template>
  <div id="app">
    <div class="header">
      <router-link to="/login" class="btn">excel在线编辑</router-link>
      <router-link to="/home" class="btn">左右滚动</router-link>
      <router-link to="/page1" class="btn">excel在线编辑page1 </router-link>
      <router-link to="/page2" class="btn">excel在线编辑page2</router-link>
      <router-link to="/page3" class="btn">excel在线编辑page3</router-link>
      <router-link to="/page4" class="btn">excel在线编辑page4</router-link>
      <router-link to="/page5" class="btn">excel在线编辑page5</router-link>
      <router-link to="/page6" class="btn">page6</router-link>
      <router-link to="/page7" class="btn">page7</router-link>
      <router-link to="/page8" class="btn">page8</router-link>
    </div>
    <div class="content">
      <div class="left">侧边栏</div>
      <div class="right">
        <router-view> </router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less" scoped>
#app {
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  .btn {
    margin-right: 10px;
  }
  .header {
    box-sizing: border-box;
    height: 50px;
    border: 1px solid #ccc;
  }
  .content {
    box-sizing: border-box;
    height: calc(100vh-50px);
    flex: 1;
    display: flex;
    .left {
      width: 200px;
      background: blueviolet;
    }
    .right {
      flex: 1;
    }
  }
}
</style>
