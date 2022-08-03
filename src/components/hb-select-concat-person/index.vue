<template>
  <el-dialog
    :visible.sync="dialogFormVisible"
    width="960px"
    v-loading="loading"
  >
    <!-- v-if="dialogFormVisible" -->
    <div slot="title" class="title-header">
      <h3>选择人员</h3>
      <el-input
        placeholder="请输入名称"
        v-model.trim="filterText"
        clearable
        class="search"
        size="mini"
      >
      </el-input>
    </div>
    <!-- <el-button @click="handleAdd">遍历收起全部 </el-button> -->
    <div class="person-wrap">
      <div class="tree-container">
        <slot name="tab"></slot>
        <div class="tree">
          <el-tree
            :props="treeProps"
            :load="loadNode"
            lazy
            ref="selectPerson"
            :render-after-expand="false"
            show-checkbox
            @check="handleCheckChange"
            @node-expand="handleNodeExpand"
            node-key="id"
            :filter-node-method="filterNode"
            :default-expand-all="defaultExpandAll"
          >
            <div class="custom-tree-node" slot-scope="{ node, data }">
              <div>{{ node.label }}</div>

              <div
                v-if="![0, 1].includes(data.level)"
                class="custom-tree-node-child"
              >
                {{ data.level }}
                {{
                  (data.positionList &&
                    data.positionList[0] &&
                    data.positionList[0].departmentName) ||
                  "--"
                }}
                {{
                  (data.positionList &&
                    data.positionList[0] &&
                    data.positionList[0].name) ||
                  "--"
                }}{{ data.mobile || "--" }}
              </div>
            </div>
          </el-tree>
        </div>
      </div>
      <div class="list-container">
        <ShowList
          :checkAllArr="checkAllArr"
          :maxSelect="maxSelect"
          @showListDelOne="showListDelOne"
          @showListDelAll="showListDelAll"
        />
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ShowList from "./showList.vue";
import { getStaffPage, getDepartmentList } from "./aas.js";

