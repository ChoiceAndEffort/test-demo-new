<template>
  <div class="page9">
    <el-button @click="handleOpen">打开选人组件</el-button>

    <hb-select-concat-person
      ref="selectPerson"
      @getPersonArr="getPerson"
      :getDepartMentSendData="getDepartMentSendData"
    >
      <template slot="tab" slot-scope="scope">
        <el-tabs
          v-model="getDepartMentSendData.type"
          @tab-click="handleClickTab"
          slot="tab"
        >
          <el-tab-pane label="行政架构" name="0"></el-tab-pane>
          <!-- <el-tab-pane label="生产架构" name="1"></el-tab-pane> -->
        </el-tabs>
      </template>
    </hb-select-concat-person>
  </div>
</template>

<script>
import hbSelectConcatPerson from "@/components/hb-select-concat-person/index.vue";

export default {
  name: "page9",
  components: {
    hbSelectConcatPerson,
  },
  data() {
    return {
      getDepartMentSendData: {
        type: 0,
      },
    };
  },

  methods: {
    //收起全部节点
    handleClickTab() {},
    getPerson(data) {
      console.log(data);
    },
    handleOpen() {
      this.$refs.selectPerson.show();
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
.page9 {
  ::v-deep .el-dialog__header {
    padding: 5px 20px 5px;
  }
  ::v-deep .el-tree-node__children {
    .el-tree-node__content {
      max-height: 52px;
      height: 52px;
    }
    .el-tree-node {
      // height: 52px;
    }
  }
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
  ::v-deep .el-dialog__title {
    font-size: 14px;
    color: #303133;
    font-weight: 500;
  }
  ::v-deep .el-dialog__body {
    padding: 0px;
  }
  ::v-deep .el-dialog__footer {
    padding: 10px 20px;
  }
}
</style>