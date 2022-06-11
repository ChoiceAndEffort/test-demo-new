<template>
  <div class="hb_table">
    <transition name="el-zoom-in-top">
      <TableHint :num="num" @empty="empty"></TableHint>
    </transition>
    <el-table
      :ref="tableName"
      header-row-class-name="table-header-gray"
      :data="tableData"
      :stripe="stripe"
      :border="border"
      :style="{ width: drawer ? '85%' : '100%' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="selection" fixed type="selection" width="50">
      </el-table-column>
      <template v-for="(item, index) in copyColConfig">
        <!-- 自定义列(内容) -->
        <el-table-column
          v-if="item.slot && item.attrs.switch"
          :key="index"
          :align="item.attrs.align"
          :show-overflow-tooltip="
            item.attrs.showOverflowTooltip
              ? item.attrs.showOverflowTooltip
              : false
          "
          :resizable="
            border == true && item.attrs.resizable
              ? item.attrs.resizable
              : false
          "
          :width="item.attrs.width ? item.attrs.width : ''"
          v-bind="item.attrs || {}"
        >
          <template slot-scope="scope">
            <slot :name="item.slot" :scope="scope"></slot>
          </template>
        </el-table-column>
        <!-- 自定义列(头部) -->
        <el-table-column
          v-else-if="item.slotHeader"
          :key="index"
          :align="item.attrs.align"
          :show-overflow-tooltip="
            item.attrs.showOverflowTooltip
              ? item.attrs.showOverflowTooltip
              : false
          "
          :resizable="
            border == true && item.attrs.resizable
              ? item.attrs.resizable
              : false
          "
          :width="item.attrs.width ? item.attrs.width : ''"
          v-bind="item.attrs || {}"
        >
          <template slot="header" slot-scope="scope">
            <i
              class="el-icon-setting"
              @click="handleSetTable"
              v-if="item.slotHeader === 'hbSetting'"
            ></i>
            <slot :name="item.slotHeader" :scope="scope" v-else></slot>
          </template>
        </el-table-column>
        <!-- 填充剩余宽度列 -->
        <el-table-column
          v-else-if="
            index == copyColConfig.length - autoIndex && item.attrs.switch
          "
          :key="index"
          :prop="item.attrs.prop"
          :label="item.attrs.label"
          :align="item.attrs.align"
          min-width="200"
          :show-overflow-tooltip="
            item.attrs.showOverflowTooltip
              ? item.attrs.showOverflowTooltip
              : false
          "
          :resizable="
            border == true && item.attrs.resizable
              ? item.attrs.resizable
              : false
          "
          :fixed="item.attrs.fixed ? item.attrs.fixed : false"
          :sortable="item.sortable ? item.sortable : false"
        >
        </el-table-column>
        <!-- 一般正常列 -->

        <template v-else>
          <el-table-column
            :key="index"
            v-if="item.attrs.switch"
            :prop="item.attrs.prop"
            :label="item.attrs.label"
            :show-overflow-tooltip="
              item.attrs.showOverflowTooltip
                ? item.attrs.showOverflowTooltip
                : false
            "
            :resizable="
              border == true && item.attrs.resizable
                ? item.attrs.resizable
                : false
            "
            :width="item.attrs.width ? item.attrs.width : ''"
            :align="item.attrs.align"
            :fixed="item.attrs.fixed ? item.attrs.fixed : false"
            :sortable="item.sortable ? item.sortable : false"
          >
          </el-table-column>
        </template>
      </template>
    </el-table>

    <el-drawer :title="drawerTitle" :visible.sync="drawer" size="15%">
      <table-config
        :initList="colConfig"
        :saveComponentKey="saveComponentKey"
        @changeColConfig="handleColConfig"
      />
    </el-drawer>
  </div>
</template>
<!-- 使用示例 -->
  <!-- 
    必填参数:colConfig,tableData 
    选题参数：
    关联参数（选填）：selection && selectionEvent
    具名插槽： <template slot="state" slot-scope="{ scope }">
                <div>{{scope.row.state}}</div>
              </template>
            slot：插槽名称
            slot-scope：数据传递
            scope.row.state:接收数据
  -->
  <!--   
    <Table :colConfig="copyColConfig" :tableData="tableData" :selection="selection" @selectionEvent="selectionEvent">
      <template slot="opCol">
        <el-button type="text">详情</el-button>
          <el-button type="text">删除</el-button>
        </template>
    </Table> 
  -->
