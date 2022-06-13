<template >
  <div class="batch-import">
    <HotTable
      ref="ht"
      :settings="hotSettings"
      licenseKey="9c56f-fc083-95630-36851-db045"
    ></HotTable>
  </div>
</template>
 
<script>
import { HotTable } from "@handsontable/vue";
import "handsontable/dist/handsontable.full.css";
// import financeApi from '@/api/finance'
import "handsontable/languages/zh-CN";

export default {
  name: "BatchImport",
  components: {
    HotTable,
  },
  data() {
    return {
      /* excel */
      sourceData: null,
      jsonData: [],
      colHeaders: [
        "导入结果",
        "项目名称",
        "关联用户",
        "用户姓名",
        "手机号",
        "项目类型",
        "项目数量",
        "收支类型",
        "订单日期",
        "订单时间",
        "项目原价",
        "签约金额",
        "支付金额",
        "支付方式",
        "付款日期",
        "付款时间",
        "经办人",
        "备注",
      ],
      columns: [
        {
          // -1 导入结果
          data: "result",
          type: "text",
          readOnly: true,
        },
        {
          // 0 项目名称
          data: "othermoneyorderName",
          type: "text", // def
          validator(val, callback) {
            if (that.util.isEmpty(val)) return callback(false);
            let pattern = /^.{1,100}$/;
            // console.log(pattern.test(val))
            if (pattern.test(val)) return callback(true);
            return callback(false);
          },
        },
        {
          // 1 关联用户
          data: "othermoneyorderUseridUserFk",
          type: "dropdown",
          source: [],
          validator: "Vdropdown_Tnull",
        },
        {
          // 2 用户姓名
          data: "othermoneyorderUsername",
          type: "text",
          validator(val, callback) {
            if (that.util.isEmpty(val)) return callback(false);
            let pattern = /^.{1,20}$/;
            // console.log(pattern.test(val))
            if (pattern.test(val)) return callback(true);
            return callback(false);
          },
        },
        {
          // 3 手机号
          data: "othermoneyorderPhone",
          type: "text",
          validator(val, callback) {
            if (that.util.isEmpty(val)) return callback(true);
            let pattern = /^([0-9]{0}|1[0-9]{10})$/;
            // console.log(pattern.test(val))
            if (pattern.test(val)) return callback(true);
            return callback(false);
          },
        },
        {
          // 4 项目类型
          data: "othermoneyorderOthermoneytypeidOthermoneytypeFk",
          type: "dropdown",
          source: [],
          validator: "Vdropdown_Fnull",
        },
        {
          // 5 项目数量
          data: "othermoneyorderNum",
          type: "text",
          validator(val, callback) {
            if (that.util.isEmpty(val)) return callback(false);
            let pattern = /^[1-9][0-9]{0,10}$/;
            // console.log(pattern.test(val))
            if (pattern.test(val)) return callback(true);
            return callback(false);
          },
        },
        {
          // 6 收支类型
          data: "othermoneyorderBudgettype",
          type: "dropdown",
          source: ["收入", "支出"],
          validator: "Vdropdown_Fnull",
        },
        {
          // 7 订单日期
          data: "othermoneyorderTime_date",
          type: "date",
          width: 130,
          dateFormat: "YYYY-MM-DD",
          correctFormat: true,
        },
        {
          // 8 订单时间
          data: "othermoneyorderTime_time",
          type: "time",
          timeFormat: "HH:mm:ss",
          correctFormat: true,
        },
        {
          // 9 项目原价
          data: "othermoneyorderOriginaltotalprice",
          type: "numeric",
          numericFormat: {
            pattern: "0.00",
          },
          validator: "VFnull",
        },
        {
          // 10 签约金额
          data: "othermoneyorderFacttotalprice",
          type: "numeric",
          numericFormat: {
            pattern: "0.00",
          },
          validator: "VFnull",
        },
        {
          // 11 支付金额
          data: "othermoneyorderpayMoney",
          type: "numeric",
          numericFormat: {
            pattern: "0.00",
          },
          validator: "VFnull",
        },
        {
          // 12 支付方式
          data: "othermoneyorderpayPaytype",
          type: "dropdown",
          source: ["现金", "支付宝", "微信", "网银", "其它"],
          validator: "Vdropdown_Fnull",
        },
        {
          // 13 付款日期
          data: "othermoneyorderpayTime_date",
          type: "date",
          width: 130,
          dateFormat: "YYYY-MM-DD",
          correctFormat: true,
        },
        {
          // 14 付款时间
          data: "othermoneyorderpayTime_time",
          type: "time",
          timeFormat: "HH:mm:ss",
          correctFormat: true,
        },
        {
          // 15 经办人
          data: "othermoneyorderUseroperatoridUserFk",
          type: "dropdown",
          source: [],
          validator: "Vdropdown_Fnull",
        },
        {
          // 16 备注
          data: "othermoneyorderRemark",
          type: "text",
          validator(val, callback) {
            if (that.util.isEmpty(val)) return callback(true);
            let pattern = /^.{0,200}$/;
            // console.log(pattern.test(val))
            if (pattern.test(val)) return callback(true);
            return callback(false);
          },
        },
      ],

      hotSettings: {
        readOnlyCellClassName: "is-readOnly",
        language: "zh-CN", // 声明用中文的语言包
        // invalidCellClassName: 'htInvalid',
        // startCols: 10, // 初始行列数
        // startRows: 20,
        // minRows: 4, // 最小行
        // minCols: 3,
        maxRows: 10, // 最大行

        // 数据在这个里面，由数据填充表。当 data 为 null 时，startRows/startCols 生效，否则 data 有数据、[[]]，都不会生效，而且不能直接为 []/{}，会报错
        data: null,
        minRows: 50, // 最少行列
        // minCols: 30,
        // minSpareCols: 2, // 列留白
        // minSpareRows: this.const.data().PAGE_SIZE_BIG_PLUS, // 推介和 maxRows 一样
        minSpareRows: 50,
        rowHeaders: true,
        // persistentState: true, // 开启本地缓存
        // colHeaders: true,
        colHeaders: [], // 自定义列表头
        autoWrapRow: true, // 自动换行，默认：true；TAB在最后一列中按或向右箭头将移动到下一行的第一列
        fillHandle: true, // 单元格内容拖拽复制，可选值：true、false、vertical、horizontal；默认：true，垂直/水平都支持
        fixedColumnsLeft: 2, // 固定左边列数，从0开始为第1列
        fixedRowsTop: 0,
        manualColumnFreeze: true, // 开启手动固定(取消)列
        manualColumnMove: false, // 关闭手动移动列
        manualRowMove: true, // 开启手动移动行
        manualColumnResize: true, // 开启手工更改列距
        manualRowResize: true, // 开启手动更改行距
        comments: true, // 开启添加注释
        columnSorting: true, // 排序
        undoRedo: true, // 开启撤销
        copyPaste: true, // 开启剪切、复制
        filters: true, // 开启过滤，必须在开启dropdownMenu前提下才有用
        // columns: this.columns, // 设置每一列的数据类型和配置
        // columns: [],
        // dropdownMenu: true, // 开启默认筛选和常用操作
        dropdownMenu: {
          items: {
            filter_by_condition: {
              name: "主要筛选",
            },
            filter_operators: {
              name: "动作筛选",
            },
            filter_by_condition2: {
              name: "次要筛选",
            },
            filter_by_value: {
              name: "值筛选",
            },
            filter_action_bar: {
              name: "栏筛选",
            },
          },
        },
        contextMenu: {
          // 自定义右键菜单
          items: {
            row_above: {
              name: "向上插一行",
            },
            row_below: {
              name: "向下插一行",
            },
            col_left: {
              name: "向左插一列",
            },
            col_right: {
              name: "向右插一列",
            },
            hsep1: "---------", // 分隔线
            remove_row: {
              name: "删除当前行",
            },
            remove_col: {
              name: "删除当前列",
            },
            clear_column: {
              name: "清空当前列",
            },
            hsep2: "---------", // 必须和上次的变量名不一样
            undo: {
              name: "撤销",
            },
            cut: {
              name: "剪切",
            },
            copy: {
              name: "复制",
            },
            alignment: {
              name: "对齐",
            },
            hsep3: "---------",
            commentsAddEdit: {
              // 必须开启 comments: true
              name: "添加备注",
            },
            commentsRemove: {
              // 必须开启 comments: true
              name: "删除备注",
            },
            freeze_column: {
              // 必须开启 manualColumnFreeze: true
              name: "固定列",
            },
            unfreeze_column: {
              // 必须开启 manualColumnFreeze: true
              name: "取消固定列",
            },
          },
        },
        afterChange(changes, source) {
          console.log("changes: ", changes); // row, prop, oldVal, newVal
          console.log("source: ", source); // op
        },
      },
    };
  },
  methods: {

  },
};
</script>
 
 
<style lang="less" scoped>
</style>