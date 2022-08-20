<template>
  <el-dialog :visible.sync="dialogFormVisible" width="960px" :modal="modal">
    <div slot="title" class="title-header">
      <h3>选择人员</h3>
      <el-autocomplete
        v-model.trim="filterText"
        :fetch-suggestions="querySearchAsync"
        value-key="copyName"
        placeholder="请输入人员姓名"
        @select="handleSelect"
        size="small"
        :debounce="1000"
        clearable
      ></el-autocomplete>
    </div>
    <div class="person-wrap" v-loading="loading">
      <div class="tree-container">
        <slot name="tab"></slot>
        <div class="tree">
          <el-tree
            :key="getDepartMentSendData.type"
            :props="treeProps"
            :load="loadNode"
            lazy
            ref="selectPerson"
            :render-after-expand="false"
            show-checkbox
            @check="handleCheckChange"
            @node-expand="handleNodeExpand"
            node-key="id"
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
      <el-button @click="close" size="small">取 消</el-button>
      <el-button type="primary" @click="handleConfirm" size="small"
        >保存</el-button
      >
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
    modal: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      treeProps: {
        label: "name",
        children: "name",
      },
      departMentList: undefined, //部门数据list
      staffPageList: undefined, //部门员工list
      dialogFormVisible: false,
      // checkAllArr: [], //选择的人员数组
      filterText: "",
      pageSize: 100000,
      defaultExpandAll: false,
      loading: false,
      initArr: [],
      leftTree: [],
      rightTree: [],
    };
  },

  components: {
    ShowList,
  },
  computed: {
    checkAllArr: {
      get() {
        let arr = [...this.leftTree, ...this.rightTree].reduce((pre, cur) => {
          pre.findIndex((item) => item.staffId === cur.staffId) > -1
            ? pre
            : pre.push(cur);
          return pre;
        }, []);
        console.log(arr, "arr的长度--------");
        if (arr.length > this.maxSelect) {
          this.$message({
            message: `最多选取${this.maxSelect}条`,
            type: "warning",
          });
          return arr.slice(0, this.maxSelect);
        }

        return arr;
      },
    },
  },

  methods: {
    handleSelect(item) {
      if (this.checkAllArr.length >= this.maxSelect) {
        this.$message({
          message: `最多选取${this.maxSelect}条`,
          type: "warning",
        });
        return false;
      }
      if (this.checkAllArr.find((el) => el.staffId === item.id)) return false;
      this.rightTree.push({
        ...item,
        id: item.staffId,
      });
      this.$refs.selectPerson.setCheckedKeys(
        this.checkAllArr.map((item) => item.staffId)
      );
    },

    async querySearchAsync(queryString, cb) {
      if (!queryString) return;
      this.loading = true;
      try {
        let res = await getStaffPage({
          page: 0,
          size: this.pageSize,
          enterpriseId: this.enterpriseId, //企业id,
          name: queryString,
        });
        this.staffPageList = res.data.data;
        let dealData = res?.data?.data?.map((item) => {
          return {
            ...item.staff,
            positionList: item.positionList,
            id: item.staff.staffId,
            copyName: `${item.staff.name}-${
              item.positionList?.[0]?.departmentName || ""
            }`,
          };
        });
        this.loading = false;
        cb && cb(dealData);
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },

    async show() {
      this.dialogFormVisible = true;
      let arr = this.selectedPerson.map(async (item) => {
        let res = await getStaffPage({
          page: 0,
          size: this.pageSize,
          enterpriseId: this.enterpriseId, //企业id
          staffId: item,
        });
        return res;
      });
      //根据初始人员staffId,去获取人员对象信息,展示
      let res2 = await Promise.allSettled(arr);
      res2 = res2?.map((item) => item.value.code === 0 && item.value.data.data);

      this.rightTree = res2.flat().map((item) => {
        return {
          ...item.staff,
          positionList: item.positionList,
          id: item.staff.staffId,
        };
      });

      //左侧,展开项勾选已选择人员信息
      this.$refs.selectPerson &&
        this.$refs.selectPerson.setCheckedKeys(
          this.checkAllArr.map((item) => item.staffId)
        );
    },
    close() {
      this.dialogFormVisible = false;
      // this.checkAllArr = [];
      this.leftTree = [];
      this.rightTree = [];
      this.filterText = "";
      this.$refs.selectPerson.setCheckedKeys([]);
    },

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
        this.getStaffPageMethods("", "", node.data.departmentId, resolve);
      }
    },

    async handleCheckChange(data, checked) {
      let filterCheckNodes = checked?.checkedNodes?.filter(
        (item) => !item.level
      );

      this.rightTree = this.leftTree = [...filterCheckNodes];
      console.log(this.rightTree, "选择改变", filterCheckNodes);
    },

    handleNodeExpand(a, b, c) {
      //第一级禁止全选
      if (b.level != 1) {
        b.data.disabled = false;
      }
      this.$refs.selectPerson.setCheckedKeys(
        this.checkAllArr.map((item) => item.staffId)
      );
    },

    async getDepartMent() {
      try {
        this.loading = true;
        let res = await getDepartmentList({
          enterpriseId: this.enterpriseId,
          ...this.getDepartMentSendData,
        });
        this.loading = false;
        this.departMentList = res.data;

        this.departMentList = this.departMentList.map((item) => {
          return {
            ...item,
            id: item.pathId,
            disabled: true,
            children: item.children.map((el) => {
              return {
                ...el,
                id: el.departmentId,
                disabled: !el.children || el.children.length,
              };
            }),
          };
        });
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },

    // 获取部门人员信息
    async getStaffPageMethods(
      name = "",
      staffId = "",
      departmentId = "",
      resolve
    ) {
      this.loading = true;
      try {
        let res = await getStaffPage({
          page: 0,
          size: this.pageSize,
          enterpriseId: this.enterpriseId, //企业id,
          name,
          staffId,
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
        this.loading = false;
        // console.log("dealData-------------", dealData);
        resolve && resolve(dealData);
        return dealData;
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    //取消勾选单个
    showListDelOne(value) {
      console.log("取消单个----", value);
      this.$refs.selectPerson.setCheckedKeys(value);
      this.rightTree = this.leftTree = this.checkAllArr.filter((item) =>
        value.includes(item.staffId)
      );
    },
    //批量取消勾选
    showListDelAll(value) {
      console.log("批量取消勾选", value);
      this.$refs.selectPerson.setCheckedKeys(value);
      // this.checkAllArr = value;
      this.leftTree = this.rightTree = value;
    },
    handleConfirm() {
      console.log("this.checkAllArr", this.checkAllArr);
      this.$emit("getPersonArr", this.checkAllArr);
      this.close();
    },
  },
  created() {
    // console.log("进来了几次");
    this.getDepartMent();
  },
  beforeDestroy() {},
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
