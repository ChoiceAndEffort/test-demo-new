<template>
  <div>
    <!-- <Card> -->
    <!-- <Form ref="setForm" :model="setForm" :rules="setRule"> -->
    <!-- <FormItem label="目标设定：（列表支持批量复制粘贴，没有值时请空着）" class="hotTable"> -->
    <hot-table id="hot" :settings="goalHotSettings"></hot-table>
    <!-- </FormItem> -->
    <!-- </Form> -->
    <!-- </Card> -->
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
      goalHotSettings: {
        //...
        //...
        //...
        fixedRowsTop: 0, // 固定顶部多少行不能垂直滚动
        fixedColumnsLeft: 3, // 固定左侧多少列不能水平滚动
        cells: function (row, column, prop) {
          // 动态设置一些单元格的属性
          const cellProperties = { readOnly: false, className: "" }; // 初始化属性和类名
          const visualRowIndex = this.instance.toVisualRow(row); // 获取行号
          const visualColIndex = this.instance.toVisualColumn(column); // 获取列号
          if (
            visualColIndex === 0 ||
            visualColIndex === 1 ||
            visualColIndex === 2
          ) {
            // 当列号为0，1，2时
            cellProperties.readOnly = true; // 设置readOnly属性为true
            cellProperties.className = "forbidden"; // 设置类名为forbidden
            if (visualColIndex === 0) {
              cellProperties.className = "forbidden linkhoverStyle"; // 特殊处理按钮的样式
            }
          } else {
            cellProperties.className = "myCellStyle";
          }
          return cellProperties; // 返回
        },
      },
    };
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
  methods: {
    // 注册handsontable单击事件的回调函数，第一列单元格点击后询问是否删除，确认删除
    callBackMD(event, coords, td, ref) {
      var row = coords.row; // 获取行号和列号
      var col = coords.col;
      if (col == 0 && row != -1) {
        // 第一列除了表头都注册点击事件
        const rowOfGoal = this.$refs[ref]?.hotInstance.getSourceDataAtRow(row); // 获取对应行的所有数据
        this.$Modal.confirm({
          title: "确定取消？",
          content: "<p>组织下所填写的信息将一并删除</p>",
          onOk: () => {
            this.deleteRow(ref, row); // 删除该行数据
            // 重新载入表格
            if (this.$refs[ref]) {
              if (ref === "hotOfGoal") {
                this.$refs[ref].hotInstance.loadData(this.goalHotSettings.data);
              } else {
                // this.$refs[ref].hotInstance.loadData(this.completedHotSettings.data);
              }
            }
          },
        });
      }
    },
    // 删除行
    deleteRow(ref, index) {
      if (this.$refs[ref]) {
        this.$refs[ref].hotInstance.alter("remove_row", index, 1);
      }
    },
  },
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
