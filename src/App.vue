<template>
  <div id="app">
    <router-link to="/login" class="btn">excel在线编辑</router-link>

    <router-link to="/home" class="btn">左右滚动</router-link>

    <router-link to="/page1" class="btn">excel在线编辑page1 </router-link>

    <router-link to="/page2" class="btn">excel在线编辑page2</router-link>
    <router-link to="/page3" class="btn">excel在线编辑page3</router-link>
    <router-link to="/page4" class="btn">excel在线编辑page4</router-link>
    <router-link to="/page5" class="btn">excel在线编辑page5</router-link>
    <router-link to="/page6" class="btn">page6</router-link>

    <router-view> </router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less" scoped>
#app{
  .btn{
    margin-right: 10px;
  }
}
</style>
