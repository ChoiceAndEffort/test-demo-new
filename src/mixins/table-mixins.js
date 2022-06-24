const INIT_SEARCH = {
    page: 0,
    size: 10
  };
  import { cloneDeep } from "lodash";
  export default {
    data() {
      return {
        searchColConfig: undefined // 表头下的搜索项配置,目前仅支持input和select、picker 类型的查询项配置
      }
    },
    computed: {
      haveHbSetting() {
        return this.colConfig.some((item) => item.slotHeaderName === "hbSetting");
      },
    },
    methods: {
      handleResetSearch() {
        this.searchForm = {
          ...cloneDeep(INIT_SEARCH)
        };
        console.log('重置查询条件', this.searchForm);
      },
      handleUpdateSearchColConfig(val) {
        console.log('更新了查询框吗');
        this.searchColConfig = val.filter(
          (item) =>
          item.slotHeaderSearchType === 'input' ||
          item.slotHeaderSearchType === 'select' ||
          item.slotHeaderSearchType === 'picker'
        );
      }
    },
    created() {
      if (this.haveHbSetting) {
        let saveComponentKey = this.saveComponentKey || window.location.href.split("?")[0].split("/").slice(-1)[0]
        let getSaveComponentConfig =
          JSON.parse(sessionStorage.getItem(saveComponentKey)) ||
          this.colConfig;
        this.searchColConfig = getSaveComponentConfig.filter(
          (item) =>
          item.slotHeaderSearchType === 'input' ||
          item.slotHeaderSearchType === 'select' ||
          item.slotHeaderSearchType === 'picker'
        );
      }
  
  
    }
  }