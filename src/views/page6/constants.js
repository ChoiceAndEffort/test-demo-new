export const colConfig = [{
        switch: true,
        dragLocked: true, //不可拖拽
        attrs: {
            label: "序号",
            prop: "index",
            width: '50px',
            formatter: (v) => {
                console.log('11111111', v);
                return v.index + 1
            }
        },
    },
    {
        slot: "addCol",
        switch: true,
        dragLocked: true,
        switchDisabled: true, //禁用switch开关;
        attrs: {
            type: "expand",
            label: "展开",
            prop: "load",
        },
    },
    {
        slotHeaderName: 'searchNestingName',
        slotHeaderSearchType: 'input',
        switch: true,
        searchKey: "nestingName",
        attrs: {
            label: "1套料图名称",
            prop: "nestingName",
            align: 'right',
            resizable: true,
            // width: '300px',
            'show-overflow-tooltip': true,
            resizable: true,
        },
    },
    {
        slotHeaderName: 'searchTotalPage',
        slotHeaderSearchType: 'input',
        searchKey: "totalPage",
        switch: true,
        attrs: {
            label: "2图纸数量",
            prop: "totalPage",
            align: "center",
            resizable: true,
            // width: '100px',
        },
    },
    {
        switch: true,
        attrs: {
            label: "3零件总重量（千克）",
            prop: "sparePartsTotalWeight",
            align: "right",
            // width: '300px',
            'show-overflow-tooltip': true,
            resizable: true,
            formatter: (v) => {
                return v.sparePartsTotalWeight
            }
        },
    },
    {
        switch: true,
        attrs: {
            label: "状态",
            prop: "status",
            align: "center",
            // width: '300px'
            formatter: (v) => {
                let map = {
                    0: '未开发',
                    1: "已开发,未受控",
                    2: '已受控,未下发'
                }
                console.log(v);
                return map[v.status];

            }

        },
    },
    {
        switch: true,
        attrs: {
            label: "过滤器",
            prop: "filters",
            align: "center",
            // width: '100px',

        },
    },
    {

        slotHeaderName: 'searchRawMaterialTotalWeight',
        switch: true,
        searchKey: 'date',
        attrs: {
            label: "录入日期",
            prop: "date",
            align: "center",
            // width: '160px',

        },
    },
    // {
    //     slotHeaderName: 'selectStatus',
    //     slotHeaderSearchType: 'select',
    //     switch: true,
    //     searchKey: "status",
    //     attrs: {
    //         label: "5图纸状态",
    //         prop: "status",
    //         align: "center",
    //         // width: '160px'
    //     },
    // },
    // {
    //     slotHeaderName: 'selectStatus1',
    //     slotHeaderSearchType: 'select',
    //     switch: true,
    //     searchKey: "status1",
    //     attrs: {
    //         label: "5图纸状态1",
    //         prop: "status1",
    //         align: "center",
    //         // width: '160px'
    //     },
    // },
    {
        slotHeaderName: 'hbSetting', //是否展示表格配置项
        switch: true,
        attrs: {
            label: "",
            width: '60px',
            fixed: 'right',
        },
    },
]

export const colConfig1 = [{
        attrs: {
            label: "1-2图名称",
            prop: "nestingName",
            align: "center",
            switch: true,
            resizable: true
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
    //     slotHeaderName:'ddd',
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
        slotHeaderName: 'hbSetting',
        attrs: {
            label: "",
            width: '30px',
            switch: true,
        },
    },
]