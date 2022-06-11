<template>
  <div class="table-config">
    <div class="config-header">
      <span>表头设置</span>
      <span class="recovery-btn" @click="handleRecovery">恢复默认</span>
    </div>
    <draggable class="wrapper" v-model="list" @end="onEnd">
      <transition-group>
        <div v-for="(item, index) in list" :key="index" class="item">
          <div class="label" v-show="item.attrs.prop">
            <span class="label-title el-icon-rank">
              {{ item.attrs.label }}</span
            >
            <el-switch
              v-model="item.attrs.switch"
              active-color="#409eff"
              inactive-color="#dcdfe6"
              @change="handleSwitchChange"
            >
            </el-switch>
          </div>

          <!-- <div class="label">{{ item.attrs.label }}</div> -->
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

 
<script>
import draggable from "vuedraggable";
export default {
  props: {
    initList: {
      type: Array,
      require: false,
      default: () => {
        return [];
      },
    },
    saveComponentKey: {
      type: String,
      require: false,
      default: () => "",
    },
  },
  components: {
    draggable,
  },
  data() {
    return {
      list: JSON.parse(JSON.stringify(this.initList)),
      // urlPath: undefined,
    };
  },
  computed: {
    haveHbSetting() {
      return this.initList.some((item) => item.slotHeader === "hbSetting");
    },
  },
  watch: {
    // list: {
    //   handler(nv, ov) {
    //     console.log("-----监听开关值变化进来了", this.list);
    //     this.$emit("changeColConfig", this.list);
    //     sessionStorage.setItem(this.urlPath, JSON.stringify(this.list));
    //   },
    //   deep: true,
    //   // immediate: true,
    // },
  },
  methods: {
    updateList() {
      if (this.haveHbSetting) {
        this.$emit("changeColConfig", this.list);
        sessionStorage.setItem(
          this.saveComponentKey,
          JSON.stringify(this.list)
        );
      }
      //  else {
      //   this.$emit("changeColConfig", this.list);
      // }
    },

    onEnd() {
      // this.$emit("changeColConfig", this.list);
      // sessionStorage.setItem(this.saveComponentKey, JSON.stringify(this.list));
      // console.log(9999999, this.list);
      this.updateList();
    },
    handleRecovery() {
      if (this.haveHbSetting) {
        sessionStorage.removeItem(this.saveComponentKey); //清除存储项
        this.list = JSON.parse(JSON.stringify(this.initList)); //配置项恢复默认值
        this.$emit(
          "changeColConfig",
          JSON.parse(JSON.stringify(this.initList))
        ); //表格恢复默认值
      }
      // else {
      //   this.list = JSON.parse(JSON.stringify(this.initList)); //配置项恢复默认值
      //   this.$emit(
      //     "changeColConfig",
      //     JSON.parse(JSON.stringify(this.initList))
      //   ); //表格恢复默认值
      // }
    },
    handleSwitchChange() {
      this.updateList();
    },
  },
  created() {
    if (this.haveHbSetting) {
      this.list = JSON.parse(sessionStorage.getItem(this.saveComponentKey))
        ? JSON.parse(sessionStorage.getItem(this.saveComponentKey))
        : JSON.parse(JSON.stringify(this.initList));
    }
    //  else {
    //   this.list = JSON.parse(JSON.stringify(this.initList));
    // }
  },
};
</script>
<style lang="less">
.table-config {
  padding: 15px;
  .config-header {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }
  .recovery-btn {
    color: #409eff;
    cursor: pointer;
  }
  .label {
    padding: 8px 8px;
    margin-bottom: 10px;
    display: flex;
    border: 1px dashed #ccc;
    justify-content: space-between;
    .label-title {
      max-width: 200px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
  