<template>
  <div class="show-table">
    <hb-table
      :colConfig="colConfig"
      :tableData="tableData"
      :selection="true"
      saveComponentKey="page6-01"
      @selectionEvent="handleSelectionEvent"
    >
      <template slot="opCol">
        <el-button type="text">详情</el-button>
        <el-button type="text">删除</el-button>
      </template>
    </hb-table>
    <hb-table
      :colConfig="colConfig1"
      :tableData="tableData"
      :selection="true"
      saveComponentKey="page6-02"
      @selectionEvent="handleSelectionEvent"
    >
      <template slot="opCol">
        <el-button type="text">详情</el-button>
        <el-button type="text">删除</el-button>
      </template>
    </hb-table>
  </div>
</template>
 
<script>
import HbTable from "@/components/hb-table/index.vue";
import { colConfig, colConfig1 } from "./constants.js";

export default {
  components: {
    HbTable,
  },
  data() {
    return {
      colConfig,
      colConfig1,
      tableData: [
        {
          nestingName: "钢板图",
          totalPage: 10,
          sparePartsTotalWeight: 965,
          rawMaterialTotalWeight: 633,
        },
        {
          nestingName: "铝板图",
          totalPage: 10,
          sparePartsTotalWeight: 965,
          rawMaterialTotalWeight: 633,
        },
      ],
      tableData1: [
        {
          nestingName: "钢板图",
          totalPage: 10,
          sparePartsTotalWeight: 965,
          rawMaterialTotalWeight: 633,
        },
        {
          nestingName: "铝板图",
          totalPage: 10,
          sparePartsTotalWeight: 965,
          rawMaterialTotalWeight: 633,
        },
      ],
      search: "",
    };
  },
  methods: {
    handleSelectionEvent() {},
    handleSetTable() {},
  },
};
</script>
