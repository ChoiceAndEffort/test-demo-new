<template>
  <div id="app">
    <div class="header">
      <el-switch
        v-model="switchValue"
        active-text="中文"
        inactive-text="英文"
        active-value="zh"
        inactive-value="en"
        @change="changeLaguages"
      />
      <router-link to="/login" class="btn"> excel在线编辑 </router-link>
      <router-link to="/home" class="btn"> 左右滚动 </router-link>
      <router-link to="/page1" class="btn"> excel在线编辑page1 </router-link>
      <router-link to="/page2" class="btn"> excel在线编辑page2 </router-link>
      <router-link to="/page3" class="btn"> excel在线编辑page3 </router-link>
      <router-link to="/page4" class="btn"> excel在线编辑page4 </router-link>
      <router-link to="/page5" class="btn"> excel在线编辑page5 </router-link>
      <router-link to="/page6" class="btn"> 自定义表格组件 </router-link>
      <router-link to="/page7" class="btn"> 海波原始表格-跨页多选 </router-link>
      <router-link to="/page7-copy" class="btn">
        海波原始表格-展开行
      </router-link>
      <router-link to="/page8" class="btn"> 大文件上传 </router-link>
      <router-link to="/page9" class="btn"> 选人组件 </router-link>
      <router-link to="/page10" class="btn"> 测试rollUp打包的组件 </router-link>
      <router-link to="/page11" class="btn"> 表格树形结构多选 </router-link>

      <span>{{ $t("language.loginAccount") }}</span>
    </div>
    <div class="content">
      <div class="left">侧边栏</div>
      <div class="right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { HttpRequest } from "@hb/hb-services";
import { axios } from "@hb/hb-services";
import { Message } from "element-ui";
export default {
  name: "App",
  data() {
    return {
      switchValue: "",
    };
  },
  created() {
    console.log("------------", HttpRequest);
    const options = {
      baseURL: "http://192.168.20.151:7077",
      withCredentials: false,
      timeout: 3000,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      messageCallback: (message, type = "error") => {
        Message({
          message,
          type,
        });
      },
      //自定义配置
    };
    const { instance: ajax } = new HttpRequest(options);
    ajax.get();
    // window.messageCallback = (message, type = "error") => {
    //   Message({
    //     message,
    //     type,
    //   });
    // };
    // axios.get("/adfdasf");
  },
  methods: {
    changeLaguages(v) {
      console.log(v);
      // this.$i18n.locale === "zh" ? "en" : "zh";
      this.$confirm("确定切换语言吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.$i18n.locale === "cn") {
            this.$i18n.locale = "en"; //关键语句
            console.log("en");
          } else {
            this.$i18n.locale = "cn"; //关键语句
            console.log("cn");
          }
        })
        .catch(() => {
          console.log("catch");
          this.$message({
            type: "info",
          });
        });
    },
  },
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
