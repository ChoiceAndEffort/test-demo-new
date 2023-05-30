<template>
  <el-table
    :data="renderDynamic"
    ref="product"
    border
    row-key="id"
    :row-class-name="rowClassNameFun"
    :header-row-class-name="headerRowClassName"
    size="mini"
    max-height="500px"
    style="width: 100%"
    @select="selectFun"
    @select-all="selectAllFun"
    :header-cell-style="{ background: '#fafafa' }"
  >
    <el-table-column type="selection" width="55"> </el-table-column>
    <el-table-column prop="date" label="日期" sortable width="180">
    </el-table-column>
    <el-table-column prop="name" label="姓名" sortable width="180">
    </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: "TaskManage",
  data() {
    return {
      renderDynamic: [
        {
          id: 1,
          parentId: 0,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          parentId: 0,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 3,
              parentId: 2,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
              children: [
                {
                  id: 4,
                  parentId: 3,
                  date: "2016-05-01",
                  name: "王小虎",
                  address: "上海市普陀区金沙江路 1519 弄",
                },
                {
                  id: 5,
                  parentId: 3,
                  date: "2016-05-01",
                  name: "王小虎",
                  address: "上海市普陀区金沙江路 1519 弄",
                },
              ],
            },
            {
              id: 6,
              parentId: 2,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
          ],
        },
      ],
    };
  },
  // isSelect状态：true为选中状态，false为未选中状态 ，空字符串为未知状态
  mounted() {
    this.initData(this.renderDynamic);
  },
  methods: {
    //初始化数据
    initData(data) {
      data.forEach((item) => {
        item.isSelect = false; //默认为不选中

        if (item.children && item.children.length) {
          this.initData(item.children);
        }
      });
    },
    // 复选框点击事件
    selectFun(selection, row) {
      this.setRowIsSelect(row);
    },
    // 复选框点击事件
    setRowIsSelect(row) {
      //当点击父级点复选框时，当前的状态可能为未知状态，所以当前行状态设为false并选中，即可实现子级点全选效果

      if (row.isSelect === "") {
        row.isSelect = false;

        this.$refs.product.toggleRowSelection(row, true);
      }
      row.isSelect = !row.isSelect;

      let that = this;

      function selectAllChildrens(data) {
        data.forEach((item) => {
          item.isSelect = row.isSelect;

          that.$refs.product.toggleRowSelection(item, row.isSelect);

          if (item.children && item.children.length) {
            selectAllChildrens(item.children);
          }
        });
      }
      function getSelectStatus(selectStatuaArr, data) {
        data.forEach((childrenItem) => {
          selectStatuaArr.push(childrenItem.isSelect);

          if (childrenItem.children && childrenItem.children.length) {
            getSelectStatus(selectStatuaArr, childrenItem.children);
          }
        });

        return selectStatuaArr;
      }

      function getLevelStatus(row) {
        //如果当前节点的parantId =0 并且有子节点，则为1

        //如果当前节点的parantId !=0 并且子节点没有子节点 则为3

        if (row.parentId == 0) {
          if (row.children && row.children.length) {
            return 1;
          } else {
            return 4;
          }
        } else {
          if (!row.children || !row.children.length) {
            return 3;
          } else {
            return 2;
          }
        }
      }

      let result = {};

      //获取明确的节点

      function getExplicitNode(data, parentId) {
        data.forEach((item) => {
          if (item.id == parentId) {
            result = item;
          }

          if (item.children && item.children.length) {
            getExplicitNode(item.children, parentId);
          }
        });

        return result;
      }

      function operateLastLeve(row) {
        //操作的是子节点  1、获取父节点  2、判断子节点选中个数，如果全部选中则父节点设为选中状态，如果都不选中，则为不选中状态，如果部分选择，则设为不明确状态

        let selectStatuaArr = [];

        let item = getExplicitNode(that.renderDynamic, row.parentId);

        selectStatuaArr = getSelectStatus(selectStatuaArr, item.children);

        if (
          selectStatuaArr.every((selectItem) => {
            return true == selectItem;
          })
        ) {
          item.isSelect = true;

          that.$refs.product.toggleRowSelection(item, true);
        } else if (
          selectStatuaArr.every((selectItem) => {
            return false == selectItem;
          })
        ) {
          item.isSelect = false;

          that.$refs.product.toggleRowSelection(item, false);
        } else {
          item.isSelect = "";
        }

        //则还有父级

        if (item.parentId != 0) {
          operateLastLeve(item);
        }
      }

      //判断操作的是子级点复选框还是父级点复选框，如果是父级点，则控制子级点的全选和不全选

      //1、只是父级 2、既是子集，又是父级 3、只是子级

      let levelSataus = getLevelStatus(row);

      if (levelSataus == 1) {
        selectAllChildrens(row.children);
      } else if (levelSataus == 2) {
        selectAllChildrens(row.children);

        operateLastLeve(row);
      } else if (levelSataus == 3) {
        operateLastLeve(row);
      }
    },
    // 检测表格数据是否全选
    checkIsAllSelect() {
      this.oneProductIsSelect = [];
      this.renderDynamic.forEach((item) => {
        this.oneProductIsSelect.push(item.isSelect);
      });
      //判断一级产品是否是全选.如果一级产品全为true，则设置为取消全选，否则全选

      let isAllSelect = this.oneProductIsSelect.every((selectStatusItem) => {
        return true == selectStatusItem;
      });
      return isAllSelect;
    },
    // 表格全选事件
    selectAllFun(selection) {
      let isAllSelect = this.checkIsAllSelect();

      this.renderDynamic.forEach((item) => {
        item.isSelect = isAllSelect;

        this.$refs.product.toggleRowSelection(item, !isAllSelect);

        this.selectFun(selection, item);
      });
    },
    // 表格行样式 当当前行的状态为不明确状态时，添加样式，使其复选框为不明确状态样式
    rowClassNameFun({ row }) {
      if (row.isSelect === "") {
        return "indeterminate";
      }
    },
    // 表格标题样式 当一级目录有为不明确状态时，添加样式，使其全选复选框为不明确状态样式
    headerRowClassName({ row }) {
      let oneProductIsSelect = [];

      this.renderDynamic.forEach((item) => {
        oneProductIsSelect.push(item.isSelect);
      });

      if (oneProductIsSelect.includes("")) {
        return "indeterminate";
      }

      return "";
    },
  },
};
</script>

<style lang="scss">
.indeterminate .el-checkbox__input .el-checkbox__inner {
  background-color: #409eff !important;
  border-color: #409eff !important;
  color: #fff !important;
}
.indeterminate .el-checkbox__input.is-checked .el-checkbox__inner::after {
  transform: scale(0.5);
}
.indeterminate .el-checkbox__input .el-checkbox__inner {
  background-color: #f2f6fc;
  border-color: #dcdfe6;
}
.indeterminate .el-checkbox__input .el-checkbox__inner::after {
  border-color: #c0c4cc !important;
  background-color: #c0c4cc;
}
.product-show th .el-checkbox__inner {
  display: none !important;
}
.indeterminate .el-checkbox__input .el-checkbox__inner::after {
  content: "";
  position: absolute;
  display: block;
  background-color: #fff;
  height: 2px;
  transform: scale(0.5);
  left: 0;
  right: 0;
  top: 5px;
  width: auto !important;
}
.product-show .el-checkbox__inner {
  display: block !important;
}
.product-show .el-checkbox {
  display: block !important;
}
</style>
