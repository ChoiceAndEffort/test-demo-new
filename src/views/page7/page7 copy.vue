<template>
  <div class="show-table">
    <el-button @click="handlete">删除</el-button>
    <!-- <TableBody
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
      row-key="materialCode"
      @selection-change="handleSelectionSparePartsChange"
      @expand-change="expandChange"
    >
      <template #index="{ scope }">
        <span>{{ scope.$index }}</span>
      </template>
      <template slot="expand" slot-scope="{ scope }">
        <div>
          <el-table
            :data="tableData[scope.$index].children"
            style="width: 100%"
            :header-row-class-name="headerClass"
            v-loading="isLoading"
          >
            <template v-for="item in bomChildrenTableColumnList">
              <el-table-column
                :prop="item.attrs.prop"
                :label="item.attrs.label"
                :key="item.attrs.prop"
                :width="item.attrs.width"
                :align="item.attrs.align"
                lazy
              >
              </el-table-column>
            </template>
          </el-table>
        </div>
      </template>
    </TableBody> -->

    <TableBody
      v-loading="isLoading"
      v-if="data.length !== 0"
      :colConfig="colConfig"
      :data="data.data"
      border
      row-key="materialCode"
      @selection-change="handleSelectionSparePartsChange"
      @expand-change="expandChange"
    >
      <template #index="{ scope }">
        <span>{{ scope.$index }}</span>
      </template>
      <template slot="expand" slot-scope="{ scope }">
        <div>
          <el-table
            :data="data.data[scope.$index].children"
            style="width: 100%"
            :header-row-class-name="headerClass"
            v-loading="isLoading"
            row-key="bomId"
          >
            <template v-for="item in bomChildrenTableColumnList">
              <el-table-column
                :prop="item.attrs.prop"
                :label="item.attrs.label"
                :key="item.attrs.prop"
                :width="item.attrs.width"
                :align="item.attrs.align"
              >
              </el-table-column>
            </template>
          </el-table>
        </div>
      </template>
    </TableBody>

    <Pagination :data="data" @changePage="changePage" />
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="filters.pageNum"
      :page-sizes="[2, 5, 10, 20]"
      :page-size="2"
      layout="sizes, prev, pager, next"
      :total="data.data.length"
    >
    </el-pagination> -->
  </div>
</template>
 
