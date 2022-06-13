<template>
  <div class="show-table">
    <hb-table
      :colConfig="colConfig"
      :tableData="
        tableData.slice(
          (searchForm.pageNum - 1) * searchForm.pageSize,
          searchForm.pageNum * searchForm.pageSize
        )
      "
      :selection="true"
      :border="true"
      saveComponentKey="page6-01"
      @to-search="handleToSearch"
      @reset-search="handleResetSearch"
      @selectionEvent="handleSelectionEvent"
    >
      <!-- 添加自定义全选框 -->
      <!-- <el-table-column slot="selection" fixed type="selection" width="350">
      </el-table-column> -->

      <!-- 循环便利input和select搜索框  -->
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

      <!-- 自定义表头列插槽-搜索日期项 -->
      <template slot="searchRawMaterialTotalWeight" slot-scope="scope">
        <el-date-picker
          v-model="searchForm[scope.row.searchKey]"
          type="date"
          size="mini"
          style="width:100%;'"
          placeholder="请选择"
        >
        </el-date-picker>
      </template>

      <!--自定义表头列----列内容插槽 -->
      <template slot="operation" slot-scope="scope">
        <el-button
          type="text"
          v-if="operateList.length === 1"
          :disabled="handleColBtnIsDisabled(scope.row)"
          @click="handleOperateCol(operateList[0].eventsName, scope.row)"
          >详情</el-button
        >
        <el-dropdown trigger="hover" v-else>
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) in operateList"
              :key="index"
              :disabled="item.disabled && handleColBtnIsDisabled(scope.row)"
              @click.native="handleOperateCol(item.eventsName, scope.row)"
              >{{ item.btnName }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </template>

      <!-- 自定义列插槽 -->
      <template slot="addCol" slot-scope="scope">
        <div style="padding: 30px; background: gray">
          <el-table :data="tableData1" style="width: 100%">
            <el-table-column prop="nestingName" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="totalPage" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="sparePartsTotalWeight" label="地址">
            </el-table-column>
          </el-table>
        </div>
      </template>
    </hb-table>

    <hb-table
      :colConfig="colConfig1"
      :tableData="tableData1"
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
const INIT_SEARCH = {
  pageNum: 1,
  pageSize: 1,
};
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
          index: 0,
          nestingName: "钢板图",
          totalPage: 10,
          status: 0,
          filters: "ABCADD",
          date: "2027-09-08",
          sparePartsTotalWeight: 9999999999999,
          rawMaterialTotalWeight: 633,
        },
        {
          index: 1,

          nestingName: "铝板图",
          totalPage: 10,
          status: 1,
          filters: "CCCCCCC",
          date: "2027-09-08",
          totalPage: 10,
          sparePartsTotalWeight: 965,
          rawMaterialTotalWeight: 633,
        },
      ],
      tableData1: [
        {
          index: 2,
          nestingName: "钢板图",
          totalPage: 10,
          sparePartsTotalWeight: 965,
          rawMaterialTotalWeight: 633,
        },
        {
          index: 3,
          nestingName: "铝板图",
          totalPage: 10,
          sparePartsTotalWeight: 965,
          rawMaterialTotalWeight: 633,
        },
      ],
      searchForm: {
        ...JSON.parse(JSON.stringify(INIT_SEARCH)),
      },
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
      //操作项list
      operateList: [
        {
          btnName: "详情",
          eventsName: "handleSeeDetail",
        },
        {
          btnName: "删除",
          eventsName: "handleDelete",
          disabled: true, //是否禁用
        },
        {
          btnName: "编辑",
          eventsName: "handleEdit",
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
      this.searchForm = {
        ...JSON.parse(JSON.stringify(INIT_SEARCH)),
      };
      console.log("重置查询条件", this.searchForm);
    },
    handleSeeDetail(row) {
      console.log("详情页", row);
    },
    handleDelete(row) {
      console.log("删除页", row);
    },
    handleEdit(row) {
      console.log("编辑页", row);
    },
    //操作项
    handleOperateCol(eventName, row) {
      console.log("操作栏对应的操作项", eventName, row);
      this[eventName](row);
    },
    handleColBtnIsDisabled(row) {
      return row.index === 0;
    },
  },
  created() {
    this.searchColConfig = JSON.parse(JSON.stringify(this.colConfig)).filter(
      (item) =>
        item.slotHeaderSearchType === "input" ||
        item.slotHeaderSearchType === "select"
    );
    // console.log(this.searchColConfig, 666666666);1111
  },
};
</script>
