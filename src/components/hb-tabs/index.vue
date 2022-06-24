<template>
  <div class="hb-tabs">
    <span
      v-for="(item, index) in tabsList"
      :key="index"
      :class="index == indexAtv ? 'span_atv' : ''"
      @click="tabChang(item, index)"
      >{{ item.name }}</span
    >
  </div>
</template>
<script>
export default {
  props: {
    tabsList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      indexAtv: 0,
    };
  },
  methods: {
    tabChang(objs, index) {
      this.indexAtv = index;
      this.$emit("tab-change", objs);
    },
  },
};
</script>
<style lang="scss" scoped>
.hb-tabs {
  display: flex;
  align-items: center;
  height: 32px;
  background: #e5e6eb;
  font-size: 14px;
  padding: 0 1px;
  border-radius: 2px;
  span {
    height: 28px;
    box-sizing: border-box;
    line-height: 28px;
    padding: 0 23px;
    border-radius: 2px;
    color: #56585c;
    margin: 0 2px;
    cursor: pointer;
    &:hover {
      background: #fafafa;
      color: #242833;
    }
  }
  .span_atv {
    background: #fff;
    color: #242833;
    &:hover {
      background: #fff;
      color: #242833;
    }
  }
}
</style>