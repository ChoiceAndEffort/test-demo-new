<template>
  <!-- <div class='ws-dialog'> -->
  <el-dialog
    v-bind="$attrs"
    :close-on-click-modal="false"
    custom-class="hb-dialog"
    v-on="$listeners"
  >
    <slot />
    <slot v-if="!showFooter" name="footer" />
    <span v-if="showFooter" slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">{{ cancelBtnName }}</el-button>
      <el-button type="primary" :disabled="canConfirm" @click="onConfirm">{{
        confirmBtnName
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "HbDialog",
  props: {
    onConfirm: {
      //提交调用的方法
      type: Function,
      required: false,
      default: () => {},
    },
    canConfirm: {
      //处理重复提交的问题
      type: Boolean,
      required: false,
      default: () => false,
    },
    showFooter: {
      //是否需要展示底部的确认区域
      type: Boolean,
      required: false,
      default: () => true,
    },
    confirmBtnName: {
      type: String,
      required: false,
      default: () => "确 定",
    },
    cancelBtnName: {
      type: String,
      required: false,
      default: () => "取 消",
    },
  },
  data() {
    return {};
  },
  created() {
    console.log("dialog-初始化");
  },
  methods: {
    handleCancel() {
      this.$emit("update:visible", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.hb-dialog {
}
::v-deep .el-dialog__footer {
  border-top: 1px solid #e1e4eb;
}
::v-deep .el-dialog__header {
  border-bottom: 1px solid #e1e4eb;
}
</style>
