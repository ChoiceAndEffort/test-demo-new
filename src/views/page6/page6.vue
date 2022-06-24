<!--银行信息列表-->
<template>
  <div class="fms-view bank-list">
    <h3 class="h3-title">银行信息</h3>
    <div class="header-operate-area">
      <el-button
        type="primary"
        icon="el-icon-plus"
        class="add-btn"
        @click="handleAddvoucherInfo('add')"
        >新增银行信息</el-button
      >
      <el-button>导入银行信息</el-button>
    </div>

    <div class="fms-content">
      <hb-table
        v-loading="loading"
        :colConfig="colConfig"
        :tableData="initData.data"
        row-key="id"
        height="calc(100vh - 265px)"
        :selection="true"
        :border="true"
        @to-search="handleToSearch"
        @reset-search="handleResetSearch"
        @update-search-col-config="handleUpdateSearchColConfig"
      >
        <!--自定义表头列插槽--表头查询项----- 循环遍历input和select搜索框  -->

        <template
          v-for="(item, index) in searchColConfig"
          :slot="item.slotHeaderName"
          slot-scope="scope"
        >
          <hb-search
            :item="item"
            :key="index"
            :searchColConfig="searchColConfig"
            :searchForm="searchForm"
            :row="scope.row"
          />
        </template>

        <!-- 自定义表头列下的插槽 -->
        <template slot="switchDelFlag" slot-scope="scope">
          <el-switch
            v-model="scope.row.delFlag"
            :active-value="1"
            :inactive-value="2"
            @change="handleSwitchChange(scope.row, scope.row.swiftCode)"
          >
          </el-switch>
        </template>

        <!--自定义表头列插槽----下的列内容插槽--------如:插槽'hbSetting'下展示操作项 -->
        <template slot="operation" slot-scope="scope">
          <hb-operate
            :operateList="operateList"
            :row="scope.row"
            @setEventsName="setEventsName"
          ></hb-operate>
        </template>
      </hb-table>
    </div>
    <div class="fms-pagination">
      <pagination
        class="hb-pagination"
        :data="initData"
        @changePage="handleChangePage"
        @sizeChange="handleSizeChange"
        :isShowLayoutSizes="true"
      />
    </div>

    <hb-dialog
      :visible.sync="bankDialogVisible"
      v-if="bankDialogVisible"
      :show-footer="true"
      width="488px"
      :title="bankDialogVisibleTitle"
      confirmBtnName="保存"
      :onConfirm="handleSubmitForm"
      :canConfirm="submitLoading"
    >
      <el-form
        :model="formData"
        :rules="bankListRules"
        ref="bank-list"
        label-width="100px"
        label-position="top"
      >
        <hb-form-item :formData="formData" :formItemList="formItemList">
        </hb-form-item>
      </el-form>
    </hb-dialog>
  </div>
</template>

