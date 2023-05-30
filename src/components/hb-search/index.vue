<template>
  <div class="hb-search">
    <!--自定义表头列插槽--表头查询项----- 循环遍历input和select搜索框  -->
    <el-input
      v-if="item.slotHeaderSearchType === 'input'"
      v-model.trim="searchForm[row.searchKey]"
      size="mini"
      clearable
      placeholder="请输入"
    />
    <el-select
      v-else-if="item.slotHeaderSearchType === 'select'"
      v-model="searchForm[row.searchKey]"
      size="mini"
      clearable
      placeholder="请选择"
    >
      <el-option
        v-for="el in item.statusOptions"
        :key="el.value"
        :label="el.label"
        :value="el.value"
      />
    </el-select>
    <el-date-picker
      v-else-if="item.slotHeaderSearchType === 'picker'"
      v-model="searchForm[row.searchKey]"
      clearable
      size="mini"
      type="date"
      placeholder="选择日期"
    />
  </div>
</template>

<script>
export default {
  name: "HbSearch",
  components: {},
  props: {
    item: {
      type: Object,
      required: false,
      default: () => {},
    },
    row: {
      type: Object,
      required: false,
      default: () => {},
    },
    searchForm: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.hb-search {
}
</style>