<script>
import TableHint from "./table-hint.vue";
import TableConfig from "./table-config.vue";
export default {
  props: {
    tableName: {
      type: String,
      default: "hb_table",
      /*
        stripe:表单名
        必填：否
        type:String;
        默认为hb_table。
      */
    },

    stripe: {
      type: Boolean,
      default: false,
      /*
        stripe:带斑马纹。
        必填：否
        type:Boolean;
        默认为false，设置为true即为启用。
      */
    },
    border: {
      type: Boolean,
      default: false,
      /*
        border:带边框
        必填：否
        type:Boolean;
        默认为false，设置为true即为启用。
      */
    },
    height: {
      type: Number || String,
      /*
        height:Table 的高度，默认为自动高度。
        必填：否
        如果 height 为 number 类型，单位 px；
        如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，
        Table 的高度会受控于外部样式。
      */
    },
    selection: {
      type: Boolean,
      default: false,
      /*
        selection:多选;
        必填：否
        type:Boolean;
        默认为false，设置为true即为启用;
      */
    },
    selectionEvent: {
      type: Function,
      /*
        selectionEvent:多选事件;
        必填：和selection同步使用,当传了selection时,selectionEvent也要传。
        type:Function;
      */
    },
    colConfig: {
      type: Array,
      /* 
      colConfig:表头lable 与 prop 对应关系、多选和筛选显示等相关数据
      必填：是
        attrs:{
          label: String, 表头列名称
          prop: String,  表头列数据
          align: "left/center/right", 对齐方式
          width: Number,  宽度
          fixed:  Boolean 值或者left/right  固定列
          showOverflowTooltip:Boolean 默认 true
          resizable: 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
        },
        sortable:Boolean,  是否排序
        slot: String , 自定义（具名插槽） --见使用示例--
        **注**：colConfig倒数第二条不要设置slot,否则影响表格自适应样式
      */
    },
    tableData: {
      type: Array,
      /*
        tableData:表数据
        必填：是
      */
    },
    autoIndex: {
      type: Number,
      default: 4,
      /*
        autoIndex:第几项填充表格剩余空间 默认倒数第二条
        **注**：倒数第 autoIndex 条不要 设置 width ;
        必填：否
      */
    },
    drawerTitle: {
      //侧边栏标题
      type: String,
      require: false,
      default: () => "表格显示设置",
    },
    saveComponentKey: {
      //用于存储表格配置项在本地sessionStorage,
      //同一路由下只有一个表格可以使用默认值,
      //同一路由下>=2个表格,必须传该值,可以使用路由名称拼接数字 如:page-1,page-2;
      type: String,
      require: false,
      default: () => window.location.href.split("?")[0].split("/").slice(-1)[0],
    },
  },
  components: {
    TableHint,
    TableConfig,
  },
  data() {
    return {
      multipleSelection: [],
      num: 0,
      drawer: false,
      copyColConfig: JSON.parse(JSON.stringify(this.colConfig)),
    };
  },
  computed: {
    haveHbSetting() {
      return this.colConfig.some((item) => item.slotHeader === "hbSetting");
    },
  },
  methods: {
    handleSetTable() {
      this.drawer = true;
    },
    handleSelectionChange(val) {
      this.num = val.length;
      this.multipleSelection = val;
      this.$emit("selectionEvent", val);
    },
    /*
      table多选提示 清空 点击事件
    */
    empty() {
      this.$refs[this.tableName].clearSelection();
      this.num = 0;
    },
    handleColConfig(val) {
      this.copyColConfig = JSON.parse(JSON.stringify(val));
      console.log("改变了吗--------", this.copyColConfig);
    },
  },
  created() {
    console.log("进来了几次");
    if (this.haveHbSetting) {
      console.log(999999999);
      this.copyColConfig =
        JSON.parse(sessionStorage.getItem(this.saveComponentKey)) ||
        this.colConfig;
    }
    // else {
    // this.copyColConfig = this.colConfig;
    // }
  },
};
</script>
<style lang="less">
// @import "@/styles/element-variables.less";
.hb_table {
  background: #fff;
  .table-header-gray {
    background: #f2f3f5;
    color: #242833;
    font-weight: 600;
    th {
      background: #f2f3f5;
    }
  }
  .el-table .el-table__cell {
    height: 40px;
    padding: 0px 0;
    min-width: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
    color: #242833;
  }
  .el-table .sort-caret.ascending {
    border-bottom-color: #242833;
  }
  .el-table .sort-caret.descending {
    border-top-color: #242833;
  }
  .el-table .descending .sort-caret.descending {
    border-top-color: #1678ff;
  }
  .el-table .ascending .sort-caret.ascending {
    border-bottom-color: #1678ff;
  }
}
</style>
  