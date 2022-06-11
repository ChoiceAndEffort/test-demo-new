<template>
  <div>
    <hot-table id="hot" :settings="goalHotSettings" ref="hotOfGoal"></hot-table>
  </div>
</template>

<script>
import { HotTable } from "@handsontable/vue";
import "handsontable/dist/handsontable.full.css";
export default {
  name: "setTarget",
  components: {
    HotTable,
  },
  props: {},
  data() {
    return {
      setForm: {
        period: true,
        object: "",
        targetTableData: [],
        completeTableData: [],
      },
      goalHotSettings: {
        data: [
          // 表格数据
          {
            object: "一级架构",
            organization: "aaa",
            JanGoal: 100,
            action: "删除",
            checkRemark: true,
          },
          {
            object: "二级架构",
            organization: "bbb",
            JanGoal: 100,
            action: "删除",
            checkRemark: false,
          },
          {
            object: "三级架构",
            organization: "ccc",
            JanGoal: 100,
            action: "删除",
            checkRemark: true,
          },
          {
            object: "四级架构",
            organization: "ddd",
            JanGoal: 100,
            action: "删除",
            checkRemark: false,
          },
        ],
        columns: [
          // 每一列对应的数据和数据类型
          {
            data: "action",
            type: "text",
          },
          {
            data: "object",
            type: "text",
          },
          {
            data: "organization",
            type: "text",
          },
          {
            data: "JanGoal",
            type: "numeric",
          },
          {
            data: "FebGoal",
            type: "numeric",
          },
          {
            data: "MarGoal",
            type: "numeric",
          },
          {
            data: "AprGoal",
            type: "numeric",
          },
          {
            data: "MayGoal",
            type: "numeric",
          },
          {
            data: "JunGoal",
            type: "numeric",
          },
          {
            data: "JulGoal",
            type: "numeric",
          },
          {
            data: "AugGoal",
            type: "numeric",
          },
          {
            data: "SepGoal",
            type: "numeric",
          },
          {
            data: "OctGoal",
            type: "numeric",
          },
          {
            data: "NovGoal",
            type: "numeric",
          },
          {
            data: "DesGoal",
            type: "numeric",
          },
        ],
        colHeaders: [
          // 显示列头，为true时显示默认，为数组时，显示数组里面的值
          "操作",
          "对象",
          "对象所属上级组织",
          "1月目标",
          "2月目标",
          "3月目标",
          "4月目标",
          "5月目标",
          "6月目标",
          "7月目标",
          "8月目标",
          "9月目标",
          "10月目标",
          "11月目标",
          "12月目标",
        ],
        // cell: [ ]   // 设置指定单元格的一些属性，比如是否可编辑，定义className
        cells: function (row, column, prop) {
          // 动态设置一些单元格的属性
          const cellProperties = { readOnly: false, className: "" };
          const visualRowIndex = this.instance.toVisualRow(row);
          const visualColIndex = this.instance.toVisualColumn(column);
          if (visualColIndex === 0 || visualColIndex === 1) {
            // console.log(99999999999, visualColIndex);
            cellProperties.readOnly = true;
            cellProperties.className = "forbidden";
          }
          return cellProperties;
        },
        fixedRowsTop: 1, // 固定顶部多少行不能垂直滚动
        fixedColumnsLeft: 2, // 固定左侧多少列不能水平滚动
        stretchH: "all", // last/all/none last为延伸最后一列，all为延伸所有列，none表示默认不延伸
        autoWrapRow: true, // 自动隐藏行
        height: 487, // 高度
        manualRowResize: true, // 允许拖动改变行的高度
        manualColumnResize: true, // 允许拖动改变列的宽度
        rowHeaders: false, // 当值为true时显示行头，当值为数组时，行头为数组的值
        manualRowMove: false, // 为true时，行可拖拽至指定行
        manualColumnMove: false, // 为true时，列可拖拽至指定列
        contextMenu: true, // 右键菜单展示
        filters: false, // 过滤
        dropdownMenu: false, // 下拉菜单
        licenseKey: "non-commercial-and-evaluation", // 非商业用途声明
        afterChange: function (change, source) {
          // console.log("-----------", change, source);
          // console.log(this.getData());

          // console.log(this.getCellMeta());

          // //change[0]是一个数组,第一个值是行索引/行名,第二个值是列索引/列名,第三个值是修改前的值,第四个值是修改后的值
          // //source的值目前知道:loadData(加载数据);edit(新增或编辑)
          if (source === "edit") {
          }

          // //如果修改的列是ID列,不作处理,防止进入死循环
          // if (change[0][1] == "id") {
          //   return;
          // }
          // if (dataCopy[change[0][0]].id == null) {
          //   console.log("新增");
          //   //生成新列的ID
          //   let mId = new Date().getTime();
          //   hot.setDataAtCell(change[0][0], 0, mId);
          //   console.log("新ID：" + mId);
          // } else {
          //   console.log(
          //     "修改了ID为：" +
          //       dataCopy[change[0][0]].id +
          //       "的数据,值由" +
          //       change[0][2] +
          //       "修改为：" +
          //       change[0][3]
          //   );
          // }
        },
      },
    };
  },
  created() {
    this.goalHotSettings.columns = this.goalHotSettings.columns.map((item) => {
      return {
        renderer: (hotInstance, TD, row, col, prop, value, cellProperties) => {
          if (this.goalHotSettings.data[row].checkRemark) {
            TD.style.color = "#67C23A";
            TD.style.background = "#fef0f0";
          } else {
            TD.style.color = "#F56C6C";
            TD.style.background = "#f0f9eb";
          }
          if (cellProperties.__proto__.readOnly) {
            TD.style.background = "rgba(0,0,0,.1)";
          }
          TD.style.verticalAlign = "left";//靠左对其
          TD.innerHTML = value;
        },
        ...item,
      };
    });

  },
  mounted() {
    this.$nextTick(() => {
      this.$refs["hotOfGoal"]?.hotInstance.addHook(
        "afterOnCellMouseDown",
        (event, coords, td) => {
          this.callBackMD(event, coords, td, "hotOfGoal"); // 如果页面不止一个表格，则需要传入表格对应的ref，以区分每个表格
        }
      );
    });
  },
  activited() {},
  update() {},
  beforeRouteUpdate() {},
  methods: {
    callBackMD(event, coords, td, ref) {
      var row = coords.row; // 获取行号和列号
      var col = coords.col;
      if (col == 0 && row != -1) {
        // 第一列除了表头都注册点击事件
        const rowOfGoal = this.$refs[ref].hotInstance.getSourceDataAtRow(row); // 获取对应行的所有数据
        console.log("删除行信息--------", rowOfGoal);
        this.deleteRow(ref, row); // 删除该行数据
        // this.$Modal.confirm({
        //   title: "确定取消？",
        //   content: "<p>组织下所填写的信息将一并删除</p>",
        //   onOk: () => {
        //     this.deleteRow(ref, row); // 删除该行数据
        //     // 重新载入表格
        //     if (this.$refs[ref]) {
        //       if (ref === "hotOfGoal") {
        //         this.$refs[ref].hotInstance.loadData(this.goalHotSettings.data);
        //       } else {
        //         // this.$refs[ref].hotInstance.loadData(this.completedHotSettings.data);
        //       }
        //     }
        //   },
        // });
      }
    },
    // 删除行
    deleteRow(ref, index) {
      if (this.$refs[ref]) {
        this.$refs[ref].hotInstance.alter("remove_row", index, 1);
      }
    },
  },
  filter: {},
  computed: {},
  watch: {},
};
</script>
<style lang="less">
.hotTable {
  #hot {
    height: auto !important;
    width: 100% !important;
    .wtHolder {
      height: auto !important;
      width: 100% !important;
    }
    .forbidden {
      background-color: #f0f0f0;
    }
  }
}
</style>
