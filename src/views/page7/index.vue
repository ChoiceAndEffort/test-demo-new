<template>
      <el-table  row-key="materialCode"  :data="data.data" style="width: 100%" v-show="data.length !== 0" v-if="isDeleteBomUpdate"  border :header-row-class-name="headerClass"  @expand-change="expandChange"    @selection-change="handleSelectionBomChange">
        <template v-for="item in colConfig">
        <el-table-column type="expand" :key="item.attrs.prop" v-if="item.attrs.type==='expand'">
            <template slot-scope="props">
              <div class="child-table">
                  <el-table :data="props.row.children" style="width: 100%" :header-row-class-name="headerClass"  v-loading="isLoading" row-key="bomId" >
                    <template v-for="item in bomChildrenTableColumnList">
                        <el-table-column :prop="item.attrs.prop" :label="item.attrs.label" :key="item.attrs.prop"
                            :width="item.attrs.width" :align="item.attrs.align"  lazy>
                        </el-table-column>
                    </template>
                </el-table>
              </div>

            </template>
        </el-table-column>
        <el-table-column v-else-if="item.slot" :key="item.attrs.prop"  :label="item.attrs.label"   >
		    <template slot-scope="scope" v-if="item.slot==='index'" >
		          <span>{{ indexMethod(scope.row.id) }}</span>
        </template>

		    </el-table-column>
         <el-table-column :show-overflow-tooltip="true" v-else-if="!item.attrs.edit && item.attrs.type|| item.attrs.formatter" :key="item.attrs.prop" v-bind="item.attrs || {}"></el-table-column>
        <el-table-column :prop="item.attrs.prop" :label="item.attrs.label" :key="item.attrs.prop"
                :width="item.attrs.width" :align="item.attrs.align" v-else>
          </el-table-column>
        </template>
    </el-table>
</template>

<script>
export default {
  methods: {
    upload() {
      if (this.active === 4) {
        if (this.searchobj.procedureId) {
          if (
            !["GX_ZZ", "GX_DYJ_BDYJ", "GX_DYJ_GBDYJ"].includes(
              this.searchobj.workingProcedureCode
            )
          ) {
            this.$message.warning("只有单元件与总转工序可以上传散件");
          } else {
            this.drawer = true;
            this.uploadData();
          }
        } else {
          this.$message({ message: "请先选择工序", type: "warning" });
        }
      } else {
        if (this.searchobj.procedureId || this.active === 1) {
          if (!this.searchobj.couplingId) {
            this.$message({ message: "请先选择联段", type: "warning" });
            return;
          }
          if (this.searchobj.workingProcedureCode === "GX_YS") {
            this.$message.error("运输工序不可上传物料模板");
            return;
          }
          this.drawer = true;
          this.uploadData();
        } else {
          this.$message({ message: "请先选择工序", type: "warning" });
        }
      }
    },
  },
};
</script>

<style>
</style>