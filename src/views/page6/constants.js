export const colConfig = [
  {
    dragLocked: true, //锁住不让拖动
    switchDisabled: true, //禁用关闭
    switch: true, // 是否展示该列
    slotHeaderName: "searchCode", // 表头插槽
    slotHeaderSearchType: "input", // 表头查询类型,目前支持 input 和select
    searchKey: "code", // /表头查询字段,用于配置查询的时候传递给后台的字段
    attrs: {
      label: "银行编码",
      prop: "code",
      align: "left",
    },
  },
  {
    switch: true, // 是否展示该列
    slotHeaderName: "searchName", // 表头插槽
    slotHeaderSearchType: "input", // 表头查询类型,目前支持 input 和select
    searchKey: "name", // /表头查询字段,用于配置查询的时候传递给后台的字段
    attrs: {
      label: "银行名称",
      prop: "name",
      "show-overflow-tooltip": true, // 当内容过长被隐藏时显示 tooltip
      align: "left",
    },
  },
  {
    switch: true, // 是否展示该列
    slotHeaderName: "searchAddress", // 表头插槽
    slotHeaderSearchType: "input", // 表头查询类型,目前支持 input 和select
    searchKey: "address", // /表头查询字段,用于配置查询的时候传递给后台的字段
    attrs: {
      label: "银行地址",
      prop: "address",
      align: "left",
    },
  },
  {
    switch: true, // 是否展示该列
    slotHeaderName: "selectDelFlag", // 表头插槽
    slotHeaderSearchType: "select", // 表头查询类型,目前支持 input 和select
    searchKey: "delFlag", // /表头查询字段,用于配置查询的时候传递给后台的字段
    slotBodyName: "switchDelFlag", //

    statusOptions: [
      {
        value: "",
        label: "全部",
      },
      {
        value: 1,
        label: "启用",
      },
      {
        value: 2,
        label: "禁用",
      },
    ],
    attrs: {
      label: "状态",
      prop: "delFlag",
      align: "left",
    },
  },
  {
    slotHeaderName: "hbSetting", // 是否展示表格配置项
    switch: true,
    attrs: {
      label: "",
      width: "100px",
      fixed: "right",
    },
  },
];

export const rules = {
  code: [
    {
      required: true,
      message: "银行编码不能为空",
      trigger: ["blur", "change"],
    },
  ],
  name: [
    {
      required: true,
      message: "银行名称不能为空",
      trigger: ["blur", "change"],
    },
  ],
  address: [
    {
      required: true,
      message: "银行地址不能为空",
      trigger: ["blur", "change"],
    },
  ],
};

export const formItemList = [
  {
    type: "input",
    prop: "code",
    label: "银行编码",
    formDataKey: "code",
  },
  {
    type: "input",
    prop: "name",
    label: "银行名称",
    formDataKey: "name",
  },
  {
    type: "input",
    prop: "address",
    label: "银行地址",
    formDataKey: "address",
  },
];
