<template>
  <el-pagination
    v-if="hasPagination"
    v-model:current-page="pagination.currentPage"
    background
    class="pagination-wrap"
    :total="pagination.total || 0"
    :page-size="pagination.pageSize"
    :page-sizes="pagination.pageSizesArr || [5, 10, 20, 50]"
    :layout="
      isShowLayoutSizes
        ? 'total,sizes, prev, pager, next, jumper'
        : 'total, prev, pager, next, jumper'
    "
    @size-change="handleSizeChange"
    @current-change="currentChange"
  />
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          total: 0, //总数
          size: 10, //每页条数
          page: 0, //当前page
          isShowLayoutSizes: false, //是否展示每页不同条数
          pageSizesArr: [], //可选择每页条数[5,10,20,50]
        };
      },
    },
    isShowLayoutSizes: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  data() {
    return {
      pagination: {},
      hasPagination: false,
    };
  },
  watch: {
    data: {
      handler: function (newData, old) {
        this.pagination = newData;
        // console.log("-----------this.pagination", this.pagination);
        if (newData.data) {
          if (newData.data.length == 0) {
            this.hasPagination = false;
          } else {
            this.hasPagination = true;
          }
        }
        this.$set(this.pagination, "currentPage", newData.page + 1);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    /**
     * 切换页码
     * @param { Number } pageIndex 页码
     */
    currentChange(pageIndex) {
      this.$emit("changePage", pageIndex - 1);
    },
    handleSizeChange(val) {
      // this.pagination.size = val;
      this.$emit("sizeChange", val);
      console.log(`每页 ${val} 条`);
    },
  },
};
</script>

<style scoped lang="scss">
.pagination-wrap {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: flex-end;
}
</style>
