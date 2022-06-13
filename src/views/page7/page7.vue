<template>
  <div class="show-table">
    <el-button @click="handlete">删除</el-button>
    <TableBody
      class="table-body"
      v-if="tableData.length !== 0"
      :colConfig="colConfig"
      :data="
        tableData.slice(
          (filters.pageNum - 1) * filters.pageSize,
          filters.pageNum * filters.pageSize
        )
      "
      border
      row-key="id"
      @selection-change="handleSelectionSparePartsChange"
    >
      <!-- <template #index="{ scope }">
        <span>{{ indexMethod(scope.$index) }}</span>
      </template> -->
      <template slot="btn" slot-scope="{ scope }">
        <span class="details" @click="details(scope.row, 'bom')">修改</span>
      </template>
    </TableBody>
    <!-- <Pagination
      :data="{ data: tableData }"
      @changePage="changePage"
      v-if="tableData && tableData.length != 0"
    /> -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="filters.pageNum"
      :page-sizes="[2, 5, 10, 20]"
      :page-size="2"
      layout="sizes, prev, pager, next"
      :total="tableData.length"
    >
    </el-pagination>
  </div>
</template>
 
<script>
import { TableBody } from "gggj_lib";
import Pagination from "@/components/hb-pagination/index.vue";
import { colConfig } from "./constants";
export default {
  components: {
    TableBody,
    Pagination,
  },
  data() {
    return {
      colConfig,
      tableData: [
        {
          id: 1,
          nestingName: "钢板图1",
          totalPage: 10,
          sparePartsTotalWeight: 965,
          rawMaterialTotalWeight: 633,
        },
        {
          id: 2,
          nestingName: "铝板图2",
          totalPage: 10,
          sparePartsTotalWeight: 965,
          rawMaterialTotalWeight: 633,
        },
        {
          id: 3,
          nestingName: "铝板图3",
          totalPage: 10,
          sparePartsTotalWeight: 965,
          rawMaterialTotalWeight: 633,
        },

        {
          id: 4,
          nestingName: "铝板图4",
          totalPage: 10,
          sparePartsTotalWeight: 965,
          rawMaterialTotalWeight: 633,
        },
        {
          id: 5,
          nestingName: "铝板图5",
          totalPage: 10,
          sparePartsTotalWeight: 965,
          rawMaterialTotalWeight: 633,
        },
      ],
      filters: {
        pageNum: 1,
        pageSize: 2,
      },
      checkMutation: undefined,
    };
  },
  methods: {
    handleSelectionSparePartsChange(val) {
      this.checkMutation = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.filters.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.filters.pageNum = val;
    },
    handlete() {
      console.log(this.checkMutation, "删除");
    },
  },
};
</script>