<script>
import { TableBody } from "gggj_lib";
import Pagination from "@/components/hb-pagination/index.vue";
import { colConfig, bomChildrenTableColumnList } from "./constants copy";
export default {
  components: {
    TableBody,
    Pagination,
  },
  data() {
    return {
      colConfig,
      isLoading: false,
      headerClass: "table-header-gray",
      bomChildrenTableColumnList,
      data: {
        data: [
          {
            couplingId: null,
            engineeringProjectId: null,
            procedureId: null,
            bomId: null,
            projectNo: null,
            subassemblyAmount: null,
            materialCode: "DS211304J1030",
            materialNumber: "9-Y2A",
            materialWeight: 35016.9,
            subassemblyCode: null,
            subassemblyNumber: null,
            subassemblyWeight: null,
            subassemblyTotalWeight: null,
            addTime: null,
            addId: null,
            addName: null,
            updTime: null,
            updId: null,
            updName: null,
            children: null,
          },
          {
            couplingId: null,
            engineeringProjectId: null,
            procedureId: null,
            bomId: null,
            projectNo: null,
            subassemblyAmount: null,
            materialCode: "J21130400001",
            materialNumber: "M-PJB17",
            materialWeight: 9052.8,
            subassemblyCode: null,
            subassemblyNumber: null,
            subassemblyWeight: null,
            subassemblyTotalWeight: null,
            addTime: null,
            addId: null,
            addName: null,
            updTime: null,
            updId: null,
            updName: null,
            children: null,
          },
          {
            couplingId: null,
            engineeringProjectId: null,
            procedureId: null,
            bomId: null,
            projectNo: null,
            subassemblyAmount: null,
            materialCode: "DS211304J1091",
            materialNumber: null,
            materialWeight: null,
            subassemblyCode: null,
            subassemblyNumber: null,
            subassemblyWeight: null,
            subassemblyTotalWeight: null,
            addTime: null,
            addId: null,
            addName: null,
            updTime: null,
            updId: null,
            updName: null,
            children: null,
          },
          {
            couplingId: null,
            engineeringProjectId: null,
            procedureId: null,
            bomId: null,
            projectNo: null,
            subassemblyAmount: null,
            materialCode: "DS211304J1092",
            materialNumber: null,
            materialWeight: null,
            subassemblyCode: null,
            subassemblyNumber: null,
            subassemblyWeight: null,
            subassemblyTotalWeight: null,
            addTime: null,
            addId: null,
            addName: null,
            updTime: null,
            updId: null,
            updName: null,
            children: null,
          },
          {
            couplingId: null,
            engineeringProjectId: null,
            procedureId: null,
            bomId: null,
            projectNo: null,
            subassemblyAmount: null,
            materialCode: "DS211304J1093",
            materialNumber: null,
            materialWeight: null,
            subassemblyCode: null,
            subassemblyNumber: null,
            subassemblyWeight: null,
            subassemblyTotalWeight: null,
            addTime: null,
            addId: null,
            addName: null,
            updTime: null,
            updId: null,
            updName: null,
            children: null,
          },
          {
            couplingId: null,
            engineeringProjectId: null,
            procedureId: null,
            bomId: null,
            projectNo: null,
            subassemblyAmount: null,
            materialCode: "DS211304J1094",
            materialNumber: null,
            materialWeight: null,
            subassemblyCode: null,
            subassemblyNumber: null,
            subassemblyWeight: null,
            subassemblyTotalWeight: null,
            addTime: null,
            addId: null,
            addName: null,
            updTime: null,
            updId: null,
            updName: null,
            children: null,
          },
          {
            couplingId: null,
            engineeringProjectId: null,
            procedureId: null,
            bomId: null,
            projectNo: null,
            subassemblyAmount: null,
            materialCode: "DS211304J1095",
            materialNumber: null,
            materialWeight: null,
            subassemblyCode: null,
            subassemblyNumber: null,
            subassemblyWeight: null,
            subassemblyTotalWeight: null,
            addTime: null,
            addId: null,
            addName: null,
            updTime: null,
            updId: null,
            updName: null,
            children: null,
          },
          {
            couplingId: null,
            engineeringProjectId: null,
            procedureId: null,
            bomId: null,
            projectNo: null,
            subassemblyAmount: null,
            materialCode: "DS211304J1096",
            materialNumber: null,
            materialWeight: null,
            subassemblyCode: null,
            subassemblyNumber: null,
            subassemblyWeight: null,
            subassemblyTotalWeight: null,
            addTime: null,
            addId: null,
            addName: null,
            updTime: null,
            updId: null,
            updName: null,
            children: null,
          },
        ],
      },
      childrenData: [
        {
          couplingId: null,
          engineeringProjectId: null,
          procedureId: null,
          bomId: "220607CAWSXS344H",
          projectNo: null,
          subassemblyAmount: 1,
          materialCode: "DS211304J1030",
          materialNumber: null,
          materialWeight: null,
          subassemblyCode: "N211304J1030",
          subassemblyNumber: null,
          subassemblyWeight: null,
          subassemblyTotalWeight: 0.0,
          addTime: null,
          addId: null,
          addName: null,
          updTime: null,
          updId: null,
          updName: null,
          children: null,
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
    async expandChange(expandedRows, expanded) {
      this.isLoading = true;
      // let index = this.data.data.findIndex(
      //   (item) => item.materialCode === expandedRows.materialCode
      // );
      // let res = await getBomChildPage(sendData);
      let index = expandedRows.index;
      console.log(expandedRows, 66666666, index);
      this.$set(this.data.data[index], "children", []);
      setTimeout(() => {
        this.isLoading = false;
        this.$set(this.data.data[index], "children", this.childrenData);
        console.log(this.data.data, 66666666, index);
      }, 1000);
    },
    changePage(){

    }
  },
};
</script>
