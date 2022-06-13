export const colConfig = [
    {
        attrs: {
            align: "center",
            type: "selection",
            "reserve-selection": true,
            prop:"checked"
        },
    },
    {
        attrs: {
            label: "1套料图名称",
            prop: "nestingName",
            align: "center",
            switch: true,
            resizable:true
        },
    },
    {
        attrs: {
            label: "2图纸数量",
            prop: "totalPage",
            align: "center",
            switch: true,
            resizable:true
        },
    },
    {
        attrs: {
            label: "3零件总重量（千克）",
            prop: "sparePartsTotalWeight",
            align: "center",
            switch: true
        },
    },
    {
        attrs: {
            label: "4原材料总重量（千克）",
            prop: "rawMaterialTotalWeight",
            align: "center",
            switch: true
        },
    },

    {
        slot: "opCol",
        attrs: {
            label: "操作",
            align: "center",
            switch: true
            // width: "200px"
        },
    },
    {
        slotHeader: 'hbSetting', //是否展示表格配置项
        attrs: {
            label: "",
            width: '30px'
        },
    },
]

export const colConfig1 = [
    // {
    //     attrs: {
    //         align: "center",
    //         type: "selection",
    //         "reserve-selection": true,
    //         prop:"checked"
    //     },
    // },
    {
        attrs: {
            label: "1-2图名称",
            prop: "nestingName",
            align: "center",
            switch: true,
            resizable:true
        },
    },
    {
        attrs: {
            label: "2-2纸数量",
            prop: "totalPage",
            align: "center",
            switch: true
        },
    },
    {
        attrs: {
            label: "3-2零件重量（千克）",
            prop: "sparePartsTotalWeight",
            align: "center",
            switch: true
        },
    },
    {
        attrs: {
            label: "4-2料总重量（千克）",
            prop: "rawMaterialTotalWeight",
            align: "center",
            switch: true
        },
    },
    // {
    //     attrs: {
    //         label: "5原材料总重量（千克）",
    //         prop: "rawMaterialTotalWeight1",
    //         align: "center",
    //         switch:true
    //     },
    // },
    // {
    //     attrs: {
    //         label: "6原材料总重量（千克）",
    //         prop: "rawMaterialTotalWeight2",
    //         align: "center",
    //         switch:true
    //     },
    // },
    // {
    //     attrs: {
    //         label: "7原材料总重量（千克）",
    //         prop: "rawMaterialTotalWeight3",
    //         align: "center",
    //         switch:true
    //     },
    // },
    // {
    //     attrs: {
    //         label: "8原材料总重量（千克）",
    //         prop: "rawMaterialTotalWeight9",
    //         align: "center",
    //         switch:true
    //     },
    // },
    // {
    //     attrs: {
    //         label: "9原材料总重量（千克）",
    //         prop: "rawMaterialTotalWeight10",
    //         align: "center",
    //         switch:true
    //     },
    // },
    // {
    //     attrs: {
    //         label: "10原材料总重量（千克）",
    //         prop: "rawMaterialTotalWeight11",
    //         align: "center",
    //         switch:true
    //     },
    // },
    // {
    //     slotHeader:'ddd',
    //     attrs: {
    //         label: "11原材料总重量（千克）",
    //         prop: "rawMaterialTotalWeight12",
    //         align: "center",
    //         switch:true
    //     },
    // },

    {
        slot: "opCol",
        attrs: {
            label: "操作",
            align: "center",
            switch: true
            // width: "200px"
        },
    },
    {
        slotHeader: 'hbSetting',
        attrs: {
            label: "",
            width: '30px'
        },
    },
]