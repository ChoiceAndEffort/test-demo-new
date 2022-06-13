<template>
  <div class="show-table">
    <hb-table
      :colConfig="colConfig"
      :tableData="tableData"
      :selection="true"
      :border="true"
      saveComponentKey="page6-01"
      @to-search="handleToSearch"
      @reset-search="handleResetSearch"
      @selectionEvent="handleSelectionEvent"
    >
      <!-- <el-table-column slot="selection" fixed type="selection" width="350">
      </el-table-column> -->
      <template
        v-for="(item, index) in searchColConfig"
        :slot="item.slotHeaderName"
        slot-scope="scope"
      >
        <el-input
          :key="index"
          v-if="item.slotHeaderSearchType === 'input'"
          size="mini"
          v-model="searchForm[scope.row.searchKey]"
          placeholder="请输入"
        ></el-input>
        <el-select
          v-else-if="item.slotHeaderSearchType === 'select'"
          :key="index"
          size="mini"
          v-model="searchForm[scope.row.searchKey]"
          placeholder="请选择"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </template>

      <template slot="searchRawMaterialTotalWeight" slot-scope="scope">
        <el-date-picker
          v-model="searchForm[scope.row.searchKey]"
          type="date"
          size="mini"
          placeholder="请选择"
        >
        </el-date-picker>
      </template>

      <!--列内容插槽 -->
      <template slot="operation" slot-scope="scope">
        <el-dropdown trigger="click" @command="handleCommand(scope.row)">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a" >详情</el-dropdown-item>
            <el-dropdown-item command="b">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </hb-table>
    <hb-table
      :colConfig="colConfig1"
      :tableData="tableData"
      :selection="true"
      :border="true"
      saveComponentKey="page6-02"
      @selectionEvent="handleSelectionEvent"
    >
      <template slot="opCol" fixed>
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
      searchColConfig: undefined, //搜索项配置
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
      searchForm: {},
      statusOptions: [
        {
          label: "未开发",
          value: "0",
        },
        {
          label: "已开发,未受控",
          value: "1",
        },
        {
          label: "已受控,未下发",
          value: "2",
        },
      ],
    };
  },
  methods: {
    handleSelectionEvent() {},

    handleToSearch() {
      console.log("看查询条件-----", this.searchForm);
    },
    handleResetSearch() {
      this.searchForm = {};
      console.log("重置查询条件", this.searchForm);
    },
    handleCommand(row) {
      console.log(999999999999,row);
    },
  },
  created() {
    this.searchColConfig = JSON.parse(JSON.stringify(this.colConfig)).filter(
      (item) =>
        item.slotHeaderSearchType === "input" ||
        item.slotHeaderSearchType === "select"
    );
    console.log(this.searchColConfig, 666666666);
  },
};
</script>
