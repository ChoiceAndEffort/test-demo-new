<template>
  <div class="page10">
    <el-button @click="handleToP">跳转生产 </el-button>
    <a :href="path" target="_blank" rel="noopener noreferrer">跳转生产A</a>
    <lg-table
      v-loading="loading"
      :colConfig="colConfig"
      :tableData="initData.data"
      row-key="id"
      height="calc(100vh - 265px)"
      :selection="true"
      :border="true"
      @to-search="handleToSearch"
      @reset-search="handleResetSearch"
      @update-search-col-config="handleUpdateSearchColConfig"
    >
      <!--自定义表头列插槽--表头查询项----- 循环遍历input和select搜索框  -->
      <!-- 
      <template
        v-for="(item, index) in searchColConfig"
        :slot="item.slotHeaderName"
        slot-scope="scope"
      >
        <hb-search
          :item="item"
          :key="index"
          :searchColConfig="searchColConfig"
          :searchForm="searchForm"
          :row="scope.row"
        />
      </template> -->

      <!--自定义表头列插槽----下的列内容插槽--------如:插槽'hbSetting'下展示操作项 -->
      <template slot="operation" slot-scope="scope">
        <lg-operate
          :operateList="operateList"
          :row="scope.row"
          @setEventsName="setEventsName"
        ></lg-operate>
      </template>
    </lg-table>
  </div>
</template>

<script>
const INIT_SEARCH = {
  status: 1,
  page: 0,
  size: 10
};
const INIT_FORM_DATA = {};
import { colConfig, rules, formItemList } from '@/views/page6/constants.js';
import tableMixins from '@/mixins/table-mixins.js';
import { cloneDeep } from 'lodash';
// import { testOne } from 'hb-utils';

