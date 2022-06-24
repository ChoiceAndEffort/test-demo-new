<template>
  <div class="hb-from">
    <template v-for="(from, indexI) in fromData">
      <el-row type="flex" align="middle" :key="indexI" :gutter="20">
        <el-col v-for="(item, index) in from" :span="span" :key="index">
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            :key="index"
            v-if="item.type === 'select'"
          >
            <el-select
              clearable
              filterable
              class="hb-el-select"
              v-model="formData[item.formDataKey]"
              :placeholder="`请选择${item.label}`"
            >
              <el-option
                v-for="el in item.options"
                :key="el.value"
                :label="el.label"
                :value="el.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            :key="index"
            v-else-if="item.type === 'input'"
          >
            <el-input
              clearable
              v-model.trim="formData[item.formDataKey]"
              :placeholder="`请输入${item.label}`"
            ></el-input>
          </el-form-item>

          <el-form-item
            :label="item.label"
            :prop="item.prop"
            :key="index"
            v-else-if="item.type === 'textarea'"
          >
            <el-input
              type="textarea"
              clearable
              :rows="item.row"
              v-model="formData[item.formDataKey]"
              :placeholder="`请输入${item.label}`"
            ></el-input>
          </el-form-item>
          <template v-else>
            <slot :name="item.slot" :row="item">{{
              "自定义form表插槽默认内容"
            }}</slot>
          </template>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
import { group } from "@/utils/index.js";
export default {
  name: "hb-form",
  props: {
    formData: {
      //form表数据对象
      type: Object,
      required: true,
      default: () => {},
    },
    formItemList: {
      //form表list项
      type: Array,
      required: true,
      default: () => {},
    },
    column: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {};
  },
  computed: {
    fromData() {
      let data = group(this.formItemList, this.column);
      console.log(data);
      return data;
    },
    span() {
      return Math.ceil(24 / this.column);
    },
  },
  created() {
    console.log("form-初始化");
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.hb-from {
  .hb-el-select {
    width: 100% !important;
  }
}
</style>
