export const colConfig = [{
        attrs: {
            align: "center",
            type: "selection",
            "reserve-selection": true,

        },
    },

    {
        slot: "expand",
        attrs: {
            prop: "children",
            align: "center",
            type: "expand",
        },
    },
    {
        slot: "index",
        attrs: {
            label: "序号",
            align: "center",
            width: "50",

        },
    },
    {
        attrs: {
            label: "物料编码",
            prop: "materialCode",
            align: "center",
        },
    },
    {
        attrs: {
            label: "物料编号",
            prop: "materialNumber",
            align: "center",
        },
    },
    {
        attrs: {
            label: "物料单重量(千克)",
            prop: "materialWeight",
            align: "center",
        },
    },
]

export const bomChildrenTableColumnList = [{
        attrs: {
            label: "组件编码",
            prop: "subassemblyCode",
            align: "center",
        },
    },
    {
        attrs: {
            label: "组件编号",
            prop: "subassemblyNumber",
            align: "center",
        },
    }, {
        attrs: {
            label: "组件数量(个)",
            prop: "subassemblyAmount",
            align: "center",
        },
    },
    {
        attrs: {
            label: "组件单重(千克)",
            prop: "subassemblyWeight",
            align: "center",
        },
    },
    {
        attrs: {
            label: "组件总量(千克)",
            prop: "subassemblyTotalWeight",
            align: "center",
        },
    }
]