export default {
  props: {
    maxSelect: {
      //最大选择数量, 通过该数量来决定是单选还是多选, 如果人员只能单选填1
      type: Number,
      default: 1000,
    },
    enterpriseId: {
      //企业id
      type: String,
      required: false,
      default: "210806DYZ51XWYCH",
    },
    getDepartMentSendData: {
      //查询公司传递的参数
      type: Object,
      required: false,
      default: () => {},
    },
    selectedPerson: {
      //已选择的人员
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      treeProps: {
        label: "name",
        children: "name",
      },
      departMentList: undefined, //部门数据list
      // isShowTree: false, //是否显示选人组件
      staffPageList: undefined, //部门员工list
      dialogFormVisible: false,
      searchDepartmentData: {
        type: 0,
      },
      checkAllArr: undefined, //选择的人员数组
      filterText: "",
      pageSize: 100000,
      defaultExpandAll: true,
      loading: false,
    };
  },

  components: {
    ShowList,
  },
  watch: {
    filterText(val) {
      this.$refs.selectPerson.filter(val);
    },
    // getDepartMentSendData: {
    //   handler(nv, ov) {
    //     this.isShowTree = false;
    //     this.getDepartMent();
    //   },
    //   deep: true,
    //   // immediate: true,
    // },
  },
  methods: {
    show() {
      this.dialogFormVisible = true;
      this.$refs.selectPerson &&
        this.$refs.selectPerson.setCheckedKeys(this.selectedPerson);
      this.checkAllArr =
        this.$refs.selectPerson && this.$refs.selectPerson.getCheckedNodes();
    },
    close() {
      this.dialogFormVisible = false;
      this.checkAllArr = undefined;
      this.filterText = "";
      this.$refs.selectPerson.setCheckedKeys([]);
    },
    // handleAdd() {
    //   for (
    //     let i = 0;
    //     i < this.$refs.selectPerson.store._getAllNodes().length;
    //     i++
    //   ) {
    //     console.log(
    //       this.$refs.selectPerson.store,
    //       this.$refs.selectPerson.store.root
    //     );

    //     this.$refs.selectPerson.store._getAllNodes()[i].expanded = false;
    //   }
    // },

    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve(this.departMentList);
      }
      if (node.level >= 3) return resolve([]);
      //子层级
      if (node.data.level === 0) {
        resolve(node.data.children);
      }
      if (node.data.level === 1) {
        if (!node.data.departmentId) {
          return resolve([]);
        }
        console.log(
          "------------------node.data.departmentId",
          node.data,
          node.data.departmentId
        );
        this.getStaffPageMethods(node.data.departmentId, resolve);
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },

    async handleCheckChange(data, checked) {
      let filterCheckNodes = checked?.checkedNodes?.filter(
        (item) => !item.level
      );
      // console.log(checked, 1111111111111, filterCheckNodes);
      if (filterCheckNodes.length > this.maxSelect) {
        this.$message({
          message: `最多选取${this.maxSelect}条`,
          type: "warning",
        });
        return false;
      }
      this.checkAllArr = filterCheckNodes;
    },

    handleNodeExpand(a, b, c) {
      //第一级禁止全选
      if (b.level != 1) {
        b.data.disabled = false;
      }
    },

    async getDepartMent() {
      try {
        let res = await getDepartmentList({
          enterpriseId: this.enterpriseId,
          ...this.getDepartMentSendData,
        });
        this.departMentList = res.data;
        // this.isShowTree = true;
        this.departMentList = this.departMentList.map((item) => {
          return {
            ...item,
            id: item.pathId,
            disabled: true,
            children: item.children.map((el) => {
              return {
                ...el,
                id: el.departmentId,
                // disabled: !el.children || el.children.length,
              };
            }),
          };
        });
        console.log(this.departMentList, 5555555555555);
      } catch (error) {
        console.log(error);
      }
    },

    // 获取部门人员信息
    async getStaffPageMethods(departmentId, resolve) {
      this.loading = true;
      try {
        let res = await getStaffPage({
          page: 0,
          size: this.pageSize,
          enterpriseId: this.enterpriseId, //企业id,
          departmentId: departmentId,
        });
        this.staffPageList = res.data.data;
        let dealData = res?.data?.data?.map((item) => {
          return {
            ...item.staff,
            positionList: item.positionList,
            id: item.staff.staffId,
          };
        });
        this.$refs.selectPerson.setCheckedKeys(this.selectedPerson);
        // console.log("******", this.$refs.selectPerson.getCheckedNodes());
        this.checkAllArr = this.$refs.selectPerson.getCheckedNodes();
        console.log("--------------  this.checkAllArr", this.checkAllArr);
        console.log("  this.$refs.selectPerson,", this.$refs.selectPerson);
        console.log(
          this.departMentList[this.departMentList.length - 1].children[
            this.departMentList[this.departMentList.length - 1].children
              .length - 1
          ],
          departmentId
        );
        // if (
        //   this.departMentList[this.departMentList.length - 1].children[
        //     (
        //       this.departMentList[this.departMentList.length - 1].children
        //         .length - 1
        //     ).departmentId
        //   ] === departmentId
        // ) {
        // }
        this.loading = false;
        resolve && resolve(dealData);
      } catch (error) {
        console.log(error);
      }
    },
    //取消勾选单个
    showListDelOne(value) {
      this.$refs.selectPerson.setCheckedKeys(value);
      this.checkAllArr = this.checkAllArr.filter((item) =>
        value.includes(item.staffId)
      );
      // console.log(value, 999999, this.checkAllArr);
    },
    //批量取消勾选
    showListDelAll(value) {
      console.log("批量取消勾选", value);
      this.$refs.selectPerson.setCheckedKeys(value);
      this.checkAllArr = value;
    },
    handleConfirm() {
      console.log("this.checkAllArr", this.checkAllArr);
      this.$emit("getPersonArr", this.checkAllArr);
      this.close();
    },
    // handleConfirm() {
    //   let arr = [];
    //   this.checkAllArr.forEach((item) => {
    //     let itemData = item.split("&")[1];
    //     arr.push(JSON.parse(item.split("&")[1]));
    //   });
    //   if (!arr.length) {
    //     this.$message.error("请选择人员");
    //     return;
    //   }
    //   this.$emit("getPerson", arr[0]);
    //   this.$emit("getPersonArr", arr);
    //   this.close();
    // },
  },
  created() {
    console.log("进来了几次");
    this.getDepartMent();
  },
};
</script>

<style scoped lang="scss">
.title-header {
  display: flex;
  width: 95%;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;

  h3 {
    width: 100px;
  }
  .search {
    width: 228px;
  }
}
.person-wrap {
  display: flex;
  border-bottom: 1px solid #e4e7ed;
  ::v-deep .el-tabs {
    background: #f8f8f8;
    .el-tabs__header {
      margin: 0px;
      padding: 0 17px;
      height: 40px;
      border-top: 1px solid #e4e7ed;
      border-bottom: 1px solid #e4e7ed;
      box-sizing: border-box;
    }
    .el-tabs__item {
      font-size: 12px !important;
      color: #1678ff;
    }
    .el-tabs__nav-wrap::after {
      height: 0px;
    }
  }
  .tree {
    max-height: 500px;
    overflow-y: auto;

    .custom-tree-node {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .custom-tree-node-child {
        font-size: 12px;
        color: #a3a8ad;
        margin-top: 3px;
        //  max-height: 52px;
      }
    }
  }
  .tree-container {
    background: #fff;
    width: 470px;
    border-right: 1px solid #e4e7ed;
    .tree {
      padding: 17px;
    }
  }
  .list-container {
    flex: 1;
    background: #fff;
  }
}
::v-deep .el-dialog__header {
  padding: 5px 20px 5px;
}
::v-deep .el-dialog__body {
  padding: 0px;
}
::v-deep .el-dialog__footer {
  padding: 10px 20px;
}
::v-deep .el-tree-node__children {
  .el-tree-node__content {
    height: 52px;
  }
}
</style>