<script>
const INIT_SEARCH = {
  status: 1,
  page: 0,
  size: 10,
};
// import {
//   bankInfoList,
//   // bankInfoDel,
//   uploadXlsUrl,
//   changeBankListSwitch,
//   bankInfoStore,
// } from "@/api/fms.js";
// import { TableBody, Pagination, Form } from "gggj_lib";
import HbTable from "@/components/hb-table/index.vue";
import Pagination from "@/components/hb-pagination/index.vue";
import HbDialog from "@/components/hb-dialog/index.vue";
import HbFormItem from "@/components/hb-form/index.vue";
import HbOperate from "@/components/hb-operate/index.vue";
import HbSearch from "@/components/hb-search/index.vue";
import { colConfig, bankListRules, formItemList } from "./constants.js";
import tableMixins from "@/mixins/table-mixins.js";
import { cleanParams } from "@/utils/index.js";
import { cloneDeep } from "lodash";
export default {
  components: {
    HbTable,
    Pagination,
    HbDialog,
    HbFormItem,
    HbSearch,
    HbOperate,
  },
  mixins: [tableMixins],
  data() {
    return {
      colConfig,
      bankListRules,

      formItemList,
      // 搜索条件
      searchForm: {
        ...cloneDeep(INIT_SEARCH),
      },
      //操作项list
      operateList: [
        {
          btnName: "修改",
          eventsName: "handleEdit",
        },
      ],
      //初始化数据
      initData: {
        page: 0,
        size: 10,
        data: [],
      },
      loading: false,

      bankDialogVisible: false,
      bankDialogVisibleTitle: "新增银行信息",
      submitLoading: false,
      formData: {
        code: "",
        name: "",
        address: "",
      },
    };
  },
  methods: {
    async handleSwitchChange(row) {
      const { id, delFlag } = row;
      console.log(1111111111, id, delFlag);
      try {
        let res = await changeBankListSwitch({ id, delFlag });
        this.pageList();
      } catch (error) {
        this.pageList();
      }
      // this.$message({
      //   message: row ? "开启成功" : "关闭成功",
      //   type: "success",
      // });
    },

    handleResetSearch() {
      this.searchForm = {
        ...cloneDeep(INIT_SEARCH),
      };
      this.publicSearchAndChangeSize();
    },
    //去查询
    handleToSearch() {
      console.log("看查询条件-----", this.searchForm);
      this.publicSearchAndChangeSize();
    },

    //编辑操作项
    handleEdit(row) {
      console.log("编辑页", row);
      this.bankDialogVisibleTitle = "修改银行信息";
      this.formData = { ...row };
      this.handleAddvoucherInfo("edit");
    },

    //操作项父级方法
    handleOperateCol(eventName, row) {
      console.log("操作栏对应的操作项", eventName, row);
      this[eventName](row);
    },

    //禁用操作列
    handleColBtnIsDisabled(row) {
      console.log(row, row.delFlag === 1);
      return row.delFlag === 1;
    },
    setEventsName(eventName, row) {
      console.log(eventName, row);
      this[eventName](row);
    },
    //翻页--查询
    handleChangePage(page) {
      this.searchForm.page = page;
      this.pageList();
    },
    //每页条数改变---查询
    handleSizeChange(size) {
      this.searchForm.size = size;
      this.publicSearchAndChangeSize();
    },
    publicSearchAndChangeSize() {
      this.searchForm.page = 0;
      this.initData.page = 0;
      this.initData.currentPage = 0;
      this.pageList();
    },
    //查询列表
    async pageList() {
      this.loading = true;
      try {
        let res = await this.$axios.post(
          "http://192.168.20.151:9099/pms/c/v1/datamanagement/material/getMaterialPage",

          {
            ...this.searchForm,
          }
        );
        this.loading = false;
        if (res.code === 0) {
          this.initData = res?.data;
          return false;
        }
        this.$message.error(res.message);
      } catch (error) {
        this.loading = false;
        console.log("出错了", error);
      }
    },
    handleAddBankInfo() {
      this.bankDialogVisibleTitle = "新增银行信息";
    },
    handleAddvoucherInfo(edit) {
      if (edit == "add") {
        this.formData = cleanParams(this.formData);
      }
      this.bankDialogVisible = true;
    },
    async handleSubmitForm() {
      const validate = await this.$refs["bank-list"]
        .validate()
        .catch(() => false);
      console.log(validate, "提交校验", this.formData);
      if (!validate) return false;
      try {
        this.submitLoading = true;
        let res = await bankInfoStore(this.formData);
        this.bankDialogVisible = false;
        this.submitLoading = false;
        this.pageList();
      } catch (error) {
        this.bankDialogVisible = false;
        this.submitLoading = false;
      }
    },
  },
  created() {
    this.pageList();
  },
};
</script>

<style scoped lang="scss">
@import "./fms.scss";
.bank-list {
  .h3-title {
    padding: 16px 0;
    font-size: 16px;
    color: #242833;
  }
  .header-operate-area {
    padding-bottom: 16px;
    .add-btn {
      // margin-right: 6px;
    }
  }
}
</style>