export default {
  name: 'page10',
  mixins: [tableMixins],
  data() {
    return {
      colConfig,
      rules,

      formItemList,
      // 搜索条件
      searchForm: {
        ...cloneDeep(INIT_SEARCH)
      },
      //操作项list
      operateList: [
        {
          btnName: '修改',
          eventsName: 'handleEdit'
        }
      ],
      //初始化数据
      initData: {
        page: 0,
        size: 10,
        data: []
      },
      loading: false,

      dialogVisible: false,
      dialogDefaultTitle: '信息',
      dialogTitle: '',
      submitLoading: false,
      formData: {
        ...cloneDeep(INIT_SEARCH)
      },
      path:
        'http://localhost:1101/#/transit-page?' +
        encodeURIComponent(
          'path=/layout/production-management/personmanagement/department&age=18'
        )
    };
  },
  methods: {
    handleToP() {},
    handleResetSearch() {
      this.searchForm = {
        ...cloneDeep(INIT_SEARCH)
      };
      this.publicSearch();
    },
    //去查询
    handleToSearch() {
      console.log('看查询条件-----', this.searchForm);
      this.publicSearch();
    },

    handleAdd() {
      this.addAndEditDialog('add');
    },

    //编辑操作项
    handleEdit(row) {
      this.addAndEditDialog('edit', row);
    },

    addAndEditDialog(key, row) {
      console.log(row, '编辑数据');
      this.dialogTitle =
        key === 'edit'
          ? `修改${this.dialogDefaultTitle}`
          : `新增${this.dialogDefaultTitle}`;
      this.dialogVisible = true;
      this.formData =
        key === 'edit'
          ? { ...row }
          : {
              ...cloneDeep(INIT_SEARCH)
            };
    },
    //操作项父级方法
    handleOperateCol(eventName, row) {
      console.log('操作栏对应的操作项', eventName, row);
      this[eventName](row);
    },

    //禁用操作列
    handleColBtnIsDisabled(row) {
      console.log(row, row.delFlag === 1);
      return row.delFlag === 1;
    },
    setEventsName(eventName, row) {
      console.log(eventName, row);
      this[eventName](row);
    },
    //翻页--查询
    handleChangePage(page) {
      this.searchForm.page = page;
      this.getPageList();
    },
    //每页条数改变---查询
    handleSizeChange(size) {
      this.searchForm.size = size;
      this.publicSearch();
    },
    publicSearch() {
      this.searchForm.page = 0;
      this.initData.page = 0;
      this.initData.currentPage = 0;
      this.getPageList();
    },
    //查询列表
    async getPageList() {
      this.loading = true;
      try {
        // let res = await this.$axios.post(
        //   "http://192.168.20.151:9099/pms/c/v1/datamanagement/material/getMaterialPage",

        //   {
        //     ...this.searchForm,
        //   }
        // );
        this.loading = false;
        let res = {
          code: 0,
          msg: 'OK',
          success: true,
          timestamp: 1661906982076,
          data: {
            total: 10,
            pageSize: 10,
            currentPage: 0,
            lastPage: 1,
            totalPages: 1,
            first: true,
            last: true,
            data: [
              {
                account: '62233279641459259',
                bankInfo: {
                  address: '华容大道',
                  city: '香港',
                  province: '香港',
                  swiftCode: null,
                  code: '999999999999',
                  delFlag: null,
                  id: '999999999999',
                  name: '(测试)中国银行（香港）有限公司人民币清算行'
                },
                delFlag: 1,
                disable: null,
                id: '220516BCZ0FK28ZC',
                ownerName: '张民生1'
              },
              {
                account: '62233279641459259',
                bankInfo: {
                  address: '华容大道',
                  city: '香港',
                  province: '香港',
                  swiftCode: null,
                  code: '999999999999',
                  delFlag: null,
                  id: '999999999999',
                  name: '(测试)中国银行（香港）有限公司人民币清算行'
                },
                delFlag: 1,
                disable: null,
                id: '220516BDH24CKHBC',
                ownerName: '张民生2'
              },
              {
                account: '62233279641459259',
                bankInfo: {
                  address: '华容大道',
                  city: '香港',
                  province: '香港',
                  swiftCode: null,
                  code: '999999999999',
                  delFlag: null,
                  id: '999999999999',
                  name: '(测试)中国银行（香港）有限公司人民币清算行'
                },
                delFlag: 1,
                disable: null,
                id: '220516BFSBD7CM80',
                ownerName: '张民生'
              },
              {
                account: '123456789',
                bankInfo: {
                  address: '华容大道',
                  city: '香港',
                  province: '香港',
                  swiftCode: null,
                  code: '999999999999',
                  delFlag: null,
                  id: '999999999999',
                  name: '(测试)中国银行（香港）有限公司人民币清算行'
                },
                delFlag: 1,
                disable: null,
                id: '220516CH0HRF2N2W',
                ownerName: '张二三'
              },
              {
                account: 'id',
                bankInfo: {
                  address: '湖北襄阳',
                  city: '北京',
                  province: '北京',
                  swiftCode: null,
                  code: '102100000030',
                  delFlag: 1,
                  id: '102100000030',
                  name: '中国工商银行股份有限公司北京市分行营业部'
                },
                delFlag: 1,
                disable: 11,
                id: '220524A2BP2HMGTC',
                ownerName: '线并适处指'
              },
              {
                account: 'id',
                bankInfo: {
                  address: '湖北襄阳',
                  city: '北京',
                  province: '北京',
                  swiftCode: null,
                  code: '102100000030',
                  delFlag: 1,
                  id: '102100000030',
                  name: '中国工商银行股份有限公司北京市分行营业部'
                },
                delFlag: 1,
                disable: 11,
                id: '220524A504ZBG8PH',
                ownerName: '线并适处指'
              },
              {
                account: 'id',
                bankInfo: {
                  address: '湖北襄阳',
                  city: '北京',
                  province: '北京',
                  swiftCode: null,
                  code: '102100000030',
                  delFlag: 1,
                  id: '102100000030',
                  name: '中国工商银行股份有限公司北京市分行营业部'
                },
                delFlag: 1,
                disable: 11,
                id: '220524A59RX0B1GC',
                ownerName: '线并适处指'
              },
              {
                account: '123456789',
                bankInfo: {
                  address: '华容大道',
                  city: '香港',
                  province: '香港',
                  swiftCode: null,
                  code: '999999999999',
                  delFlag: null,
                  id: '999999999999',
                  name: '(测试)中国银行（香港）有限公司人民币清算行'
                },
                delFlag: 1,
                disable: null,
                id: '2206139YP6HH2BXP',
                ownerName: '张三三'
              },
              {
                account: '62233279641459259',
                bankInfo: {
                  address: '华容大道',
                  city: '香港',
                  province: '香港',
                  swiftCode: null,
                  code: '999999999999',
                  delFlag: null,
                  id: '999999999999',
                  name: '(测试)中国银行（香港）有限公司人民币清算行'
                },
                delFlag: 1,
                disable: null,
                id: '2206139YP6YY2RP0',
                ownerName: '张民生'
              },
              {
                account: 'ullamco',
                bankInfo: {
                  address: '宁夏回族自治区本溪市余姚市',
                  city: '吉林市',
                  province: '河南省',
                  swiftCode: '98',
                  code: '99',
                  delFlag: 1,
                  id: '2206229P5HKYM0SW',
                  name: '家发水八也'
                },
                delFlag: 1,
                disable: 52,
                id: '2206229PG4PFKY5P',
                ownerName: '平片后安手叫'
              }
            ]
          }
        };
        if (res.code === 0) {
          this.initData = res?.data;

          return false;
        }
        this.$message.error(res.message);
      } catch (error) {
        this.loading = false;
        console.log('出错了', error);
      }
    },

    //提交
    async handleSubmitForm() {
      const validate = await this.$refs['bank-list']
        .validate()
        .catch(() => false);
      console.log(validate, '提交校验', this.formData);
      if (!validate) return false;
      try {
        this.submitLoading = true;
        let res = await bankInfoStore(this.formData);
        this.dialogVisible = false;
        this.submitLoading = false;
        this.getPageList();
      } catch (error) {
        this.dialogVisible = false;
        this.submitLoading = false;
      }
    }
  },
  created() {
    this.getPageList();
    console.log(testOne, 9999999);
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.page10 {
}
</style>
