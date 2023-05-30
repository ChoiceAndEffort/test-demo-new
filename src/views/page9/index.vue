<template>
  <div class="page9">
    <el-button @click="handleOpen">打开选人组件</el-button>
    <hb-select-concat-person
      ref="selectPerson"
      @getPersonArr="getPerson"
      :selectedPerson="selectedPerson"
      :getDepartMentSendData="getDepartMentSendData"
      :maxSelect="maxSelect"
    >
      <template slot="tab" slot-scope="scope">
        <el-tabs
          v-model="getDepartMentSendData.type"
          @tab-click="handleClickTab"
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
      // selectedPerson: ["220413CMKA7695YW","22041878P17YKAFW"], //已选择的人员
      selectedPerson: ["220413CMKA7695YW"], //已选择的人员
      maxSelect: 1,
    };
  },

  methods: {
    //收起全部节点
    handleClickTab() {},
    getPerson(data) {
      console.log("获取最新的节点数据", data);
      this.selectedPerson = data.map((item) => item.id);
    },
    handleOpen() {
      this.$nextTick(() => {
        this.$refs.selectPerson.show();
      });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
// .page9 {

// }
</style>
